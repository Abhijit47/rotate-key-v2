import { Skeleton } from '@/components/ui/skeleton';
import { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';
import ComponentLoadError from '../component-load-error';

export default function PropertyAccomodationLoader(
  loadingProps: DynamicOptionsLoadingProps
): React.ReactNode {
  return <PropertyAccomodationLoaderElements loadingProps={loadingProps} />;
}

function PropertyAccomodationLoaderElements({
  loadingProps,
}: {
  loadingProps?: DynamicOptionsLoadingProps;
}) {
  const { pastDelay, error, isLoading, retry } = loadingProps || {};

  if (pastDelay) {
    return (
      <div className={'space-y-4'}>
        <div>
          <Skeleton className={'h-4 w-20 mb-2 rounded-full animate-pulse'} />
          <Skeleton className={'h-4 w-48 mb-2 rounded-full animate-pulse'} />
          <div className='w-full grid grid-cols-2 gap-4'>
            <Skeleton className={'animate-pulse h-24 w-full'} />
            <Skeleton className={'animate-pulse h-24 w-full'} />
            <Skeleton className={'animate-pulse h-24 w-full'} />
            <Skeleton className={'animate-pulse h-24 w-full'} />
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
      <div className={'space-y-4'}>
        <div>
          <Skeleton className={'h-4 w-20 mb-2 rounded-full animate-pulse'} />
          <Skeleton className={'h-4 w-48 mb-2 rounded-full animate-pulse'} />
          <div className='w-full grid grid-cols-2 gap-4'>
            <Skeleton className={'animate-pulse h-24 w-full'} />
            <Skeleton className={'animate-pulse h-24 w-full'} />
            <Skeleton className={'animate-pulse h-24 w-full'} />
            <Skeleton className={'animate-pulse h-24 w-full'} />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
