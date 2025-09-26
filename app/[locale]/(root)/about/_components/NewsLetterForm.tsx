'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  newsLetterFormSchema,
  NewsLetterFormValues,
} from '@/lib/validations/newsletter.schema';
import { MessageCircleQuestion } from 'lucide-react';

export default function NewsLetterForm() {
  // 1. Define your form.
  const form = useForm<NewsLetterFormValues>({
    resolver: zodResolver(newsLetterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: NewsLetterFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  className={cn(
                    'rounded-full',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-500',
                    'ring-2 ring-primary-500 data-[focus]:ring-0'
                  )}
                  placeholder='someone@example.com'
                  {...field}
                />
              </FormControl>
              {form.formState.errors ? (
                <FormMessage />
              ) : (
                <FormDescription className={'text-xs'}>
                  We will send you an email when we have news about our project.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button
          size={'sm'}
          type='submit'
          className={'cursor-pointer rounded-full'}>
          {' '}
          Let&apos;s Talk <MessageCircleQuestion className={'size-4'} />
        </Button>
      </form>
    </Form>
  );
}
