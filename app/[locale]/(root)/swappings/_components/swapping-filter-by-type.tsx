import { Loader2 } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';
// import AutoPlay from 'embla-carousel-autoplay';
// import { type EmblaOptionsType } from 'embla-carousel';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { propertyTypes } from '@/constants';
import { swappingSearchParams } from '@/lib/helpers/searchParams';
import { cn } from '@/lib/utils';

export default function SwappingFilterByType() {
  const types = propertyTypes.map((type) => type.categoryTypes).flat();
  const [isTransition, startTransition] = useTransition();

  const [{ type: selectedType }, setValues] = useQueryStates(
    swappingSearchParams,
    {
      shallow: false,
      throttleMs: 300,
      history: 'replace',
    }
  );

  return (
    <div>
      <div className={'flex items-center gap-4'}>
        <Card className={'p-2 gap-2 w-full'}>
          <Carousel
            // plugins={[AutoPlay({ delay: 3000 })]}
            opts={{
              // align: 'center',
              // containScroll: 'keepSnaps',
              loop: true,
              direction: 'ltr',
              dragFree: true,
              dragThreshold: 10,
              duration: 200,
              startIndex: 0,
              slidesToScroll: 'auto',
            }}>
            <CarouselContent className={'-ml-4'}>
              {types.map((type, index) => (
                <CarouselItem
                  key={index}
                  className='pl-4 basis-6/12 sm:basis-3/12 lg:basis-2/12 group'>
                  <Button
                    disabled={isTransition}
                    variant={
                      selectedType === type.name.toLowerCase()
                        ? 'default'
                        : 'outline'
                    }
                    // defaultChecked={type.name.toLowerCase() === selectedType}
                    value={type.name}
                    className={cn(
                      'w-full h-full ring-1 ring-primary-500 flex flex-col gap-1 items-center group-hover:ring-1 group-hover:ring-primary-500 px-3 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    onClick={() => {
                      startTransition(() => {
                        // setSelectedType(type.name.toLowerCase());
                        setValues((prev) => ({
                          ...prev,
                          type: type.name.toLowerCase(),
                        }));
                      });
                    }}>
                    {isTransition ? (
                      <span>
                        <Loader2 className={'size-4 md:size-6 animate-spin'} />
                      </span>
                    ) : (
                      <span className=''>
                        {
                          <type.icon
                            className={cn(
                              'size-8 text-primary-500 group-hover:text-primary-500 dark:group-hover:text-primary-100',
                              selectedType === type.name.toLowerCase() &&
                                'text-muted-foreground'
                            )}
                          />
                        }
                      </span>
                    )}

                    <span
                      className={cn(
                        'text-xs font-medium text-wrap text-clip text-primary-500 dark:group-hover:text-primary-100',
                        selectedType === type.name.toLowerCase() &&
                          'font-semibold text-white'
                      )}>
                      {type.name}
                    </span>
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Card>
      </div>
    </div>
  );
}
