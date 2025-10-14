'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      className={'w-full disabled:cursor-pointer disabled:opacity-50'}
      // className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-primary-600 py-1.5 px-3 text-sm/6 font-semibold text-tertiary-50 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary-700 data-[open]:bg-primary-700 data-[focus]:outline-1 data-[focus]:outline-tertiary-50 disabled:bg-tertiary-500 disabled:text-tertiary-200 disabled:cursor-not-allowed'
    >
      {pending ? 'Updating...' : children}
    </Button>
  );
}
