import { ThemeModeToggle } from '@/components/shared/theme-mode-toggle';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';
import { UserRegistrationValues } from '@/lib/validations/auth.schema';
import { ErrorMessage } from '@hookform/error-message';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// type Props = {
//   register: UseFormRegister<FieldValues<UserRegistrationValues>>;
//   errors: FieldErrors<FieldValues>;
// };

export default function CreateAccountForm() {
  const newAccountNewPasswordRef = useRef<HTMLInputElement>(null);
  const newAccountConfirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isShowNewAccountPassword, setIsShowNewAccountPassword] =
    useState(false);
  const [isShowNewAccountConfirmPassword, setIsShowNewAccountConfirmPassword] =
    useState(false);

  const {
    control,
    // register,
    formState: { errors },
  } = useFormContext<UserRegistrationValues>();

  return (
    // <div className={'inline-grid content-center w-full h-full'}>
    <fieldset className='space-y-4'>
      <div className={'space-y-2'}>
        <legend className='text-4xl font-semibold text-foreground'>
          Create an Account
        </legend>
        <p className={'text-sm font-medium'}>
          Kindly fill the credential to proceed
        </p>
      </div>

      <ThemeModeToggle />

      <FormField
        control={control}
        name='fullName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input
                type='text'
                autoComplete='given-name'
                placeholder='John Doe'
                {...field}
              />
            </FormControl>
            {!errors?.fullName?.message ? (
              <FormDescription>
                This is your public display name.
              </FormDescription>
            ) : null}
            <ErrorMessage
              errors={errors}
              name='fullName'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          </FormItem>
        )}
      />

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
            {!errors?.email?.message ? (
              <FormDescription>
                We never share your email with anyone else.
              </FormDescription>
            ) : null}
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
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={isShowNewAccountPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  placeholder='********'
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    newAccountNewPasswordRef.current = e;
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
                    const inputType = newAccountNewPasswordRef.current?.type;
                    if (inputType === 'password') {
                      if (newAccountNewPasswordRef.current) {
                        newAccountNewPasswordRef.current.type = 'text';
                        setIsShowNewAccountPassword(true);
                      }
                    }
                    if (inputType === 'text') {
                      if (newAccountNewPasswordRef.current) {
                        newAccountNewPasswordRef.current.type = 'password';
                        setIsShowNewAccountPassword(false);
                      }
                    }
                  }}>
                  {!isShowNewAccountPassword ? (
                    <EyeClosed className={'stroke-muted-foreground'} />
                  ) : (
                    <EyeIcon className={'stroke-primary-500'} />
                  )}
                </Button>
              </div>
            </FormControl>
            {!errors?.password?.message ? (
              <FormDescription>
                Password must be at least 8 characters long.
              </FormDescription>
            ) : null}
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

      <FormField
        control={control}
        name='confirmPassword'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={isShowNewAccountConfirmPassword ? 'text' : 'password'}
                  placeholder='********'
                  autoComplete='current-password'
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    newAccountConfirmPasswordRef.current = e;
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
                    const inputType =
                      newAccountConfirmPasswordRef.current?.type;
                    if (inputType === 'password') {
                      if (newAccountConfirmPasswordRef.current) {
                        newAccountConfirmPasswordRef.current.type = 'text';
                        setIsShowNewAccountConfirmPassword(true);
                      }
                    }
                    if (inputType === 'text') {
                      if (newAccountConfirmPasswordRef.current) {
                        newAccountConfirmPasswordRef.current.type = 'password';
                        setIsShowNewAccountConfirmPassword(false);
                      }
                    }
                  }}>
                  {!isShowNewAccountConfirmPassword ? (
                    <EyeClosed className={'stroke-muted-foreground'} />
                  ) : (
                    <EyeIcon className={'stroke-primary-500'} />
                  )}
                </Button>
              </div>
            </FormControl>
            {!errors?.confirmPassword?.message ? (
              <FormDescription>
                Password must be match with the above password.
              </FormDescription>
            ) : null}
            <ErrorMessage
              errors={errors}
              name='confirmPassword'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          </FormItem>
        )}
      />
    </fieldset>
  );
}
