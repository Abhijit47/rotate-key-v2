'use client';

import {
  FormControl,
  FormDescription,
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
  const { control, setValue, watch } = useFormContext<UserRegistrationValues>();

  return (
    <fieldset
      className={'inline-grid w-full h-full content-center gap-4 md:gap-6'}>
      {/* <h2 className='text-gravel md:text-4xl font-bold'>Enter OTP</h2>
      <legend className='text-iridium md:text-sm'>
        Enter the one time password that was sent to your email.
      </legend> */}
      <div className={'space-y-2'}>
        <legend className='text-4xl font-semibold text-secondary-700'>
          Enter OTP
        </legend>
        <p className={'text-sm font-medium'}>
          Enter the one time password that was sent to your email.
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
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <div>
        <input
          type='text'
          name='otp'
          id='otp'
          autoComplete='one-time-code'
          required
          aria-label='Enter OTP'
          className='w-full h-12 text-lg border-[#929496] border rounded-sm focus:border-ring focus:shadow-md focus-visible:ring-structure-focus py-3.5 px-4 appearance-none'
          value={otp}
          maxLength={6}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div> */}
      {/* <OTPInput otp={otp} setOTP={setOTP} /> */}
    </fieldset>
  );
}
