'use client';

import * as React from 'react';

import { CircleFlag } from 'react-circle-flags';
import { useFormContext } from 'react-hook-form';
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { ErrorMessage } from '@hookform/error-message';

export default function CustomPhoneInput() {
  const [open, setOpen] = React.useState(false);

  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<Pick<AddPropertyFormValues, 'propertyOwnerPhone'>>();

  const {
    inputValue,
    handlePhoneValueChange,
    inputRef,
    country,
    setCountry,
    // phone,
  } = usePhoneInput({
    defaultCountry: 'in',
    value: watch('propertyOwnerPhone'),
    // charAfterDialCode: ' ',
    defaultMask: '(...)-...-....',
    forceDialCode: true,
    countries: defaultCountries,
    onChange: (data) => {
      // console.log(data);
      setValue('propertyOwnerPhone', data.phone, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
  });

  return (
    <div className={'space-y-2'}>
      <Label htmlFor='propertyOwnerPhone' className={'flex flex-wrap gap-1'}>
        <span>Phone Number</span>
        <small className='italic font-normal text-muted-foreground'>
          (Mention the phone number of the owner.)
        </small>
      </Label>
      <div className={'flex items-center w-full gap-1'}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              <CircleFlag countryCode={country.iso2} className='size-4' />
              <span>(+ {country.dialCode})</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className={'w-full p-0'} align='start'>
            <Command className='rounded-lg border shadow-md md:min-w-[450px]'>
              <CommandInput placeholder='Type a command or search...' />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading='Country codes'>
                  {defaultCountries.map((c) => {
                    const country = parseCountry(c);

                    return (
                      <CommandItem asChild key={country.iso2}>
                        <Button
                          variant={'ghost'}
                          className='w-full justify-start my-0.5'
                          onClick={() => {
                            setCountry(country.iso2);
                            setOpen(false);
                          }}>
                          <CircleFlag
                            countryCode={country.iso2}
                            className='size-4'
                          />
                          <span>+ ({country.dialCode})</span>
                          <span>{country.name}</span>
                        </Button>
                      </CommandItem>
                    );
                  })}
                  <CommandSeparator />
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Input
          id='phone'
          type='tel'
          name='phone'
          value={inputValue}
          onChange={handlePhoneValueChange}
          ref={inputRef}
          placeholder='Phone number'
        />
      </div>
      <ErrorMessage
        errors={errors.propertyOwnerPhone}
        name='propertyOwnerPhone'
        render={({ message }) => (
          <p className={'text-xs font-medium mt-1 text-brandRed-600'}>
            {message}
          </p>
        )}
      />
    </div>
  );
}
