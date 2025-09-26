import { useRouter } from '@/i18n/navigation';
import { signUpWithCredentials } from '@/lib/auth.actions';
import {
  UserRegistrationSchema,
  UserRegistrationValues,
} from '@/lib/validations/auth.schema';
import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/shared';
// import { ClerkAPIError } from '@clerk/types';
// import { OAuthStrategy } from '@clerk/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useSignUpForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const { signUp, isLoaded, setActive } = useSignUp();

  const router = useRouter();
  const locale = useLocale();

  const methods = useForm<UserRegistrationValues>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      fullName: '',
      email: '', // joe+clerk_test@gmail.com
      password: '',
      confirmPassword: '',
      otp: '',
      yourLocation: '',
      yourDestination: '',
      // joinedAs: undefined,
    },
    mode: 'onChange',
  });

  // Generate OTP
  async function onGenerateOTP(
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) {
    if (!isLoaded) return;

    try {
      toast.info('Sending OTP...', {
        position: 'top-center',
        duration: 1000,
        closeButton: false,
      });
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      toast.info('OTP sent to your email 🥳', {
        position: 'top-center',
        closeButton: false,
      });
      onNext((prev) => prev + 1);
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
      router.replace('/sign-up', { locale });
    }
  }

  // Final step of sign up with Email and Password
  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationValues) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        if (completeSignUp.status !== 'complete') {
          toast.error('Something went wrong!');
          setLoading(false);
          router.replace('/sign-up', { locale });
        }

        if (completeSignUp.status === 'complete') {
          if (!signUp.createdUserId) return;

          const formData = new FormData();
          formData.append('fullName', values.fullName);
          formData.append('email', values.email);
          formData.append('password', values.password);
          formData.append('confirmPassword', values.confirmPassword);
          formData.append('otp', values.otp);
          formData.append('yourLocation', values.yourLocation);
          formData.append('yourDestination', values.yourDestination);
          formData.append(
            'userId',
            String(completeSignUp.createdUserId) as string
          );
          // formData.append('joinedAs', values.joinedAs as string);
          const result = await signUpWithCredentials(formData);

          if (result.status === 200) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });
            setLoading(false);
            router.push('/onboarding', { locale });
          }

          if (result.status === 400) {
            toast.error('Something went wrong!');
            setLoading(false);
            router.replace('/sign-up', { locale });
            router.refresh();
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
        router.replace('/sign-up', { locale });
        router.refresh();
      }
    }
  );

  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
}
