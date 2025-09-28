import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import axios, { AxiosResponse } from 'axios';
import ExifReader from 'exifreader';
import React from 'react';
import { useDropzone } from 'react-dropzone';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { toast } from 'sonner';

interface FileWithPreview extends File {
  preview: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

type ApiResponse = {
  data: string | null;
  message: string;
  success: boolean;
};

const FileUploader = () => {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heic', '.heif'],
    },
    maxFiles: 6,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: async (acceptedFiles, rejectedFiles) => {
      // Handle rejected files first
      // eslint-disable-next-line
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
          // Add preview and status to file object
          const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file),
            status: 'uploading',
            progress: 0,
          }) as FileWithPreview;

          setFiles((prev) => [...prev, fileWithPreview]);

          // Validate EXIF data
          const tags = await ExifReader.load(file);
          if (!tags.Make?.value || !tags.Model?.value) {
            throw new Error('Lacks camera metadata');
          }

          // Upload to Cloudinary
          const formData = new FormData();
          formData.append('file', file);

          const response = await axios.post<AxiosResponse>(
            '/api/cloudinary',
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                setFiles((prev) =>
                  prev.map((f) =>
                    f.name === file.name
                      ? { ...f, progress: percentCompleted }
                      : f
                  )
                );
              },
            }
          );

          console.log('Upload response:', response.data);

          if (response.status !== 200) {
            throw new Error(response.data.statusText);
          }
          // eslint-disable-next-line
          const data = response.data as AxiosResponse<ApiResponse>;

          setFiles((prev) =>
            prev.map((f) =>
              f.name === file.name
                ? { ...f, status: 'success', progress: 100 }
                : f
            )
          );
        } catch (error) {
          setFiles((prev) =>
            prev.map((f) =>
              f.name === file.name ? { ...f, status: 'error' } : f
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
  });

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div className='space-y-4'>
      <div
        {...getRootProps()}
        className='border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors'>
        <input {...getInputProps()} />
        <p>
          Drag & drop images here, or click to select (max 6 files, 10MB each)
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {files.map((file) => (
          <Card key={file.name} className='p-4 relative'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium truncate'>{file.name}</span>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => removeFile(file.name)}>
                ×
              </Button>
            </div>

            <Image
              src={file.preview}
              alt={file.name}
              width={300}
              height={200}
              className='h-full w-full object-cover rounded mb-2'
            />

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
    </div>
  );
};

export default FileUploader;
