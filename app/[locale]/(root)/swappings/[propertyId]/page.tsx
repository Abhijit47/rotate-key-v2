import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { clearCache } from '@/lib/property-actions';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import PropertyCardCarousel from '@/components/shared/property-card-carousel';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { db } from '@/drizzle/db';
import { views } from '@/drizzle/schemas';
import { getPropertyV5 } from '@/lib/property-details';
import {
  Bath,
  Bed,
  BookMarked,
  Building2,
  MapPinCheckInside,
  MapPinned,
  Pin,
  Ruler,
  Tag,
} from 'lucide-react';
import { after } from 'next/server';
import SwappingRequestCard from './_components/swap-request-card';

type PageProps = {
  params: Promise<{ propertyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getCachedProperty = cache(async (id: string) => {
  // const property = await getProperty(id);
  const property = await getPropertyV5(id);
  return property;
});

export const revalidate = 3600; // Revalidate this page every hour

export default async function PropertyPage({ params }: PageProps) {
  const id = (await params).propertyId;

  const property = await getCachedProperty(id);

  // const prop = await getPropertyV1(id);

  if (!property) {
    return notFound();
  }

  after(async () => {
    await db.insert(views).values({
      propertyId: id,
      // viewerId: property.isOwner ? null : property.authorId,
      viewerId: property.authorId,
    });
  });

  const sentRequest = property.sentRequest;
  // const isMatched = true; // TODO: check if current user has already matched with this property

  return (
    <div className={'container mx-auto px-4 2xl:px-0 max-w-7xl py-4'}>
      <form
        action={async () => {
          'use server';
          await clearCache(`property-${id}`);
        }}>
        <Button variant={'destructive'}>Clear cache</Button>
      </form>
      <Card className={'gap-4 w-full'}>
        <CardHeader>
          <CardTitle>
            <Badge>
              <Tag className={'size-4'} /> {property.type}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyCardCarousel
            images={property.images}
            type='propertyDeatils'
          />
        </CardContent>

        <div className={'px-4 flex flex-wrap gap-4 w-full'}>
          <Card className={'flex-auto lg:flex-1'}>
            <CardContent>
              <CardDescription>
                <p className={'text-sm font-normal tracking-normal'}>
                  Info: {property.description}
                </p>
              </CardDescription>
            </CardContent>

            <CardContent className={'space-y-4'}>
              <Separator />
              <CardDescription>
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

              <Separator />

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
                    {property.bedrooms}
                  </p>
                  <p
                    className={
                      'flex items-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 w-fit text-xs font-semibold'
                    }>
                    <Bath className={'size-4'} />
                    {property.bathrooms}
                  </p>
                </div>
              </CardDescription>
            </CardContent>

            {/* <CardFooter>
              <CardAction className={'w-full'}>
                <Button className={'w-full'} disabled={!property.isAvailable}>
                  {property.isAvailable
                    ? 'Connect with owner'
                    : 'Already Swapped'}
                </Button>
              </CardAction>
            </CardFooter> */}
          </Card>

          <SwappingRequestCard
            iLikedThisProperty={property.iLikedThisProperty}
            iSentConnectionRequest={property.iSentConnectionRequest}
            propertyId={property.id}
            isMatched={property.isMatched}
            ownerDetails={property.author}
            sentRequest={sentRequest}
            isOwner={property.isOwner}
            matchId={property.matchId}
          />
        </div>
      </Card>
    </div>
  );
}
