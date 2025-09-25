import Link from 'next/link';
import SignUpButtons from './SignUpButtons';

export default function SignUpStart() {
  return (
    <div
      className={
        'grid w-full h-full justify-items-center gap-4 md:gap-6 lg:gap-12'
      }>
      <hgroup className={'text-center space-y-2'}>
        <h3 className={'text-4xl font-semibold text-secondary-700'}>
          Create an Account
        </h3>
        <p className={'text-sm md:text-base'}>
          Kindly choose a method to create an account.
        </p>
      </hgroup>

      <SignUpButtons />

      <div className={'space-y-2'}>
        <p>
          Already have an account ?{' '}
          <Link
            href='/auth/sign-in'
            className={'text-primary-500 hover:underline'}>
            Sign In
          </Link>
        </p>
        <p className={'text-xs text-secondary-500'}>
          *By signing up, you agree to our{' '}
          <Link
            href={'terms-and-conditions'}
            className={'underline hover:no-underline font-medium'}>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href={'privacy-policy'}
            className={'underline hover:no-underline font-medium'}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
