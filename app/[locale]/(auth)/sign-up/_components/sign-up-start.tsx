import { Link } from '@/i18n/navigation';
import { LazySignUpButtons } from '.';

export default function SignUpStart() {
  return (
    <div
      className={
        'grid w-full h-full justify-items-center gap-4 md:gap-6 lg:gap-12'
      }>
      <hgroup className={'text-center space-y-2'}>
        <h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-foreground'>
          Let&apos;s Get Started
        </h3>
        <p className={'text-sm md:text-base text-muted-foreground'}>
          Kindly choose a method to create an account.
        </p>
      </hgroup>

      <LazySignUpButtons />

      <div className={'space-y-2'}>
        <p className={'text-muted-foreground'}>
          Already have an account ?{' '}
          <Link href='/sign-in' className={'text-primary-500 hover:underline'}>
            Sign In
          </Link>
        </p>
        <p className={'text-xs text-muted-foreground'}>
          *By signing up, you agree to our{' '}
          <Link
            href={'/terms-and-conditions'}
            className={'underline hover:no-underline font-medium'}>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href={'/privacy-policy'}
            className={'underline hover:no-underline font-medium'}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
