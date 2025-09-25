import { AspectRatio } from '@/components/ui/aspect-ratio';
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

export default function UploadDocumentsLoader() {
  return (
    <CardContent>
      <section
        className={'container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4'}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card className='gap-4 py-4' key={index}>
            <CardHeader>
              <CardTitle>
                <Skeleton className='h-6 w-3/4 animate-pulse' />
              </CardTitle>
              <CardDescription>
                <Skeleton className='h-2 w-full animate-pulse' />
              </CardDescription>
            </CardHeader>

            <CardContent className={'space-y-2'}>
              <Badge variant='outline'>
                Type:
                <Skeleton className='h-4 w-16 animate-pulse' />
              </Badge>{' '}
              <Badge variant='outline'>
                Size:
                <Skeleton className='h-4 w-16 animate-pulse' />
              </Badge>{' '}
              <Badge variant='outline'>
                Uploaded At:
                <Skeleton className='h-4 w-24 animate-pulse' />
              </Badge>
            </CardContent>

            <CardContent>
              <AspectRatio ratio={1 / 1} className='w-full'>
                <Skeleton className='w-full h-full rounded-xl animate-pulse' />
              </AspectRatio>
            </CardContent>

            <CardContent className={'transition-all duration-150 ease-in-out'}>
              <div className='flex items-center flex-wrap justify-between gap-4'>
                <Skeleton className='h-10 w-20 animate-pulse' />
                <Skeleton className='h-10 w-20 animate-pulse' />
                <Skeleton className='h-10 w-20 animate-pulse' />
              </div>
            </CardContent>

            <CardFooter>
              <CardAction className='w-full'>
                <Skeleton className='h-10 w-full animate-pulse' />
              </CardAction>
            </CardFooter>
          </Card>
        ))}
      </section>
    </CardContent>
  );
}
