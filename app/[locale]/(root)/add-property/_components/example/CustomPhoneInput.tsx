'use client';

import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import libphonenumber from 'google-libphonenumber';
import { CircleFlag } from 'react-circle-flags';
import { useForm } from 'react-hook-form';
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import { z } from 'zod';

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
import { toast } from 'sonner';

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const formSchema = z.object({
  phone: z
    .e164({
      error: 'Invalid mobile number',
    })
    .optional(),

  // z.coerce
  // .string()
  // .optional()
  // .superRefine((data, ctx) => {
  //   if (data) {
  //     try {
  //       const phoneNumber = phoneUtil.parse(data);
  //       if (!phoneUtil.isPossibleNumber(phoneNumber)) {
  //         ctx.addIssue({
  //           code: "invalid_format",
  //           format:"e164",
  //           message: 'Invalid mobile number',
  //         });
  //       }
  //     } catch (error) {
  //       console.warn(error, "Couldn't validate phone number");
  //       ctx.addIssue({
  //         code: "custom",
  //         message: 'Invalid mobile number',
  //       });
  //       return;
  //     }
  //   }
  // }),
});

type FormSchemaValue = z.infer<typeof formSchema>;

export default function CustomPhoneInput() {
  const [open, setOpen] = React.useState(false);

  const { setValue, watch, handleSubmit } = useForm<FormSchemaValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '+91 9999911111',
    },
  });

  const {
    inputValue,
    handlePhoneValueChange,
    inputRef,
    country,
    setCountry,
    phone,
  } = usePhoneInput({
    defaultCountry: 'in',
    value: watch('phone'),
    // charAfterDialCode: ' ',
    defaultMask: '(...)-...-....',
    forceDialCode: true,
    countries: defaultCountries,
    onChange: (data) => {
      // console.log(data);
      setValue('phone', data.phone);
    },
  });

  function onSubmit(data: FormSchemaValue) {
    // console.log(data);
    const phoneNumber = phoneUtil.parse(data.phone);

    if (phoneUtil.isValidNumber(phoneNumber)) {
      console.log(phoneUtil.isValidNumber(phoneNumber));
      toast.success(
        <pre>
          {JSON.stringify(phoneUtil.isValidNumber(phoneNumber), null, 2)}
        </pre>
      );
      toast.success(<pre>{JSON.stringify(phone, null, 2)}</pre>);
    } else {
      console.log(phoneUtil.isValidNumber(phoneNumber));
      toast.error(
        <pre>
          {JSON.stringify(phoneUtil.isValidNumber(phoneNumber), null, 2)}
        </pre>
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'space-y-4'}>
      <div className={'space-y-2'}>
        <Label htmlFor='propertyOwnerPhone'>Phone Number</Label>
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
      </div>
      <Button type='submit'>Submit</Button>
      <div className={'text-sm text-red-500'}>
        {
          formSchema.safeParse({ phone: watch('phone') }).error?.format()
            ._errors[0]
        }
      </div>
    </form>
  );
}
