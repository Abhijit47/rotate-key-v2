import { Skeleton } from '@/components/ui/skeleton';
import { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';
import ComponentLoadError from '../component-load-error';

export default function PropertyAccessibilitiesLoader(
  loadingProps: DynamicOptionsLoadingProps
): React.ReactNode {
  return <PropertyAccessibilitiesLoaderElements loadingProps={loadingProps} />;
}

function PropertyAccessibilitiesLoaderElements({
  loadingProps,
}: {
  loadingProps?: DynamicOptionsLoadingProps;
}) {
  const { pastDelay, error, isLoading, retry } = loadingProps || {};

  if (pastDelay) {
    return (
      <div>
        <Skeleton className='h-3 w-72 animate-pulse mb-2' />
        <div>
          <Skeleton className='h-10 w-full animate-pulse mb-2' />
          <Skeleton className='h-3 w-46 animate-pulse' />
          <div className='flex items-center gap-4'>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className='h-4 w-16 rounded-full animate-pulse'
              />
            ))}
            <Skeleton className='h-8 w-28 animate-pulse' />
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <ComponentLoadError error={error} retry={retry} />;
  }
  if (isLoading) {
    return (
      <div>
        <Skeleton className='h-3 w-72 animate-pulse mb-2' />
        <div>
          <Skeleton className='h-10 w-full animate-pulse mb-2' />
          <Skeleton className='h-3 w-46 animate-pulse' />
          <div className='flex items-center gap-4'>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className='h-4 w-16 rounded-full animate-pulse'
              />
            ))}
            <Skeleton className='h-8 w-28 animate-pulse' />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
