import { Skeleton } from '@/components/ui/skeleton';
import { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';
import ComponentLoadError from '../component-load-error';

export default function PropertyInformationLoader(
  loadingProps: DynamicOptionsLoadingProps
): React.ReactNode {
  return <PropertyInformationLoaderElements loadingProps={loadingProps} />;
}

function PropertyInformationLoaderElements({
  loadingProps,
}: {
  loadingProps?: DynamicOptionsLoadingProps;
}) {
  const { pastDelay, error, isLoading, retry } = loadingProps || {};

  if (pastDelay) {
    return (
      <div className={'space-y-4'}>
        <Skeleton className={'animate-pulse h-10 w-full'} />
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
        </div>
        <Skeleton className={'animate-pulse h-40 w-full'} />
      </div>
    );
  }
  if (error) {
    return <ComponentLoadError error={error} retry={retry} />;
  }
  if (isLoading) {
    return (
      <div className={'space-y-4'}>
        <Skeleton className={'animate-pulse h-10 w-full'} />
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
        </div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Skeleton className={'animate-pulse h-10 w-full'} />
          <Skeleton className={'animate-pulse h-10 w-full'} />
        </div>
        <Skeleton className={'animate-pulse h-40 w-full'} />
      </div>
    );
  }
  return null;
}
