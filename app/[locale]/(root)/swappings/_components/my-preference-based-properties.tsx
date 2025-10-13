import PropertyCardCarousel from '@/components/shared/property-card-carousel';
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
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { getPreferenceBasedPotentialPropertiesV1 } from '@/lib/preference-based-properties';
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
import { LazyPropertyInteractions, LazySwappingPagination } from '.';

export default async function MyPreferenceBasedProperties() {
  const properties = await getPreferenceBasedPotentialPropertiesV1();

  return (
    <section>
      {properties.length === 0 ? (
        <Card className={'gap-4 py-4'}>
          <CardHeader>
            <CardTitle className={'text-center'}>
              <h2 className={'text-2xl font-bold mb-4'}>
                No properties found based on your preferences
              </h2>
            </CardTitle>
            <CardDescription className={'text-center'}>
              <p className={'text-muted-foreground'}>
                Try to update your preferences to see more relevant properties.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent className={'text-center'}>
            <p className={'text-muted-foreground'}>
              There are no properties available for swapping at the moment.
              Please check back later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div
            className={
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            }>
            {properties.map((property) => (
              <Card key={property.id} className={'gap-2 py-4'}>
                <CardHeader>
                  <CardTitle className={'flex items-center justify-between'}>
                    <Badge>
                      <Tag className={'size-4'} /> {property.type}
                    </Badge>
                    <Badge>
                      <Eye className={'size-4'} /> {property.viewsCount}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <Separator className='mb-2' />

                <PropertyCardCarousel
                  images={property.images}
                  type='propertyCard'
                />

                <Separator className='my-2' />

                <LazyPropertyInteractions
                  propertyId={property.id}
                  iLikedThisProperty={property.iLikedThisProperty}
                  totalLikes={property.totalLikes}
                />

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
                      className={
                        'flex items-center justify-start gap-4 flex-wrap'
                      }>
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
                        Connect with owner
                      </Link>
                    </Button>
                  </CardAction>
                </CardFooter>
              </Card>
            ))}
          </div>
          {properties.length > 0 ? (
            <LazySwappingPagination totalProperties={properties.length} />
          ) : null}
        </div>
      )}
    </section>
  );
}
