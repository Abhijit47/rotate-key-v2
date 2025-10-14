import { ErrorMessage } from '@hookform/error-message';
import { Separator } from '@radix-ui/react-separator';
import { useTheme } from 'next-themes';
import { useFormContext } from 'react-hook-form';

import { AddPropertyFormValues } from '@/lib/validations/property.schema';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { propertyOwnerships } from '@/constants';

export default function PropertyOwnershipField() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<Pick<AddPropertyFormValues, 'propertyOwnership'>>();

  const { systemTheme } = useTheme();

  return (
    <FormField
      control={control}
      name='propertyOwnership'
      render={({ field }) => (
        <FormItem>
          <FormLabel className={'flex flex-wrap gap-1'}>
            <span>Ownership type</span>
            <small className='italic font-normal text-muted-foreground'>
              (Select the ownership type)
            </small>
          </FormLabel>

          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className='w-full'>
                {watch('propertyOwnership') ? (
                  <span className={'capitalize'}>
                    {watch('propertyOwnership')}
                  </span>
                ) : (
                  <SelectValue placeholder='Select a ownership type' />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {propertyOwnerships.map((ownership) => (
                <SelectGroup key={ownership.id}>
                  <SelectLabel>
                    <Badge
                      variant={
                        systemTheme === 'dark' ? 'secondary' : 'default'
                      }>
                      {ownership.categoryName}
                    </Badge>
                  </SelectLabel>
                  <Separator className={'my-1'} />
                  {ownership.categoryTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name.toLowerCase()}>
                      <span>
                        <type.icon className='mr-2 h-4 w-4' />
                      </span>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <ErrorMessage
            errors={errors}
            name='propertyOwnership'
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
