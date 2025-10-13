'use client';

import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { useOAuthSignIn } from '@/hooks/useOAuthSignIn';
import { toast } from 'sonner';

const isDev = process.env.NODE_ENV === 'development';

export default function OAuthSignInButtons() {
  const { handleSignIn, isLoginPending, isSignInLoaded, isSignUpLoaded } =
    useOAuthSignIn();

  return (
    <div className={'space-y-4'}>
      <div>
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          type='button'
          disabled={isLoginPending || !isSignInLoaded || !isSignUpLoaded}
          className='w-full hover:cursor-pointer'
          onClick={
            // FIXME: Disable OAuth in production until we have a proper redirect URI setup
            !isDev
              ? () => toast.info('Coming soon!!!')
              : () => {
                  handleSignIn('oauth_google');
                  debugger;
                }
          }>
          <span>
            <IconBrandGoogle className={'size-4 md:size-6'} />
          </span>
          <span>Sign in with Google</span>
        </Button>
      </div>

      <div>
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          type='button'
          disabled={isLoginPending || !isSignInLoaded || !isSignUpLoaded}
          className='w-full hover:cursor-pointer'
          onClick={
            // FIXME: Disable OAuth in production until we have a proper redirect URI setup
            !isDev
              ? () => toast.info('Coming Soon')
              : () => {
                  handleSignIn('oauth_facebook');
                  debugger;
                }
          }>
          <span>
            <IconBrandFacebook className={'size-4 md:size-6'} />
          </span>
          <span>Sign in with Facebook</span>
        </Button>
      </div>
    </div>
  );
}
