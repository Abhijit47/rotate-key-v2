import { useSwapUnswapContext } from '@/contexts/swap-unswap-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';

import { Rating, RatingButton } from '@/components/blocks/rating';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';

const reviewFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'Mobile number must be at least 10 digits.' }),
  propertyCondition: z.number().min(1).max(10),
  communicationWithOwner: z.number().min(1).max(10),
  locationAccessibility: z.number().min(1).max(10),
  amenitiesFacilities: z.number().min(1).max(10),
  overallExperience: z.number().min(1).max(10),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must be at most 500 characters.' }),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export default function FeedbackForm() {
  const [isPending, startTransition] = useTransition();
  const { onToggleFeedbackModal, onToggleUnSwapModal } = useSwapUnswapContext();
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      fullName: 'Alan Turing',
      email: 'alanturing@gmail.com',
      mobileNumber: '9999911111',
      propertyCondition: 4,
      communicationWithOwner: 3,
      locationAccessibility: 3,
      amenitiesFacilities: 3,
      overallExperience: 3,
      message: 'your message here',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ReviewFormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Review submitted successfully!', {
        description: <pre>{JSON.stringify(values, null, 2)}</pre>,
      });
      // Reset the form after submission

      form.reset();
      // Close the modal after submission
      onToggleFeedbackModal();
      onToggleUnSwapModal();
    });
  }

  return (
    <Form {...form}>
      <Separator className={'mb-2'} />
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-2'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder='Ex. Alan Turing' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Ex. alanturing@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mobileNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile No.</FormLabel>
              <FormControl>
                <Input placeholder='Ex. +91 99999 11111' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='propertyCondition'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Condition</FormLabel>
              <FormControl>
                <Rating
                  className={'text-primary'}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RatingButton
                      id='property-condition'
                      key={index}
                      {...field}
                    />
                  ))}
                </Rating>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='communicationWithOwner'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Communication with owner</FormLabel>
              <FormControl>
                <Rating
                  className={'text-primary'}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RatingButton
                      id='communication-with-owner'
                      key={index}
                      {...field}
                    />
                  ))}
                </Rating>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='locationAccessibility'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location & Accessibility</FormLabel>
              <FormControl>
                <Rating
                  className={'text-primary'}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RatingButton
                      id='location-accessibility'
                      key={index}
                      {...field}
                    />
                  ))}
                </Rating>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amenitiesFacilities'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities & Facilities</FormLabel>
              <FormControl>
                <Rating
                  className={'text-primary'}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RatingButton
                      id='amenities-facilities'
                      key={index}
                      {...field}
                    />
                  ))}
                </Rating>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='overallExperience'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overall Experience</FormLabel>
              <FormControl>
                <Rating
                  className={'text-primary'}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RatingButton
                      id='overall-experience'
                      key={index}
                      {...field}
                    />
                  ))}
                </Rating>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  id='message'
                  rows={5}
                  className={'resize-none'}
                  placeholder='Type your message here.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className={'mt-2'} />
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isPending} variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} type='submit'>
            {isPending ? 'Submitting...' : 'Submit you review'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
