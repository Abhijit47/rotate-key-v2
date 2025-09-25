'use client';

import Loader from '@/components/shared/Loader';
import { useAuthContext } from '@/contexts/auth-context';
import { useSignUpForm } from '@/hooks/useSignUp';
// import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
// import { DevTool } from '@hookform/devtools';
import SignUpButtonHandler from './SignUpButtonHandler';

export default function SignUpFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { methods, loading, onHandleSubmit } = useSignUpForm();
  const { currentStep } = useAuthContext();

  return (
    <Form {...methods}>
      <form
        onSubmit={onHandleSubmit}
        className='inline-grid content-center w-full gap-4 h-full'>
        {loading ? <Loader /> : children}

        {currentStep === 0 ? null : <SignUpButtonHandler />}
        {/* {typeof window !== undefined && <DevTool control={methods.control} />} */}
      </form>
    </Form>
  );
}
