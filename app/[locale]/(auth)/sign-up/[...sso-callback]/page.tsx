import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

import { routing } from '@/i18n/routing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Sign up SSO Callback',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function SSOCallback() {
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow.
  return (
    <>
      <div id='clerk-captcha' className={'hidden'}></div>
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl={'/sign-up-complete'}
        continueSignUpUrl={'/sign-up-complete'}
      />
      <div className='flex flex-col items-center justify-center h-dvh gap-4 md:gap-6'>
        <h1 className='text-lg md:text-xl lg:text-2xl font-bold text-primary-500'>
          Sign up Redirecting...
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
