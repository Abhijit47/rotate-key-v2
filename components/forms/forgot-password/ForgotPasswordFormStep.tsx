'use client';

import DynamicLoader from '@/components/shared/DynamicLoader';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth-context';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import dynamic from 'next/dynamic';

const Step1 = dynamic(() => import('./Step1'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

const Step2 = dynamic(() => import('./Step2'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

const Step3 = dynamic(() => import('./Step3'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

const isDev = process.env.NODE_ENV === 'development' ? true : false;

export default function ForgotPasswordFormStep() {
  const { forgotPasswordStep, setForgotPasswordStep } = useAuthContext();
  const { isSecondFactor } = useForgotPassword();

  switch (forgotPasswordStep) {
    case 1:
      return (
        <>
          <Step1 />
          {isDev ? (
            <Button
              type='button'
              className={'absolute top-0 right-0'}
              onClick={() => {
                setForgotPasswordStep(2);
              }}>
              next step
            </Button>
          ) : null}
        </>
      );

    case 2:
      return (
        <>
          <Step2 />
          {isDev ? (
            <Button
              type='button'
              className={'absolute top-0 right-0'}
              onClick={() => {
                // if second factor is there then execute next step else not
                if (isSecondFactor) {
                  setForgotPasswordStep(3);
                } else {
                  setForgotPasswordStep(1);
                }
              }}>
              Reset password
            </Button>
          ) : null}
        </>
      );

    case 3:
      return (
        <>
          <Step3 />
          {isDev ? (
            <Button
              type='button'
              className={'absolute top-0 right-0'}
              onClick={() => {
                setForgotPasswordStep(1);
              }}>
              Submit and continue
            </Button>
          ) : null}
        </>
      );

    default:
      return null;
  }
}
