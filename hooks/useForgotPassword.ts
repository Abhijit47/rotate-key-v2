import { useRouter } from '@/i18n/navigation';
import {
  ForgotPasswordSchema,
  ForgotPasswordValues,
} from '@/lib/validations/auth.schema';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useForgotPassword() {
  const [successfullCreation, setSuccessfullCreation] =
    useState<boolean>(false);
  const [isSecondFactor, setIsSecondFactor] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '', // marketingconsultero@gmail.com
      password: '', // Admin123852456
      confirmPassword: '', // Admin123852456
      otp: '', // 902403
      totp: undefined,
    },
    mode: 'onChange',
  });

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const locale = useLocale();

  // If the user is already signed in,
  // redirect them to the home page
  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  // Send the password reset code to the user's email
  async function onResetPasswordGenerateOTP(
    email: string,
    onNextStep: React.Dispatch<React.SetStateAction<number>>
  ) {
    if (!isLoaded) {
      return null;
    }

    setIsLoading(true);
    try {
      const res = await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      if (res.status === 'needs_first_factor') {
        setSuccessfullCreation(true);
        onNextStep((prev) => prev + 1);
        setIsLoading(false);
      }

      if (res.status === 'needs_second_factor') {
        setIsSecondFactor(true);
        setIsLoading(false);
      }

      // if (res.status === 'complete') {
      //   setSuccessfullCreation(true);
      //   onNextStep((prev) => prev + 1);
      //   console.log('OTP sent to email');
      //   setIsLoading(false);
      // } else {
      //   // trigger next step of the flow
      //   setIsSecondFactor(true);
      //   setIsLoading(false);
      // }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors.forEach((err) => {
          if (err.code) {
            toast.error(err.longMessage);
          }
        });
      }
      toast.error('An error occurred, please try again');
      setIsLoading(false);
    }
  }

  const onResetPasswordOrSubmit2FA = methods.handleSubmit(
    async (data: ForgotPasswordValues) => {
      // Reset the user's password.
      // Upon successful reset, the user will be
      // signed in and redirected to the home page
      if (!isLoaded) {
        return null;
      }

      setIsLoading(true);
      try {
        const res = await signIn.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: data.otp,
          password: data.password,
        });

        if (res.status === 'needs_second_factor') {
          setIsSecondFactor(true);
          setIsLoading(false);
        } else if (res.status === 'complete') {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: res.createdSessionId });
          setIsLoading(false);
          router.push('/', { locale });
        } else {
          toast.info(res.status);
          setIsLoading(false);
          router.push('/forgot-password', { locale });
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
        setIsLoading(false);
        router.push('/forgot-password', { locale });
      }

      if (isSecondFactor) {
        // console.log('2FA not executed');
        // Submit the 2FA code
        onSubmit2FA(data);
      }
    }
  );

  // Only execute this function if the user is on the 2FA step
  async function onSubmit2FA(data: ForgotPasswordValues) {
    if (!isLoaded) {
      return null;
    }

    if (!data.totp) {
      toast.error('Please enter the 2FA code');
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn.attemptSecondFactor({
        strategy: 'totp',
        code: data.totp,
      });

      if (res.status === 'complete') {
        setActive({ session: res.createdSessionId });
        setIsLoading(false);
        router.push('/', { locale });
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
      setIsLoading(false);
      router.push('/forgot-password', { locale });
    }
  }

  return {
    isSecondFactor,
    isLoading,
    successfullCreation,
    methods,
    onResetPasswordGenerateOTP,
    onResetPasswordOrSubmit2FA,
  };
}
