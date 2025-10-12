import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth-context';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { Link } from '@/i18n/navigation';
import { ForgotPasswordValues } from '@/lib/validations/auth.schema';
import { useFormContext } from 'react-hook-form';

export default function ForgotPasswordButtonHandler() {
  const { forgotPasswordStep, setForgotPasswordStep } = useAuthContext();
  const { formState, getFieldState, getValues } =
    useFormContext<ForgotPasswordValues>();
  const { isSecondFactor, onResetPasswordGenerateOTP, isLoading } =
    useForgotPassword();

  const { isDirty: isEmail } = getFieldState('email', formState);

  if (forgotPasswordStep === 3) {
    return (
      <div className={'space-y-4'}>
        {/* CAPTCHA Widget */}
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          type='submit'
          disabled={isLoading}
          className='w-full hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          // className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-500 py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-secondary-500/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-tertiary-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-primary-800 disabled:text-white'
        >
          Submit and Continue
        </Button>
      </div>
    );
  }

  if (forgotPasswordStep === 2) {
    return (
      <div className={'space-y-4'}>
        {/* CAPTCHA Widget */}
        <div id='clerk-captcha' className={'hidden'}></div>
        <Button
          // type='submit'
          disabled={isLoading}
          className='w-full hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          // className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-500 py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-secondary-500/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-tertiary-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-primary-800 disabled:text-white'
          onClick={() => setForgotPasswordStep(3)}>
          {!isSecondFactor || isLoading ? 'Continue' : 'Resetting...'}
        </Button>
      </div>
    );
  }

  return (
    <div className={'space-y-4'}>
      {/* CAPTCHA Widget */}
      <div id='clerk-captcha' className={'hidden'}></div>
      <Button
        type='submit'
        disabled={isLoading}
        className='w-full hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        // className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-500 py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-secondary-500/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-tertiary-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-primary-800 disabled:text-white'
        {...(isEmail && {
          onClick: () =>
            onResetPasswordGenerateOTP(
              getValues('email'),
              setForgotPasswordStep
            ),
        })}>
        {formState.isLoading || isLoading ? 'Processing...' : 'Continue'}
      </Button>

      <p className={'text-xs sm:text-sm text-muted-foreground text-center'}>
        Don&apos;t forgot password ?{' '}
        <Link
          href='/sign-in'
          className='text-primary-500 hover:underline focus:outline-none data-[focus]:outline-1 data-[focus]:outline-primary-300'>
          Sign in
        </Link>
      </p>
    </div>
  );
}
