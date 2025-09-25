import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PropertyCarouselLoader() {
  return (
    <CardContent className='w-full h-full aspect-square px-6 rounded-lg'>
      <span className={'sr-only'}>Property Card Carousel Loading...</span>
      <Skeleton className='h-full w-full animate-pulse' />
    </CardContent>
  );
}
