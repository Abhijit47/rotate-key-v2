'use client';

import { Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth-context';
import { useSignUpForm } from '@/hooks/useSignUp';
import { Link } from '@/i18n/navigation';
import { UserRegistrationValues } from '@/lib/validations/auth.schema';

export default function SignUpButtonHandler() {
  const { currentStep, setCurrentStep } = useAuthContext();
  const form = useFormContext<UserRegistrationValues>();
  const { onGenerateOTP, isPendingOTP, isPendingSubmit } = useSignUpForm();

  const { isDirty: isName } = form.getFieldState('fullName', form.formState);
  const { isDirty: isEmail } = form.getFieldState('email', form.formState);
  const { isDirty: isPassword } = form.getFieldState(
    'password',
    form.formState
  );

  if (currentStep === 3) {
    return (
      <div className='w-full flex flex-col gap-3 items-center'>
        {/* CAPTCHA Widget */}
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          disabled={
            isPendingOTP ||
            isPendingSubmit ||
            form.formState.isSubmitting ||
            form.formState.isLoading
          }
          type='submit'
          className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}>
          {isPendingOTP ||
          isPendingSubmit ||
          form.formState.isSubmitting ||
          form.formState.isLoading
            ? 'Creating Account...'
            : 'Create an account'}
        </Button>
      </div>
    );
  }
  if (currentStep === 2) {
    return (
      <div className='w-full flex flex-col gap-3 items-center'>
        {/* CAPTCHA Widget */}
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          disabled={
            isPendingOTP ||
            isPendingSubmit ||
            form.formState.isSubmitting ||
            form.formState.isLoading
          }
          type='submit'
          className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}
          onClick={() => {
            setCurrentStep((prev: number) => prev + 1);
            // trigger the username validation
            form.trigger('userName');
          }}>
          {isPendingOTP ||
          isPendingSubmit ||
          form.formState.isSubmitting ||
          form.formState.isLoading
            ? 'Verifying otp...'
            : 'Continue'}
        </Button>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className='w-full flex flex-col gap-3 items-center'>
        {/* CAPTCHA Widget */}
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          disabled={
            isPendingOTP ||
            form.formState.isSubmitting ||
            form.formState.isLoading
          }
          type='submit'
          className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}
          onClick={() =>
            onGenerateOTP(
              form.getValues('firstName'),
              form.getValues('lastName'),
              // form.getValues('userName'),
              form.getValues('email'),
              form.getValues('password')
              // setCurrentStep
            )
          }
          // TODO: enable only when all fields are dirty in production
          // {...(isName &&
          //   isEmail &&
          //   isPassword && {
          //     onClick: () =>
          //       onGenerateOTP(
          //         getValues('email'),
          //         getValues('password'),
          //         setCurrentStep
          //       ),
          // })}
        >
          {isPendingOTP ||
          form.formState.isSubmitting ||
          form.formState.isLoading ? (
            <span className={'inline-flex items-center gap-2'}>
              Sending OTP...
              <Loader2 className='animate-spin size-4' />
            </span>
          ) : (
            'Send OTP'
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col gap-3 items-center'>
      {/* CAPTCHA Widget */}
      <div id='clerk-captcha' className={'hidden'}></div>
      {/* <Button
        disabled={loading || formState.isSubmitting || formState.isLoading}
        type='submit'
        className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}
        onClick={() => setCurrentStep((prev: number) => prev + 1)}>
        Continue 0
      </Button> */}
      <p className={'text-muted-foreground'}>
        Already have an account?{' '}
        <Link href='/sign-in' className='font-bold'>
          Sign In
        </Link>
      </p>
    </div>
  );
}
