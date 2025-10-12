'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpComplete } from '@/lib/auth.actions';
import SignUpCompleteCascadingInputs from './sign-up-cascading-inputs';

import {
  signUpCompleteSchema,
  SignUpCompleteValues,
} from '@/lib/validations/auth.schema';

export default function SignUpCompleteForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpCompleteValues>({
    resolver: zodResolver(signUpCompleteSchema),
    defaultValues: {
      fromLocation: '',
      countryOrNation: {
        id: undefined,
        name: undefined,
      },
      stateOrProvince: {
        id: undefined,
        name: undefined,
      },
      cityOrTown: {
        id: undefined,
        name: undefined,
      },
    },
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = form.handleSubmit((values) => {
    const formData = new FormData();
    formData.append('fromLocation', values.fromLocation);
    formData.append('country', values.countryOrNation.name);
    formData.append('state', values.stateOrProvince.name);
    formData.append('city', values.cityOrTown.name);

    if (form.formState.errors.fromLocation) {
      form.setError('root', {
        type: 'required',
        message: 'Please fill all the required fields',
      });
      return toast.error('Please fill all the required fields');
    }

    // db call
    startTransition(async () => {
      const result = await signUpComplete(formData);
      if (result.success) {
        toast.success('Signup successful');
        router.push('/onboarding');
      } else {
        toast.error('Signup failed');
        router.replace('/sign-up');
        router.refresh();
      }
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={'space-y-4'}>
        <FormField
          control={form.control}
          name='fromLocation'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'flex flex-wrap gap-1'}>
                <span>From Location</span>
                <small className='italic font-normal text-muted-foreground'>
                  (Where are you based ?)
                </small>
              </FormLabel>
              <FormControl>
                <Input placeholder='Where are you based ?' {...field} />
              </FormControl>

              <FormMessage className={'text-xs'} />
            </FormItem>
          )}
        />

        <SignUpCompleteCascadingInputs />
        <Button
          type='submit'
          disabled={isPending}
          className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}>
          {isPending ? (
            <span className={'inline-flex items-center gap-1'}>
              Creating Account...
              <Loader2 className={'size-4 animate-spin'} />
            </span>
          ) : (
            'Create an account'
          )}
        </Button>
      </form>
    </Form>
  );
}
