'use client';

import ExifReader from 'exifreader';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, Loader2, XCircle } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useCallback, useState, useTransition } from 'react';
import { type SetValueConfig, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadProps,
  FileUploadTrigger,
} from './file-upload';

const formSchema = z.object({
  files: z
    .array(z.custom<File & { publicId?: string }>())
    .min(1, 'Please select at least one file')
    .max(6, 'Please select up to 6 files')
    .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
      message: 'File size must be less than 10MB',
      path: ['files'],
    }),
  images: z.array(z.url()),
});

type FormValues = z.infer<typeof formSchema>;

export type UploadApiResponse = {
  data: {
    publicId: string;
    url: string;
    displayName: string;
  } | null;
  message: string;
  success: boolean;
};

export type DeleteApiResponse = {
  message: string;
  success: boolean;
};

type HandleDeleteFileParams = {
  name: string;
  index: number;
  publicId?: string;
  type: string;
};

export default function TestPage() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // per-file upload progress holder (ref used because we don't render progress here)
  const progressRef = useState({ current: 0 })[0] as { current: number };
  const [isDeletePending, startTransition] = useTransition();

  const setProgress = useCallback(
    (v: number) => {
      progressRef.current = v;
    },
    [progressRef]
  );
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
    mode: 'onBlur',
  });

  const locale = useLocale();

  // DONE: implement file validation
  const onFileValidate = useCallback(
    async (file: File): Promise<string | null> => {
      // Validate max files using the form current value
      const currentFiles = form.getValues('files') ?? [];
      if (currentFiles.length >= 6) {
        return 'You can only upload up to 6 files';
      }

      // Validate file type (only images)
      if (!file.type.startsWith('image/')) {
        return 'Only image files are allowed';
      }

      // Validate file size (max 10MB)
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      // Validate EXIF data
      const tags = await ExifReader.load(file);
      if (!tags.Make?.value || !tags.Model?.value) {
        return 'Lacks camera metadata, download from web or generated with AI';
      }

      // after getting here, the file is valid
      // we can return null to indicate no error

      return null;
    },
    [form]
  );

  // DONE: implement file upload to Cloudinary
  const onUpload: NonNullable<FileUploadProps['onUpload']> = useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      const setValuesOptions: SetValueConfig = {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      };

      const API_URL = `/${locale}/api/cloudinary/upload`;

      setIsUploading(true);

      try {
        for (const file of files) {
          await new Promise<void>((resolve) => {
            const xhr = new XMLHttpRequest();
            const fd = new FormData();
            fd.append('file', file);

            xhr.open('POST', API_URL);

            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const pct = Math.round((event.loaded / event.total) * 100);
                // update local progress state if you want a global bar
                setProgress(pct);
                // notify the FileUpload component about per-file progress
                onProgress?.(file, pct);
              }
            };

            xhr.onload = async () => {
              try {
                if (xhr.status >= 200 && xhr.status < 300) {
                  const json = JSON.parse(
                    xhr.responseText
                  ) as UploadApiResponse;
                  if (json?.data?.url) {
                    // append returned URL to form images
                    const currentUrls = form.getValues('images');
                    form.setValue(
                      'images',
                      [...currentUrls, json.data.url],
                      setValuesOptions
                    );

                    // add the publicId to to the current file to enable deletion later
                    form.setValue(
                      'files',
                      files.map((f) =>
                        f === file
                          ? Object.assign(f, { publicId: json.data?.publicId })
                          : f
                      ),
                      { ...setValuesOptions, shouldTouch: false }
                    );

                    onSuccess?.(file);
                    resolve();
                  } else {
                    const msg =
                      json?.message ?? 'Upload succeeded but no data returned';
                    onError?.(file, new Error(msg));
                    toast.error(msg);
                    resolve();
                  }
                } else {
                  const msg = `Upload failed: ${xhr.status} ${xhr.statusText}`;
                  onError?.(file, new Error(msg));
                  toast.error(msg);
                  resolve();
                }
              } catch (err) {
                const e = err instanceof Error ? err : new Error(String(err));
                onError?.(file, e);
                toast.error(e.message);
                resolve();
              }
            };

            xhr.onerror = () => {
              const msg = 'Network error occurred during file upload.';
              onError?.(file, new Error(msg));
              toast.error(msg);
              resolve();
            };

            xhr.send(fd);
          });
        }

        toast.success('Uploaded files');
      } finally {
        setIsUploading(false);
      }
    },
    [form, locale, setProgress]
  );

  // DONE: implement file rejection handling
  const onFileReject = useCallback(
    (file: File, message: string) => {
      form.setError('images', {
        message,
      });
      toast.error(message, {
        description: `"${
          file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
        }" has been rejected`,
      });
    },
    [form]
  );

  const onSubmit = useCallback((data: FormValues) => {
    toast('Submitted values:', {
      description: (
        <pre className='mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground'>
          <code>{JSON.stringify(data.images, null, 2)}</code>
        </pre>
      ),
    });
  }, []);

  // DONE: implement file deletion both locally and from Cloudinary
  function handleDeleteFile(params: HandleDeleteFileParams) {
    const { name, index, publicId, type } = params;

    startTransition(async () => {
      const currentFiles = form.getValues('files') ?? [];
      if (index < 0 || index >= currentFiles.length) {
        toast.error('Invalid file index');
        return;
      }

      // remove the local file
      form.setValue(
        'files',
        currentFiles.filter((file, i) => {
          // filter out the file at the given index
          return i !== index;
        }),
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );

      // remove the corresponding image URL if exists
      const imageUrls = form.getValues('images') ?? [];

      form.setValue(
        'images',
        imageUrls.filter((url) => !url.includes(name)),
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );
      // "https://res.cloudinary.com/rotate-key/image/upload/v1760100227/rotate-key/user_32XbNhKzVwexApprNx11AmR6T9d/my-property/20241223_152021.jpg.jpg"

      const API_URL = `/${locale}/api/cloudinary/delete`;
      const formData = new FormData();
      formData.append('publicId', publicId ?? '');
      formData.append('resourceType', type);

      const res = await fetch(API_URL, {
        method: 'DELETE',
        body: formData,
      });

      if (!res.ok) {
        const err: DeleteApiResponse = await res.json();
        toast.error(err?.message || 'Failed to delete file from server');
        return;
      } else {
        const json: DeleteApiResponse = await res.json();
        if (!json.success) {
          toast.error(json?.message || 'Failed to delete file from server');
          return;
        }
        toast.success(json?.message || 'File deleted from server');
      }
    });
  }

  return (
    <div className={'max-w-xl mx-auto py-16'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            disabled={isUploading || isDeletePending}
            control={form.control}
            name='files'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onValueChange={field.onChange}
                    onFileValidate={onFileValidate}
                    accept='image/*'
                    maxFiles={6}
                    maxSize={10 * 1024 * 1024}
                    onUpload={onUpload}
                    onFileReject={onFileReject}
                    multiple
                    disabled={isUploading || isDeletePending}>
                    <FileUploadDropzone className='flex-row flex-wrap border-2 border-dotted text-center border-primary/50 bg-primary/5 hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
                      <CloudUpload className='size-4' />
                      Drag and drop or
                      <FileUploadTrigger asChild>
                        <Button variant='link' size='sm' className='p-0'>
                          choose files
                        </Button>
                      </FileUploadTrigger>
                      to upload
                    </FileUploadDropzone>
                    <FileUploadList>
                      {field.value?.map((file, idx) => (
                        <FileUploadItem key={crypto.randomUUID()} value={file}>
                          <div className='flex w-full items-center gap-2'>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                disabled={isUploading || isDeletePending}
                                type='button'
                                variant='destructive'
                                size='icon'
                                className='size-7'
                                onClick={() =>
                                  handleDeleteFile({
                                    name: file.name,
                                    index: idx,
                                    publicId: file.publicId,
                                    type: file.type.split('/')[0],
                                  })
                                }>
                                {isDeletePending ? <Loader2 /> : <XCircle />}
                                <span className='sr-only'>Delete</span>
                              </Button>
                            </FileUploadItemDelete>
                          </div>
                          <FileUploadItemProgress />
                        </FileUploadItem>
                      ))}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormDescription>
                  Upload up to 6 images up to 10 MB each.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
