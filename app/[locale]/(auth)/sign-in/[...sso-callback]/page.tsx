import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function SSOCallback() {
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow.
  return (
    <>
      <div id='clerk-captcha' className={'hidden'}></div>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={'/sign-in'}
        signUpFallbackRedirectUrl={'/sign-up'}
        continueSignUpUrl={'/auth/sign-up-complete'}
      />
      <div className='flex flex-col items-center justify-center h-dvh gap-4 md:gap-6'>
        <h1 className='text-lg md:text-xl lg:text-2xl font-bold text-primary-500'>
          Redirecting...
        </h1>
        <p className='mt-4 text-gray-600 text-sm md:text-base lg:text-lg'>
          Please wait while we redirect you.
        </p>

        <div className={'inline-flex items-center justify-center'}>
          <Loader2 className='text-primary-500 mt-4 size-4 md:size-6 lg:size-8 animate-spin' />
        </div>
      </div>
    </>
  );
}
