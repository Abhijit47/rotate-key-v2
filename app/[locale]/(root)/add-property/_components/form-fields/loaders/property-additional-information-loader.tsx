import { Skeleton } from '@/components/ui/skeleton';
import { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';
import ComponentLoadError from '../component-load-error';

export default function PropertyAdditionalInformationLoader(
  loadingProps: DynamicOptionsLoadingProps
): React.ReactNode {
  return (
    <PropertyAdditionalInformationLoaderElements loadingProps={loadingProps} />
  );
}

function PropertyAdditionalInformationLoaderElements({
  loadingProps,
}: {
  loadingProps?: DynamicOptionsLoadingProps;
}) {
  const { pastDelay, error, isLoading, retry } = loadingProps || {};

  if (pastDelay) {
    return (
      <div className={'space-y-4'}>
        <div className={'space-y-4'}>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'grid grid-cols-1'}>
            <Skeleton className={'animate-pulse h-10 w-full'} />
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
        <div className={'space-y-4'}>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'space-y-2'}>
            <Skeleton className={'animate-pulse h-4 w-96'} />
            <div className={'flex items-center gap-4'}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className={'animate-pulse h-10 w-36'} />
              ))}
            </div>
          </div>
          <div className={'grid grid-cols-1'}>
            <Skeleton className={'animate-pulse h-10 w-full'} />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
