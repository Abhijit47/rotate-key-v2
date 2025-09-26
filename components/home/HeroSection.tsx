import HeroBGPNG from '@/public/home/hero.png';
import HeroBGSVG from '@/public/home/hero.svg';
import HeroGraphic from '@/public/home/Waves.png';
import Image from 'next/image';
import { HeroSearch, KeyWordTags } from '../dynamic';
import SectionContextWrapper from '../shared/SectionContextWrapper';
import SectionDescription from '../shared/SectionDescription';
import SectionWrapper from '../shared/SectionWrapper';
// import SearchHomes from './SearchHomes';

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
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
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
                'h-16 w-fit absolute bottom-16 right-10 xl:left-10 z-10'
              }>
              <KeyWordTags />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </SectionContextWrapper>
  );
}
