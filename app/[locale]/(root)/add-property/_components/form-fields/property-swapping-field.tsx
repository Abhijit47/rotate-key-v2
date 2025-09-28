import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { useFormContext } from 'react-hook-form';

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
import { Separator } from '@/components/ui/separator';
import { propertySwappings } from '@/constants';
import { ErrorMessage } from '@hookform/error-message';
import { useTheme } from 'next-themes';

export default function PropertySwappingField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<Pick<AddPropertyFormValues, 'propertySwapping'>>();

  const { systemTheme } = useTheme();

  return (
    <FormField
      control={control}
      name='propertySwapping'
      render={({ field }) => (
        <FormItem>
          <FormLabel className={'flex flex-wrap gap-1'}>
            <span>Swapping type</span>
            <small className='italic font-normal text-muted-foreground'>
              (Select the swapping type)
            </small>
          </FormLabel>

          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a property type' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {propertySwappings.map((swap) => (
                <SelectGroup key={swap.id}>
                  <SelectLabel>
                    <Badge
                      variant={
                        systemTheme === 'dark' ? 'secondary' : 'default'
                      }>
                      {swap.categoryName}
                    </Badge>
                  </SelectLabel>
                  <Separator />
                  {swap.categoryTypes.map((swapping) => (
                    <SelectItem
                      key={swapping.id}
                      value={swapping.name.toLowerCase()}>
                      <span>
                        <swapping.icon className='mr-2 h-4 w-4' />
                      </span>
                      {swapping.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <ErrorMessage
            errors={errors}
            name='propertySwapping'
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
