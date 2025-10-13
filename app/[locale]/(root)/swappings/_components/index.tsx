'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
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
        <Skeleton className='h-9 w-24 animate-pulse' />
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

export const LazySwappingsLimit = dynamic(() => import('./swappings-limit'), {
  ssr: false,
  loading: () => <Skeleton className='h-9 w-full animate-pulse' />,
});

export const LazySwappingFilterReset = dynamic(
  () => import('./swapping-filter-reset'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-9 w-full animate-pulse' />,
  }
);

export const LazySwappingFilterByType = dynamic(
  () => import('./swapping-filter-by-type'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-20 w-36 animate-pulse' />,
  }
);

export const LazySwappingPagination = dynamic(
  () => import('./swapping-pagination'),
  {
    ssr: false,
    loading: () => (
      <div className={'flex items-center gap-2'}>
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
        <Skeleton className='h-16 w-4/12 sm:w-2/12 animate-pulse' />
      </div>
    ),
  }
);

export const LazySwappingFilter = dynamic(() => import('./swapping-filter'), {
  ssr: false,
  loading: () => (
    <div className={'flex items-center justify-center'}>
      <Spinner className={'size-4'} />
    </div>
  ),
});

export const LazySwappingCarousel = dynamic(
  () => import('./swapping-carousel'),
  {
    ssr: false,
    loading: () => (
      <div
        className={
          'aspect-square sm:aspect-square md:aspect-video lg:aspect-[20/9] h-full w-full rounded-lg'
        }>
        <Skeleton className='h-full w-full animate-pulse' />
      </div>
    ),
  }
);
