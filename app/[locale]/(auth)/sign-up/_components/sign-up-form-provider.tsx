'use client';

// import { DevTool } from '@hookform/devtools';

import Loader from '@/components/shared/Loader';
import { Form } from '@/components/ui/form';
import { useAuthContext } from '@/contexts/auth-context';
import { useSignUpForm } from '@/hooks/useSignUp';
import { LazySignUpButtonHandler } from '.';
import FormStepExecutor from './form-step-executor';

const isDev = process.env.NODE_ENV === 'development';

export default function SignUpFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { methods, isPendingOTP, isPendingSubmit, onHandleSubmit } =
    useSignUpForm();
  const { currentStep } = useAuthContext();

  // console.log('err', methods.formState.errors);

  return (
    <Form {...methods}>
      <form
        onSubmit={onHandleSubmit}
        className='inline-grid content-center w-full gap-4 h-full relative'>
        {isDev ? <FormStepExecutor /> : null}
        {isPendingOTP || isPendingSubmit ? <Loader /> : children}

        {currentStep === 0 ? null : <LazySignUpButtonHandler />}
        {/* {typeof window !== undefined && <DevTool control={methods.control} />} */}
      </form>
    </Form>
  );
}
