'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { CircleCheck, MailIcon } from 'lucide-react';

import { FlatColorIconsGoogle, LogosFacebook } from '@/assets/icons';
import { useAuthContext } from '@/contexts/auth-context';
import { useOAuthSignIn } from '@/hooks/useOAuthSignIn';

import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const isDev = process.env.NODE_ENV === 'development';

export default function SignUpButtons() {
  const { setCurrentStep } = useAuthContext();
  const { handleSignIn, isLoginPending, isSignInLoaded, isSignUpLoaded } =
    useOAuthSignIn();

  return (
    <div className={'w-full'}>
      <RadioGroup.Root
        disabled={isLoginPending || !isSignInLoaded || !isSignUpLoaded}
        className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <RadioGroup.Item
          disabled={isLoginPending || !isSignInLoaded || !isSignUpLoaded}
          onClick={
            //  FIXME: Disable OAuth in production until we have a proper redirect URI setup
            !isDev
              ? () => toast.info('Coming soon!!!')
              : () => {
                  handleSignIn('oauth_facebook');
                  debugger;
                }
          }
          value={'Continue with Facebook'}
          className={cn(
            'relative group ring-[1px] w-full ring-border rounded py-2 px-3 text-start',
            'data-[state=checked]:ring-2 data-[state=checked]:ring-primary-500 disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:ring-gray-300 disabled:cursor-not-allowed',
            'data-[state=unchecked]:hover:ring-2 data-[state=unchecked]:hover:ring-primary-500 data-[state=unchecked]:hover:bg-primary-50 data-[state=unchecked]:hover:text-primary-500 data-[state=unchecked]:hover:cursor-pointer'
          )}>
          <CircleCheck className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary-500 stroke-white group-data-[state=unchecked]:hidden' />
          <LogosFacebook className='mb-2.5 text-muted-foreground size-4 md:size-6' />
          <span className='font-semibold tracking-tight'>Facebook</span>
          <p className='text-xs'>Continue with Facebook</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          disabled={isLoginPending || !isSignInLoaded || !isSignUpLoaded}
          onClick={
            // FIXME: Disable OAuth in production until we have a proper redirect URI setup
            !isDev
              ? () => toast.info('Coming soon!!!')
              : () => {
                  handleSignIn('oauth_google');
                  debugger;
                }
          }
          value={'Continue with Google'}
          className={cn(
            'relative group ring-[1px] ring-border rounded py-2 px-3 text-start',
            'data-[state=checked]:ring-2 data-[state=checked]:ring-primary-500 disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:ring-gray-300 disabled:cursor-not-allowed',
            'data-[state=unchecked]:hover:ring-2 data-[state=unchecked]:hover:ring-primary-500 data-[state=unchecked]:hover:bg-primary-50 data-[state=unchecked]:hover:text-primary-500 data-[state=unchecked]:hover:cursor-pointer'
          )}>
          <CircleCheck className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary-500 stroke-white group-data-[state=unchecked]:hidden' />
          <FlatColorIconsGoogle className='mb-2.5 text-muted-foreground size-4 md:size-6' />
          <span className='font-semibold tracking-tight'>Google</span>
          <p className='text-xs'>Continue with Google</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          disabled={isLoginPending || !isSignInLoaded || !isSignUpLoaded}
          onClick={() => setCurrentStep(1)}
          value={'Continue with Email'}
          className={cn(
            'relative group ring-[1px] ring-border rounded py-2 px-3 text-start',
            'data-[state=checked]:ring-2 data-[state=checked]:ring-primary-500 disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:ring-gray-300 disabled:cursor-not-allowed',
            'data-[state=unchecked]:hover:ring-2 data-[state=unchecked]:hover:ring-primary-500 data-[state=unchecked]:hover:bg-primary-50 data-[state=unchecked]:hover:text-primary-500 data-[state=unchecked]:hover:cursor-pointer'
          )}>
          <CircleCheck className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary-500 stroke-white group-data-[state=unchecked]:hidden' />
          <MailIcon className='mb-2.5 text-muted-foreground size-4 md:size-6' />
          <span className='font-semibold tracking-tight'>Email</span>
          <p className='text-xs'>Continue with Email</p>
        </RadioGroup.Item>
      </RadioGroup.Root>
    </div>
  );
}
