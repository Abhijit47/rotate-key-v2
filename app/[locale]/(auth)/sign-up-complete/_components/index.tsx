'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

export const LazySignUpCompleteForm = dynamic(
  () => import('./sign-up-complete-form'),
  {
    ssr: false,
    loading: () => (
      <div className={'space-y-4'}>
        <div className={'space-y-2'}>
          <Skeleton className={'h-3 w-5/12 animate-pulse'} />
          <Skeleton className={'h-9 w-full animate-pulse'} />
        </div>
        <div>
          <Skeleton
            className={'h-48 w-full border-2 border-dashed animate-pulse'}
          />
        </div>
        <Skeleton className={'h-9 w-full animate-pulse'} />
      </div>
    ),
  }
);

export const LazySignUpCascadingInputs = dynamic(
  () => import('./sign-up-cascading-inputs'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
