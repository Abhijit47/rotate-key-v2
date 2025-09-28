import { ErrorMessage } from '@hookform/error-message';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { propertyRules } from '@/constants';
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
import SelectedItems from '../SelectedItems';

export default function PropertyRulesField() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<Pick<AddPropertyFormValues, 'propertyRules'>>();

  const selectedRules = watch('propertyRules') || [];

  return (
    <div className={'space-y-2'}>
      <FormField
        control={control}
        name='propertyRules'
        render={() => (
          <FormItem>
            <FormLabel className={'flex flex-wrap gap-1'}>
              <span>Rules & Regualtions</span>
              <small className='italic font-normal text-muted-foreground'>
                (Select some rules.)
              </small>
            </FormLabel>

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-between font-normal'>
                    <span>Select Rules</span>
                    <span>
                      <ChevronsUpDownIcon className='ml-auto h-4 w-4 opacity-50' />
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command className='rounded-lg border shadow-md md:min-w-4xl'>
                    <CommandInput placeholder='Type a command or search...' />
                    <CommandList className={'w-full p-2'}>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {propertyRules.map((rule) => (
                        <CommandGroup key={rule.id} heading={rule.categoryName}>
                          <Separator decorative />
                          {rule.categoryTypes.map((item) => (
                            <CommandItem asChild key={item.id}>
                              <FormField
                                control={control}
                                name='propertyRules'
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
              errors={errors.propertyRules}
              name='propertyRules'
              render={({ message }) => (
                <p className={'text-xs font-medium text-destructive'}>
                  {message}
                </p>
              )}
            />
          </FormItem>
        )}
      />

      <SelectedItems items={selectedRules} />
    </div>
  );
}
