'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import { afterSSOSignUp } from '@/lib/auth.actions';
// import { cn } from '@/lib/utils';

import {
  SignUpCompleteSchema,
  SignUpCompleteValues,
} from '@/lib/validations/auth.schema';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignUpCompleteForm() {
  const [isPending, startTransition] = useTransition();
  const methods = useForm<SignUpCompleteValues>({
    resolver: zodResolver(SignUpCompleteSchema),
    defaultValues: {
      yourLocation: '',
      yourDestination: '',
    },
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const router = useRouter();

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.append('yourLocation', values.yourLocation);
    formData.append('yourDestination', values.yourDestination);
    // formData.append('joinedAs', values.joinedAs);

    // db call
    startTransition(async () => {
      const result = await afterSSOSignUp(formData);
      if (result.status === 200) {
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
    <Form {...methods}>
      <form onSubmit={onSubmit} className={''}>
        {/* <CustomGoogleOneTap>
        <Button>One Tap Login</Button>
      </CustomGoogleOneTap> */}

        <fieldset className='space-y-6'>
          <div className={'space-y-2'}>
            <legend className='text-4xl font-semibold text-foreground'>
              Let&apos;s get to know each other!
            </legend>
            <p className={'text-sm font-medium text-muted-foreground'}>
              We need to know a little bit about you before we can get started.
            </p>
          </div>

          <FormField
            control={control}
            name='yourLocation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where are you from ?</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Your Location City, Country'
                    autoComplete='address-level1'
                    {...field}
                  />
                </FormControl>
                {!errors?.yourLocation?.message ? (
                  <FormDescription className={'text-xs text-secondary-500'}>
                    So we can share profiles of member who are interested in
                    visiting your areas
                  </FormDescription>
                ) : null}
                <ErrorMessage
                  errors={errors}
                  name='yourLocation'
                  render={({ message }) => (
                    <p className='text-xs text-red-500'>{message}</p>
                  )}
                />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='yourDestination'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where would you like to go?</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Your Destination City, Country'
                    autoComplete='address-level1'
                    {...field}
                  />
                </FormControl>
                {!errors?.yourDestination?.message ? (
                  <FormDescription className={'text-xs text-secondary-500'}>
                    So we can display homes in this area that might interest
                    you.
                  </FormDescription>
                ) : null}
                <ErrorMessage
                  errors={errors}
                  name='yourDestination'
                  render={({ message }) => (
                    <p className='text-xs text-red-500'>{message}</p>
                  )}
                />
              </FormItem>
            )}
          />

          {/* <FormField
            control={control}
            name='joinedAs'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What would you like to be called ?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e.toLocaleLowerCase());
                    }}
                    defaultValue={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a your role' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          Select your role in the community
                        </SelectLabel>
                        <SelectItem value='owner'>Owner</SelectItem>
                        <SelectItem value='customer'>Customer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <ErrorMessage
                  errors={errors}
                  name='joinedAs'
                  render={({ message }) => (
                    <p className='text-xs text-red-500'>{message}</p>
                  )}
                />
              </FormItem>
            )}
          /> */}

          {/* <div className={'space-y-1'}>
          <label className='text-sm/6 font-medium text-secondary-500'>
            Where are you from ?
          </label>
          {!errors?.yourLocation?.message ? (
            <p className={'text-xs text-secondary-500'}>
              So we can share profiles of member who are interested in visiting
              your areas
            </p>
          ) : null}
          <input
            className={cn(
              'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
            )}
            type='text'
            placeholder='Your Location City, Country'
            autoComplete='address-level1'
            {...methods.register('yourLocation')}
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name='yourLocation'
            render={({ message }) => (
              <p className='text-xs text-red-500'>{message}</p>
            )}
          />
        </div> */}

          {/* <div className={'space-y-1'}>
          <label className='text-sm/6 font-medium text-secondary-500'>
            Where would you like to go?
          </label>
          {!methods.formState.errors?.yourDestination?.message ? (
            <p className={'text-xs text-secondary-500'}>
              So we can display homes in this area that might interest you.
            </p>
          ) : null}
          <input
            className={cn(
              'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
            )}
            type='text'
            placeholder='Your Destination City, Country'
            autoComplete='address-level1'
            {...methods.register('yourDestination')}
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name='yourDestination'
            render={({ message }) => (
              <p className='text-xs text-red-500'>{message}</p>
            )}
          />
        </div> */}
          <Button
            type='submit'
            disabled={isPending}
            className={
              'w-full hover:cursor-pointer disabled:cursor-not-allowed'
            }
            // className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-secondary-500/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-tertiary-50'
          >
            {isPending ? 'Creating Account...' : 'Create an account'}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
