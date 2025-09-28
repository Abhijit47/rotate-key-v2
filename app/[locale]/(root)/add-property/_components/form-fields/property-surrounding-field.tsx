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
import { propertySurroundings } from '@/constants';
import { ErrorMessage } from '@hookform/error-message';
import { useTheme } from 'next-themes';

export default function PropertySurroundingField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<Pick<AddPropertyFormValues, 'propertySurrounding'>>();

  const { systemTheme } = useTheme();

  return (
    <FormField
      control={control}
      name='propertySurrounding'
      render={({ field }) => (
        <FormItem>
          <FormLabel className={'flex flex-wrap gap-1'}>
            <span>Surrounding type</span>
            <small className='italic font-normal text-muted-foreground'>
              (Select the surrounding type)
            </small>
          </FormLabel>

          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a surrounding type' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {propertySurroundings.map((surrounding) => (
                <SelectGroup key={surrounding.id}>
                  <SelectLabel>
                    <Badge
                      variant={
                        systemTheme === 'dark' ? 'secondary' : 'default'
                      }>
                      {surrounding.categoryName}
                    </Badge>
                  </SelectLabel>
                  <Separator />

                  {surrounding.categoryTypes.map((surroundingType) => (
                    <SelectItem
                      key={surroundingType.id}
                      value={surroundingType.name.toLowerCase()}>
                      <span>
                        <surroundingType.icon className='mr-2 h-4 w-4' />
                      </span>
                      {surroundingType.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <ErrorMessage
            errors={errors}
            name='propertySurrounding'
            render={({ message }) => (
              <p className={'text-xs font-medium text-destructive'}>
                {message}
              </p>
            )}
          />
          {/* {errors.propertySurrounding ? (
          ) : (
            <FormDescription>
              Select the surrounding type of property you are listing.
            </FormDescription>
          )} */}
        </FormItem>
      )}
    />
  );
}
