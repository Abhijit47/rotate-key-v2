import { Pagination } from '@ark-ui/react/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { swappingSearchParams } from '@/lib/helpers/searchParams';
import { cn } from '@/lib/utils';

export default function SwappingPagination({
  totalProperties,
}: {
  totalProperties: number;
}) {
  const [isLoading, startTransition] = useTransition();
  const [{ offset }, setValues] = useQueryStates(swappingSearchParams, {
    shallow: false,
    throttleMs: 300,
    history: 'replace',
  });

  // const TOTAL_DOCUMENTS = 100; // This should be dynamically fetched or passed as a prop
  const PER_PAGE = Math.ceil(totalProperties / 10);

  return (
    <section className={'pb-16'}>
      <Card>
        <div className={'flex items-center justify-center w-full'}>
          <Pagination.Root
            count={totalProperties}
            pageSize={PER_PAGE}
            siblingCount={2}
            page={Number(offset)}
            onPageChange={(page) => {
              startTransition(() => {
                setValues({ offset: String(page.page) });
              });
            }}
            className={'flex items-center gap-4'}>
            <Pagination.PrevTrigger asChild>
              <Button disabled={isLoading} size={'sm'}>
                <span className={'sr-only'}>Previous Page</span>
                <ChevronLeft className={'size-4 md:size-6'} />
              </Button>
            </Pagination.PrevTrigger>
            <Pagination.Context>
              {(pagination) =>
                pagination.pages.map((page, index) =>
                  page.type === 'page' ? (
                    <Pagination.Item key={index} {...page} asChild>
                      <Button
                        disabled={isLoading}
                        size={'sm'}
                        variant={page.value === index ? 'default' : 'secondary'}
                        className={cn(
                          'data-[active]:bg-secondary-500 data-[active]:text-muted-foreground',
                          'data-[current]:bg-secondary-500 data-[current]:text-white'
                        )}>
                        {page.value}
                      </Button>
                    </Pagination.Item>
                  ) : (
                    <Pagination.Ellipsis key={index} index={index} asChild>
                      <Button size={'sm'}>&#8230;</Button>
                    </Pagination.Ellipsis>
                  )
                )
              }
            </Pagination.Context>
            <Pagination.NextTrigger asChild>
              <Button disabled={isLoading} size={'sm'}>
                <span className={'sr-only'}>Next Page</span>
                <ChevronRight className={'size-4 md:size-6'} />
              </Button>
            </Pagination.NextTrigger>
          </Pagination.Root>
        </div>
      </Card>
    </section>
  );
}
