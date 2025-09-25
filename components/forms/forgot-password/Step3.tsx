// import { cn } from '@/lib/utils';
import { ForgotPasswordValues } from '@/lib/validations/auth.schema';

import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export default function Step3() {
  const {
    control,
    // register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<ForgotPasswordValues>();

  return (
    <fieldset className='space-y-4 bg-tertiary-50'>
      {/* <legend className='sr-only'>Reset your password</legend> */}
      <div className='space-y-2'>
        <legend className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-secondary-700'>
          Reset your password
        </legend>
        <p className='text-xs sm:text-sm font-semibold text-secondary-700'>
          Kindly provide the 2FA code sent to your email address to proceed with
          password reset.
        </p>
      </div>

      <FormField
        control={control}
        name='otp'
        render={({ field }) => (
          <FormItem>
            <FormLabel>One-Time Password</FormLabel>
            <FormControl>
              <InputOTP
                maxLength={6}
                {...field}
                value={watch('otp')}
                onChange={(e) => {
                  // setOTP(e.target.value);
                  setValue('otp', e, { shouldValidate: true }); // Update the form value
                }}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormDescription>
              Please enter the one-time password sent to your phone.
            </FormDescription>
            <ErrorMessage
              errors={errors}
              name='otp'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          </FormItem>
        )}
      />

      {/* <div>
        <label className='text-sm/6 font-medium text-secondary-500'>
          Enter second factor code
        </label>
        <input
          className={cn(
            'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
          )}
          type='text'
          autoComplete='off'
          placeholder='Enter your 2FA code'
          maxLength={6}
          {...register('totp')}
        />
        <ErrorMessage
          errors={errors}
          name='totp'
          render={({ message }) => (
            <p className='text-xs text-red-500'>{message}</p>
          )}
        />
      </div> */}
    </fieldset>
  );
}
