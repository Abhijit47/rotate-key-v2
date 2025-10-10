import { useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { ErrorMessage } from '@hookform/error-message';
import CascadingInputs from '../CascadingInputs';

export default function PropertyInformationFields() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<
    Pick<
      AddPropertyFormValues,
      | 'streetAddress'
      | 'propertyArea'
      | 'propertyAreaUnit'
      | 'propertyDescription'
    >
  >();

  return (
    <>
      <FormField
        control={control}
        name='streetAddress'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <Input placeholder='Ex. 42/1 elm st.' {...field} />
            </FormControl>
            <ErrorMessage
              errors={errors}
              name='streetAddress'
              render={({ message }) => (
                <p className={'text-xs font-medium mt-1 text-brandRed-600'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      <CascadingInputs />

      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <FormField
          control={control}
          name='propertyArea'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area of property</FormLabel>
              <FormControl>
                <Input placeholder='Ex. 1000' {...field} />
              </FormControl>
              <ErrorMessage
                errors={errors}
                name='propertyArea'
                render={({ message }) => (
                  <p className={'text-xs font-medium mt-1 text-brandRed-600'}>
                    {message}
                  </p>
                )}
              />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='propertyAreaUnit'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit of property</FormLabel>
              <FormControl>
                <Input placeholder='Ex. sqft' {...field} />
              </FormControl>
              <ErrorMessage
                errors={errors}
                name='propertyAreaUnit'
                render={({ message }) => (
                  <p className={'text-xs font-medium mt-1 text-brandRed-600'}>
                    {message}
                  </p>
                )}
              />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name='propertyDescription'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={'flex items-center justify-between'}>
              <span>
                Description{' '}
                <small className='italic font-normal text-muted-foreground'>
                  (max 3000 characters)
                </small>
              </span>

              <Badge className={'text-[10px]'}>
                {watch('propertyDescription')?.length > 0
                  ? watch('propertyDescription').length
                  : 0}
              </Badge>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='Ex. This is a beautiful room with all the amenities you need.'
                {...field}
                className={'min-h-48'}
              />
            </FormControl>
            <ErrorMessage
              errors={errors}
              name='propertyDescription'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />
    </>
  );
}
