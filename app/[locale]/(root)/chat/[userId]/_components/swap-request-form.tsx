import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { useSwapUnswapContext } from '@/contexts/swap-unswap-context';
import { createBookingRequestV6 } from '@/lib/booking-request';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Fragment, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

// const stringToDate = z.codec(
//   z.iso.datetime(), // input schema: ISO date string
//   z.date(), // output schema: Date object
//   {
//     decode: (isoString) => new Date(isoString), // ISO string → Date
//     encode: (date) => date.toISOString(), // Date → ISO string
//   }
// );

const swapRequestFormSchema = z.object({
  propertyId: z.uuidv4({
    version: 'v4',
  }),
  startDate: z.date({
    error: 'Invalid start date format',
  }),
  endDate: z.date({
    error: 'Invalid end date format',
  }),
  guests: z
    .string()
    .length(1, 'Please select number of guests')
    .min(1, 'Please select number of guests')
    .max(10, 'Maximum 10 characters are allowed'),
  matchId: z.uuidv4('Select a valid match to proceed with swap'),
});

type SwapRequestFormData = z.infer<typeof swapRequestFormSchema>;

// const swapRequestJSONSchema = z.toJSONSchema(swapRequestFormSchema);

export default function SwapRequestForm() {
  const [isPending, startTransition] = useTransition();
  const [showStartDatePopup, setShowStartDatePopup] = useState<boolean>(false);
  const [showEndDatePopup, setShowEndDatePopup] = useState<boolean>(false);
  const { isLoading, data, onToggleSwapModal } = useSwapUnswapContext();
  const form = useForm<SwapRequestFormData>({
    resolver: zodResolver(swapRequestFormSchema),
    defaultValues: {
      propertyId: '',
      startDate: new Date(),
      endDate: new Date(),
      guests: data?.data?.[0].connectionRequest.guests.toString() || '1',
      matchId: data?.data?.[0]?.connectionRequest.matchId || '',
    },
    mode: 'onChange',
  });

  // 2. Define a submit handler.
  function onSubmit(values: SwapRequestFormData) {
    startTransition(async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      const formData = new FormData();
      formData.append('propertyId', values.propertyId);
      formData.append('startDate', values.startDate.toISOString());
      formData.append('endDate', values.endDate.toISOString());
      formData.append('guests', values.guests);
      formData.append('matchId', values.matchId);

      const result = await createBookingRequestV6(formData);
      if (!result.success) {
        toast.error(result.message);
        onToggleSwapModal(); // Close the modal on error as well
        return;
      } else {
        form.reset();
        toast.success(result.message);
        onToggleSwapModal(); // Close the modal on success
        return;
      }

      // toast('You submitted the following values', {
      //   description: (
      //     <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4 space-y-4 overflow-scroll'>
      //       <code className='text-white'>
      //         {JSON.stringify(values, null, 2)}
      //       </code>
      //     </pre>
      //   ),
      // });
      // return;
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            disabled={isLoading || isPending}
            control={form.control}
            name='propertyId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Property ({data?.count})</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full h-12! flex items-center whitespace-normal text-start'>
                      <SelectValue
                        className={'self-center'}
                        placeholder='Choose a property'
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className={'sm:max-w-[528px]'}>
                    <SelectGroup>
                      <SelectLabel id='properties'>
                        Select the property you want to swap
                      </SelectLabel>

                      {data === undefined || data?.data === undefined ? (
                        <SelectItem value='loading'>Loading...</SelectItem>
                      ) : (
                        <>
                          {data.data.map((item) => (
                            <Fragment key={item.property.id}>
                              <SelectItem
                                value={item.property.id}
                                className={'flex-wrap gap-2'}>
                                <span
                                  className={'flex text-xs items-center gap-1'}>
                                  <Badge>{item.property.type}</Badge>{' '}
                                  <Separator
                                    orientation='vertical'
                                    className='h-4 mt-1'
                                  />
                                  Address: {item.property.address}, City:{' '}
                                  {item.property.city}, State:{' '}
                                  {item.property.state} , Country:{' '}
                                  {item.property.country}, Zipcode:{' '}
                                  {item.property.zipcode}
                                </span>
                              </SelectItem>
                              <Separator />
                            </Fragment>
                          ))}
                        </>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'}>
            <FormField
              disabled={isLoading || isPending}
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Start Date</FormLabel>
                  <Popover
                    open={showStartDatePopup}
                    onOpenChange={setShowStartDatePopup}>
                    <PopoverTrigger asChild disabled={isLoading || isPending}>
                      <FormControl>
                        <Button
                          onClick={() =>
                            setShowStartDatePopup(!showStartDatePopup)
                          }
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
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
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        animate={true}
                        mode='single'
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e);
                          setShowStartDatePopup(false);
                        }}
                        disabled={(date) =>
                          date < new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout='dropdown'
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                      You want to start stayed on{' '}
                      <span className='font-medium'>
                        {formatDate(field.value)}
                      </span>
                      .
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading || isPending}
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>End Date</FormLabel>
                  <Popover
                    open={showEndDatePopup}
                    onOpenChange={setShowEndDatePopup}>
                    <PopoverTrigger asChild disabled={isLoading || isPending}>
                      <FormControl>
                        <Button
                          onClick={() => setShowEndDatePopup(!showEndDatePopup)}
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
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
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        animate={true}
                        mode='single'
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e);
                          setShowEndDatePopup(false);
                        }}
                        disabled={(date) =>
                          date < new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout='dropdown'
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                      You want to end stayed on{' '}
                      <span className='font-medium'>
                        {formatDate(field.value)}
                      </span>
                      .
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              disabled={isLoading || isPending}
              control={form.control}
              name='guests'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={'w-full'}
                        disabled={isLoading || isPending}>
                        <SelectValue
                          placeholder='Select your number of guests'
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1'>1 Guest</SelectItem>
                      <SelectItem value='2'>2 Guest&apos;s</SelectItem>
                      <SelectItem value='3'>3 Guest&apos;s</SelectItem>
                      <SelectItem value='4'>4 Guest&apos;s</SelectItem>
                      <SelectItem value='5'>5 Guest&apos;s</SelectItem>
                      <SelectItem value='6'>6 Guest&apos;s</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You want {field.value === undefined ? '0' : field.value}{' '}
                    {field.value?.length >= 1 ? "guest's" : 'guest'} allowed in
                    your home.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            disabled={isLoading || isPending}
            control={form.control}
            name='matchId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Match ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your match id'
                    readOnly
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isLoading || isPending} variant='outline'>
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isLoading || isPending} type='submit'>
              {/* {isPending
                            ? 'Sending request...'
                            : !iSentConnectionRequest
                            ? 'Send Connection Request'
                            : 'You have already sent a request'} */}
              {isPending ? 'Processing...' : 'Send Swap Request'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
