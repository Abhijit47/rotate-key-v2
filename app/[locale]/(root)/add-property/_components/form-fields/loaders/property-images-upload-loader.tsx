import { Skeleton } from '@/components/ui/skeleton';
import { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';
import ComponentLoadError from '../component-load-error';

export default function PropertyImagesUploadLoader(
  loadingProps: DynamicOptionsLoadingProps
): React.ReactNode {
  return <PropertyImagesUploadLoaderElements loadingProps={loadingProps} />;
}

function PropertyImagesUploadLoaderElements({
  loadingProps,
}: {
  loadingProps?: DynamicOptionsLoadingProps;
}) {
  const { pastDelay, error, isLoading, retry } = loadingProps || {};

  if (pastDelay) {
    return (
      <div>
        <Skeleton className='h-24 w-full animate-pulse' />
      </div>
    );
  }
  if (error) {
    return <ComponentLoadError error={error} retry={retry} />;
  }
  if (isLoading) {
    return (
      <div>
        <Skeleton className='h-24 w-full animate-pulse' />
      </div>
    );
  }
  return null;
}
