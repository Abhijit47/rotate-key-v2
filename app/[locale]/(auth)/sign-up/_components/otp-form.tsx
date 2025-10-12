'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { UserRegistrationValues } from '@/lib/validations/auth.schema';
import { useFormContext } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = {
  setOTP: React.Dispatch<React.SetStateAction<string>>;
  otp: string;
};
// { setOTP, otp }: Props
export default function OTPForm() {
  const form = useFormContext<UserRegistrationValues>();

  return (
    <fieldset
      className={'inline-grid w-full h-full content-center gap-4 md:gap-6'}>
      <div className={'space-y-2'}>
        <legend className='text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-foreground'>
          Enter OTP
        </legend>
        <p className={'text-sm font-medium text-muted-foreground'}>
          Enter the one time password that was sent to your email.
        </p>
      </div>

      <FormField
        control={form.control}
        name='otp'
        render={({ field }) => (
          <FormItem>
            <FormLabel>One-Time Password</FormLabel>
            <FormControl>
              <InputOTP
                className={'flex-wrap'}
                maxLength={6}
                {...field}
                value={form.watch('otp')}
                onChange={(e) => {
                  // setOTP(e.target.value);
                  form.setValue('otp', e, { shouldValidate: true }); // Update the form value
                }}>
                <InputOTPGroup
                  className={'space-x-1 sm:space-x-2 lg:space-x-4'}>
                  <InputOTPSlot
                    index={0}
                    className={'size-6 sm:size-8 lg:size-12'}
                  />
                  <InputOTPSlot
                    index={1}
                    className={'size-6 sm:size-8 lg:size-12'}
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup
                  className={'space-x-1 sm:space-x-2 lg:space-x-4'}>
                  <InputOTPSlot
                    index={2}
                    className={'size-6 sm:size-8 lg:size-12'}
                  />
                  <InputOTPSlot
                    index={3}
                    className={'size-6 sm:size-8 lg:size-12'}
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup
                  className={'space-x-1 sm:space-x-2 lg:space-x-4'}>
                  <InputOTPSlot
                    index={4}
                    className={'size-6 sm:size-8 lg:size-12'}
                  />
                  <InputOTPSlot
                    index={5}
                    className={'size-6 sm:size-8 lg:size-12'}
                  />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>

            <FormMessage className={'text-xs'} />
          </FormItem>
        )}
      />
    </fieldset>
  );
}
