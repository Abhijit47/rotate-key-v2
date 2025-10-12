'use client';

import { Button } from '@/components/ui/button';
import { useOAuthSignIn } from '@/hooks/useOAuthSignIn';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

export default function OAuthSignInButtons() {
  const { handleSignIn, loading } = useOAuthSignIn();

  return (
    <div className={'space-y-4'}>
      <div>
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          disabled={loading}
          className='w-full hover:cursor-pointer'
          onClick={() => handleSignIn('oauth_google')}>
          <span>
            <IconBrandGoogle className={'size-4 md:size-6'} />
          </span>
          <span>Sign in with Google</span>
        </Button>
      </div>

      <div>
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          disabled={loading}
          className='w-full hover:cursor-pointer'
          onClick={() => handleSignIn('oauth_facebook')}>
          <span>
            <IconBrandFacebook className={'size-4 md:size-6'} />
          </span>
          <span>Sign in with Facebook</span>
        </Button>
      </div>
    </div>
  );
}
