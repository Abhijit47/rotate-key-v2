import ExifReader from 'exifreader';
import { FileWarning, Loader2, Upload, XCircle } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useCallback, useState, useTransition } from 'react';
import { SetValueConfig, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

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
} from '@/components/extension/file-upload';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';

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

export default function PropertyImagesUploadField() {
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
  const form =
    useFormContext<Pick<AddPropertyFormValues, 'files' | 'propertyImages'>>();

  const locale = useLocale();
  const UPLOAD_API_URL = `/${locale}/api/cloudinary/upload`;
  const DELETE_API_URL = `/${locale}/api/cloudinary/delete`;

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
        return 'Downloaded from web or generated with AI 😔';
      }

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

      setIsUploading(true);

      try {
        for (const file of files) {
          await new Promise<void>((resolve) => {
            const xhr = new XMLHttpRequest();
            const fd = new FormData();
            fd.append('file', file);

            xhr.open('POST', UPLOAD_API_URL);

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
                    const currentUrls = form.getValues('propertyImages');
                    form.setValue(
                      'propertyImages',
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
    [form, setProgress, UPLOAD_API_URL]
  );

  // DONE: implement file rejection handling
  const onFileReject = useCallback(
    (file: File, message: string) => {
      form.setError('files', {
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
      const imageUrls = form.getValues('propertyImages') ?? [];

      form.setValue(
        'propertyImages',
        imageUrls.filter((url) => !url.includes(name)),
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );
      // "https://res.cloudinary.com/rotate-key/image/upload/v1760100227/rotate-key/user_32XbNhKzVwexApprNx11AmR6T9d/my-property/20241223_152021.jpg.jpg"

      const formData = new FormData();
      formData.append('publicId', publicId ?? '');
      formData.append('resourceType', type);

      const res = await fetch(DELETE_API_URL, {
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
    <div className='space-y-4'>
      <FormField
        disabled={isUploading || isDeletePending}
        control={form.control}
        name='files'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Images</FormLabel>
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
                <FileUploadDropzone
                  className={cn(
                    'border-2 border-dotted text-center border-primary/50 bg-primary/5 hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    'data-error:border-destructive data-error:text-destructive',
                    'data-error:hover:bg-destructive/10 data-error:bg-destructive/5',
                    'transition-colors',
                    isUploading || isDeletePending ? 'pointer-events-none' : ''
                  )}>
                  {form.formState.errors.files ? (
                    <UploadImageErrorState />
                  ) : (
                    <UploadImageEmptyState />
                  )}

                  {!form.formState.errors.files && (
                    <FileUploadTrigger asChild>
                      <Button variant='link' size='sm' className='p-1.5'>
                        choose files
                      </Button>
                    </FileUploadTrigger>
                  )}
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
            {form.formState.errors.files ? (
              <>
                <FormMessage className={'text-xs'} />
              </>
            ) : (
              <>
                <FormDescription className={'text-xs'}>
                  Upload up to 6 images up to 10 MB each.
                </FormDescription>
              </>
            )}
          </FormItem>
        )}
      />
      <FormField
        disabled={isUploading || isDeletePending}
        control={form.control}
        name='propertyImages'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Urls</FormLabel>
            <FormControl>
              <Textarea
                readOnly
                value={field.value?.length ? field.value.join('\n') : ''}
                placeholder='Uploaded image URLs will appear here...'
                className='font-mono h-24 resize-none'
              />
            </FormControl>
            {form.formState.errors.files ? (
              <>
                <FormMessage className={'text-xs'} />
              </>
            ) : (
              <>
                <FormDescription className={'text-xs'}>
                  These URLs will be submitted with the form.
                </FormDescription>
              </>
            )}
          </FormItem>
        )}
      />
    </div>
  );
}

function UploadImageEmptyState() {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='flex items-center justify-center rounded-full border p-2.5'>
        <Upload className='size-6 text-muted-foreground' />
      </div>
      <p className='font-medium text-sm'>Drag & drop files here</p>
      <p className='text-muted-foreground text-xs'>
        Or click to browse (max 6 files)
      </p>
    </div>
  );
}

function UploadImageErrorState() {
  const form =
    useFormContext<Pick<AddPropertyFormValues, 'files' | 'propertyImages'>>();

  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='flex items-center justify-center rounded-full border p-2.5'>
        <FileWarning className='size-6 text-muted-foreground' />
      </div>
      <p className='font-medium text-sm'>
        There was an error uploading your files.
      </p>
      {form.formState.errors.files?.message && (
        <p className='text-muted-foreground text-xs'>
          Please try again. {form.formState.errors.files.message}
        </p>
      )}
      <Button
        type='button'
        variant='secondary'
        size='sm'
        className='mt-1'
        onClick={() => form.reset({ files: [] }, { keepDirty: true })}>
        Reset
      </Button>
    </div>
  );
}
