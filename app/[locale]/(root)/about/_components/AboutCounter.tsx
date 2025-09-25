import SectionWrapper from '@/components/shared/SectionWrapper';
import { LandPlotIcon, ShieldUserIcon, Users2Icon } from 'lucide-react';
import CountUp from 'react-countup';
// import { FaLandmark, FaUsers } from 'react-icons/fa6';
// import { HiOutlineUsers } from 'react-icons/hi2';
// import { MdOutlineRealEstateAgent } from 'react-icons/md';

export default function AboutCounter() {
  return (
    <div className={'bg-primary-100 py-2 md:py-4 lg:py-6'}>
      <SectionWrapper className={''}>
        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'
          }>
          <CountUp
            start={0}
            end={1000}
            duration={2.75}
            // separator=''
            // decimals={0}
            // decimal=','
            prefix=''
            suffix=' +'
            redraw={true}
            preserveValue={true}
            startOnMount={false}
            useIndianSeparators={true}
            useGrouping={true}
            // onEnd={() => console.log('Ended! 👏')}
            // onStart={() => console.log('Started! 💨')}
          >
            {({ countUpRef }) => (
              <div
                className={
                  'aspect-video h-full w-full flex items-center justify-center gap-2 md:gap-4'
                }>
                <span
                  className={
                    'bg-gradient-to-b from-primary-500 to-primary-600 p-2 rounded-full'
                  }>
                  <Users2Icon
                    className={
                      'size-6 xs:size-8 lg:size-10 xl:size-12 stroke-primary-50'
                    }
                  />
                </span>
                <p className={'inline-flex flex-col gap-2'}>
                  <span className={'text-xl font-semibold'} ref={countUpRef} />
                  <span>Users</span>
                </p>
              </div>
            )}
          </CountUp>
          <CountUp
            start={0}
            end={20000}
            duration={2.75}
            // separator=''
            // decimals={0}
            // decimal=','
            prefix=''
            suffix=' +'
            redraw={true}
            preserveValue={true}
            startOnMount={false}
            useIndianSeparators={true}
            useGrouping={true}
            // onEnd={() => console.log('Ended! 👏')}
            // onStart={() => console.log('Started! 💨')}
          >
            {({ countUpRef }) => (
              <div
                className={
                  'aspect-video h-full w-full flex items-center justify-center gap-2 md:gap-4'
                }>
                <span
                  className={
                    'bg-gradient-to-b from-primary-500 to-primary-600 p-2 rounded-full'
                  }>
                  <ShieldUserIcon
                    className={
                      'size-6 xs:size-8 lg:size-10 xl:size-12 fill-primary-50'
                    }
                  />
                </span>
                <p className={'inline-flex flex-col gap-2'}>
                  <span className={'text-xl font-semibold'} ref={countUpRef} />
                  <span>Property</span>
                </p>
              </div>
            )}
          </CountUp>
          <CountUp
            start={0}
            end={10000}
            duration={2.75}
            // separator=''
            // decimals={0}
            // decimal=','
            prefix=''
            suffix=' +'
            redraw={true}
            preserveValue={true}
            startOnMount={false}
            useIndianSeparators={true}
            useGrouping={true}
            // onEnd={() => console.log('Ended! 👏')}
            // onStart={() => console.log('Started! 💨')}
          >
            {({ countUpRef }) => (
              <div
                className={
                  'aspect-video h-full w-full flex items-center justify-center gap-2 md:gap-4'
                }>
                <span
                  className={
                    'bg-gradient-to-b from-primary-500 to-primary-600 p-2 rounded-full'
                  }>
                  <LandPlotIcon
                    className={
                      'size-6 xs:size-8 lg:size-10 xl:size-12 fill-primary-50'
                    }
                  />
                </span>
                <p className={'inline-flex flex-col gap-2'}>
                  <span className={'text-xl font-semibold'} ref={countUpRef} />
                  <span>Lands</span>
                </p>
              </div>
            )}
          </CountUp>
          <CountUp
            start={0}
            end={1000}
            duration={2.75}
            // separator=''
            // decimals={0}
            // decimal=','
            prefix=''
            suffix=' +'
            redraw={true}
            preserveValue={true}
            startOnMount={false}
            useIndianSeparators={true}
            useGrouping={true}
            // onEnd={() => console.log('Ended! 👏')}
            // onStart={() => console.log('Started! 💨')}
          >
            {({ countUpRef }) => (
              <div
                className={
                  'aspect-video h-full w-full flex items-center justify-center gap-2 md:gap-4'
                }>
                <span
                  className={
                    'bg-gradient-to-b from-primary-500 to-primary-600 p-2 rounded-full'
                  }>
                  <Users2Icon
                    className={
                      'size-6 xs:size-8 lg:size-10 xl:size-12 fill-primary-50'
                    }
                  />
                </span>
                <p className={'inline-flex flex-col gap-2'}>
                  <span className={'text-xl font-semibold'} ref={countUpRef} />
                  <span>Buyers</span>
                </p>
              </div>
            )}
          </CountUp>
        </div>
      </SectionWrapper>
    </div>
  );
}
