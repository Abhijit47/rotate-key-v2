'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { createProperty } from '@/lib/property-actions';
import {
  AddPropertyFormValues,
  addPropertySchema,
} from '@/lib/validations/property.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { treeifyError } from 'zod';
import {
  LazyDevtool,
  LazyPropertyAccessibilities,
  LazyPropertyAccomodation,
  LazyPropertyAdditionalInformation,
  LazyPropertyAmenities,
  LazyPropertyCheckinOrCheckOut,
  LazyPropertyEnvironment,
  LazyPropertyImagesUpload,
  LazyPropertyInformation,
  LazyPropertyOwnerDetails,
  LazyPropertyOwnership,
  LazyPropertyRentalPeriod,
  LazyPropertyRules,
  LazyPropertySurrounding,
  LazyPropertySwapping,
  LazyPropertyType,
} from './form-fields';
import defaultValues from './form-fields/create-property-default-values';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

export default function CreatePropertyForm() {
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<AddPropertyFormValues>({
    resolver: zodResolver(addPropertySchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  // 2. Define a submit handler.
  function onSubmit(values: AddPropertyFormValues) {
    startTransition(async () => {
      // console.log(values);
      // toast(
      //   <pre className='text-xs max-w-md bg-slate-800 p-2 rounded-md text-white overflow-scroll text-wrap h-96'>
      //     {JSON.stringify(values, null, 2)}
      //   </pre>
      // );

      const { data, success, error } = addPropertySchema
        .omit({ files: true })
        .safeParse(values);

      if (!success) {
        toast.error('Please fix the errors in the form.');
        console.log(treeifyError(error));
        return;
      }

      const result = await createProperty(data);
      console.log('result:', result);

      if (!result.success) {
        toast.error(result.message || 'Failed to create property.');
        return;
      } else {
        form.reset();
        toast.success(result.message || 'Property created successfully!');
      }
    });
  }

  return (
    <Card className={'py-2 gap-4'}>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 py-12'>
            <LazyPropertyInformation />
            <Separator />
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
              <LazyPropertyType />

              <LazyPropertyOwnership />

              <LazyPropertySwapping />

              <LazyPropertyRentalPeriod />
            </div>
            <Separator />
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
              <LazyPropertySurrounding />

              <LazyPropertyEnvironment />
            </div>
            <Separator />
            <LazyPropertyOwnerDetails />

            <Separator />
            <LazyPropertyAdditionalInformation />

            <Separator />
            <LazyPropertyAccomodation />

            <Separator />
            <LazyPropertyAmenities />
            <Separator />

            <LazyPropertyRules />
            <Separator />

            <LazyPropertyAccessibilities />
            <Separator />

            <LazyPropertyCheckinOrCheckOut />
            <Separator />

            <LazyPropertyImagesUpload />
            <Separator />

            <div className={'flex w-full items-center justify-end gap-4'}>
              <Button
                size={'sm'}
                type='reset'
                disabled={form.formState.isSubmitting || isPending}
                onClick={() => form.reset()}
                className={'cursor-pointer'}
                variant='destructive'>
                Reset
              </Button>
              <Button
                size={'sm'}
                disabled={
                  !form.formState.isValid ||
                  form.formState.isSubmitting ||
                  isPending
                }
                type='submit'
                className={'cursor-pointer'}>
                {form.formState.isLoading ||
                form.formState.isSubmitting ||
                isPending ? (
                  <span className={'inline-flex items-center gap-1'}>
                    Creating... <Spinner />
                  </span>
                ) : (
                  'Create Property'
                )}
              </Button>
            </div>

            {/* Set up DevTool */}
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            {isDev && <LazyDevtool control={form.control} />}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
