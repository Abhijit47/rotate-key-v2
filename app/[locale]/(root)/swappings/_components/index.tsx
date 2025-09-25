'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

export const LazyPropertyInteractions = dynamic(
  () => import('./property-interactions').then((mod) => mod.default),
  {
    ssr: false,
    // loading: () => <PropertyInteractionsLoader />,
  }
);

export const LazyUpdatePreferenceModal = dynamic(
  () => import('./update-preference-modal'),
  {
    ssr: false,
    loading: () => (
      <div className='p-4'>
        <span className={'sr-only'}>Update Preference Modal Loading...</span>
        <Skeleton className='h-8 w-24 animate-pulse' />
      </div>
    ),
  }
);

export const LazyUpdatePreferenceForm = dynamic(
  () => import('./update-preference-form').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className='p-4'>
        <span className={'sr-only'}>LazyUpdatePreferenceForm Loading...</span>
        <Skeleton className='h-8 w-24 animate-pulse' />
      </div>
    ),
  }
);

export const LazyPropertyCardCarousel = dynamic(
  () =>
    import('@/components/shared/property-card-carousel').then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    // loading: () => (
    //   <div className='w-full h-full aspect-square flex items-center justify-center px-6 rounded-lg'>
    //     {/* <Loader className='animate-spin mx-auto' /> */}
    //     <span className={'sr-only'}>Property Card Carousel Loading...</span>
    //     <Skeleton className='h-full w-full animate-pulse' />
    //   </div>
    // ),
  }
);
