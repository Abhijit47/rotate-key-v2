import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserListLoader() {
  return (
    <CardContent>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            className='py-4 px-0 border-2 border-primary dark:border-primary-foreground gap-2'>
            <CardHeader>
              <CardTitle>
                <Skeleton className='h-4 w-6/12 animate-pulse' />
              </CardTitle>
            </CardHeader>
            <CardContent className={'grid grid-cols-6 gap-4'}>
              <div className={'col-span-1 aspect-square'}>
                <Skeleton className='w-full h-full rounded-full animate-pulse' />
              </div>
              <CardDescription className={'col-span-5'}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                  <div className={'space-y-2'}>
                    <Skeleton className='h-3 w-8/12 animate-pulse' />
                    <Skeleton className='h-3 w-4/12 animate-pulse' />
                    <Skeleton className='h-3 w-3/12 animate-pulse' />
                    <Skeleton className='h-3 w-5/12 animate-pulse' />
                    <div className={'w-full mt-6'}>
                      <Skeleton className='h-8 w-full animate-pulse' />
                    </div>
                  </div>
                  <div className={'space-y-2'}>
                    <Skeleton className='h-3 w-5/12 animate-pulse' />
                    <Skeleton className='h-3 w-6/12 animate-pulse' />
                    <Skeleton className='h-3 w-4/12 animate-pulse' />
                    <Skeleton className='h-3 w-7/12 animate-pulse' />
                    <Skeleton className='h-3 w-5/12 animate-pulse' />
                    <Skeleton className='h-3 w-6/12 animate-pulse' />
                    <Skeleton className='h-3 w-3/12 animate-pulse' />
                  </div>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  );
}
