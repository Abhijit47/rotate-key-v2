import { updatePreferences } from '@/lib/user-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

const updatePreferenceFormSchema = z.object({
  country: z.string().min(2, { message: 'Country is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  city: z.string().min(2, { message: 'City is required' }),
});

type updatePreferenceFormValues = z.infer<typeof updatePreferenceFormSchema>;

export default function UpdatePreferenceForm({
  preference,
  onToggle,
}: {
  preference: PreferencesType | null;
  onToggle: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<updatePreferenceFormValues>({
    resolver: zodResolver(updatePreferenceFormSchema),
    defaultValues: {
      country: preference?.toLocation.country || '',
      state: preference?.toLocation.state || '',
      city: preference?.toLocation.city || '',
    },
    mode: 'onChange',
  });

  // 2. Define a submit handler.
  function onSubmit(values: updatePreferenceFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const formData = new FormData();
    formData.append('country', values.country);
    formData.append('state', values.state);
    formData.append('city', values.city);

    startTransition(async () => {
      const result = await updatePreferences(formData);
      if (!result.success) {
        toast.error(result.error || 'Failed to update preference');
        return;
      }
      toast.success('Preference updated successfully');
      form.reset();
      onToggle();
      return;
    });
  }

  return (
    <Form {...form}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update your preference</DialogTitle>
          <DialogDescription>
            Please update your preference to get better matches.
          </DialogDescription>
        </DialogHeader>

        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid gap-4'>
            <div className='grid gap-3 relative'>
              <FormField
                defaultValue={preference?.toLocation.country}
                disabled={isPending}
                control={form.control}
                name='country'
                render={({ field }) => {
                  console.log({ field });
                  return (
                    <FormItem>
                      <FormLabel>Desired Country</FormLabel>
                      <FormControl>
                        <Input placeholder='Update country' {...field} />
                      </FormControl>
                      {isPending && (
                        <span className={'absolute top-1 right-1'}>
                          <Loader2 className='h-4 w-4 animate-spin' />
                        </span>
                      )}

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className='grid gap-3 relative'>
              <FormField
                disabled={isPending}
                control={form.control}
                name='state'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired State</FormLabel>
                    <FormControl>
                      <Input placeholder='Update state' {...field} />
                    </FormControl>
                    {isPending && (
                      <span className={'absolute top-1 right-1'}>
                        <Loader2 className='h-4 w-4 animate-spin' />
                      </span>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-3 relative'>
              <FormField
                disabled={isPending}
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired City</FormLabel>
                    <FormControl>
                      <Input placeholder='Update city' {...field} />
                    </FormControl>
                    {isPending && (
                      <span className={'absolute top-1 right-1'}>
                        <Loader2 className='h-4 w-4 animate-spin' />
                      </span>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' disabled={isPending}>
                {!isPending ? (
                  'Close'
                ) : (
                  <span className={'inline-flex items-center gap-2'}>
                    Loading...
                    <Loader2 className='h-4 w-4 animate-spin' />
                  </span>
                )}
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {!isPending ? (
                ' Update Preference'
              ) : (
                <span className={'inline-flex items-center gap-2'}>
                  Loading...
                  <Loader2 className='h-4 w-4 animate-spin' />
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
