'use client';

import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { useAuthContext } from '@/contexts/auth-context';
import SignUpStart from './sign-up-start';

const CreateAccountForm = dynamic(() => import('./create-account-form'), {
  ssr: false,
  loading: () => (
    <div className={'space-y-4'}>
      <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div className={'space-y-2'}>
          <Skeleton className='h-3 w-3/12 animate-pulse' />
          <Skeleton className='h-9 w-full animate-pulse' />
        </div>
        <div className={'space-y-2'}>
          <Skeleton className='h-3 w-3/12 animate-pulse' />
          <Skeleton className='h-9 w-full animate-pulse' />
        </div>
      </div>
      <div className={'space-y-2'}>
        <Skeleton className='h-3 w-3/12 animate-pulse' />
        <Skeleton className='h-9 w-full animate-pulse' />
      </div>
      <div className={'space-y-2'}>
        <Skeleton className='h-3 w-3/12 animate-pulse' />
        <Skeleton className='h-9 w-full animate-pulse' />
        <Skeleton className='h-1.5 w-4/12 animate-pulse' />
      </div>
      <div className={'space-y-2'}>
        <Skeleton className='h-3 w-3/12 animate-pulse' />
        <Skeleton className='h-9 w-full animate-pulse' />
        <Skeleton className='h-1.5 w-4/12 animate-pulse' />
      </div>
      <div className={'space-y-2'}>
        <Skeleton className='h-3 w-3/12 animate-pulse' />
        <Skeleton className='h-9 w-full animate-pulse' />
        <Skeleton className='h-1.5 w-4/12 animate-pulse' />
      </div>
      <Skeleton className='h-9 w-full animate-pulse' />
    </div>
  ),
});

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: () => (
    <div className={'space-y-4'}>
      <Skeleton className='h-3 w-3/4 animate-pulse' />
      <div className={'flex gap-4'}>
        <div className={'flex items-center gap-2 lg:gap-4'}>
          <Skeleton className='size-6 sm:size-8 lg:size-12 animate-pulse' />
          <Skeleton className='size-6 sm:size-8 lg:size-12 animate-pulse' />
        </div>
        <div className={'flex items-center gap-2 lg:gap-4'}>
          <Skeleton className='size-6 sm:size-8 lg:size-12 animate-pulse' />
          <Skeleton className='size-6 sm:size-8 lg:size-12 animate-pulse' />
        </div>
        <div className={'flex items-center gap-2 lg:gap-4'}>
          <Skeleton className='size-6 sm:size-8 lg:size-12 animate-pulse' />
          <Skeleton className='size-6 sm:size-8 lg:size-12 animate-pulse' />
        </div>
      </div>
      <Skeleton className='h-9 w-full animate-pulse' />
    </div>
  ),
});

const UserInformationForm = dynamic(() => import('./user-information-form'), {
  ssr: false,
  loading: () => (
    <div className={'space-y-4'}>
      <div className={'space-y-2'}>
        <Skeleton className='h-3 w-3/4 animate-pulse' />
        <Skeleton className='h-9 w-full animate-pulse' />
      </div>
      <Skeleton className='h-9 w-full animate-pulse' />
    </div>
  ),
});

export default function RegistrationFormStep() {
  // const { setValue } = useFormContext<UserRegistrationValues>();
  const { currentStep } = useAuthContext();
  // const [onOTP, setOnOTP] = useState<string>('');
  // const router = useRouter();

  // setValue('otp', onOTP);

  switch (currentStep) {
    case 0:
      return <SignUpStart />;

    case 1:
      return (
        <>
          <CreateAccountForm />
          {/* {isDev ? (
            <Button
              className='absolute top-0 right-0'
              onClick={() => {
                setCurrentStep(2);
              }}>
              Continue
            </Button>
          ) : null} */}
        </>
      );

    case 2:
      return (
        <>
          <OTPForm />
          {/* {isDev ? (
            <Button
              className='absolute top-0 right-0'
              onClick={() => {
                setCurrentStep(3);
              }}>
              Continue
            </Button>
          ) : null} */}
        </>
      );

    case 3:
      return (
        <>
          <UserInformationForm />
          {/* {isDev ? (
            <Button
              variant={'outline'}
              className='absolute top-0 right-0'
              onClick={() => {
                alert('sign up successful');
                router.push('/onboarding');
              }}>
              Create Account
            </Button>
          ) : null} */}
        </>
      );

    default:
      return null;
  }
}
