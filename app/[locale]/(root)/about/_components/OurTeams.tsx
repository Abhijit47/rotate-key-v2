import SectionWrapper from '@/components/shared/SectionWrapper';
import Image from 'next/image';
import AvatarOverlay from './AvatarOverlay';

import About1 from '@/public/about/about1.jpg';
import About10 from '@/public/about/about10.jpg';
import About11 from '@/public/about/about11.jpg';
import About12 from '@/public/about/about12.jpg';
import About13 from '@/public/about/about13.jpg';
import About14 from '@/public/about/about14.jpg';
import About15 from '@/public/about/about15.jpg';
import About16 from '@/public/about/about16.jpg';
import About17 from '@/public/about/about17.jpg';
import About18 from '@/public/about/about18.jpg';
import About2 from '@/public/about/about2.jpg';
import About3 from '@/public/about/about3.jpg';
import About4 from '@/public/about/about4.jpg';
import About5 from '@/public/about/about5.jpg';
import About6 from '@/public/about/about6.jpg';
import About7 from '@/public/about/about7.jpg';
import About8 from '@/public/about/about8.jpg';
import About9 from '@/public/about/about9.jpg';

export default function OurTeams() {
  return (
    <SectionWrapper>
      <div className={'grid grid-cols-8 grid-rows-4'}>
        <div className={'col-span-2 row-span-2 relative group cursor-pointer'}>
          <Image
            src={About14}
            alt='grid-member-14'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About14.src}
          />
          <AvatarOverlay name='Jan' role='Founder' />
        </div>
        <div className={'col-start-3 col-span-3 row-span-2'}>
          <div
            className={
              'inline-grid w-full h-full place-items-center content-center gap-2 md:gap-4'
            }>
            <p className={'font-medium lg:font-semibold'}>Team Rotate keys</p>
            <h3
              className={
                'text-primary-500 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl'
              }>
              <span className={'block'}>Help us shape</span>
              <span className={'block'}>the future way of</span>
              <span className={'block'}>life and work</span>
            </h3>
          </div>
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About2}
            alt='grid-member-2'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About2.src}
          />
          <AvatarOverlay name='Lena' role='Booking' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About7}
            alt='grid-member-7'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About7.src}
          />
          <AvatarOverlay name='Nina' role='Marketing' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About6}
            alt='grid-member-6'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About6.src}
          />
          <AvatarOverlay name='Tom' role='Design' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About4}
            alt='grid-member-4'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About4.src}
          />
          <AvatarOverlay name='Lara' role='Development' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About10}
            alt='grid-member-10'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About10.src}
          />
          <AvatarOverlay name='Max' role='Development' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About5}
            alt='grid-member-5'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About5.src}
          />
          <AvatarOverlay name='Paul' role='Design' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About13}
            alt='grid-member-13'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About13.src}
          />
          <AvatarOverlay name='Lena' role='Booking' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About18}
            alt='grid-member-18'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About18.src}
          />
          <AvatarOverlay name='Nina' role='Marketing' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About8}
            alt='grid-member-8'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About8.src}
          />
          <AvatarOverlay name='Tom' role='Design' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About9}
            alt='grid-member-9'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About9.src}
          />
          <AvatarOverlay name='Lara' role='Development' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About15}
            alt='grid-member-15'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About15.src}
          />
          <AvatarOverlay name='Max' role='Development' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About3}
            alt='grid-member-3'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About3.src}
          />
          <AvatarOverlay name='Paul' role='Design' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About16}
            alt='grid-member-16'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About16.src}
          />
          <AvatarOverlay name='Lena' role='Booking' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About17}
            alt='grid-member-17'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About17.src}
          />
          <AvatarOverlay name='Nina' role='Marketing' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About11}
            alt='grid-member-11'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About11.src}
          />
          <AvatarOverlay name='Tom' role='Design' />
        </div>
        <div className={'relative group cursor-pointer'}>
          <Image
            src={About12}
            alt='grid-member-12'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About12.src}
          />
          <AvatarOverlay name='Lara' role='Development' />
        </div>

        <div className={'col-span-2 row-start-4 col-end-4'}>
          <div
            className={
              'inline-flex flex-wrap xs:flex-nowrap items-center justify-center w-full h-full gap-2 md:gap-4'
            }>
            <p
              className={
                'text-primary-500 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl'
              }>
              150+
            </p>
            <p className={'inline-flex flex-col gap-2'}>
              <span className={'text-xs sm:text-sm md:text-base font-medium'}>
                in Team
              </span>
              <span className={'text-xs sm:text-sm md:text-base font-medium'}>
                Rotate Keys
              </span>
            </p>
          </div>
        </div>
        <div
          className={
            'col-start-7 row-start-3 col-span-2 row-span-2 relative group cursor-pointer'
          }>
          <Image
            src={About1}
            alt='grid-member-1'
            width={1200}
            height={800}
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={About1.src}
          />
          <AvatarOverlay name='Jan' role='Founder' />
        </div>
      </div>
    </SectionWrapper>
  );
}
