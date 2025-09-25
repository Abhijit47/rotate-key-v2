import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { IconTrendingDown } from '@tabler/icons-react';

export default function StatsCardLoader() {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card key={index} className='@container/card'>
          <CardHeader>
            <CardDescription>
              <Skeleton className='h-4 w-24 animate-pulse' />
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              <Skeleton className='h-8 w-32 animate-pulse' />
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingDown />
                <Skeleton className='h-4 w-12 animate-pulse' />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              <Skeleton className='h-4 w-48 animate-pulse' />
            </div>
            <div className='text-muted-foreground'>
              <Skeleton className='h-3 w-32 animate-pulse' />
            </div>
            <div className='text-muted-foreground'>
              <Skeleton className='h-3 w-28 animate-pulse' />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
