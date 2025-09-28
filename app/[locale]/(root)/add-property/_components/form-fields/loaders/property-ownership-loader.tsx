import { Skeleton } from '@/components/ui/skeleton';
import { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';
import ComponentLoadError from '../component-load-error';

export default function PropertyOwnershipLoader(
  loadingProps: DynamicOptionsLoadingProps
): React.ReactNode {
  return <PropertyOwnershipLoaderElements loadingProps={loadingProps} />;
}

function PropertyOwnershipLoaderElements({
  loadingProps,
}: {
  loadingProps?: DynamicOptionsLoadingProps;
}) {
  const { pastDelay, error, isLoading, retry } = loadingProps || {};

  if (pastDelay) {
    return (
      <div className={'space-y-4'}>
        <div className={'grid grid-cols-1'}>
          <Skeleton className={'animate-pulse h-10 w-full'} />
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
        <div className={'grid grid-cols-1'}>
          <Skeleton className={'animate-pulse h-10 w-full'} />
        </div>
      </div>
    );
  }
  return null;
}
