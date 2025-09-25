import HeroBGPNG from '@/public/home/hero.png';
import HeroBGSVG from '@/public/home/hero.svg';
import HeroGraphic from '@/public/home/Waves.png';
import Image from 'next/image';
import { HeroSearch } from '../dynamic';
import SectionContextWrapper from '../shared/SectionContextWrapper';
import SectionDescription from '../shared/SectionDescription';
import SectionWrapper from '../shared/SectionWrapper';
// import SearchHomes from './SearchHomes';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { initialTags } from '@/constants';

export default function HeroSection() {
  return (
    <SectionContextWrapper>
      <div className={'absolute top-8 left-0 hidden xl:block'}>
        <figure className={'relative size-20 -rotate-12'}>
          <Image
            src={HeroGraphic}
            alt='hero-graphics'
            className='object-cover w-full h-full'
            // width={133}
            // height={268}
            fill
            sizes='(max-width: 640px) 100vw, 100vw'
            // placeholder='blur'
            // blurDataURL={HeroGraphic.blurDataURL}
          />
        </figure>
      </div>

      <SectionWrapper>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <div className='inline-grid content-center w-full h-full gap-4 py-8 sm:py-12 md:py-16 md:gap-6 lg:gap-8'>
            <h1 className='text-4xl font-semibold md:font-bold lg:font-extrabold md:text-4xl lg:text-5xl xl:text-7xl font-secondary'>
              Unlock the Door to Your Next Adventure with
              <span className='text-[#09A350]'> Rotate Keys</span>.
            </h1>
            <SectionDescription
              align='left'
              className={'dark:text-secondary-200'}>
              Rotate Keys is not just a platform; it&apos;s a community of
              like-minded individuals sharing the joy of exploration and
              discovery. Your dream house swap is just a click away.
            </SectionDescription>

            {/* <PropertyFilter /> */}
            <HeroSearch />
          </div>

          <div className='relative flex justify-end'>
            <Image
              src={HeroBGSVG}
              alt='hero'
              className='object-cover w-full h-full'
              width={914}
              height={867}
              priority
              placeholder='blur'
              blurDataURL={HeroBGPNG.blurDataURL}
            />

            <div
              className={
                'h-20 w-fit bg-red-900 absolute bottom-16 left-10 z-10'
              }>
              <CarouselOrientation />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </SectionContextWrapper>
  );
}

export function CarouselOrientation() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      orientation='vertical'
      className='w-full h-full'>
      <CarouselContent className='-mt-1 h-[100px]'>
        {/* {initialTags.map((tag, index) => (
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
        ))} */}

        {initialTags.map((tag, index) => (
          <CarouselItem key={index} className='pt-1 md:basis-1/2'>
            <div className='p-1'>
              <Card className={'py-2 gap-2'}>
                <CardContent className='flex items-center justify-center p-6'>
                  <span className='text-3xl font-semibold'>{tag}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
