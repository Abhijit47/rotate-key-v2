'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { parseDate } from 'chrono-node';
import { Info, LockKeyholeIcon, MessageCircleMore, Video } from 'lucide-react';
import { useState, useTransition } from 'react';

import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  // FormDescription,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sentConnectionRequestV1 } from '@/lib/sent-connection-request';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
// import { useRouter } from 'next/navigation';

// function formatDate(date: Date | undefined) {
//   if (!date) {
//     return '';
//   }
//   return date.toLocaleDateString('en-US', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//   });
// }

const SwapFormSchema = z
  .object({
    startDate: z.date({
      error: 'Invalid start date format',
    }),
    endDate: z.date({
      error: 'Invalid end date format',
    }),
    guests: z
      .string({
        error: 'Invalid number of guests',
      })
      .length(1, 'Please select number of guests')
      .min(1, 'Please select number of guests'),

    matchId: z.uuidv4({
      error: 'Invalid match id',
      version: 'v4',
    }),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (startDate > endDate && endDate < startDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date must be after start date',
      });
    }
  });

type SwapFormData = z.infer<typeof SwapFormSchema>;

type SwapRequestFormProps = {
  propertyId: string;
  iSentConnectionRequest: boolean;
  sentRequest:
    | {
        status: 'pending' | 'approved' | 'declined' | 'completed';
        id: string;
        matchId: string | null;
        guests: number;
        startDate: string;
        endDate: string;
      }
    | undefined;
  matchId: string | undefined;
};

export default function SwapRequestForm(props: SwapRequestFormProps) {
  const { propertyId, iSentConnectionRequest, sentRequest, matchId } = props;

  const [showStartDatePopup, setShowStartDatePopup] = useState<boolean>(false);
  const [showEndDatePopup, setShowEndDatePopup] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  // const router = useRouter();

  const form = useForm<SwapFormData>({
    resolver: zodResolver(SwapFormSchema),
    defaultValues: {
      startDate: sentRequest?.startDate
        ? parseDate(sentRequest.startDate) ?? undefined
        : new Date(),

      endDate: sentRequest?.endDate
        ? parseDate(sentRequest.endDate) ?? undefined
        : new Date(),

      guests: sentRequest?.guests ? String(sentRequest.guests) : undefined,

      // endDate: sentRequest?.endDate
      //   ? new Date(sentRequest.endDate)
      //   : new Date(),
      // guests: String(sentRequest?.guests) || '2',
      // guests: undefined,
      matchId: matchId ?? 'N/A',
    },
    mode: 'onChange',
  });

  // console.log('sentRequest', sentRequest);
  function onSubmit(data: SwapFormData) {
    startTransition(async () => {
      // Simulate a server request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const formData = new FormData();
      formData.append('startDate', data.startDate.toISOString());
      formData.append('endDate', data.endDate.toISOString());
      formData.append('guests', data.guests);
      formData.append('propertyId', propertyId);
      formData.append('matchId', data.matchId);

      const result = await sentConnectionRequestV1(formData);

      if (!result.success) {
        toast.error(result.message);

        return;
      } else {
        form.reset();
        toast.success('Connection request sent successfully');
        return;
      }

      // toast('You submitted the following values', {
      //   description: (
      //     <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4 space-y-4 overflow-scroll'>
      //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // });
    });
  }

  // const isSentConnectionRequest = false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className={'flex items-center justify-between'}>
          <h1>Eager to connect ? </h1>
          {sentRequest ? (
            <Badge variant={'outline'} className={'capitalize'}>
              {sentRequest.status}
            </Badge>
          ) : null}
        </CardTitle>
        <CardDescription>
          Provide some details to get in touch with the owner
        </CardDescription>
      </CardHeader>
      <Separator />

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'}>
              <FormField
                disabled={isPending || iSentConnectionRequest}
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Start Date</FormLabel>
                    <Popover
                      open={showStartDatePopup}
                      onOpenChange={setShowStartDatePopup}>
                      <PopoverTrigger
                        asChild
                        disabled={isPending || iSentConnectionRequest}>
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
                disabled={isPending || iSentConnectionRequest}
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>End Date</FormLabel>
                    <Popover
                      open={showEndDatePopup}
                      onOpenChange={setShowEndDatePopup}>
                      <PopoverTrigger
                        asChild
                        disabled={isPending || iSentConnectionRequest}>
                        <FormControl>
                          <Button
                            onClick={() =>
                              setShowEndDatePopup(!showEndDatePopup)
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
                disabled={isPending || iSentConnectionRequest}
                control={form.control}
                name='guests'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guests</FormLabel>
                    <Select
                      disabled={isPending || iSentConnectionRequest}
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={'w-full'}
                          disabled={isPending || iSentConnectionRequest}>
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
                      {field.value?.length >= 1 ? "guest's" : 'guest'} allowed
                      in your home.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                disabled={isPending || iSentConnectionRequest}
                control={form.control}
                name='matchId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match ID</FormLabel>
                    <FormControl>
                      <Input placeholder='Your match id' {...field} readOnly />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isPending || iSentConnectionRequest}
              type='submit'
              className={'w-full'}>
              {isPending
                ? 'Sending request...'
                : !iSentConnectionRequest
                ? 'Send Connection Request'
                : 'You have already sent a request'}
            </Button>
          </form>
        </Form>
      </CardContent>

      <Separator />
      <CardContent>
        <CardAction className='w-full space-y-4 relative'>
          {!iSentConnectionRequest ? (
            <div
              className={
                'bg-primary/30 opacity-75 z-10 w-full h-full absolute top-0 left-0 rounded-lg'
              }>
              <LockKeyholeIcon className='size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-accent-foreground' />
              <span className={'sr-only'}>Locked</span>
            </div>
          ) : null}

          <Button
            disabled={isPending || !iSentConnectionRequest}
            type='button'
            className='w-full'
            onClick={() => {
              toast('Message Feature coming soon!');
              // router.push(`/chat/${oppositeUserId}`)
            }}>
            <MessageCircleMore className={'size-4'} /> Message
          </Button>
          <Button
            disabled={isPending || !iSentConnectionRequest}
            type='button'
            variant='outline'
            className='w-full'
            onClick={() => {
              toast('Video Feature coming soon!');
            }}>
            <Video className={'size-4'} /> Request a Virtual Tour
          </Button>
        </CardAction>
      </CardContent>
      <Separator className={''} />
      <CardFooter>
        <CardDescription>
          <p className={'flex items-center gap-2'}>
            <Info className={'size-4'} /> Both hosts need to be liked mutually
            in order to contact
          </p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
