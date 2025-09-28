import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import ExifReader from 'exifreader';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Form schema validation
const formSchema = z.object({
  uploadedUrls: z.array(z.url()).min(1, 'At least one file is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface FileWithPreview extends File {
  preview: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  cloudinaryUrl?: string;
}

const FileUploadForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadedUrls: [],
    },
  });

  const { control, handleSubmit } = form;
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heic', '.heif'],
    },
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

          const response = await axios.post('/api/cloudinary', formData, {
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
          });

          const cloudinaryUrl = response.data.data;

          // Update form value with new URL
          const currentUrls = form.getValues('uploadedUrls');
          form.setValue('uploadedUrls', [...currentUrls, cloudinaryUrl]);

          setFiles((prev) =>
            prev.map((f) =>
              f.name === file.name
                ? { ...f, status: 'success', progress: 100, cloudinaryUrl }
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
    // // Remove from local state
    // setFiles((prev) => prev.filter((file) => file.name !== fileName));

    // // Remove from form values
    // const currentUrls = form.getValues('uploadedUrls');
    // const removedFile = files.find((f) => f.name === fileName);
    // const newUrls = currentUrls.filter(
    //   (url) => url !== removedFile?.cloudinaryUrl
    // );
    // form.setValue('uploadedUrls', newUrls);

    // Find the file to remove
    const fileToRemove = files.find((file) => file.name === fileName);

    if (fileToRemove) {
      // Remove from local state
      setFiles((prev) => prev.filter((file) => file.name !== fileName));

      // Remove from form values
      const currentUrls = form.getValues('uploadedUrls');
      const newUrls = currentUrls.filter(
        (url) => url !== fileToRemove.cloudinaryUrl
      );
      form.setValue('uploadedUrls', newUrls);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted with URLs:', data.uploadedUrls);
    // Handle form submission with the array of URLs
    toast(data.uploadedUrls.join(', '));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={control}
          name='uploadedUrls'
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  {...getRootProps()}
                  className='border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors'>
                  <input {...getInputProps()} />
                  <p>
                    Drag & drop images here, or click to select (max 6 files,
                    10MB each)
                  </p>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {files.map((file) => (
            <Card key={file.name} className='p-4 relative'>
              <div className='flex items-center justify-between mb-2 absolute top-0 right-0 z-10 backdrop-blur-lg w-full overflow-hidden'>
                <span className='text-sm font-medium truncate'>
                  {file.name}
                </span>
                <Button
                  variant='destructive'
                  size='icon'
                  onClick={() => removeFile(file.name)}>
                  <XIcon className='h-4 w-4' />
                </Button>
              </div>

              <div className={'aspect-video w-full h-full'}>
                <Image
                  src={file.preview}
                  alt={file.name || `Preview of ${file.name}`}
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

        <Button type='submit'>Submit Form</Button>
      </form>
    </Form>
  );
};

export default FileUploadForm;
