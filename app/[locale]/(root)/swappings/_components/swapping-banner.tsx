import Image from 'next/image';

import SectionWrapper from '@/components/shared/SectionWrapper';
import { ModalProvider } from '@/contexts/modal-context';
import SwappingBannerBG from '@/public/swapping/banner.jpg';
import { LazySwappingFilter } from '.';
import SwappingBannerHeading from './swapping-banner-heading';

export default function SwappingBanner() {
  return (
    <section
      className={
        'bg-primary-100 dark:bg-primary-500/30 py-12 md:py-16 lg:py-20 rounded-2xl'
      }>
      <SectionWrapper>
        <div
          className={
            'h-dvh sm:h-dvh lg:h-auto w-full sm:aspect-square md:aspect-video lg:aspect-video xl:aspect-[22/9] rounded-2xl overflow-hidden bg-secondary-950 relative'
          }>
          <Image
            src={SwappingBannerBG}
            alt={'Swapping Banner'}
            // width={3192}
            // height={2128}
            fill
            sizes='(min-width: 1280px) 100vw, 80vw'
            placeholder='blur'
            className={'w-full h-full object-cover opacity-40'}
            blurDataURL={SwappingBannerBG.blurDataURL}
          />

          <SwappingBannerHeading />

          <ModalProvider>
            <LazySwappingFilter />
          </ModalProvider>
        </div>
      </SectionWrapper>
    </section>
  );
}
