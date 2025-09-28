'use client';

import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// import CustomPhoneInput from '../CustomPhoneInput';
import CustomPhoneInput from '../CustomPhoneInput';

export default function PropertyOwnerDeatilsFields() {
  // const [open, setOpen] = React.useState(false);

  const {
    control,
    formState: { errors },
  } =
    useFormContext<
      Pick<
        AddPropertyFormValues,
        'propertyOwnerName' | 'propertyOwnerEmail' | 'propertyOwnerPhone'
      >
    >();

  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <FormField
        control={control}
        name='propertyOwnerName'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={'flex flex-wrap gap-1'}>
              <span>Full name</span>
              <small className='italic font-normal text-muted-foreground'>
                (Mention the name of the owner.)
              </small>
            </FormLabel>
            <FormControl>
              <Input
                type='text'
                autoComplete='given-name'
                placeholder='Ex. jhon doe'
                {...field}
              />
            </FormControl>

            <ErrorMessage
              errors={errors.propertyOwnerEmail}
              name='propertyOwnerName'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='propertyOwnerEmail'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={'flex flex-wrap gap-1'}>
              <span>Email</span>
              <small className='italic font-normal text-muted-foreground'>
                (Mention the email of the owner.)
              </small>
            </FormLabel>
            <FormControl>
              <Input
                type='email'
                autoComplete='email'
                placeholder='Ex. someone@email.com'
                {...field}
              />
            </FormControl>

            <ErrorMessage
              errors={errors.propertyOwnerEmail}
              name='propertyOwnerEmail'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      {/* <FormField
        control={control}
        name='propertyOwnerPhone'
        render={({ field }) => (
          <FormItem className='flex flex-col items-start'>
            <FormLabel className='text-left'>Phone Number</FormLabel>
            <FormControl className='w-full'>
              <PhoneInput placeholder='Enter a phone number' {...field} />
            </FormControl>
            <FormDescription className='text-left'>
              Enter a phone number
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      /> */}

      <div className={'col-span-full'}>
        <CustomPhoneInput />
      </div>
    </div>
  );
}
