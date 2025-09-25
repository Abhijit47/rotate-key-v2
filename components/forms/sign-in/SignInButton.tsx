import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
// import Link from 'next/link';

export default function SignInButton() {
  return (
    <div className={'space-y-4'}>
      {/* CAPTCHA Widget */}
      <div id='clerk-captcha' className={'invisible'}></div>
      <Button
        type='submit'
        className={'w-full hover:cursor-pointer'}
        // className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-500 py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-secondary-500/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-tertiary-50'
      >
        Sign in
      </Button>

      <p
        className={
          'text-xs sm:text-sm md:text-base text-secondary-500 text-center'
        }>
        Don&apos;t have an account?{' '}
        <Link
          href='/sign-up'
          className='text-primary-500 hover:underline focus:outline-none data-[focus]:outline-1 data-[focus]:outline-primary-300'>
          Sign up
        </Link>
      </p>
    </div>
  );
}
