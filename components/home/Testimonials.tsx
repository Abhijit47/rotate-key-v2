'use client';

import { testimonials } from '@/constants';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useState } from 'react';

import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Swiper
      modules={[Autoplay, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      // autoplay={{
      //   delay: 3000,
      //   disableOnInteraction: true,
      // }}
      breakpoints={{
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 1.3,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 1.3,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1.3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 1.6,
          spaceBetween: 50,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 50,
        },
        1536: {
          slidesPerView: 2.8,
          spaceBetween: 50,
        },
      }}
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
        setCurrentSlide(current.activeIndex);
      }}>
      {testimonials.map((testimonial, idx) => (
        <SwiperSlide
          key={testimonial.id}
          className={'aspect-square md:aspect-video h-full w-full my-6 mx-4'}>
          <div
            className={cn(
              currentSlide === idx
                ? 'bg-primary-50 ring-primary-500'
                : 'bg-secondary-50 ring-secondary-500',
              'ring-1 h-full w-full p-4 rounded-2xl space-y-1 sm:space-y-2 md:space-y-4 transition-all duration-300 inline-grid content-center'
            )}>
            <h4
              className={cn(
                currentSlide === idx
                  ? 'text-primary-500'
                  : 'text-secondary-500',
                'font-semibold text-xl transition-all duration-300'
              )}>
              {testimonial.name}
            </h4>
            <p className='text-secondary-600 text-sm'>{testimonial.message}</p>
            <p className='inline-flex items-center gap-1'>
              <Star className='w-4' />
              <Star className='w-4' />
              <Star className='w-4' />
              <Star className='w-4' />
              <Star className='w-4' />
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
