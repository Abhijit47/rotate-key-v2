'use client';

import Loader from '@/components/shared/Loader';
import { useSignInForm } from '@/hooks/useSignIn';
import { FormProvider } from 'react-hook-form';

export default function SignInFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { methods, loading, onHandleSubmit } = useSignInForm();

  return (
    <div
      className={
        'col-span-full md:col-span-2 p-4 md:p-6 inline-grid content-center h-full'
      }>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className='h-full space-y-4'>
          {loading ? <Loader /> : children}
        </form>
      </FormProvider>
    </div>
  );
}
