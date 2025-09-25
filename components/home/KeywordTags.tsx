'use client';

import { initialTags } from '@/constants';
import { cn } from '@/lib/utils';

import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function KeywordTags() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div
    // className={'absolute bottom-16 left-10 h-12 w-fit'}
    >
      <Swiper
        direction={'vertical'}
        modules={[Autoplay]}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: true,
        // }}
        grabCursor={true}
        loop={true}
        rewind={true}
        edgeSwipeDetection={true}
        draggable={true}
        followFinger={true}
        touchReleaseOnEdges={true}
        simulateTouch={true}
        onSlideChange={(current) => {
          // update current slide index
          setCurrentSlide(current.realIndex);
        }}
        className='w-full h-12 gap-2 md:h-14 lg:h-16 mySwiper'>
        {initialTags.map((tag, index) => (
          <SwiperSlide key={index} className={'w-full h-fit p-2'}>
            <div
              className={cn(
                currentSlide === index
                  ? 'bg-primary-500 ring-primary-100 text-tertiary-50'
                  : 'bg-secondary-50 ring-secondary-500 text-secondary-700',
                'w-full h-full inline-flex justify-center items-center rounded-lg px-4 py-2 font-semibold text-sm sm:text-base lg:text-lg xl:text-xl shadow-lg'
              )}>
              {tag}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
