import GeometryLeftPNG from '@/public/home/Geometry-Left.png';
import GeometryLeftSVG from '@/public/home/Geometry-Left.svg';
import GeometryRightPNG from '@/public/home/Geometry-Right.png';
import GeometryRightSVG from '@/public/home/Geometry-Right.svg';
import GridGraphicPNG from '@/public/home/Grid.png';
import GridGraphicSVG from '@/public/home/Grid.svg';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import SectionBadge from '../shared/SectionBadge';
import SectionHeading from '../shared/SectionHeading';
import SectionHeadingGroup from '../shared/SectionHeadingGroup';
import SectionWrapper from '../shared/SectionWrapper';

export default function CTASection() {
  return (
    <section className={'bg-secondary-900 relative'}>
      <div className={'absolute left-0 top-0 hidden lg:block'}>
        <div className={'w-full h-full'}>
          <Image
            src={GeometryLeftSVG}
            alt='Geometry Left'
            className='object-cover w-full h-full'
            width={181}
            height={256}
            placeholder='blur'
            blurDataURL={GeometryLeftPNG.blurDataURL}
          />
        </div>
      </div>
      <div className={'absolute right-0 top-0 hidden lg:block'}>
        <div className={'w-full h-full'}>
          <Image
            src={GeometryRightSVG}
            alt='Geometry Right'
            className='object-cover w-full h-full'
            width={181}
            height={256}
            placeholder='blur'
            blurDataURL={GeometryRightPNG.blurDataURL}
          />
        </div>
      </div>
      <SectionWrapper>
        <div className='grid content-center gap-4 py-16 text-center sm:gap-6 md:gap-8 lg:gap-10 md:py-20 lg:py-24 xl:py-28'>
          <SectionBadge>Smarter Way to Exchange Houses</SectionBadge>

          <SectionHeadingGroup className={'space-y-2 lg:space-y-4'}>
            <SectionHeading>
              <span className={'block'}>Become One Of 10,000+ Member</span>
              <span className={'block'}>of Our Global Community</span>
            </SectionHeading>

            <p className='w-8/12 mx-auto text-xs text-center text-secondary-50 sm:text-sm md:text-base lg:text-lg xl:text-xl'>
              Embrace a world of endless possibilities as you connect with
              like-minded individuals who share a passion for exploration and
              unique travel experiences. As a valued member, you&apos;ll have
              exclusive access to a diverse range of homes, fostering
              connections that transcend borders. Join Rotate Keys today and be
              part of a growing community that believes in the power of shared
              adventures and creating memories that last a lifetime.
            </p>
          </SectionHeadingGroup>

          <div className='justify-self-center'>
            <Link
              href='/sign-up'
              className='block px-4 py-3 text-sm font-semibold rounded bg-primary-500 text-secondary-50 shadow-sm shadow-secondary-500'>
              Get Started-It&apos;s Free
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <div className={'absolute right-0 -bottom-0 hidden lg:block'}>
        <div className={'w-full h-full'}>
          <Image
            src={GridGraphicSVG}
            alt='Grid Graphic'
            className='object-cover w-full h-full'
            width={181}
            height={256}
            placeholder='blur'
            blurDataURL={GridGraphicPNG.blurDataURL}
          />
        </div>
      </div>
    </section>
  );
}
