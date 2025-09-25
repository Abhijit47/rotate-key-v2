import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';
import { ForgotPasswordValues } from '@/lib/validations/auth.schema';

import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

export default function Step1() {
  const {
    control,
    // register,
    formState: { errors },
  } = useFormContext<ForgotPasswordValues>();

  return (
    <fieldset className='space-y-4 bg-tertiary-50'>
      <div className='space-y-2'>
        <legend className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-secondary-700'>
          Forgot Password
        </legend>
        <p className='text-xs sm:text-sm font-semibold text-secondary-700'>
          Kindly Fill Your Credential To Proceed with password reset
        </p>
      </div>

      <FormField
        control={control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Email</FormLabel>
            <FormControl>
              <Input
                type='email'
                autoComplete='email'
                placeholder='your email'
                {...field}
              />
            </FormControl>
            <FormDescription>
              Please enter the email address associated with your account. We
              will send you a link to reset your password.
            </FormDescription>
            <ErrorMessage
              errors={errors}
              name='email'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          </FormItem>
        )}
      />
      {/* <div>
        <label className='text-sm/6 font-medium text-secondary-500'>
          Email
        </label>
        <input
          className={cn(
            'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
          )}
          type='email'
          autoComplete='email'
          placeholder='someone@gmail.com'
          {...register('email')}
        />
        <ErrorMessage
          errors={errors}
          name='email'
          render={({ message }) => (
            <p className='text-xs text-red-500'>{message}</p>
          )}
        />
      </div> */}
    </fieldset>
  );
}
