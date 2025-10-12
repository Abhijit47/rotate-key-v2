import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserRegistrationValues } from '@/lib/validations/auth.schema';

export default function UserInformationForm() {
  const form = useFormContext<UserRegistrationValues>();

  return (
    <fieldset className='space-y-4'>
      <div className={'space-y-2'}>
        <legend className='text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-foreground'>
          Finalize Your Account...
        </legend>
        <p className={'text-sm font-medium'}>
          Kindly provide a unique username to complete your registration
          process.
        </p>
      </div>
      <FormField
        control={form.control}
        name='userName'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={'flex flex-wrap items-center gap-1'}>
              <span className={'block'}>Username</span>
              <FormDescription className={'text-xs'}>
                (This will be your unique identity)
              </FormDescription>
            </FormLabel>
            <FormControl>
              <Input
                type='text'
                autoComplete='name'
                placeholder='johndoe123'
                {...field}
              />
            </FormControl>
            <ErrorMessage
              errors={form.formState.errors}
              name='userName'
              render={({ message }) => (
                <p className='text-xs text-destructive'>{message}</p>
              )}
            />
          </FormItem>
        )}
      />
    </fieldset>
    // <Form {...form}>
    //   <form
    //     onSubmit={form.handleSubmit(onSubmit)}
    //     className='inline-grid content-center w-full gap-4 h-full'>
    // </form>
    // </Form>
  );
}
