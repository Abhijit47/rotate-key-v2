import { Loader2Icon } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={'h-dvh grid place-items-center'}>
      <Loader2Icon className={'size-4 md:size-6 lg:size-8 animate-spin'} />
    </div>
  );
}
