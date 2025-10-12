'use client';

import Loader from '@/components/shared/Loader';
import { useForgotPassword } from '@/hooks/useForgotPassword';
// import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import ForgotPasswordButtonHandler from './ForgotPasswordButtonHandler';

export default function ForgotPasswordFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, methods, onResetPasswordOrSubmit2FA } =
    useForgotPassword();

  return (
    <>
      <Form {...methods}>
        <form onSubmit={onResetPasswordOrSubmit2FA} className={'space-y-4'}>
          {isLoading ? <Loader /> : children}
          <ForgotPasswordButtonHandler />
        </form>
      </Form>
    </>
  );
}
