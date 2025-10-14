import { ErrorMessage } from '@hookform/error-message';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { propertyAccessibilities } from '@/constants';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import SelectedItems from '../SelectedItems';

export default function PropertyAccessibilitiesField() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<Pick<AddPropertyFormValues, 'propertyAccessibilities'>>();

  const selectedAccessibilities = watch('propertyAccessibilities') || [];

  return (
    <div className={'space-y-2'}>
      <FormField
        control={control}
        name='propertyAccessibilities'
        render={() => (
          <FormItem>
            <FormLabel className={'flex flex-wrap gap-1'}>
              <span>Accessibilities</span>
              <small className='italic font-normal text-muted-foreground'>
                (Select some accessibilities.)
              </small>
            </FormLabel>

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-full justify-between font-normal text-ellipsis overflow-hidden'
                    )}>
                    {watch('propertyAccessibilities')?.length ? (
                      <span className={'capitalize text-xs sm:text-sm'}>
                        {watch('propertyAccessibilities').join(' | ')}
                      </span>
                    ) : (
                      <>
                        <span>Select Accessibilities</span>
                        <span>
                          <ChevronsUpDownIcon className='ml-auto h-4 w-4 opacity-50' />
                        </span>
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command className='rounded-lg border shadow-md min-w-auto sm:min-w-md md:min-w-2xl'>
                    <CommandInput placeholder='Type a command or search...' />
                    <CommandList className={'w-full p-2'}>
                      <CommandEmpty>No results found.</CommandEmpty>

                      {propertyAccessibilities.map((accessibility) => (
                        <CommandGroup
                          key={accessibility.id}
                          heading={accessibility.categoryName}>
                          <Separator decorative />

                          {accessibility.categoryTypes.map((item) => (
                            <CommandItem asChild key={item.id}>
                              <FormField
                                control={control}
                                name='propertyAccessibilities'
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className='flex flex-row items-start space-x-2 space-y-0 py-2'>
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.name.toLocaleLowerCase()
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item.name.toLocaleLowerCase(),
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !==
                                                      item.name.toLocaleLowerCase()
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className='text-sm font-normal'>
                                        {item.name}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                      <CommandSeparator />
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>

            <ErrorMessage
              errors={errors.propertyAccessibilities}
              name='propertyAccessibilities'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      <SelectedItems items={selectedAccessibilities} />
    </div>
  );
}
