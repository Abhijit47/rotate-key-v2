import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@radix-ui/react-separator';

export default function PreferenceLoader() {
  return (
    <Card className={'gap-4 py-4'}>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
        <CardDescription>Your current preferred swap location</CardDescription>
      </CardHeader>
      <Skeleton className={'h-0.5 w-full animate-pulse'} />
      <CardContent className={'flex flex-wrap items-center gap-4'}>
        <Badge variant={'outline'}>
          <span>City :</span> <Skeleton className='h-2 w-20 animate-pulse' />
        </Badge>
        <Badge variant={'outline'}>
          <span>State :</span>
          <Skeleton className='h-2 w-20 animate-pulse' />
        </Badge>
        <Badge variant={'outline'}>
          <span>Country :</span>
          <Skeleton className='h-2 w-20 animate-pulse' />
        </Badge>
      </CardContent>
      <Skeleton className={'h-0.5 w-full animate-pulse'} />
      <CardContent>
        <div className={'flex flex-wrap items-center justify-between gap-4'}>
          <Skeleton className='h-9 w-24 animate-pulse' />
          <div className={'flex flex-wrap items-center gap-2'}>
            <Skeleton className='h-9 w-24 animate-pulse' />
            <Skeleton className='h-9 w-36 animate-pulse' />
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardContent>
        <div className={'flex items-center gap-2'}>
          <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
          <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
          <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
          <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
          <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
          <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        </div>
      </CardContent>
    </Card>
  );
}
