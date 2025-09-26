import ReadySwapGraphicPNG from '@/public/home/ready-swap-bg-graphic.png';
import ReadySwapGraphicSVG from '@/public/home/ready-swap-bg-graphic.svg';
import ReadySwappingPNG from '@/public/home/ready_to_swap_demo_docs.png';
import ReadySwappingSVG from '@/public/home/ready_to_swap_demo_docs.svg';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { ChevronRightCircle } from 'lucide-react';
import { useLocale } from 'next-intl';
import SectionBadge from '../shared/SectionBadge';
import SectionDescription from '../shared/SectionDescription';
import SectionHeading from '../shared/SectionHeading';
import SectionHeadingGroup from '../shared/SectionHeadingGroup';
import SectionWrapper from '../shared/SectionWrapper';
import { Button } from '../ui/button';

export default function ReadyToSwap() {
  const locale = useLocale();
  return (
    <section
      className={
        'bg-foreground dark:bg-background py-8 md:py-10 lg:py-12 xl:py-16 relative'
      }>
      <SectionWrapper className={''}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className=''>
            <Image
              src={ReadySwappingSVG}
              alt='readytoswap'
              className='w-full h-full'
              width={635}
              height={851}
              placeholder='blur'
              blurDataURL={ReadySwappingPNG.blurDataURL}
            />
          </div>

          <div className='inline-grid content-center w-full h-full py-8 sm:py-12 md:py-16 lg:py-0 gap-y-8'>
            <SectionBadge align='left'>
              The smart way to Exchange Houses
            </SectionBadge>

            <SectionHeadingGroup
              className={'space-y-4 lg:space-y-6 xl:space-y-8'}>
              <SectionHeading align='left' className={'text-primary-100'}>
                <span className={'block'}>
                  Ready to Swap Homes and Create Memories ?
                </span>
              </SectionHeading>

              <SectionDescription className={'text-secondary-100'}>
                Become part of a community that values trust, diversity, and
                unforgettable experiences. Find your perfect match with detailed
                profiles and customizable search filters.
              </SectionDescription>
            </SectionHeadingGroup>

            <div className={'justify-self-center'}>
              <Button asChild>
                <Link
                  href={'/swappings'}
                  locale={locale}
                  // className='inline-flex items-center gap-2 px-4 py-3 text-sm rounded bg-primary-500 text-tertiary-50 justify-self-center'
                >
                  <span>I want to Exchange My Home</span>
                  <span>
                    <ChevronRightCircle className='size-4' />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className={'absolute right-0 bottom-0 hidden lg:block'}>
          <div className={''}>
            <Image
              src={ReadySwapGraphicSVG}
              alt='readytoswap'
              className='object-contain w-full h-full'
              width={356}
              height={731}
              // fill
              // sizes='(min-width: 1024px) 356px, (min-width: 640px) 356px, 100vw'
              placeholder='blur'
              blurDataURL={ReadySwapGraphicPNG.blurDataURL}
            />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
