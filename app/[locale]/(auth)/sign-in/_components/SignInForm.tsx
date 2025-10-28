'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserLoginValues } from '@/lib/validations/auth.schema';

import { ThemeModeToggle } from '@/components/shared/theme-mode-toggle';
import { Link } from '@/i18n/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const isDev = process.env.NODE_ENV === 'development';

export default function SignInForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext<UserLoginValues>();

  return (
    <fieldset className='space-y-6'>
      <div className='space-y-2'>
        <legend className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground'>
          Login
        </legend>
        <p className='text-xs sm:text-sm font-semibold text-muted-foreground'>
          Kindly Fill The Credential To Proceed
        </p>
      </div>

      {isDev ? <ThemeModeToggle /> : null}

      <div className={'space-y-4'}>
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  autoComplete='email'
                  placeholder='someone@example.com'
                  {...field}
                />
              </FormControl>
              {errors ? (
                <ErrorMessage
                  errors={errors}
                  name='email'
                  render={({ message }) => (
                    <p className='text-xs text-destructive'>{message}</p>
                  )}
                />
              ) : (
                <FormDescription>
                  We will send you a verification code to this email.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'flex w-full items-center justify-between'}>
                Password
                <Link
                  href={'/forgot-password'}
                  className={
                    'text-xs md:text-sm text-muted-foreground underline hover:no-underline'
                  }>
                  Forgot Password ?
                </Link>
              </FormLabel>
              <FormControl className={''}>
                <div className='relative'>
                  <Input
                    type={isShowPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder='********'
                    {...field}
                    ref={(e) => {
                      field.ref(e);
                      passwordRef.current = e;
                    }}
                  />

                  <Button
                    type='button'
                    size={'icon'}
                    variant={'ghost'}
                    className={
                      'absolute right-3 top-1/2 -translate-y-1/2 size-4 hover:cursor-pointer'
                    }
                    onClick={() => {
                      // const input = watch('password');
                      const inputType = passwordRef.current?.type;
                      if (inputType === 'password') {
                        if (passwordRef.current) {
                          passwordRef.current.type = 'text';
                          setIsShowPassword(true);
                        }
                      }
                      if (inputType === 'text') {
                        if (passwordRef.current) {
                          passwordRef.current.type = 'password';
                          setIsShowPassword(false);
                        }
                      }
                    }}>
                    {!isShowPassword ? (
                      <EyeClosed className={'stroke-muted-foreground'} />
                    ) : (
                      <EyeIcon className={'stroke-primary-500'} />
                    )}
                  </Button>
                </div>
              </FormControl>
              {errors ? (
                <ErrorMessage
                  errors={errors}
                  name='password'
                  render={({ message }) => (
                    <p className='text-xs text-destructive'>{message}</p>
                  )}
                />
              ) : (
                <FormDescription>
                  Your password must be at least 8 characters long.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </div>
    </fieldset>
  );
}
