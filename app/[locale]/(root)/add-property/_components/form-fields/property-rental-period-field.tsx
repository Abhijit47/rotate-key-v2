import { ErrorMessage } from '@hookform/error-message';
import { useTheme } from 'next-themes';
import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { propertyRentalPeriods } from '@/constants';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';

export default function PropertyRentalPeriodField() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<Pick<AddPropertyFormValues, 'propertyRentalTypes'>>();

  const { systemTheme } = useTheme();

  return (
    <FormField
      control={control}
      name={'propertyRentalTypes'}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={'flex flex-wrap gap-1'}>
            <span>Rent period</span>
            <small className='italic font-normal text-muted-foreground'>
              (Select the rental type)
            </small>
          </FormLabel>

          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className='w-full'>
                {watch('propertyRentalTypes') ? (
                  <span className={'capitalize'}>
                    {watch('propertyRentalTypes')}
                  </span>
                ) : (
                  <SelectValue placeholder='Select a property type' />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {propertyRentalPeriods.map((period) => {
                return (
                  <Fragment key={period.id}>
                    {period.categoryTypes.map((rentalType) => (
                      <SelectGroup key={rentalType.id}>
                        <SelectLabel>
                          <Badge
                            variant={
                              systemTheme === 'dark' ? 'secondary' : 'default'
                            }>
                            {rentalType.name}
                          </Badge>
                        </SelectLabel>
                        <Separator />
                        {rentalType.rentType.map((type) => (
                          <SelectItem
                            key={type.id}
                            value={type.name.toLowerCase()}>
                            <span className={'text-sm font-medium block'}>
                              {type.name}
                            </span>
                            <span className={'block text-xs font-normal'}>
                              ({type.description})
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </Fragment>
                );
              })}
            </SelectContent>
          </Select>

          <ErrorMessage
            errors={errors}
            name='propertyRentalTypes'
            render={({ message }) => (
              <p className={'text-xs font-medium text-destructive'}>
                {message}
              </p>
            )}
          />
        </FormItem>
      )}
    />
  );
}
