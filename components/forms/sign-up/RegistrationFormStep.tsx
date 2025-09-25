'use client';

import { useAuthContext } from '@/contexts/auth-context';

import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import CreateAccountForm from './CreateAccountForm';
import DynamicLoader from '@/components/shared/DynamicLoader';
import { Button } from '@/components/ui/button';
// import { UserRegistrationValues } from '@/lib/validations/auth.schema';
import dynamic from 'next/dynamic';
import SignUpStart from './SignUpStart';

const CreateAccountForm = dynamic(() => import('./CreateAccountForm'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

const OTPForm = dynamic(() => import('./OTPForm'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

const UserInformationForm = dynamic(() => import('./UserInformationForm'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

const isDev = process.env.NODE_ENV === 'development' ? true : false;

export default function RegistrationFormStep() {
  // const { setValue } = useFormContext<UserRegistrationValues>();
  const { currentStep, setCurrentStep } = useAuthContext();
  // const [onOTP, setOnOTP] = useState<string>('');
  const router = useRouter();

  // setValue('otp', onOTP);

  switch (currentStep) {
    case 0:
      return <SignUpStart />;

    case 1:
      return (
        <>
          <CreateAccountForm />
          {isDev ? (
            <Button
              variant={'outline'}
              className='absolute top-0 right-0'
              onClick={() => {
                setCurrentStep(2);
              }}>
              Continue
            </Button>
          ) : null}
        </>
      );

    case 2:
      return (
        <>
          {/* otp={onOTP} setOTP={setOnOTP} */}
          <OTPForm />
          {isDev ? (
            <Button
              variant={'outline'}
              className='absolute top-0 right-0'
              onClick={() => {
                setCurrentStep(3);
              }}>
              Continue
            </Button>
          ) : null}
        </>
      );

    case 3:
      return (
        <>
          <UserInformationForm />
          {isDev ? (
            <Button
              variant={'outline'}
              className='absolute top-0 right-0'
              onClick={() => {
                alert('sign up successful');
                router.push('/onboarding');
              }}>
              Create Account
            </Button>
          ) : null}
        </>
      );

    default:
      return null;
  }
}
