import { Skeleton } from '@/components/ui/skeleton';

export default function ConnectionsTableRowLoader() {
  return (
    <div className={'px-8 space-y-1'}>
      <Skeleton className='h-10 animate-pulse' />
      <div className={'space-y-2'}>
        <Skeleton className='h-10 animate-pulse' />
        <Skeleton className='h-10 animate-pulse' />
        <Skeleton className='h-10 animate-pulse' />
        <Skeleton className='h-10 animate-pulse' />
        <Skeleton className='h-10 animate-pulse' />
        <Skeleton className='h-10 animate-pulse' />
        <Skeleton className='h-10 animate-pulse' />
      </div>
    </div>
  );
}
