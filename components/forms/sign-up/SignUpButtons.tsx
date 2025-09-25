'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { CircleCheck, MailIcon } from 'lucide-react';

import { FlatColorIconsGoogle, LogosFacebook } from '@/assets/icons';
import { useAuthContext } from '@/contexts/auth-context';
import { useOAuthSignIn } from '@/hooks/useOAuthSignIn';

import { cn } from '@/lib/utils';

export default function SignUpButtons() {
  const { setCurrentStep } = useAuthContext();
  const { handleSignIn, loading } = useOAuthSignIn();

  // className={'grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6'}
  return (
    <div>
      <RadioGroup.Root
        // defaultValue={options[0].value}
        className='w-full grid grid-cols-3 gap-4'>
        <RadioGroup.Item
          disabled={loading}
          onClick={() => handleSignIn('oauth_facebook')}
          value={'Continue with Facebook'}
          className={cn(
            'relative group ring-[1px] ring-border rounded py-2 px-3 text-start',
            'data-[state=checked]:ring-2 data-[state=checked]:ring-primary-500 disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:ring-gray-300 disabled:cursor-not-allowed',
            'data-[state=unchecked]:hover:ring-2 data-[state=unchecked]:hover:ring-primary-500 data-[state=unchecked]:hover:bg-primary-50 data-[state=unchecked]:hover:text-primary-500 data-[state=unchecked]:hover:cursor-pointer'
          )}>
          <CircleCheck className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary-500 stroke-white group-data-[state=unchecked]:hidden' />
          <LogosFacebook className='mb-2.5 text-muted-foreground size-4 md:size-6' />
          <span className='font-semibold tracking-tight'>Facebook</span>
          <p className='text-xs'>Continue with Facebook</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          onClick={() => handleSignIn('oauth_google')}
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
      {/* <div
        className={
          'aspect-square inline-grid w-full h-full rounded-lg ring-1 ring-primary-500'
        }>
        <div id='clerk-captcha' className={'invisible hidden'}></div>
        <Button
          disabled={loading}
          className='inline-flex flex-col w-full h-full justify-center items-center gap-1 lg:gap-2 rounded-md bg-transparent ring-1 ring-primary-500 py-1.5 px-3 text-sm md:text-sm/4 lg:text-sm/6 font-medium lg:font-semibold text-primary-500 shadow-inner shadow-secondary-500/10 overflow-hidden focus:outline-none data-[hover]:bg-primary-500 data-[hover]:text-primary-50 data-[hover]:ring-primary-50 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:ring-gray-300'
          onClick={() => handleSignIn('oauth_facebook')}>
          <span>
            <LogosFacebook className={'size-4 sm:size-6 lg:size-8'} />
          </span>
          <span>Continue with Facebook</span>
        </Button>
      </div>
      <div
        className={
          'aspect-square inline-grid w-full h-full rounded-lg ring-1 ring-primary-500'
        }>
        <div id='clerk-captcha' className={'invisible hidden'}></div>
        <Button
          disabled={loading}
          className='inline-flex flex-col w-full h-full justify-center items-center gap-1 lg:gap-2 rounded-md bg-transparent ring-1 ring-primary-500 py-1.5 px-3 text-sm md:text-sm/4 lg:text-sm/6 font-medium lg:font-semibold text-primary-500 shadow-inner shadow-secondary-500/10 overflow-hidden focus:outline-none data-[hover]:bg-primary-500 data-[hover]:text-primary-50 data-[hover]:ring-primary-50 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:ring-gray-300'
          onClick={() => handleSignIn('oauth_google')}>
          <FlatColorIconsGoogle className={'size-4 sm:size-6 lg:size-8'} />
          <span>Continue with Google</span>
        </Button>
      </div>
      <div
        className={
          'aspect-square inline-grid w-full h-full rounded-lg ring-1 ring-primary-500'
        }>
        <Button
          disabled={loading}
          className='inline-flex flex-col w-full h-full justify-center items-center gap-1 lg:gap-2 rounded-md bg-transparent ring-1 ring-primary-500 py-1.5 px-3 text-sm md:text-sm/4 lg:text-sm/6 font-medium lg:font-semibold text-primary-500 shadow-inner shadow-secondary-500/10 overflow-hidden focus:outline-none data-[hover]:bg-primary-500 data-[hover]:text-primary-50 data-[hover]:ring-primary-50 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:ring-gray-300'
          onClick={() => {
            setCurrentStep(1);
          }}>
          <Mail className={'size-4 sm:size-6 lg:size-8'} />
          <span>Continue with Email</span>
        </Button>
      </div> */}
    </div>
  );
}
