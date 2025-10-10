'use client';

import ExifReader from 'exifreader';
import { Upload, X } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
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

export function UploadWithValidation() {
  const [isUploading, setIsUploading] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const onFileValidate = React.useCallback(
    async (file: File): Promise<string | null> => {
      // Validate max files
      if (files.length >= 6) {
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
    [files]
  );

  const onUpload: NonNullable<FileUploadProps['onUpload']> = React.useCallback(
    async (files, { onProgress }) => {
      try {
        setIsUploading(true);
        // upload on cloud storage
        const res = (await new Promise((res) => {
          setTimeout(() => {
            files.forEach((file, index) => {
              res(files);
              onProgress(file, Math.round(((index + 1) / files.length) * 100));
            });
          }, 5000);
        })) as File[];

        toast.success('Uploaded files:', {
          description: (
            <pre className='mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground'>
              <code>
                {JSON.stringify(
                  res.map((file) =>
                    file.name.length > 25
                      ? `${file.name.slice(0, 25)}...`
                      : file.name
                  ),
                  null,
                  2
                )}
              </code>
            </pre>
          ),
        });
      } catch (error) {
        setIsUploading(false);

        toast.error(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onFileValidate={onFileValidate}
      onFileReject={onFileReject}
      onUpload={onUpload}
      accept='image/*'
      maxFiles={6}
      className='w-full max-w-md mx-auto'
      multiple
      disabled={isUploading}>
      <FileUploadDropzone>
        <div className='flex flex-col items-center gap-1'>
          <div className='flex items-center justify-center rounded-full border p-2.5'>
            <Upload className='size-6 text-muted-foreground' />
          </div>
          <p className='font-medium text-sm'>Drag & drop files here</p>
          <p className='text-muted-foreground text-xs'>
            Or click to browse (max 6 files)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant='outline' size='sm' className='mt-2 w-fit'>
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem key={crypto.randomUUID()} value={file}>
            <div className='flex w-full items-center gap-2'>
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant='ghost' size='icon' className='size-7'>
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
