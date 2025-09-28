// import { differenceInDays, endOfWeek, startOfWeek } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { addDays, differenceInCalendarDays, format } from 'date-fns';
import { useState } from 'react';
// import { getDefaultClassNames } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { AddPropertyFormValues } from '@/lib/validations/property.schema';
import { IconCalendarWeek } from '@tabler/icons-react';
import { enIN } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { SetValueConfig, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

export default function PropertyCheckinAndCheckOutField({
  className,
}: {
  className?: string;
}) {
  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: addDays(new Date(), 30),
  // });
  // const [checkin, setCheckin] = useState<DateRange | undefined>();
  // const defaultClassNames = getDefaultClassNames();
  // const [defaultMonth, setDefaultMonth] = useState(today);
  // const [selectedWeek, setSelectedWeek] = useState<DateRange | undefined>();

  const [isPopOverOpen, setIsPopOverOpen] = useState<boolean>(false);

  const today = new Date();
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<
    Pick<AddPropertyFormValues, 'staysDateRange' | 'staysDurationInDays'>
  >();

  const locale = useLocale();

  function togglePopover() {
    setIsPopOverOpen((prev) => !prev);
  }

  return (
    <fieldset className={'w-full'}>
      <FormField
        control={control}
        name='staysDateRange'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel className={'flex flex-wrap gap-1'}>
              <span>Check-in and check-out</span>
              <small className='italic font-normal text-muted-foreground'>
                (Date range for check-in and check-out.)
              </small>
            </FormLabel>

            <div className={cn('grid gap-2 w-full', className)}>
              <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id='date'
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}>
                      <IconCalendarWeek className='mr-2 h-4 w-4' />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Choose a date range</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className='w-full p-0' align='center'>
                  <div className='rounded-md border'>
                    <Calendar
                      classNames={{
                        root: 'w-full md:min-w-2xl lg:min-w-4xl',
                      }}
                      autoFocus
                      mode='range'
                      defaultMonth={today}
                      selected={field.value}
                      onSelect={(date) => {
                        // setDate(date);
                        if (!date) {
                          return toast.info('Select a start date!!!', {
                            duration: 2000,
                          });
                        }
                        field.onChange({
                          from: date.from,
                          to: date.to,
                        });

                        if (date.from && date.to) {
                          if (
                            differenceInCalendarDays(date.to, date.from) < 1
                          ) {
                            return toast.error('Select a valid date range!!!', {
                              duration: 2000,
                            });
                          }
                        }

                        setValue(
                          'staysDurationInDays',
                          date.to && date.from
                            ? differenceInCalendarDays(
                                date.to,
                                date.from
                              ).toString()
                            : ''
                        );
                      }}
                      numberOfMonths={2}
                      reverseMonths={false}
                      hidden={today}
                      modifiers={{
                        booked: [
                          new Date(2025, 5, 8),
                          new Date(2025, 5, 9),
                          new Date(2025, 5, 10),
                          {
                            from: new Date(2025, 5, 15),
                            to: new Date(2025, 5, 20),
                          },
                        ],
                        disabled: [
                          { before: new Date() },
                          // {
                          //   after: new Date(new Date().setDate(today.getDate() - 1)),
                          // },
                        ],
                      }}
                      lang={locale}
                      locale={enIN}
                      max={365}
                      min={1}
                      footer={<CalendarFooter togglePopover={togglePopover} />}
                      timeZone='Asia/Calcutta'
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </FormItem>
        )}
      />

      {Object.keys(errors.staysDateRange || {}).length > 0 && (
        <p className={'text-xs font-medium mt-2 text-destructive'}>
          Date range is required.
        </p>
      )}

      {/* {errors.staysDateRange?.from?.message && (
        <p className={'text-xs font-medium text-destructive'}>
          {errors.staysDateRange?.from?.message}
        </p>
      )}
      {errors.staysDateRange?.to?.message && (
        <p className={'text-xs font-medium text-destructive'}>
          {errors.staysDateRange?.to?.message}
        </p>
      )} */}
    </fieldset>
  );
}

function CalendarFooter({ togglePopover }: { togglePopover: () => void }) {
  const { setValue, watch } =
    useFormContext<
      Pick<AddPropertyFormValues, 'staysDateRange' | 'staysDurationInDays'>
    >();
  const { systemTheme } = useTheme();

  // const today = new Date();
  const setValuesOptions: SetValueConfig = {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  };

  function handleResetClick() {
    // setCheckin(undefined);
    setValue(
      'staysDateRange',
      {
        from: new Date(),
        to: addDays(new Date(), 30),
      },
      setValuesOptions
    );
    setValue('staysDurationInDays', '', setValuesOptions);
    // setDefaultMonth(today);
    togglePopover();
  }

  let footer = (
    <div className={'space-y-2'}>
      <Separator />
      <p className={'text-sm text-center font-medium'}>
        Please pick one or more days.
      </p>
    </div>
  );

  if (watch('staysDateRange')?.from && watch('staysDateRange')?.to)
    footer = (
      <div>
        <Separator className={'my-2'} />
        <div className={'inline-flex items-center justify-center w-full gap-2'}>
          <Badge
            variant={systemTheme === 'dark' ? 'secondary' : 'default'}
            className={'text-xs font-medium'}>
            You selected{' '}
            {differenceInCalendarDays(
              watch('staysDateRange').to,
              watch('staysDateRange').from
            )}{' '}
            days.
          </Badge>
          <Badge
            variant={'destructive'}
            className='cursor-pointer text-xs font-medium'
            onClick={handleResetClick}>
            Reset
          </Badge>
        </div>
      </div>
    );

  return footer;
}
