import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { propertyTypes } from '@/constants';
import { useTheme } from 'next-themes';

export default function PropertyTypeField() {
  const { control } =
    useFormContext<Pick<AddPropertyFormValues, 'propertyType'>>();
  const { systemTheme } = useTheme();

  return (
    <FormField
      control={control}
      name='propertyType'
      render={({ field }) => (
        <FormItem>
          <FormLabel className={'flex flex-wrap gap-1'}>
            <span>Property type</span>
            <small className='italic font-normal text-muted-foreground'>
              (Select the type of property)
            </small>
          </FormLabel>

          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a property type' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectGroup key={type.id}>
                  <SelectLabel>
                    <Badge
                      variant={
                        systemTheme === 'dark' ? 'secondary' : 'default'
                      }>
                      {type.categoryName}
                    </Badge>
                  </SelectLabel>
                  <Separator />
                  {type.categoryTypes.map((propertyType) => (
                    <SelectItem
                      key={propertyType.id}
                      value={propertyType.name.toLowerCase()}>
                      <span>
                        <propertyType.icon className='mr-2 h-4 w-4' />
                      </span>
                      {propertyType.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <FormMessage className={'text-xs font-medium text-destructive'} />
        </FormItem>
      )}
    />
  );
}
