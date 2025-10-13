import { Pagination } from '@ark-ui/react/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';

import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
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
      <SectionWrapper>
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
              <Button disabled={isLoading} variant={'outline'}>
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
                        variant={page.value === index ? 'default' : 'outline'}
                        className={cn(
                          'data-[active]:bg-secondary-500 data-[active]:text-white',
                          'data-[current]:bg-secondary-500 data-[current]:text-white'
                        )}>
                        {page.value}
                      </Button>
                    </Pagination.Item>
                  ) : (
                    <Pagination.Ellipsis key={index} index={index} asChild>
                      <Button variant={'outline'}>&#8230;</Button>
                    </Pagination.Ellipsis>
                  )
                )
              }
            </Pagination.Context>
            <Pagination.NextTrigger asChild>
              <Button disabled={isLoading} variant={'outline'}>
                <span className={'sr-only'}>Next Page</span>
                <ChevronRight className={'size-4 md:size-6'} />
              </Button>
            </Pagination.NextTrigger>
          </Pagination.Root>
        </div>

        {/* <div className={'flex items-center justify-center gap-4 py-4'}>
          <Button>
            <span className={'sr-only'}>prev</span>
            <HiChevronDoubleLeft className={'size-4 md:size-6'} />
          </Button>
          <div className={'inline-flex items-center gap-4 px-2'}>
            <span className={'block'}>Page</span>
            <div>
              <label className='sr-only'>Page number</label>
              <div className='relative inline-flex items-center gap-x-2'>
                <select
                  className={cn(
                    'block w-full appearance-none rounded-lg border-none bg-tertiary-50 py-1.5 px-8 text-sm/6 text-secondary-500',
                    'focus:outline-none ring-1 ring-secondary-300 data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary-500',
                    // Make the text of each option black on Windows
                    '*:text-secondary-900'
                  )}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
                <HiChevronDown
                  className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-secondary-500'
                  aria-hidden='true'
                />
              </div>
            </div>
            <span className={'block'}>of 10</span>
          </div>
          <Button>
            <span className={'sr-only'}>next</span>
            <HiChevronDoubleRight className={'size-4 md:size-6'} />
          </Button>
        </div> */}
      </SectionWrapper>
    </section>
  );
}
