'use client';

import { initialTags } from '@/constants';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function KeywordTags() {
  // const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
          stopOnFocusIn: true,
          active: true,
        }),
      ]}
      opts={{
        active: true,
        align: 'start',
        loop: true,
        slidesToScroll: 1,
        skipSnaps: true,
        watchSlides: (emblaApi) => {
          console.log('watchSlides', emblaApi);
        },
        startIndex: 0,
      }}
      orientation='vertical'
      className='w-full h-full'>
      <CarouselContent className='h-20 px-1'>
        {initialTags.map((tag, index) => (
          <CarouselItem
            key={index}
            className='mt-1 basis-2/4 md:basis-1/2 pt-1'>
            <div
              // className={cn(
              //   currentSlide === index
              //     ? 'bg-primary-500 ring-primary-100 text-tertiary-50'
              //     : 'bg-background ring-secondary-500 text-muted-foreground',
              //   'w-full h-full inline-flex justify-center items-center rounded-lg px-4 py-2 font-semibold text-sm sm:text-base lg:text-lg shadow-lg'
              // )}
              className={
                'w-full h-full inline-flex justify-center items-center rounded-lg px-4 py-2 font-semibold text-sm sm:text-base shadow-lg bg-background ring-secondary-500 text-muted-foreground'
              }>
              {tag}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
