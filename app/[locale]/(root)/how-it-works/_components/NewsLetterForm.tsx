'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const formSchema = z.object({
  email: z.email(),
});

export default function NewsLetterForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'block rounded-full w-full border-none bg-tertiary-50 py-1.5 px-3 text-sm/6 text-tertiary-50',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-500 ring-1 ring-secondary-500 data-[focus]:ring-0'
                  )}
                  placeholder='someone@example.com'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We will send you an email when we have news about our project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className={'cursor-pointer'}>
          {' '}
          Let&apos;s Talk
        </Button>
      </form>
    </Form>
  );
}
