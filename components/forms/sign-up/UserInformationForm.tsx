// import { cn } from '@/lib/utils';
import { UserRegistrationValues } from '@/lib/validations/auth.schema';

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
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

export default function UserInformationForm() {
  const {
    control,
    // register,
    formState: { errors },
  } = useFormContext<UserRegistrationValues>();

  return (
    // <div className={'inline-grid content-center w-full h-full'}>
    <fieldset className='space-y-6 bg-tertiary-50'>
      {/* <legend className='text-2xl font-semibold text-secondary-700'>
        Let&apos;s get to know each other!
      </legend> */}
      <div className={'space-y-2'}>
        <legend className='text-4xl font-semibold text-secondary-700'>
          Let&apos;s get to know each other!
        </legend>
        <p className={'text-sm font-medium'}>
          We need to know a little bit about you before we can get started.
        </p>
      </div>

      <FormField
        control={control}
        name='yourLocation'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Where are you from ?</FormLabel>
            <FormControl>
              <Input
                type='text'
                placeholder='Your Location City, Country'
                autoComplete='address-level1'
                {...field}
              />
            </FormControl>
            {!errors?.yourLocation?.message ? (
              <FormDescription className={'text-xs text-secondary-500'}>
                So we can share profiles of member who are interested in
                visiting your areas
              </FormDescription>
            ) : null}
            <ErrorMessage
              errors={errors}
              name='yourLocation'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='yourDestination'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Where would you like to go?</FormLabel>
            <FormControl>
              <Input
                type='text'
                placeholder='Your Destination City, Country'
                autoComplete='address-level1'
                {...field}
              />
            </FormControl>
            {!errors?.yourDestination?.message ? (
              <FormDescription className={'text-xs text-secondary-500'}>
                So we can display homes in this area that might interest you.
              </FormDescription>
            ) : null}
            <ErrorMessage
              errors={errors}
              name='yourDestination'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          </FormItem>
        )}
      />

      {/* <FormField
        control={control}
        name='joinedAs'
        render={({ field }) => (
          <FormItem>
            <FormLabel>What would you like to be called ?</FormLabel>
            <FormControl>
              <Select
                onValueChange={(e) => {
                  field.onChange(e.toLocaleLowerCase());
                }}
                defaultValue={field.value}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a your role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select your role in the community</SelectLabel>
                    <SelectItem value='owner'>Owner</SelectItem>
                    <SelectItem value='customer'>Customer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <ErrorMessage
              errors={errors}
              name='joinedAs'
              render={({ message }) => (
                <p className='text-xs text-red-500'>{message}</p>
              )}
            />
          </FormItem>
        )}
      /> */}

      {/* <div>
        <label className='text-sm/6 font-medium text-secondary-500'>
          Where are you from ?
        </label>
        {!errors?.yourLocation?.message ? (
          <p className={'text-xs text-secondary-500'}>
            So we can share profiles of member who are interested in visiting
            your areas
          </p>
        ) : null}
        <input
          className={cn(
            'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
          )}
          type='text'
          placeholder='Your Location City, Country'
          autoComplete='address-level1'
          required
          {...register('yourLocation')}
        />
        <ErrorMessage
          errors={errors}
          name='yourLocation'
          render={({ message }) => (
            <p className='text-xs text-red-500'>{message}</p>
          )}
        />
      </div> */}
      {/* <div>
        <label className='text-sm/6 font-medium text-secondary-500'>
          Where would you like to go?
        </label>
        {!errors?.yourDestination?.message ? (
          <p className={'text-xs text-secondary-500'}>
            So we can display homes in this area that might interest you.
          </p>
        ) : null}
        <input
          className={cn(
            'mt-3 relative block w-full rounded-lg ring-1 ring-secondary-200 bg-tertiary-50 py-1.5 px-3 text-sm/6 text-secondary-700',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-300'
          )}
          type='text'
          placeholder='Your Destination City, Country'
          autoComplete='address-level1'
          required
          {...register('yourDestination')}
        />
        <ErrorMessage
          errors={errors}
          name='yourDestination'
          render={({ message }) => (
            <p className='text-xs text-red-500'>{message}</p>
          )}
        />
      </div> */}
      {/* <Button className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-secondary-500/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-tertiary-50'>
          Create your account
        </Button> */}
    </fieldset>
    // </div>
  );
}
