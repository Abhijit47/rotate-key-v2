import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useFormContext } from 'react-hook-form';

import { propertyAccomodations } from '@/constants';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { Fragment } from 'react';

export default function PropertyAccomodationField() {
  const { control, watch } =
    useFormContext<Pick<AddPropertyFormValues, 'propertyAccomodationType'>>();

  const selectedAccomodation = watch('propertyAccomodationType');

  return (
    <div>
      {selectedAccomodation && (
        <Badge className='rounded-full capitalize mb-2 text-[10px]'>
          {selectedAccomodation}
        </Badge>
      )}
      <FormField
        control={control}
        name='propertyAccomodationType'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={'flex items-center justify-between'}>
              <span>
                Accomodation type{' '}
                <small className='italic font-normal text-muted-foreground'>
                  (Select an accomodation type.)
                </small>
              </span>
            </FormLabel>
            <FormControl>
              <RadioGroup.Root
                onValueChange={field.onChange}
                defaultValue={field.value.toLocaleLowerCase()}
                className='w-full grid grid-cols-2 gap-4'>
                {propertyAccomodations.map((accomodation) => {
                  return (
                    <Fragment key={accomodation.id}>
                      {accomodation.categoryTypes.map((type) => {
                        return (
                          <FormControl key={type.id}>
                            <RadioGroup.Item
                              value={type.name.toLocaleLowerCase()}
                              className={cn(
                                'relative group ring-[1px] ring-border rounded py-2 px-3 text-start',
                                'data-[state=checked]:ring-2 data-[state=checked]:ring-primary-500'
                              )}>
                              <CircleCheck className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary-500 stroke-white group-data-[state=unchecked]:hidden' />
                              <type.icon className='mb-2.5 text-muted-foreground size-4' />
                              <span className='font-semibold tracking-tight'>
                                {type.name}
                              </span>
                              <p className='text-xs'>{type.description}</p>
                            </RadioGroup.Item>
                          </FormControl>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </RadioGroup.Root>
            </FormControl>

            <FormMessage className={'text-xs font-medium text-destructive'} />
          </FormItem>
        )}
      />
    </div>
  );
}
