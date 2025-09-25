import { UserLoginProps, UserLoginSchema } from '@/lib/validations/auth.schema';
import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useToast } from '../use-toast';
// import {
//   isKnownError,
//   isClerkAPIResponseError,
//   isClerkRuntimeError,
//   isEmailLinkError,
//   isMetamaskError
// } from '@clerk/nextjs/errors'

// import { ClerkAPIResponseError, isClerkAPIResponseError } from '@clerk/shared';
import { signInWithCredentials } from '@/lib/auth.actions';
import { isClerkAPIResponseError } from '@clerk/shared';
import { OAuthStrategy } from '@clerk/types';
import { toast } from 'sonner';

export function useSignInForm() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });
        if (authenticated.status === 'complete') {
          const result = await signInWithCredentials({
            email: values.email,
            password: values.password,
          });

          if (result.status === 200) {
            await setActive({ session: authenticated.createdSessionId });
            toast.success('Welcome Back!');
            router.push('/');
          }
        }
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          error.errors.forEach((err) => {
            if (err.code) {
              toast.error(err.longMessage);
            }
          });
        }
        toast.error('An error occurred, please try again');
        setLoading(false);
        router.replace('/auth/sign-up');
        router.refresh();
      }
    }
  );

  function signInWith(strategy: OAuthStrategy) {
    if (!isLoaded) return;
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-in/sso-callback',
      redirectUrlComplete: '/',
    });
  }

  return {
    methods,
    onHandleSubmit,
    loading,
    signInWith,
  };
}
