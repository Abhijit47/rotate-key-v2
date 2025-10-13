'use client';

import { useSearchParams } from 'next/navigation';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { swappingSearchParams } from '@/lib/helpers/searchParams';

export default function SwappingFilterReset() {
  const [isTranstion, startTransition] = useTransition();
  // eslint-disable-next-line
  const [values, setValues] = useQueryStates(swappingSearchParams, {
    shallow: false,
    throttleMs: 150,
    history: 'replace',
  });

  const searchParams = useSearchParams();

  return (
    <div>
      <Button
        onClick={() => {
          // remove offset, limit, and type from the URL
          startTransition(() => {
            setValues({
              offset: '1',
              limit: '10',
              type: 'apartment',
            });
          });
        }}
        size={'sm'}
        variant={'destructive'}>
        {isTranstion ? (
          <span>
            <Spinner className={'size-4 animate-spin'} />
          </span>
        ) : null}
        {searchParams.size > 0
          ? `Reset Filters (${searchParams.size})`
          : 'Reset'}
      </Button>
    </div>
  );
}
