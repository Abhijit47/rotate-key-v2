'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UploadCard from './upload-card';

const uploadFormSchema = z.object({
  propertyImages: z
    .array(z.url())
    .refine(
      (urls) => urls.some((url) => url !== ''),
      'At least one image is required'
    ),
});

export type UploadFormData = z.infer<typeof uploadFormSchema>;

export default function UploaderForm() {
  // 1. Define your form.
  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      propertyImages: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: UploadFormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <UploadCard />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
