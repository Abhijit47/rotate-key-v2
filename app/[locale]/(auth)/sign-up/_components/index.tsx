'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

export const LazySignUpButtons = dynamic(() => import('./sign-up-buttons'), {
  ssr: false,
  loading: () => {
    return (
      <div className={'w-full'}>
        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <Skeleton className='h-20 w-full animate-pulse' />
          <Skeleton className='h-20 w-full animate-pulse' />
          <Skeleton className='h-20 w-full animate-pulse' />
        </div>
      </div>
    );
  },
});

export const LazySignUpButtonHandler = dynamic(
  () => import('./sign-up-button-handler'),
  {
    ssr: false,
    loading: () => {
      return (
        <div className={'w-full'}>
          <Skeleton className='h-9 w-full animate-pulse' />
        </div>
      );
    },
  }
);
