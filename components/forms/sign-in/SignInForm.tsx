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

import { ErrorMessage } from '@hookform/error-message';
import { EyeClosed, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function SignInForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext<UserLoginValues>();

  return (
    <fieldset className='space-y-6 bg-tertiary-50'>
      <div className='space-y-2'>
        <legend className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-secondary-700'>
          Login
        </legend>
        <p className='text-xs sm:text-sm font-semibold text-secondary-700'>
          Kindly Fill The Credential To Proceed
        </p>
      </div>

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
              <FormDescription>
                We will send you a verification code to this email.
              </FormDescription>
              <ErrorMessage
                errors={errors}
                name='email'
                render={({ message }) => (
                  <p className='text-xs text-red-500'>{message}</p>
                )}
              />
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
                  href={'/auth/forgot-password'}
                  className={
                    'text-xs md:text-sm text-secondary-500 underline hover:no-underline'
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
                      'absolute right-3 top-1/2 -translate-y-1/2 size-4 text-secondary-500 hover:cursor-pointer'
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
                      <EyeClosed className={'text-secondary-500'} />
                    ) : (
                      <EyeIcon className={'text-primary-500'} />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Your password must be at least 8 characters long.
              </FormDescription>
              <ErrorMessage
                errors={errors}
                name='password'
                render={({ message }) => (
                  <p className='text-xs text-red-500'>{message}</p>
                )}
              />
            </FormItem>
          )}
        />
        {/* <div>
          <label className='text-sm/6 font-medium text-secondary-500'>
            Email
          </label>
          <input
            className={cn(
              'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
            )}
            type='email'
            placeholder='someone@gmail.com'
            required
            {...register('email')}
          />
          <ErrorMessage
            errors={errors}
            name='email'
            render={({ message }) => (
              <p className='text-xs text-red-500'>{message}</p>
            )}
          />
        </div>
        <div className={'space-y-2'}>
          <div className={'w-full flex items-center justify-between'}>
            <label className='text-sm/6 font-medium text-secondary-500'>
              Password
            </label>

            <Link
              href={'/auth/forgot-password'}
              className={
                'text-xs md:text-sm text-secondary-500 underline hover:no-underline'
              }>
              Forgot Password ?
            </Link>
          </div>
          <input
            className={cn(
              'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
            )}
            type='password'
            placeholder='********'
            required
            {...register('password')}
          />
          {!errors?.password ? (
            <p className={'text-xs text-secondary-500'}>
              Password must be at least 8 characters long
            </p>
          ) : (
            <ErrorMessage
              errors={errors}
              name='password'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          )}
        </div> */}
      </div>
    </fieldset>
  );
}
