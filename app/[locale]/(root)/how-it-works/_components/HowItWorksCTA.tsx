import SectionWrapper from '@/components/shared/SectionWrapper';
// import HOWITWORKSCTABG2 from '@/public/how-it-works/cta.png';
import HOWITWORKSCTABG from '@/public/how-it-works/how-it-works-cta.jpg';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
// import { HiArrowRight } from 'react-icons/hi2';

export default function HowItWorksCTA() {
  return (
    <section className={'pb-8 md:pb-12 lg:pb-16 xl:pb-20'}>
      <SectionWrapper>
        {/* <div className={'aspect-[34/9] relative w-full h-full'}>
          <Image
            src={HOWITWORKSCTABG}
            alt=''
            // width={3288}
            // height={2192}
            fill
            sizes='(max-width: 768px) 100vw, 768px'
            className={'w-full h-full object-cover'}
            placeholder='blur'
            blurDataURL={HOWITWORKSCTABG.blurDataURL}
          />
        </div>
        <div className={'aspect-[34/9] relative w-full h-full'}>
          <Image
            src={HOWITWORKSCTABG2}
            alt=''
            // width={3288}
            // height={2192}
            fill
            sizes='(max-width: 768px) 100vw, 768px'
            className={'w-full h-full object-contain'}
            placeholder='blur'
            blurDataURL={HOWITWORKSCTABG2.blurDataURL}
          />
        </div> */}

        <div className=''>
          <div className='relative grid grid-cols-2 aspect-video md:aspect-auto rounded-xl overflow-hidden'>
            <div className='aspect-video h-full w-full'>
              <Image
                src={HOWITWORKSCTABG}
                alt='how-it-works-image'
                width={3288}
                height={2192}
                // fill
                // sizes='(max-width: 768px) 100vw, 768px'
                className={
                  'w-full h-full object-cover object-center absolute inset-0'
                }
                placeholder='blur'
                blurDataURL={HOWITWORKSCTABG.blurDataURL}
              />
              <div
                className={
                  'bg-gradient-to-b from-secondary-500 to-secondary-600 absolute inset-0 h-full w-full opacity-65'
                }></div>
            </div>
            <div className='absolute inset-0 z-[100] aspect-square h-full w-full bg-gradient-to-t from-emerald-600 via-primary-500 to-emerald-600 [clip-path:polygon(70%_0%,_100%_0%,_100%_100%,_50%_100%)]'>
              &nbsp;
            </div>

            <div className='absolute z-[100] grid h-full w-full grid-cols-3 place-items-center content-center text-center gap-2 lg:gap-4'>
              <div className={'col-span-3 lg:col-span-1'}>
                <div className={'aspect-[48/9] lg:aspect-[30/9]'}>
                  <Image
                    src={'/logos/logo-landscape-2.webp'}
                    alt='logo'
                    width={300}
                    height={80}
                    className={'w-full h-full object-cover'}
                  />
                </div>
                <p
                  className={
                    'font-tertiary hidden lg:block text-4xl text-right font-bold text-primary-500'
                  }>
                  money efficient
                </p>
              </div>
              <p className='col-span-3 text-tertiary-50 font-semibold text-xs sm:text-sm md:text-base lg:text-lg lg:col-span-1 px-4 lg:px-0 backdrop-blur-sm rounded-md p-2 lg:p-4'>
                Introducing Turn Keys Cost Escapes, where we offers numerous
                benefits, including cost saving, cultural immersion, and
                flexibility. It enables individuals to experience a new way of
                living while saving on accommodation costs.
              </p>

              <div className='col-span-3 lg:col-span-1'>
                <Link
                  href={'#'}
                  className='text-tertiary-50 text-lg font-semibold group'>
                  <span className={'block'}>Discover</span>
                  <span className={'inline-flex items-center gap-2'}>
                    <span className={'italic block'}>Money Efficient</span>
                    <span>
                      <ArrowRightIcon
                        className={
                          'size-4 md:size-6 group-hover:-ml-2 transition-all delay-300 ease-in-out'
                        }
                      />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
