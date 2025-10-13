'use client';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';
// import { SelectProperty } from '@/drizzle/schemas';

interface CarouselDetailsProps {
  carousel: {
    id: string;
    type: string;
    description: string;
    state: string;
    country: string;
    roomlocation: string;
    userLocation: string;
    date: string;
    rating: number;
    images: string[];
  };
}

export default function CarouselDetails({ carousel }: CarouselDetailsProps) {
  return (
    <div
      className={
        'absolute left-0 bottom-0 sm:bottom-4 w-full px-2 sm:px-8 py-2 xs:py-4 sm:py-6'
      }>
      <div className={'flex items-center justify-between'}>
        <div className={'text-tertiary-50 inline-grid gap-2 ml-4'}>
          <h3
            className={
              'text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold lg:font-bold'
            }>
            {carousel.type}
          </h3>
          <p className={'text-base md:text-lg lg:text-xl'}>{carousel.state}</p>
          <p className={'text-xs sm:text-sm'}>{carousel.country}</p>
        </div>
        <div className={'z-20'}>
          <Button
            onClick={() => toast.info('Feature coming soon...')}
            size={'sm'}
            className='inline-flex items-center gap-2 rounded-md bg-transparent py-1.5 px-3 text-sm/6 font-semibold text-brandYellow-500 focus:outline-none ring-2 ring-brandYellow-500 data-[hover]:bg-brandYellow-600 data-[hover]:text-tertiary-50 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-brandYellow-500'>
            Hold for now
          </Button>
        </div>
      </div>
    </div>
  );
}
