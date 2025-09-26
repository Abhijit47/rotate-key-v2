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
    <fieldset className='space-y-4'>
      <div className='space-y-2'>
        <legend className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground'>
          Reset your password
        </legend>
        <p className='text-xs sm:text-sm font-semibold text-muted-foreground'>
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

            {errors ? (
              <ErrorMessage
                errors={errors}
                name='otp'
                render={({ message }) => (
                  <p className='text-xs text-red-500'>{message}</p>
                )}
              />
            ) : (
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
            )}
          </FormItem>
        )}
      />
    </fieldset>
  );
}
