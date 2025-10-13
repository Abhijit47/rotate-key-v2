import AutoPlay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { trendingHomes } from '@/constants';
import { Link } from '@/i18n/navigation';
// import { A11y, Autoplay } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

// type TrendingProperties = {
//   id: string;
//   viewsCount: number;
//   createdAt: Date;
//   updatedAt: Date | null;
//   userId: string;
//   propertyId: string;
//   property: {
//     id: string;
//     streetAddress: string;
//     countryOrNation: string;
//     stateOrProvince: string;
//     propertyType: string;
//     propertyDescription: string;
//     propertyImages: string[];
//   };
// }[];

export default function TreandingHomeCarousel() {
  return (
    <div>
      {/* <Swiper
        spaceBetween={20}
        slidesPerView={1}
        modules={[Autoplay, A11y]}
        autoplay={
          isDev
            ? false
            : {
                delay: 3000,
                disableOnInteraction: !isDev,
              }
        }
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
        // thumbs={{ swiper: thumbsSwiper }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {trendingProperties.map((trendingProperty) => (
          <SwiperSlide key={trendingProperty.id}>
            <div className='aspect-square h-full w-full'>
              <Image
                src={trendingProperty.property.propertyImages[0]}
                alt={trendingProperty.property.propertyType}
                width={600}
                height={600}
                className='object-cover rounded-lg w-full h-full'
                loading='lazy'
              />
            </div>
            <div
              className={
                'mt-3 inline-grid grid-cols-4 w-full items-center justify-between gap-2'
              }>
              <div className={'flex flex-col gap-y-1 col-span-2'}>
                <h3 className='text-secondary-600 line-clamp-1 font-semibold'>
                  {trendingProperty.property.propertyType}
                </h3>
                <p className={'line-clamp-1'}>
                  {trendingProperty.property.propertyDescription}
                </p>
              </div>

              <div className={'col-span-2'}>
                <Link
                  href={`/swapping-places/${trendingProperty.property.id}`}
                  className={
                    'px-4 py-2 block text-center w-full bg-primary-500 text-tertiary-50 rounded-lg'
                  }>
                  See this property
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}

      <Carousel
        plugins={isDev ? undefined : [AutoPlay({ delay: 3000 })]}
        opts={{
          loop: true,
          direction: 'ltr',
          dragFree: true,
          dragThreshold: 10,
          duration: 200,
          startIndex: 0,
          slidesToScroll: 'auto',
        }}>
        <CarouselContent>
          {trendingHomes.map((trendingHome) => (
            <CarouselItem
              key={trendingHome.id}
              className='basis-6/12 lg:basis-1/3 relative'>
              <div className='aspect-square h-full w-full relative group'>
                <Image
                  src={trendingHome.image}
                  alt={trendingHome.title}
                  width={300}
                  height={300}
                  className='object-cover rounded-lg w-full h-full'
                />

                <div
                  className={
                    'hidden group-hover:inline-grid translate-y-1 transition-all duration-300 delay-150 ease-in-out grid-cols-4 w-full items-center justify-between gap-1 lg:gap-2 absolute left-0 bottom-0 backdrop-blur-xl bg-background/30 px-4 py-4 rounded-bl-xl rounded-br-xl'
                  }>
                  <div
                    className={
                      'flex flex-col gap-y-1 col-span-full lg:col-span-2'
                    }>
                    <h3 className='text-foreground line-clamp-1 text-sm font-semibold'>
                      {trendingHome.title}
                    </h3>
                    <p className={'text-muted-foreground text-xs'}>
                      {trendingHome.description}
                    </p>
                  </div>

                  <div className={'col-span-full lg:col-span-2'}>
                    <Link
                      href={'#'}
                      className={cn(
                        buttonVariants({ variant: 'default', size: 'sm' }),
                        'w-full'
                      )}>
                      See this property
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* <Swiper
        spaceBetween={20}
        slidesPerView={1}
        modules={[Autoplay, A11y]}
        autoplay={
          isDev
            ? false
            : {
                delay: 3000,
                disableOnInteraction: !isDev,
              }
        }
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
        // thumbs={{ swiper: thumbsSwiper }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {trendingHomes.map((trendingHome, index) => (
          <SwiperSlide key={index}>
            <div className='aspect-square h-full w-full'>
              <Image
                src={trendingHome.image}
                alt={trendingHome.title}
                width={300}
                height={300}
                className='object-cover rounded-lg w-full h-full'
              />
            </div>
            <div
              className={
                'mt-3 inline-grid grid-cols-4 w-full items-center justify-between gap-2'
              }>
              <div className={'flex flex-col gap-y-1 col-span-2'}>
                <h3 className='text-secondary-600 line-clamp-1 font-semibold'>
                  {trendingHome.title}
                </h3>
                <p>{trendingHome.description}</p>
              </div>

              <div className={'col-span-2'}>
                <Link
                  href={'#'}
                  className={
                    'px-4 py-2 block text-center w-full bg-primary-500 text-tertiary-50 rounded-lg'
                  }>
                  See this property
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}
