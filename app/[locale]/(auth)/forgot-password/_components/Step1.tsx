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
    <fieldset className='space-y-4'>
      <div className='space-y-2'>
        <legend className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground'>
          Forgot Password
        </legend>
        <p className='text-xs sm:text-sm font-semibold text-muted-foreground'>
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
            <FormDescription className={'text-xs'}>
              *Please enter the email address associated with your account. We
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
    </fieldset>
  );
}
