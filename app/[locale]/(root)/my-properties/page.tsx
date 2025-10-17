import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { clearCache } from '@/lib/property-actions';
import { getMyPropertiesV1 } from '@/lib/user-properties';
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
// import { cache } from 'react';
// import { unstable_cache as cache } from 'next/cache';
import { Link } from '@/i18n/navigation';
import { requireAuth } from '@/lib/require-auth';
import Image from 'next/image';
import { cache, Suspense } from 'react';
import PropertyInteractions from '../swappings/_components/property-interactions';

const getCachedMyProperties = cache(async () => {
  const data = getMyPropertiesV1();
  return data;
});

const isDev = process.env.NODE_ENV === 'development';

export default async function MyProperties() {
  await requireAuth();

  const myProperties = await getCachedMyProperties();

  if (myProperties.length === 0) {
    return (
      <div className={'container mx-auto px-4 2xl:px-0 max-w-7xl'}>
        <section className={'flex flex-col items-center justify-center'}>
          <h2 className={'text-2xl font-bold'}>No properties found</h2>
          <p className={'text-sm text-muted-foreground'}>
            You have not added any properties yet.
          </p>
          <Link
            href={'/properties/add'}
            className={buttonVariants({ variant: 'default' })}>
            Add Property
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className={'container mx-auto px-4 2xl:px-0 max-w-7xl'}>
      {isDev ? (
        <form
          action={async () => {
            'use server';
            await clearCache('properties');
          }}>
          <Button variant={'destructive'}>Clear cache</Button>
        </form>
      ) : null}
      <section
        className={
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        }>
        {myProperties.map((property) => (
          // <Card key={property.id} className={'gap-4'}>
          //   <CardHeader>
          //     <CardTitle>
          //       <Badge>{property.type}</Badge>
          //     </CardTitle>
          //   </CardHeader>
          //   <CardContent>
          //     <Carousel
          //       opts={{
          //         loop: true,
          //         direction: 'ltr',
          //         dragFree: true,
          //         dragThreshold: 10,
          //         duration: 200,
          //         startIndex: 0,
          //       }}>
          //       <CarouselContent>
          //         {property.images.map((image, index) => (
          //           <CarouselItem key={index}>
          //             <AspectRatio ratio={1 / 1}>
          //               <Image
          //                 src={image}
          //                 alt={crypto.randomUUID()}
          //                 className={'object-cover w-full h-full rounded-lg'}
          //                 width={500}
          //                 height={300}
          //                 priority={true}
          //               />
          //             </AspectRatio>
          //           </CarouselItem>
          //         ))}
          //       </CarouselContent>
          //     </Carousel>
          //   </CardContent>

          //   <CardContent>
          //     <CardDescription>
          //       <p className={'text-sm font-normal line-clamp-2'}>
          //         Info: {property.description}
          //       </p>
          //     </CardDescription>
          //   </CardContent>

          //   <CardContent className={'space-y-4'}>
          //     <CardDescription>
          //       <p className={'text-sm font-bold flex items-center gap-2'}>
          //         <BookMarked className={'size-4'} />
          //         {property.address}
          //       </p>
          //       <p className={'text-sm font-bold flex items-center gap-2'}>
          //         <Building2 className={'size-4'} />
          //         {property.city}
          //       </p>
          //       <p className={'text-sm font-bold flex items-center gap-2'}>
          //         <MapPinned className={'size-4'} />
          //         {property.state}
          //       </p>
          //       <p className={'text-sm font-bold flex items-center gap-2'}>
          //         <MapPinCheckInside className={'size-4'} />
          //         {property.country}
          //       </p>
          //       <p className={'text-sm font-bold flex items-center gap-2'}>
          //         <Pin className={'size-4'} />
          //         {property.zipcode}
          //       </p>
          //     </CardDescription>

          //     <CardDescription>
          //       <div
          //         className={'flex items-center justify-start gap-4 flex-wrap'}>
          //         <p
          //           className={
          //             'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
          //           }>
          //           <Ruler className={'size-4'} />
          //           {property.area} sqft
          //         </p>
          //         <p
          //           className={
          //             'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
          //           }>
          //           <Bed className={'size-4'} />
          //           {property.bedrooms}
          //         </p>
          //         <p
          //           className={
          //             'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
          //           }>
          //           <Bath className={'size-4'} />
          //           {property.bathrooms}
          //         </p>
          //       </div>
          //     </CardDescription>
          //   </CardContent>

          //   <CardFooter>
          //     <CardAction className={'w-full'}>
          //       <Button className={'w-full'} asChild>
          //         <Link
          //           href={`/swappings/${property.id}`}
          //           className={buttonVariants({
          //             variant: 'default',
          //             className: 'w-full text-muted-foreground',
          //           })}>
          //           Book Now
          //         </Link>
          //       </Button>
          //     </CardAction>
          //   </CardFooter>
          // </Card>
          <Card key={property.id} className={'gap-2 py-4'}>
            <CardHeader>
              <CardTitle className={'flex items-center justify-between'}>
                <Badge>
                  <Tag className={'size-4'} /> {property.type}
                </Badge>
                <Badge>
                  <Eye className={'size-4'} /> {0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <Separator className='mb-2' />

            <CardContent>
              <Carousel
                opts={{
                  loop: true,
                  direction: 'ltr',
                  dragFree: true,
                  dragThreshold: 10,
                  duration: 200,
                  startIndex: 0,
                }}>
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={image}
                          alt={crypto.randomUUID()}
                          className={'object-cover w-full h-full rounded-lg'}
                          width={500}
                          height={300}
                          priority={true}
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </CardContent>

            <Separator className='my-2' />

            <Suspense
              name='PropertyInteractions'
              fallback={<div>Loading...</div>}>
              <PropertyInteractions
                propertyId={property.id}
                iLikedThisProperty={property.iLikedThisProperty}
                totalLikes={property.totalLikes}
              />
            </Suspense>

            <CardContent>
              <Badge variant={'outline'}>
                {property.iLikedThisProperty
                  ? `
                      You + ${property.totalLikes} Likes
                    `
                  : `
                      ${property.totalLikes} Likes
                    `}
              </Badge>
            </CardContent>

            <CardContent className={'space-y-4'}>
              <CardDescription>
                <p className={'text-sm font-bold flex items-center gap-2'}>
                  <UserCircle className={'size-4'} />
                  {property.author.fullName}
                </p>
                <p className={'text-sm font-bold flex items-center gap-2'}>
                  <BookMarked className={'size-4'} />
                  {property.address}
                </p>
                <p className={'text-sm font-bold flex items-center gap-2'}>
                  <Building2 className={'size-4'} />
                  {property.city}
                </p>
                <p className={'text-sm font-bold flex items-center gap-2'}>
                  <MapPinned className={'size-4'} />
                  {property.state}
                </p>
                <p className={'text-sm font-bold flex items-center gap-2'}>
                  <MapPinCheckInside className={'size-4'} />
                  {property.country}
                </p>
                <p className={'text-sm font-bold flex items-center gap-2'}>
                  <Pin className={'size-4'} />
                  {property.zipcode}
                </p>
              </CardDescription>

              <CardDescription>
                <div
                  className={'flex items-center justify-start gap-4 flex-wrap'}>
                  <p
                    className={
                      'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
                    }>
                    <Ruler className={'size-4'} />
                    {property.area} sqft
                  </p>
                  <p
                    className={
                      'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
                    }>
                    <Bed className={'size-4'} />
                    {property.bedRooms}
                  </p>
                  <p
                    className={
                      'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
                    }>
                    <Bath className={'size-4'} />
                    {property.bathRooms}
                  </p>
                </div>
              </CardDescription>
            </CardContent>

            <Separator className='my-2' />
            <CardFooter>
              <CardAction className={'w-full'}>
                <Button className={'w-full'} asChild>
                  <Link
                    href={`/swappings/${property.id}`}
                    className={buttonVariants({
                      variant: 'default',
                      className: 'w-full text-muted-foreground',
                    })}>
                    See Details
                  </Link>
                </Button>
              </CardAction>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
