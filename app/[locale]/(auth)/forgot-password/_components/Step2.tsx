import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from '@/components/ui/input-otp';
// import { cn } from '@/lib/utils';
import { ForgotPasswordValues } from '@/lib/validations/auth.schema';
import { ErrorMessage } from '@hookform/error-message';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step2() {
  const recoverAccountNewPasswordRef = useRef<HTMLInputElement>(null);
  const recoverAccountConfirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isShowRecoveryAccountPassword, setIsShowRecoveryAccountPassword] =
    useState(false);
  const [
    isShowRecoveryAccountConfirmPassword,
    setIsShowRecoveryAccountConfirmPassword,
  ] = useState(false);

  const {
    control,
    // register,
    formState: { errors },
    // setValue,
    // watch,
  } = useFormContext<ForgotPasswordValues>();

  return (
    <fieldset className='space-y-4'>
      {/* <legend className='sr-only'>Reset your password</legend> */}
      <div className='space-y-2'>
        <legend className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground'>
          Provide New Credentials
        </legend>
        <p className='text-xs sm:text-sm font-semibold text-muted-foreground'>
          Kindly Fill Your Credential To Proceed with password reset
        </p>
      </div>

      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Enter your new password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={isShowRecoveryAccountPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  placeholder='********'
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    recoverAccountNewPasswordRef.current = e;
                  }}
                />
                <Button
                  type='button'
                  size={'icon'}
                  variant={'ghost'}
                  className={
                    'absolute right-3 top-1/2 -translate-y-1/2 size-4 text-secondary-500 hover:cursor-pointer'
                  }
                  onClick={() => {
                    // const input = watch('password');
                    const inputType =
                      recoverAccountNewPasswordRef.current?.type;
                    if (inputType === 'password') {
                      if (recoverAccountNewPasswordRef.current) {
                        recoverAccountNewPasswordRef.current.type = 'text';
                        setIsShowRecoveryAccountPassword(true);
                      }
                    }
                    if (inputType === 'text') {
                      if (recoverAccountNewPasswordRef.current) {
                        recoverAccountNewPasswordRef.current.type = 'password';
                        setIsShowRecoveryAccountPassword(false);
                      }
                    }
                  }}>
                  {!isShowRecoveryAccountPassword ? (
                    <EyeClosed className={'stroke-muted-foreground'} />
                  ) : (
                    <EyeIcon className={'stroke-primary-500'} />
                  )}
                </Button>
              </div>
            </FormControl>
            {errors ? (
              <ErrorMessage
                errors={errors}
                name='password'
                render={({ message }) => (
                  <p className='text-xs text-red-500'>{message}</p>
                )}
              />
            ) : (
              <FormDescription>
                Password must be at least 8 characters long.
              </FormDescription>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='confirmPassword'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm your new password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={
                    isShowRecoveryAccountConfirmPassword ? 'text' : 'password'
                  }
                  autoComplete='current-password'
                  placeholder='********'
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    recoverAccountConfirmPasswordRef.current = e;
                  }}
                />

                <Button
                  type='button'
                  size={'icon'}
                  variant={'ghost'}
                  className={
                    'absolute right-3 top-1/2 -translate-y-1/2 size-4 text-secondary-500 hover:cursor-pointer'
                  }
                  onClick={() => {
                    // const input = watch('password');
                    const inputType =
                      recoverAccountConfirmPasswordRef.current?.type;
                    if (inputType === 'password') {
                      if (recoverAccountConfirmPasswordRef.current) {
                        recoverAccountConfirmPasswordRef.current.type = 'text';
                        setIsShowRecoveryAccountConfirmPassword(true);
                      }
                    }
                    if (inputType === 'text') {
                      if (recoverAccountConfirmPasswordRef.current) {
                        recoverAccountConfirmPasswordRef.current.type =
                          'password';
                        setIsShowRecoveryAccountConfirmPassword(false);
                      }
                    }
                  }}>
                  {!isShowRecoveryAccountConfirmPassword ? (
                    <EyeClosed className={'stroke-muted-foreground'} />
                  ) : (
                    <EyeIcon className={'stroke-primary-500'} />
                  )}
                </Button>
              </div>
            </FormControl>
            {errors ? (
              <ErrorMessage
                errors={errors}
                name='confirmPassword'
                render={({ message }) => (
                  <p className='text-xs text-red-500'>{message}</p>
                )}
              />
            ) : (
              <FormDescription>
                Password should match the one you entered above.
              </FormDescription>
            )}
          </FormItem>
        )}
      />

      {/* <FormField
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
      /> */}

      {/* <div>
        <label className='text-sm/6 font-medium text-secondary-500'>
          Enter your new password
        </label>
        <input
          className={cn(
            'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
          )}
          type='password'
          autoComplete='new-password'
          placeholder='********'
          {...register('password')}
        />
        <ErrorMessage
          errors={errors}
          name='password'
          render={({ message }) => (
            <p className='text-xs text-red-500'>{message}</p>
          )}
        />
      </div>
      <div>
        <label className='text-sm/6 font-medium text-secondary-500'>
          Enter confirm your new password
        </label>
        <input
          className={cn(
            'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
          )}
          type='password'
          autoComplete='current-password'
          placeholder='********'
          {...register('confirmPassword')}
        />
        <ErrorMessage
          errors={errors}
          name='confirmPassword'
          render={({ message }) => (
            <p className='text-xs text-red-500'>{message}</p>
          )}
        />
      </div>
      <div>
        <label className='text-sm/6 font-medium text-secondary-500'>
          Enter the password reset code that was sent to your email
        </label>
        <input
          className={cn(
            'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
          )}
          type='text'
          autoComplete='off'
          placeholder='Enter the code'
          maxLength={6}
          {...register('otp')}
        />
        <ErrorMessage
          errors={errors}
          name='otp'
          render={({ message }) => (
            <p className='text-xs text-red-500'>{message}</p>
          )}
        />
      </div> */}
    </fieldset>
  );
}
