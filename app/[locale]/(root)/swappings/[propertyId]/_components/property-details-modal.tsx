'use client';

import { BadgeCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectProperty } from '@/drizzle/schemas';

export default function PropertyDetailsModal({
  property,
}: {
  property: Partial<SelectProperty>;
}) {
  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger asChild>
        <Button variant='outline'>Show All</Button>
      </DialogTrigger>
      <DialogOverlay className='fixed inset-0 z-50 bg-black/30' />

      <DialogContent className='max-w-sm md:max-w-2xl max-h-9/12 h-full'>
        <DialogHeader>
          <DialogTitle>Property Information</DialogTitle>
          <DialogDescription>
            Here is the list of all amenities and features of this property.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='h-full w-full overflow-y-auto'>
          <div className={'py-4 space-y-4'}>
            <Card className={'p-2'}>
              <CardContent className={'p-2'}>
                <dl className={'space-y-1 inline-grid grid-cols-2 gap-2'}>
                  <dt className={'text-sm font-semibold'}>Street Address</dt>
                  <dd className={'text-sm capitalize'}>{property.address}</dd>

                  <dt className={'text-sm font-semibold'}>City / Town</dt>
                  <dd className={'text-sm capitalize'}>{property.city}</dd>

                  <dt className={'text-sm font-semibold'}>State / Province</dt>
                  <dd className={'text-sm capitalize'}>{property.state}</dd>

                  <dt className={'text-sm font-semibold'}>Country / Nation</dt>
                  <dd className={'text-sm capitalize'}>{property.country}</dd>

                  <dt className={'text-sm font-semibold'}>Zipcode</dt>
                  <dd className={'text-sm capitalize'}>{property.zipcode}</dd>

                  <dt className={'text-sm font-semibold'}>Property area</dt>
                  <dd className={'text-sm capitalize'}>
                    {property.area} {property.areaUnit}
                  </dd>

                  <dt className={'text-sm font-semibold'}>Swapping type</dt>
                  <dd className={'text-sm capitalize'}>{property.swapping}</dd>

                  <dt className={'text-sm font-semibold'}>Accomodation type</dt>
                  <dd className={'text-sm capitalize'}>
                    {property.accomodation}
                  </dd>

                  <dt className={'text-sm font-semibold'}>Surrounding type</dt>
                  <dd className={'text-sm capitalize'}>
                    {property.surrounding}
                  </dd>

                  <dt className={'text-sm font-semibold'}>Environment type</dt>
                  <dd className={'text-sm capitalize'}>
                    {property.environment}
                  </dd>

                  <dt className={'text-sm font-semibold'}>Rental period</dt>
                  <dd className={'text-sm capitalize'}>
                    {property.rentalPeriod}
                  </dd>
                </dl>
              </CardContent>
            </Card>

            <Card className={'p-2 gap-0 divide-y-2 divide-y-primary-500'}>
              <CardHeader className={'px-0 space-y-2'}>
                <h3 className={'font-semibold'}>
                  Property Amenities & Features
                </h3>
              </CardHeader>
              <CardContent className={'p-2'}>
                <ul className={'grid grid-cols-1 sm:grid-cols-2 gap-2'}>
                  {property?.amenities?.map((amenity) => (
                    <li
                      key={crypto.randomUUID()}
                      className={
                        'text-sm font-medium capitalize inline-flex items-center gap-2'
                      }>
                      <span>
                        <BadgeCheck
                          className={'inline-block size-4 text-primary-500'}
                        />
                      </span>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={'p-2 gap-0 divide-y-2 divide-y-primary-500'}>
              <CardHeader className={'px-0 space-y-2'}>
                <h3 className={'font-semibold'}>Property Accessibilities</h3>
              </CardHeader>
              <CardContent className={'p-2'}>
                <ul className={'grid grid-cols-1 sm:grid-cols-2 gap-2'}>
                  {property?.accessibilities?.map((accessibility) => (
                    <li
                      key={crypto.randomUUID()}
                      className={
                        'text-sm font-medium capitalize inline-flex items-center gap-2'
                      }>
                      <span>
                        <BadgeCheck
                          className={'inline-block size-4 text-primary-500'}
                        />
                      </span>
                      <span>{accessibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={'p-2 gap-0 divide-y-2 divide-y-primary-500'}>
              <CardHeader className={'px-0 space-y-2'}>
                <h3 className={'font-semibold'}>Property Rules</h3>
              </CardHeader>
              <CardContent className={'p-2'}>
                <ul className={'grid grid-cols-1 sm:grid-cols-2 gap-2'}>
                  {property?.rules?.map((rule) => (
                    <li
                      key={crypto.randomUUID()}
                      className={
                        'text-sm font-medium capitalize inline-flex items-center gap-2'
                      }>
                      <span>
                        <BadgeCheck
                          className={'inline-block size-4 text-primary-500'}
                        />
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={'p-2 gap-0 divide-y-2 divide-y-primary-500'}>
              <CardHeader className={'px-0 space-y-2'}>
                <h3 className={'font-semibold'}>Host Languages</h3>
              </CardHeader>
              <CardContent className={'p-2'}>
                <ul className={'grid grid-cols-1 sm:grid-cols-2 gap-2'}>
                  {property?.hostLanguages?.map((language) => (
                    <li
                      key={crypto.randomUUID()}
                      className={
                        'text-sm font-medium capitalize inline-flex items-center gap-2'
                      }>
                      <span>
                        <BadgeCheck
                          className={'inline-block size-4 text-primary-500'}
                        />
                      </span>
                      <span>{language}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
