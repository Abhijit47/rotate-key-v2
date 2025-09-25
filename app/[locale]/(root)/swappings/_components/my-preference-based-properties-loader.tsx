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
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Bath,
  Bed,
  BookMarked,
  Building2,
  Eye,
  MapPinCheckInside,
  MapPinned,
  Pin,
  Ruler,
  Tag,
  UserCircle,
} from 'lucide-react';
import PropertyInteractionsLoader from './property-interactions-loader';

export default function MyPreferenceBasedPropertiesLoader() {
  return (
    <section>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        }>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className={'gap-2 py-4'}>
            <CardHeader>
              <CardTitle className={'flex items-center justify-between'}>
                <Badge>
                  <Tag className={'size-4'} />{' '}
                  <Skeleton className={'w-10 h-4 animate-pulse'} />
                </Badge>
                <Badge>
                  <Eye className={'size-4'} />{' '}
                  <Skeleton className={'w-4 h-4 animate-pulse'} />
                </Badge>
              </CardTitle>
            </CardHeader>
            <Separator className='mb-2' />

            <CardContent className='w-full h-full aspect-square rounded-lg'>
              <span className={'sr-only'}>
                Property Card Carousel Loading...
              </span>
              <Skeleton className='h-full w-full animate-pulse' />
            </CardContent>

            <Separator className='my-2' />

            <PropertyInteractionsLoader />

            <CardContent>
              <Badge variant={'outline'}>
                <Skeleton className={'w-20 h-4 animate-pulse'} />
              </Badge>
            </CardContent>

            <CardContent className={'space-y-4'}>
              <CardDescription className={'space-y-2'}>
                <div className={'text-sm font-bold flex items-center gap-2'}>
                  <UserCircle className={'size-4'} />
                  <Skeleton className={'w-30 h-4 animate-pulse'} />
                </div>
                <div className={'text-sm font-bold flex items-center gap-2'}>
                  <BookMarked className={'size-4'} />
                  <Skeleton className={'w-40 h-4 animate-pulse'} />
                </div>
                <div className={'text-sm font-bold flex items-center gap-2'}>
                  <Building2 className={'size-4'} />
                  <Skeleton className={'w-50 h-4 animate-pulse'} />
                </div>
                <div className={'text-sm font-bold flex items-center gap-2'}>
                  <MapPinned className={'size-4'} />
                  <Skeleton className={'w-40 h-4 animate-pulse'} />
                </div>
                <div className={'text-sm font-bold flex items-center gap-2'}>
                  <MapPinCheckInside className={'size-4'} />
                  <Skeleton className={'w-30 h-4 animate-pulse'} />
                </div>
                <div className={'text-sm font-bold flex items-center gap-2'}>
                  <Pin className={'size-4'} />
                  <Skeleton className={'w-20 h-4 animate-pulse'} />
                </div>
              </CardDescription>

              <CardDescription>
                <div
                  className={'flex items-center justify-start gap-4 flex-wrap'}>
                  <div
                    className={
                      'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
                    }>
                    <Ruler className={'size-4'} />
                    <Skeleton className={'w-8 h-4 animate-pulse'} /> sqft
                  </div>
                  <div
                    className={
                      'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
                    }>
                    <Bed className={'size-4'} />
                    <Skeleton className={'w-8 h-4 animate-pulse'} />
                  </div>
                  <div
                    className={
                      'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
                    }>
                    <Bath className={'size-4'} />
                    <Skeleton className={'w-8 h-4 animate-pulse'} />
                  </div>
                </div>
              </CardDescription>
            </CardContent>

            <Separator className='my-2' />
            <CardFooter>
              <CardAction className={'w-full'}>
                <Skeleton className='h-10 w-full animate-pulse' />
              </CardAction>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
