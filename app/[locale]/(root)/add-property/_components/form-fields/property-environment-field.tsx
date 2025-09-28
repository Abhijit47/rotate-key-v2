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
import { propertyEnvironments } from '@/constants';
import { ErrorMessage } from '@hookform/error-message';
import { useTheme } from 'next-themes';

export default function PropertyEnvironmentField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<Pick<AddPropertyFormValues, 'propertyEnvironment'>>();

  const { systemTheme } = useTheme();

  return (
    <FormField
      control={control}
      name='propertyEnvironment'
      render={({ field }) => (
        <FormItem>
          <FormLabel className={'flex flex-wrap gap-1'}>
            <span>Environment type</span>
            <small className='italic font-normal text-muted-foreground'>
              (Select the environment type)
            </small>
          </FormLabel>

          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a environment type' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {propertyEnvironments.map((environment) => (
                <SelectGroup key={environment.id}>
                  <SelectLabel>
                    <Badge
                      variant={
                        systemTheme === 'dark' ? 'secondary' : 'default'
                      }>
                      {environment.categoryName}
                    </Badge>
                  </SelectLabel>
                  <Separator />

                  {environment.categoryTypes.map((environmentType) => (
                    <SelectItem
                      key={environmentType.id}
                      value={environmentType.name.toLowerCase()}>
                      <span>
                        <environmentType.icon className='mr-2 h-4 w-4' />
                      </span>
                      {environmentType.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <ErrorMessage
            errors={errors}
            name='propertyEnvironment'
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
