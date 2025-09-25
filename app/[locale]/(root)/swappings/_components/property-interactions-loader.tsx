import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PropertyInteractionsLoader() {
  return (
    <CardContent>
      <div
        className={
          'flex items-center justify-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-1 text-xs font-semibold'
        }>
        <Skeleton className='size-8 rounded-lg animate-pulse' />
        <Skeleton className='size-8 rounded-lg animate-pulse' />
        <Skeleton className='size-8 rounded-lg animate-pulse' />
      </div>
    </CardContent>
  );
}
