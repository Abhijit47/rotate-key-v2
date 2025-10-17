import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuthContext } from '@/contexts/auth-context';
import { useRouter } from '@/i18n/navigation';
// import { signUpWithCredentials } from '@/lib/auth.actions';
import { signUpWithCredentials } from '@/lib/auth.actions';
import {
  userRegistrationSchema,
  UserRegistrationValues,
} from '@/lib/validations/auth.schema';

// import { ClerkAPIError } from '@clerk/types';
// import { OAuthStrategy } from '@clerk/types';
// import { useRouter } from 'next/navigation';

const isDev = process.env.NODE_ENV === 'development';

export function useSignUpForm() {
  // const [loading, setLoading] = useState<boolean>(false);

  const [isPendingOTP, startTransitionOTP] = useTransition();
  const [isPendingSubmit, startTransitionSubmit] = useTransition();

  const { signUp, isLoaded, setActive } = useSignUp();

  const { setCurrentStep } = useAuthContext();

  const router = useRouter();
  const locale = useLocale();

  const methods = useForm<UserRegistrationValues>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      // fullName: '',
      // email: '', // joe+clerk_test@gmail.com
      // password: '',
      // confirmPassword: '',
      // fullName: 'jhon',
      firstName: isDev ? 'jhon' : '',
      lastName: isDev ? 'doe' : '',
      fullName: isDev ? 'jhon doe' : '',
      userName: '', // jhon_doe_123
      email: isDev ? 'jhon+clerk_test@gmail.com' : '', // joe+clerk_test@gmail.com
      password: isDev ? 'Admin123852456' : '',
      confirmPassword: isDev ? 'Admin123852456' : '',
      otp: '',
      // yourLocation: '',
      // yourDestination: '',
      // joinedAs: undefined,
    },
    mode: 'onChange',
  });

  // Generate OTP
  function onGenerateOTP(
    firstName: string,
    lastName: string,
    // userName: string,
    email: string,
    password: string
    // onNext: React.Dispatch<React.SetStateAction<number>>
  ) {
    if (!isLoaded) return;

    startTransitionOTP(async () => {
      try {
        toast.loading('Sending OTP...', {
          id: 'otp',
          position: 'top-center',
          duration: 1000,
          closeButton: false,
        });

        const signUpAttempt = await signUp.create({
          firstName: firstName,
          lastName: lastName,
          password: password,
          // username: 'N/A',
          emailAddress: email,
          unsafeMetadata: {
            role: 'guest',
            isOnboarded: false,
            plan: 'free',
          },
        });

        console.log({ signUpAttempt });

        signUp.hasPassword = true;
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });
        methods.clearErrors();

        toast.info('OTP sent to your email 🥳', {
          position: 'top-center',
          closeButton: false,
        });
        setCurrentStep((prev) => prev + 1);
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          // console.log({ error });
          // methods.setError('userName', {
          //   type: 'manual',
          //   message: error.message,
          // });
          error.errors.forEach((err) => {
            if (err.code) {
              toast.error(err.longMessage);
            }
          });
        } else {
          toast.error('An error occurred, please try again');
        }
        router.replace('/sign-up', { locale });
      } finally {
        toast.dismiss('otp');
      }
    });
  }

  // Final step of sign up with Email and Password
  const onHandleSubmit = methods.handleSubmit(
    (values: UserRegistrationValues) => {
      if (!isLoaded) return;

      startTransitionSubmit(async () => {
        try {
          await signUp.update({
            username: values.userName,
          });

          // setLoading(true);
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: values.otp,
          });

          if (completeSignUp.status !== 'complete') {
            // console.log({ completeSignUp });
            toast.error('Something went wrong!');
            // setLoading(false);
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
            // formData.append('yourLocation', values.yourLocation);
            // formData.append('yourDestination', values.yourDestination);
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
              // setLoading(false);
              router.push('/sign-up-complete', { locale });
            }

            if (result.status === 400) {
              toast.error('Something went wrong!');
              // setLoading(false);
              router.replace('/sign-up', { locale });
              router.refresh();
            }
          }
        } catch (error) {
          if (isClerkAPIResponseError(error)) {
            // console.log({ error });
            error.errors.forEach((err) => {
              if (err.code) {
                toast.error(err.longMessage);
              }
            });
          } else {
            toast.error('An error occurred, please try again');
          }
          // setLoading(false);
          router.replace('/sign-up', { locale });
          router.refresh();
        }
      });
    }
  );

  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    isPendingOTP,
    isPendingSubmit,
  };
}
