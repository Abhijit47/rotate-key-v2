import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PreferenceLoader() {
  return (
    <Card className={'gap-4 py-4'}>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
        <CardDescription>Your current preferred swap location</CardDescription>
      </CardHeader>
      <CardContent className={'flex items-center gap-4'}>
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

      <CardFooter>
        <CardAction>
          <Skeleton className='h-8 w-24 animate-pulse' />
        </CardAction>
      </CardFooter>
    </Card>
  );
}
