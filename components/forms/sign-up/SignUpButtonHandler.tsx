'use client';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth-context';
import { useSignUpForm } from '@/hooks/useSignUp';
import { Link } from '@/i18n/navigation';
import { UserRegistrationValues } from '@/lib/validations/auth.schema';
import { useFormContext } from 'react-hook-form';

export default function SignUpButtonHandler() {
  const { currentStep, setCurrentStep } = useAuthContext();
  const { formState, getFieldState, getValues } =
    useFormContext<UserRegistrationValues>();
  const { onGenerateOTP, loading } = useSignUpForm();

  const { isDirty: isName } = getFieldState('fullName', formState);
  const { isDirty: isEmail } = getFieldState('email', formState);
  const { isDirty: isPassword } = getFieldState('password', formState);

  // alert(JSON.stringify({ isName, isEmail, isPassword }));
  // console.log(JSON.stringify({ isName, isEmail, isPassword }));

  if (currentStep === 3) {
    return (
      <div className='w-full flex flex-col gap-3 items-center'>
        {/* CAPTCHA Widget */}
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          disabled={loading || formState.isSubmitting || formState.isLoading}
          type='submit'
          className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}>
          {loading || formState.isSubmitting || formState.isLoading
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
          disabled={loading || formState.isSubmitting || formState.isLoading}
          type='submit'
          className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}
          onClick={() => setCurrentStep((prev: number) => prev + 1)}>
          {loading || formState.isSubmitting || formState.isLoading
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
          disabled={loading || formState.isSubmitting || formState.isLoading}
          type='submit'
          className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                onGenerateOTP(
                  getValues('email'),
                  getValues('password'),
                  setCurrentStep
                ),
            })}>
          {loading || formState.isSubmitting || formState.isLoading
            ? 'Sending OTP...'
            : 'Send OTP'}
        </Button>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col gap-3 items-center'>
      {/* CAPTCHA Widget */}
      <div id='clerk-captcha' className={'hidden'}></div>
      <Button
        disabled={loading || formState.isSubmitting || formState.isLoading}
        type='submit'
        className={'w-full hover:cursor-pointer disabled:cursor-not-allowed'}
        onClick={() => setCurrentStep((prev: number) => prev + 1)}>
        Continue 0
      </Button>
      <p className={'text-muted-foreground'}>
        Already have an account?{' '}
        <Link href='/sign-in' className='font-bold'>
          Sign In
        </Link>
      </p>
    </div>
  );
}
