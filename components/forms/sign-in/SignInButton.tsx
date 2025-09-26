import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function SignInButton() {
  return (
    <div className={'space-y-4'}>
      {/* CAPTCHA Widget */}
      <div id='clerk-captcha' className={'invisible'}></div>
      <Button type='submit' className={'w-full hover:cursor-pointer'}>
        Sign in
      </Button>

      <p
        className={
          'text-xs sm:text-sm md:text-base text-muted-foreground text-center'
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
