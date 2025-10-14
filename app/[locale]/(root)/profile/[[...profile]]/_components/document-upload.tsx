'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const DOCUMENT_SIZE = 1024 * 1024 * 5; // 5MB
const MAX_UPLOAD_FILES = 5;

const formSchema = z.object({
  links: z.array(z.url()).min(1, 'At least one link required'),
});

export function PdfUploadForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [],
    },
  });

  const { setValue, setError, clearErrors, formState } = form;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: DOCUMENT_SIZE,
    maxFiles: MAX_UPLOAD_FILES,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        const errors = fileRejections.map(({ errors }) => errors[0].message);
        setError('links', { message: errors.join(', ') });
      } else {
        clearErrors('links');
        setFiles(acceptedFiles);
        console.log(acceptedFiles);
      }
    },
  });

  // async function onSubmit() {
  //   try {
  //     const formData = new FormData();
  //     files.forEach((file) => formData.append('files', file));

  //     const response = await axios.post('/api/cloudinary', formData, {
  //       onUploadProgress: (progressEvent) => {
  //         const total = progressEvent.total || 0;
  //         const current = progressEvent.loaded;
  //         const percentCompleted = Math.round((current * 100) / total);
  //         setUploadProgress(percentCompleted);
  //       },
  //     });

  //     const links = response.data.links; // Assuming the response contains the links
  //     setValue('links', links);
  //     toast('Upload successful');
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setError('links', { message: error.message });
  //       setUploadProgress(0);
  //       toast.error('Upload failed: ' + error.message);
  //     }

  //     if (error instanceof AxiosError) {
  //       setError('links', { message: error.response?.data.message });
  //       setUploadProgress(0);
  //       toast.error(
  //         ('Upload failed: ' + error.response?.data.message) as string
  //       );
  //     }
  //     toast.error('Something went wrong' + error);
  //   }
  // }

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('links', { message: 'Please select files to upload' });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      const response = await axios.post('/api/cloudinary', formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current * 100) / total);
          setUploadProgress(percentCompleted);
        },
      });

      if (response.status !== 200) {
        throw new Error('Upload failed');
      }

      console.log('Uploaded links:', response);
      const links = response.data.links;
      setValue('links', links);
      //  form.trigger('links'); // Trigger validation after setting links
      // form.trigger('links');
      toast('Upload successful');
      toast(<pre>{JSON.stringify(links, null, 2)}</pre>);
    } catch (error) {
      let errorMessage = 'Something went wrong';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message || error.message;
      }
      setError('links', { message: errorMessage });
      toast('Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Handle final form submission with validated links
    try {
      // Add your submission logic here
      console.log('Submitting links:', data.links);
      toast.success('Success');
    } catch (error) {
      if (error instanceof Error) {
        setError('links', { message: error.message });
        toast.error('Submission failed: ' + error.message);
      }
      toast.error('Submission failed' + error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='links'
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-primary bg-muted'
                      : 'border-muted-foreground/50'
                  }`}>
                  <input {...getInputProps()} />
                  <div className='space-y-2'>
                    <p className='text-sm font-medium'>
                      {isDragActive
                        ? 'Drop PDFs here'
                        : 'Drag & drop PDFs, or click to select'}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Maximum {MAX_UPLOAD_FILES} files (5MB each)
                    </p>
                    {files.length > 0 && (
                      <p className='text-xs text-muted-foreground mt-2'>
                        Selected files:{' '}
                        {files.map((file) => file.name).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-4'>
          <Button
            type='button'
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </Button>

          <Button
            type='submit'
            disabled={!formState.isValid || formState.isSubmitting}>
            {formState.isSubmitting ? 'Submitting...' : 'Submit Form'}
          </Button>
        </div>

        {uploadProgress > 0 && (
          <Progress value={uploadProgress} className='mt-4' />
        )}
        <Progress value={uploadProgress} className='mt-4' />
      </form>
    </Form>
  );
}
