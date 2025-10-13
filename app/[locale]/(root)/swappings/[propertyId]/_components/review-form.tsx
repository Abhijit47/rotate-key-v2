'use client';

// import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createReview } from '@/lib/review';
import {
  reviewFormSchema,
  ReviewFormValues,
} from '@/lib/validations/review.schema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function ReviewForm({ propertyId }: { propertyId: string }) {
  const methods = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: 'test title',
      rating: 1,
      description: 'test description for the review form for testing purposes',
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('rating', data.rating.toString());
    formData.append('description', data.description);
    formData.append('propertyId', propertyId);

    const result = await createReview(formData);

    if (result.success) {
      // Do something on success
      toast.success('Review created successfully');
    } else {
      // Do something on error
      toast.error('Error creating review');
    }
  });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className='space-y-8'>
        <FormField
          control={methods.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <ErrorMessage
                errors={methods.formState.errors}
                name='title'
                render={({ message }) => (
                  <p className={'text-xs font-medium mt-2 text-brandRed-600'}>
                    {message}
                  </p>
                )}
              />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Rating' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>
                      1 <Sparkles className={'stroke-yellow-400'} />
                    </SelectItem>
                    <SelectItem value='2'>
                      2
                      <span className={'inline-flex items-center gap-1'}>
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                      </span>
                    </SelectItem>
                    <SelectItem value='3'>
                      3
                      <span className={'inline-flex items-center gap-1'}>
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                      </span>
                    </SelectItem>
                    <SelectItem value='4'>
                      4
                      <span className={'inline-flex items-center gap-1'}>
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                      </span>
                    </SelectItem>
                    <SelectItem value='5'>
                      5
                      <span className={'inline-flex items-center gap-1'}>
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                        <Sparkles className={'stroke-yellow-400'} />
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <ErrorMessage
                errors={methods.formState.errors}
                name='rating'
                render={({ message }) => (
                  <p className={'text-xs font-medium mt-2 text-brandRed-600'}>
                    {message}
                  </p>
                )}
              />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='shadcn'
                  {...field}
                  rows={12}
                  className={'resize-none'}
                />
              </FormControl>
              <ErrorMessage
                errors={methods.formState.errors}
                name='description'
                render={({ message }) => (
                  <p className={'text-xs font-medium mt-2 text-brandRed-600'}>
                    {message}
                  </p>
                )}
              />
            </FormItem>
          )}
        />
        <Button type='submit' className={'w-full'}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
