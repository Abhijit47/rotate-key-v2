'use client';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';
import { CalendarIcon, Trash2, Upload } from 'lucide-react';
import { CircleFlag } from 'react-circle-flags';
import { useForm } from 'react-hook-form';
import {
  defaultCountries,
  parseCountry,
  ParsedCountry,
} from 'react-international-phone';
import { toast } from 'sonner';
import { z } from 'zod';

import { MultiSelect } from '@/components/extension/multi-select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { hostLanguages } from '@/constants';
import { cn } from '@/lib/utils';
// import { HiOutlineUpload } from 'react-icons/hi';
// import { HiOutlineTrash } from 'react-icons/hi2';
import { useState } from 'react';
import SubmitButton from '../../[[...profile]]/_components/submit-button';
import { PdfUploadForm } from './document-upload';

// eslint-disable-next-line
const DOCUMENT_TYPES = [
  'application/pdf',
  'application/x-pdf',
  'application/acrobat',
  'applications/vnd.pdf',
  'text/pdf',
  'text/x-pdf',
  'image/pdf',
];

const DOCUMENT_SIZE = 1024 * 1024 * 5; // 5MB
// eslint-disable-next-line
const DOCUMENT_SIZE_ERROR = `File size should be less than ${
  DOCUMENT_SIZE / 1024 / 1024
}MB`;

const userConfidentialSchema = z.object({
  birthdate: z.date().refine((date) => date <= new Date(), {
    message: 'Birthdate must be in the past',
  }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  spokenLanguages: z.array(z.string()).min(1, {
    message: 'At least one language is required',
  }),
  livingCountry: z.string().min(1, { message: 'Country is required' }),
  about: z.string().min(1, { message: 'About is required' }).max(500, {
    message: 'About must be less than 500 characters',
  }),
  documents: z.string().optional(),
});

export type UserConfidentialInformationFormValues = z.infer<
  typeof userConfidentialSchema
>;

const languages = hostLanguages.map((lang) => {
  return {
    label: lang.language,
    value: lang.language,
    flag: lang.flag,
  };
});

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const countries = defaultCountries.map((c) => {
  const country = parseCountry(c);

  return country;
});

export default function ConfidentialInformationForm() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<ParsedCountry>(() => {
    return countries.find((c) => c.iso2 === 'in') as ParsedCountry;
  });

  const form = useForm<UserConfidentialInformationFormValues>({
    resolver: zodResolver(userConfidentialSchema),
    defaultValues: {
      birthdate: addDays(new Date(), -365 * 18),
      // Set default birthdate to 18 years ago
      phoneNumber: '',
      spokenLanguages: ['hindi', 'english'],
      // Set default languages to Hindi and English
      livingCountry: '',
      about: '',
      documents: undefined,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: UserConfidentialInformationFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Simulate a network request
    // Handle form submission here
    // console.log('Form submitted:', data);
    toast(<pre>{JSON.stringify(data, null, 2)}</pre>);
  };

  return (
    <>
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          {isDev ? (
            <div>
              <p>{JSON.stringify(form.watch('birthdate'))}</p>
              <p>{JSON.stringify(form.watch('phoneNumber'))}</p>
              <p>{JSON.stringify(form.watch('spokenLanguages'))}</p>
              <p>{JSON.stringify(form.watch('livingCountry'))}</p>
              <p>{JSON.stringify(form.watch('about'))}</p>
            </div>
          ) : null}

          <div className={'inline-grid w-full gap-2 lg:gap-4'}>
            <div className={'inline-grid grid-cols-2 gap-4'}>
              <FormField
                control={form.control}
                name='birthdate'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Your Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal min-h-10',
                              !field.value && 'text-muted-foreground'
                            )}>
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='min-w-full p-0' align='center'>
                        <Calendar
                          className={'min-w-full'}
                          autoFocus
                          mode='single'
                          defaultMonth={new Date()}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            // date > new Date() || date > new Date('1900-01-01')
                            date > new Date() || date < new Date('1900-01-01')
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    {!form.formState.errors.birthdate ? (
                      <FormDescription>
                        Please select your birthdate.
                      </FormDescription>
                    ) : (
                      <ErrorMessage
                        errors={form.formState.errors}
                        name='birthdate'
                        render={({ message }) => (
                          <p
                            className={
                              'text-xs font-medium mt-1 text-destructive'
                            }>
                            {message}
                          </p>
                        )}
                      />
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Phone</FormLabel>
                    <FormControl>
                      <Input
                        className={'min-h-10'}
                        placeholder='your phone number'
                        {...field}
                      />
                    </FormControl>
                    {!form.formState.errors.phoneNumber ? (
                      <FormDescription>
                        Please select your phone number.
                      </FormDescription>
                    ) : (
                      <ErrorMessage
                        errors={form.formState.errors}
                        name='phoneNumber'
                        render={({ message }) => (
                          <p
                            className={
                              'text-xs font-medium mt-1 text-brandRed-600'
                            }>
                            {message}
                          </p>
                        )}
                      />
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className={'inline-grid grid-cols-2 gap-4'}>
              <FormField
                control={form.control}
                name='spokenLanguages'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select your preferred languages</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={languages}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder='Select languages'
                        variant='inverted'
                        animation={0}
                        maxCount={3}
                        className='capitalize'
                      />
                    </FormControl>
                    {!form.formState.errors.spokenLanguages ? (
                      <FormDescription>
                        Please select your preferred languages.
                      </FormDescription>
                    ) : (
                      <ErrorMessage
                        errors={form.formState.errors}
                        name='languages'
                        render={({ message }) => (
                          <p
                            className={
                              'text-xs font-medium mt-1 text-brandRed-600'
                            }>
                            {message}
                          </p>
                        )}
                      />
                    )}
                  </FormItem>
                )}
              />

              <div className={'space-y-2'}>
                <Label htmlFor='your-country'>Your country</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={'w-full justify-start py-2 min-h-10'}>
                      <CircleFlag
                        countryCode={country?.iso2 || 'in'}
                        className='size-4'
                      />
                      <span>{country?.name}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    id='your-country'
                    className={'w-full p-0'}
                    align='start'>
                    <Command className='rounded-lg border shadow-md w-full'>
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
                                    setCountry(country);
                                    form.setValue(
                                      'livingCountry',
                                      country.name.toLocaleLowerCase(),
                                      {
                                        shouldValidate: true,
                                      }
                                    );
                                    setOpen((prev) => !prev);
                                  }}>
                                  <CircleFlag
                                    countryCode={country.iso2}
                                    className='size-4'
                                  />
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
                {!form.formState.errors.livingCountry ? (
                  <FormDescription>
                    Please select your country of residence.
                  </FormDescription>
                ) : (
                  <ErrorMessage
                    errors={form.formState.errors}
                    name='country'
                    render={({ message }) => (
                      <p
                        className={
                          'text-xs font-medium mt-1 text-brandRed-600'
                        }>
                        {message}
                      </p>
                    )}
                  />
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name='about'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      className={'min-h-30'}
                      placeholder='Write something about yourself...'
                      {...field}
                    />
                  </FormControl>
                  {!form.formState.errors.about ? (
                    <FormDescription>
                      Please tell us about yourself.
                    </FormDescription>
                  ) : (
                    <ErrorMessage
                      errors={form.formState.errors}
                      name='about'
                      render={({ message }) => (
                        <p
                          className={
                            'text-xs font-medium mt-1 text-brandRed-600'
                          }>
                          {message}
                        </p>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />

            <div className={'col-span-full lg:col-span-1 w-full'}>
              <div
                className={
                  'inline-grid w-full content-center justify-items-center gap-2'
                }>
                <div className={'space-y-2 w-full'}>
                  <label
                    htmlFor='upload-document'
                    className='text-sm/6 font-medium text-secondary-500 inline-flex flex-col items-center justify-center gap-2 border-2 border-dashed border-secondary-300 rounded-lg h-36 cursor-pointer w-full'>
                    <span>
                      <Upload className={'size-4'} />
                    </span>
                    <span className={'block text-base'}>Upload Document</span>
                    <span className={'block text-sm'}>
                      (for profile verification)
                    </span>
                  </label>
                  <span
                    className={'block text-sm text-center text-secondary-500'}>
                    *Kindly upload in PDF format
                  </span>
                  <input
                    id='upload-document'
                    type='file'
                    accept='application/pdf'
                    className={cn(
                      'mt-3 block w-full rounded-lg border-none bg-secondary-500/15 py-1.5 px-3 text-sm/6 text-secondary-500',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 hidden'
                    )}
                  />
                  <div
                    className={
                      'w-full inline-flex items-center justify-center'
                    }>
                    <Button
                    // className='text-sm/6 font-medium text-secondary-500 inline-flex items-center gap-2 ring-1 ring-secondary-400 rounded-lg px-4 py-2 cursor-pointer'
                    >
                      <span>
                        <Trash2 className={'size-4'} />
                      </span>
                      <span>Upload your Document</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Button className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-600 py-1.5 px-3 text-sm/6 font-semibold text-tertiary-50 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-700 data-[focus]:outline-1 data-[focus]:outline-tertiary-50'>
          Save changes
        </Button> */}
          <SubmitButton>Update Confidential Information</SubmitButton>
        </form>
      </Form>

      <PdfUploadForm />
    </>
  );
}
