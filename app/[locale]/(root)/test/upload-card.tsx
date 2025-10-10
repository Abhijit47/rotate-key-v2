'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ErrorCode,
  FileError,
  FileRejection,
  useDropzone,
} from 'react-dropzone';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import { UploadFormData } from './upload-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CloudUploadIcon, ImageOff, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type FieldType = ControllerRenderProps<UploadFormData, 'propertyImages'>;

interface UploaderProps {
  field: FieldType;
  fileTypeAccepted: 'image' | 'video'; // Optional prop to specify accepted file type
}

type UploaderState = {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  isDeleting: boolean;
  error: boolean;
  publicId?: string;
  url?: string;
  fileType: 'image';
};

// Extracted error code for file type validation
// eslint-disable-next-line
type ErrCode = `${ErrorCode}`;

export default function UploadCard() {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    error: false,
    publicId: undefined,
    url: '',
    // objectUrl: field.value ? constructUrl(field.value) : undefined, // Initialize with the current value of the field
    fileType: 'image',
  });

  const { control, getValues, setValue } =
    useFormContext<Pick<UploadFormData, 'propertyImages'>>();

  function renderContent() {
    if (fileState.uploading) {
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

  // Get the current value of the field
  const currentFile = getValues('propertyImages');
  console.log('Current file:', currentFile);

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prevState) => ({
        ...prevState,
        uploading: true,
        progress: 0,
      }));

      try {
        // 1. Get Presigned URL from the server
        const preSignedUrlResponse = await fetch('/api/s3/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            fileSize: file.size,
            isImage: true, // Use the prop to determine if it's an image
          }),
        });

        if (!preSignedUrlResponse.ok) {
          setFileState((prevState) => ({
            ...prevState,
            uploading: false,
            error: true,
            progress: 0,
          }));
          return toast.error(
            'Failed to get presigned URL for file upload. Please try again.'
          );
        }

        const { url, key, errors } = await preSignedUrlResponse.json();

        if (errors) {
          console.error('Validation errors:', errors);
          setFileState((prevState) => ({
            ...prevState,
            uploading: false,
            error: true,
            progress: 0,
          }));
          return toast.error(
            `Validation errors: ${Object.values(errors)
              .map((error) => error)
              .join('; ')}`
          );
        }

        /*=================================================================*/
        // XHR Code for upload Tracking
        await new Promise<void>((resolve, reject) => {
          // Initialize a new XMLHttpRequest
          const xhr = new XMLHttpRequest();

          // Track the upload progress
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setFileState((prevState) => ({
                ...prevState,
                progress,
              }));
            }
          };

          //
          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              // File uploaded successfully
              setFileState((prevState) => ({
                ...prevState,
                uploading: false,
                progress: 100,
                file: file,
                key: key, // Store the key for later use
                objectUrl: URL.createObjectURL(file),
              }));
              field.onChange(key); // Update the form field with the file key
              toast.success('File uploaded successfully');
              resolve();
            } else {
              setFileState((prevState) => ({
                ...prevState,
                uploading: false,
                error: true,
                progress: 0,
                file: null,
                id: null,
                objectUrl: undefined,
              }));
              reject(new Error('Failed to upload file.'));
            }
          };

          xhr.onerror = () => {
            setFileState((prevState) => ({
              ...prevState,
              uploading: false,
              error: true,
              progress: 0,
              file: null,
              id: null,
              objectUrl: undefined,
            }));
            reject(new Error('Network error occurred during file upload.'));
          };

          xhr.open('PUT', url);
          xhr.setRequestHeader('Content-Type', file.type);
          xhr.send(file);
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        setFileState((prevState) => ({
          ...prevState,
          uploading: false,
          error: true,
          progress: 0,
          file: null,
          id: null,
          objectUrl: undefined,
        }));
        return toast.error(
          'An error occurred while uploading the file. Please try again.'
        );
      }
    },
    [field, fileTypeAccepted]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      // console.log({ acceptedFiles });

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Prevent memory leaks by revoking the previous object URL
        if (fileState.url && !fileState.url.startsWith('http')) {
          // Revoke the previous object URL to free up memory
          console.log('Revoking previous object URL:', fileState.url);
          URL.revokeObjectURL(fileState.url);
        }

        setFileState({
          ...fileState,
          id: crypto.randomUUID(), // or any unique identifier you want to use
          file: file,
          uploading: true,
          progress: 0,
          error: false,
          isDeleting: false,
          url: URL.createObjectURL(file),
          fileType: 'image',
        });

        // Call the upload function with the selected file
        uploadFile(file);
      }
    },
    [fileState, uploadFile]
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.url) {
      toast.error('File is already being deleted or does not exist.');
      return;
    }

    try {
      setFileState((prevState) => ({
        ...prevState,
        isDeleting: true,
      }));

      const response = await fetch('/api/s3/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId: fileState.publicId }),
      });

      if (!response.ok) {
        setFileState((prevState) => ({
          ...prevState,
          isDeleting: true,
          error: true,
        }));
        if (fileState.url && !fileState.url.startsWith('http')) {
          // Revoke the previous object URL to free up memory
          console.log('Revoking previous object URL:', fileState.url);
          URL.revokeObjectURL(fileState.url);
        }
        toast.error('Failed to remove the file. Please try again.');
        return;
      }

      const data = await response.json();

      if (data.errors) {
        console.error('Error deleting file:', data.errors);
        setFileState((prevState) => ({
          ...prevState,
          isDeleting: false,
          error: true,
        }));
        if (fileState.url && !fileState.url.startsWith('http')) {
          // Revoke the previous object URL to free up memory
          console.log('Revoking previous object URL:', fileState.url);
          URL.revokeObjectURL(fileState.url);
        }
        toast.error(data.errors);
        return;
      }

      setFileState((prevState) => ({
        ...prevState,
        isDeleting: false,
        uploading: false,
        progress: 0,
        error: false,
        file: null,
        id: null,
        objectUrl: undefined,
        fileType: 'image',
      }));

      field.onChange(null); // Clear the form field value
      toast.success('File removed successfully');
      return;
    } catch (error) {
      console.error('Error removing file:', error);
      setFileState((prevState) => ({
        ...prevState,
        isDeleting: false,
        error: true,
      }));
      if (fileState.url && !fileState.url.startsWith('http')) {
        // Revoke the previous object URL to free up memory
        console.log('Revoking previous object URL:', fileState.url);
        URL.revokeObjectURL(fileState.url);
      }
      toast.error('An error occurred while removing the file.');
      return;
    }
  }

  function rejectedFiles(fileRejection: FileRejection[]) {
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
    } else {
      // If no files were rejected, we can assume the upload was successful
      // console.log('File uploaded successfully');
      // return toast.success('File uploaded successfully');
    }
  }

  // This will required if above useCallback was not implemented *uploadFile
  // useEffect(() => {
  //   // Cleanup function to revoke the object URL when the component unmounts
  //   if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
  //     // Revoke the previous object URL to free up memory
  //     console.log('Revoking previous object URL:', fileState.objectUrl);
  //     URL.revokeObjectURL(fileState.objectUrl);
  //   }
  // }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 6,
    multiple: true,
    maxSize: 10000 * 1024 * 1024, // 10 MB,
    // onDropAccepted: (files) => {
    //   // Update the field value with the accepted file
    //   field.onChange(files[0]);
    // },
    disabled: fileState.uploading || fileState.isDeleting || !!fileState.url,
    onDropRejected: (files) => rejectedFiles(files),
  });

  return (
    <FormField
      control={control}
      name='propertyImages'
      // eslint-disable-next-line
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property Images</FormLabel>
          <FormControl>
            <Card
              {...getRootProps()}
              className={cn(
                'relative border-2 border-dashed transition-colors w-full h-64',
                isDragActive
                  ? 'border-primary/10 bg-primary/10 border-solid'
                  : 'border-border hover:border-primary'
              )}>
              <CardContent
                className={
                  'flex items-center justify-center w-full h-full p-4 relative'
                }>
                <input {...getInputProps()} id='thumbnail' />
                {renderContent()}
              </CardContent>
            </Card>
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
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
      {props.fileType === 'video' ? (
        <video
          controls
          width='100%'
          height={'100%'}
          className={'rounded-lg w-full h-full'}>
          <source src={previewUrl} type='video/mp4' />
        </video>
      ) : (
        <Image
          src={previewUrl}
          alt='uploaded file'
          fill
          sizes='(max-width: 640px) 100vw, 640px'
          className={'object-contain p-2'}
        />
      )}

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
