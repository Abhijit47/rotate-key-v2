import { Skeleton } from '@/components/ui/skeleton';
import { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';
import ComponentLoadError from '../component-load-error';

export default function PropertyCheckInOrCheckoutLoader(
  loadingProps: DynamicOptionsLoadingProps
): React.ReactNode {
  return (
    <PropertyCheckInOrCheckoutLoaderElements loadingProps={loadingProps} />
  );
}

function PropertyCheckInOrCheckoutLoaderElements({
  loadingProps,
}: {
  loadingProps?: DynamicOptionsLoadingProps;
}) {
  const { pastDelay, error, isLoading, retry } = loadingProps || {};

  if (pastDelay) {
    return (
      <div className={'space-y-2'}>
        <Skeleton className={'animate-pulse h-3 w-56'} />
        <Skeleton className={'animate-pulse h-10 w-full'} />
        <Skeleton className={'animate-pulse h-3 w-96'} />
      </div>
    );
  }
  if (error) {
    return <ComponentLoadError error={error} retry={retry} />;
  }
  if (isLoading) {
    return (
      <div className={'space-y-2'}>
        <Skeleton className={'animate-pulse h-3 w-56'} />
        <Skeleton className={'animate-pulse h-10 w-full'} />
        <Skeleton className={'animate-pulse h-3 w-96'} />
      </div>
    );
  }
  return null;
}
