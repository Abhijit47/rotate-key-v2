import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
// import { AddPropertyFormValues } from '@/lib/validations/property.schema';
// import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosResponse } from 'axios';
import ExifReader from 'exifreader';
import {
  CloudUploadIcon,
  ImageOff,
  UploadCloudIcon,
  X,
  XIcon,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SetValueConfig, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
// import { z } from 'zod';

// // Form schema validation
// const formSchema = z.object({
//   uploadedUrls: z
//     .array(z.string().url())
//     .min(1, 'At least one file is required'),
// });

// type FormValues = z.infer<typeof formSchema>;

interface FileWithPreview extends File {
  preview: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  url: string;
  publicId: string;
  displayName: string;
}

type FilesState = {
  id: null;
  file: File | null;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  isUploading: boolean;
  isDeleting: boolean;
  error: string;
  publicId: string;
  url: string;
  displayName: string;
};

export type UploadApiResponse = {
  data: {
    publicId: string;
    url: string;
    displayName: string;
  } | null;
  message: string;
  success: boolean;
};

export default function PropertyImagesUploadField() {
  // const [files, setFiles] = useState<File[]>([]);
  const [filesState, setFilesState] = useState<FilesState[]>([
    {
      id: null,
      file: null,
      status: 'uploading',
      progress: 0,
      isUploading: false,
      isDeleting: false,
      error: '',
      publicId: '',
      url: '',
      displayName: '',
    },
  ]);
  const [isDeletePending, startTransition] = useTransition();

  const { control, getValues, setValue } =
    useFormContext<Pick<AddPropertyFormValues, 'propertyImages'>>();

  const locale = useLocale();

  const setValuesOptions: SetValueConfig = {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  };

  // const currentUrls = getValues('propertyImages');

  async function rejectedFiles(fileRejection: FileRejection[]) {
    // Handle rejected files
    // console.error('Rejected files:', fileRejection);

    if (fileRejection.length > 0) {
      // Too many files
      const tooManyFiles = fileRejection.some((file) =>
        file.errors.some((error: FileError) => error.code === 'too-many-files')
      );
      if (tooManyFiles) {
        console.error('Too many files selected. Only one file is allowed.');
        return toast.error(
          'Too many files selected. Only one file is allowed.'
        );
      }
      // File too large
      const tooLargeFiles = fileRejection.some((file) =>
        file.errors.some((error: FileError) => error.code === 'file-too-large')
      );
      if (tooLargeFiles) {
        console.error('File is too large. Maximum size is 5 MB.');
        return toast.error('File is too large. Maximum size is 5 MB.');
      }
      // File invalid type
      const invalidFileType = fileRejection.some((file) =>
        file.errors.some(
          (error: FileError) => error.code === 'file-invalid-type'
        )
      );
      if (invalidFileType) {
        console.error('Invalid file type. Only images are allowed.');
        return toast.error('Invalid file type. Only images are allowed.');
      }

      const checkExifData = fileRejection.some((file) =>
        file.errors.some(
          (error: FileError) => error.message === 'Lacks camera metadata'
        )
      );
      if (checkExifData) {
        console.error('Image lacks camera metadata.');
        return toast.error('Image lacks camera metadata.');
      }
      // Validate EXIF data
    } else {
      // If no files were rejected, we can assume the upload was successful
      // console.log('File uploaded successfully');
      // return toast.success('File uploaded successfully');
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heic', '.heif', '.webp'],
    },
    multiple: true,
    maxFiles: 6,
    maxSize: 10 * 1024 * 1024,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      // Handle rejected files
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            toast.error('File size exceeds 10MB limit', {
              position: 'top-center',
            });
          } else if (error.code === 'file-invalid-type') {
            toast.error('Invalid file type', { position: 'top-center' });
          }
        });
      });

      // Process accepted files
      for (const file of acceptedFiles) {
        try {
          const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file),
            status: 'uploading',
            progress: 0,
            url: '',
            publicId: '',
            displayName: file.name,
          }) as FileWithPreview;

          // setFiles((prev) => [...prev, fileWithPreview]);
          setFilesState((prev) => [
            ...prev,
            {
              id: null,
              file: file,
              status: 'uploading',
              progress: 0,
              isUploading: true,
              isDeleting: false,
              error: '',
              publicId: '',
              url: '',
              displayName: file.name,
            },
          ]);

          // Validate EXIF data
          const tags = await ExifReader.load(file);
          if (!tags.Make?.value || !tags.Model?.value) {
            throw new Error('Lacks camera metadata');
          }

          // Upload to Cloudinary
          const formData = new FormData();
          formData.append('file', file);

          const response: AxiosResponse<UploadApiResponse> = await axios.post(
            `/${locale}/api/cloudinary/upload`,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                // setFiles((prev) =>
                //   prev.map((f) =>
                //     f.displayName === file.name
                //       ? {
                //           ...f,
                //           progress: percentCompleted,
                //           publicId: f.publicId,
                //         }
                //       : f
                //   )
                // );
                setFilesState((prev) =>
                  prev.map((f) =>
                    f.displayName === file.name
                      ? {
                          ...f,
                          progress: percentCompleted,
                          isUploading: true,
                          publicId: f.publicId,
                          url: f.url,
                          displayName: f.displayName,
                          error: '',
                          isDeleting: false,
                          status: 'uploading',
                        }
                      : f
                  )
                );
              },
            }
          );

          if (response.status !== 200) {
            console.log('Response:', response.status);
            throw new Error(response.data.message || 'Upload failed');
          }

          console.log('Cloudinary URL:', response.data);
          const data = response.data.data;

          if (!data) {
            toast.error('No Url for image', { position: 'top-center' });
            // setFiles((prev) =>
            //   prev.map((f) =>
            //     f.name === file.name ? { ...f, status: 'error' } : f
            //   )
            // );
            setFilesState((prev) =>
              prev.map((f) =>
                f.displayName === file.name
                  ? {
                      ...f,
                      status: 'error',
                      isUploading: false,
                      error: 'No URL',
                      progress: 0,
                      url: '',
                      publicId: '',
                      displayName: f.displayName,
                    }
                  : f
              )
            );
            return;
          }

          // Update form value with new URL
          const currentUrls = getValues('propertyImages');
          setValue(
            'propertyImages',
            [...currentUrls, data.url],
            setValuesOptions
          );

          // setFiles((prev) =>
          //   prev.map((f) =>
          //     f.name === file.name
          //       ? {
          //           ...f,
          //           status: 'success',
          //           progress: 100,
          //           url: data.url,
          //           publicId: data.publicId,
          //           displayName: data.displayName,
          //         }
          //       : f
          //   )
          // );
          setFilesState((prev) =>
            prev.map((f) =>
              f.displayName === file.name
                ? {
                    ...f,
                    status: 'success',
                    progress: 100,
                    isUploading: false,
                    url: data.url,
                    publicId: data.publicId,
                    displayName: data.displayName,
                  }
                : f
            )
          );
          toast.success('File uploaded successfully', {
            position: 'top-center',
          });
        } catch (error) {
          console.error('Upload error:', error);
          // setFiles((prev) =>
          //   prev.map((f) =>
          //     f.name === file.name ? { ...f, status: 'error' } : f
          //   )
          // );
          setFilesState((prev) =>
            prev.map((f) =>
              f.displayName === file.name
                ? {
                    ...f,
                    status: 'error',
                    isUploading: false,
                    error: (error as Error).message,
                    progress: 0,
                    url: '',
                    publicId: '',
                    displayName: f.displayName,
                  }
                : f
            )
          );

          if (error instanceof Error) {
            toast.error(
              error.message === 'Lacks camera metadata'
                ? 'Image lacks camera metadata'
                : 'Upload failed',
              { position: 'top-center' }
            );
          }
        }
      }
    },
    onDropRejected: async (files) => await rejectedFiles(files),
    disabled: isDeletePending, // Disable while dragging
  });

  function removeFile(publicId: string) {
    // Find the file to remove
    const fileToRemove = files.find((file) => file.publicId === publicId);
    console.log('Removing file:', publicId);
    console.log('File to remove:', fileToRemove);

    if (fileToRemove) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('publicId', fileToRemove.publicId);
        // Call API to delete from Cloudinary
        const response = await fetch(`/${locale}/api/cloudinary/delete`, {
          method: 'DELETE',
          body: formData,
        });
        console.log('Delete response status:', response.status);
      });

      // Remove from local state
      setFiles((prev) => prev.filter((file) => file.publicId !== publicId));

      // Remove from form values
      const currentUrls = getValues('propertyImages');
      console.log('Current URLs before removal:', currentUrls);
      const newUrls = currentUrls.filter((url) => url !== fileToRemove.url);
      console.log('New URLs after removal:', newUrls);
      setValue('propertyImages', newUrls, setValuesOptions);

      // Revoke the object URL to free up memory
      URL.revokeObjectURL(fileToRemove.preview);
    }
  }

  function handleRemoveFile() {
    return Promise.resolve();
  }

  function renderContent() {
    for (const fileState of filesState) {
      if (fileState.isUploading) {
        return (
          <RenderUploadingState
            progress={fileState.progress}
            file={fileState.file}
          />
        );
      }

      if (fileState.error) {
        return <RenderErrorState />;
      }
      if (fileState.url) {
        return (
          <RenderUploadedState
            previewUrl={fileState.url}
            isDeleting={fileState.isDeleting}
            onDelete={handleRemoveFile}
            fileType='image'
          />
        );
      }
      return <RenderEmptyState isDragActive={isDragActive} />;
    }
  }

  return (
    <div className='space-y-4'>
      <FormField
        control={control}
        name='propertyImages'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div
                {...getRootProps()}
                className='border-2 border-dashed rounded-lg p-8 text-center cursor-pointer group group-hover:ring-2 group-hover:ring-primary-500 hover:border-primary transition-colors duration-150 ease-in-out'>
                <input {...getInputProps()} />
                <UploadCloudIcon className='mx-auto mb-4 h-8 w-8 stroke-muted-foreground group-hover:stroke-primary-500' />
                <p>
                  Drag & drop images here, or click to select (max 6 files, 10MB
                  each)
                </p>
                <div className={'text-center'}>
                  <div
                    className={
                      'flex items-center justify-center size-12 mx-auto rounded-full bg-muted mb-4'
                    }>
                    <CloudUploadIcon
                      className={cn(
                        'size-6 text-muted-foreground',
                        isDragActive && 'text-primary'
                      )}
                    />
                  </div>

                  <p className={'text-base font-semibold text-foreground'}>
                    Drop the files here{' '}
                    <span className={'text-primary font-bold cursor-pointer'}>
                      Click to upload
                    </span>
                  </p>

                  <Button type='button' className={'mt-4'}>
                    Select file
                  </Button>
                </div>
              </div>
            </FormControl>
            <FormMessage className={'text-xs font-medium text-destructive'} />
          </FormItem>
        )}
      />

      {/* Previews */}
      {filesState.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filesState.map((file, idx) => (
            <Card key={idx} className='p-4 relative'>
              <div className='flex items-center justify-between mb-2 absolute top-0 right-0 z-10 backdrop-blur-lg w-full overflow-hidden'>
                <span className='text-sm font-medium truncate'>
                  {file.displayName}
                </span>
                <Button
                  disabled={isDeletePending}
                  variant='destructive'
                  size='icon'
                  onClick={() => removeFile(file.publicId)}>
                  <XIcon className='h-4 w-4' />
                </Button>
              </div>

              <div className={'aspect-video w-full h-full'}>
                <Image
                  src={file.url}
                  alt={file.displayName || `Preview of ${file.displayName}`}
                  width={300}
                  height={200}
                  className='h-full w-full object-cover rounded mb-2'
                  // onLoad={() => URL.revokeObjectURL(file.preview)}
                />
              </div>

              {file.status === 'uploading' && (
                <Progress value={file.progress} className='h-2' />
              )}

              {file.status === 'error' && (
                <div className='text-red-500 text-sm mt-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      /* Add retry logic here */
                    }}>
                    Retry
                  </Button>
                </div>
              )}

              {file.status === 'success' && (
                <div className='text-green-500 text-sm mt-2'>
                  Uploaded successfully
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

interface RenderEmptyStateProps {
  isDragActive: boolean;
}

export function RenderEmptyState(props: RenderEmptyStateProps) {
  const { isDragActive } = props;

  return (
    <div className={'text-center'}>
      <div
        className={
          'flex items-center justify-center size-12 mx-auto rounded-full bg-muted mb-4'
        }>
        <CloudUploadIcon
          className={cn(
            'size-6 text-muted-foreground',
            isDragActive && 'text-primary'
          )}
        />
      </div>

      <p className={'text-base font-semibold text-foreground'}>
        Drop the files here{' '}
        <span className={'text-primary font-bold cursor-pointer'}>
          Click to upload
        </span>
      </p>

      <Button type='button' className={'mt-4'}>
        Select file
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className={'text-center text-destructive'}>
      <div
        className={
          'flex items-center justify-center size-12 mx-auto rounded-full bg-destructive/75 mb-4'
        }>
        <ImageOff className={cn('size-6 text-destructive-foreground')} />
      </div>

      <p className={'text-sm font-semibold text-muted-foreground'}>
        An error occurred while uploading the file.
      </p>
      <Button type='button' variant={'destructive'} className={'mt-4'}>
        Try Again
      </Button>
    </div>
  );
}

interface RenderUploadedStateProps {
  previewUrl: string;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  fileType: 'image' | 'video';
}

export function RenderUploadedState(props: RenderUploadedStateProps) {
  const { previewUrl } = props;
  console.log('Preview URL:', previewUrl);

  return (
    <div
      className={
        'relative group w-full h-full flex items-center justify-center'
      }>
      <Image
        src={previewUrl}
        alt='uploaded file'
        fill
        sizes='(max-width: 640px) 100vw, 640px'
        className={'object-contain p-2'}
      />

      <Button
        onClick={props.onDelete}
        disabled={props.isDeleting}
        type='button'
        variant={'destructive'}
        size={'icon'}
        className={cn(
          'absolute -top-2 right-4 z-10 bg-muted hover:bg-muted/80 transition-colors'
        )}>
        <X className={'size-4 text-destructive-foreground'} />
        <span className={'sr-only'}>Remove file</span>
      </Button>
    </div>
  );
}

interface RenderUploadingStateProps {
  progress: number;
  file: File | null;
}

export function RenderUploadingState(props: RenderUploadingStateProps) {
  const { progress, file } = props;

  return (
    <div
      className={'text-center flex items-center justify-center flex-col gap-2'}>
      <p>{progress}</p>
      <Progress
        value={progress}
        className={cn(
          'bg-muted transition-all duration-300 ease-in-out',
          `w-${progress}% h-2 rounded-full overflow-hidden`
        )}
      />
      <p className={'text-sm font-medium text-foreground truncate max-w-xs'}>
        Uploading {file?.name}...
      </p>
    </div>
  );
}
