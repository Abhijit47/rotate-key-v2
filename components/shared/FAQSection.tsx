import { Link } from '@/i18n/navigation';
// import { HiArrowRight } from 'react-icons/hi2';
// import { FAQs } from '../dynamic';

// import { NewsLetterForm } from '../dynamic';
import { ArrowRightIcon } from 'lucide-react';
import Faqs from './Faqs';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';

export default function FAQSection() {
  return (
    <section
      className={'bg-primary-50 dark:bg-primary-700/50 py-8 md:py-12 lg:py-16'}>
      <SectionWrapper>
        <SectionHeading>
          <span className={'block text-secondary-700'}>Fequently</span>{' '}
          <span className={'block text-primary-500'}>asked questions</span>
        </SectionHeading>

        <div
          className={
            'grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12 lg:mt-16'
          }>
          <div className={''}>
            <Faqs />
          </div>

          <div className={'inline-grid place-items-center w-full h-full'}>
            <div className={'space-y-2 md:space-y-4 lg:space-y-6'}>
              <div className={'space-y-2 md:space-y-4 lg:space-y-6'}>
                <h4
                  className={
                    'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-500'
                  }>
                  How we can help you?
                </h4>
                <ul className={'list-inside list-disc space-y-2'}>
                  <li className={'text-sm md:text-base'}>
                    Follow our newsletter.
                  </li>
                  <li className={'text-sm md:text-base'}>
                    We will regulary update our latest project and availability.
                  </li>
                </ul>
              </div>

              <div className={'grid grid-cols-3 gap-2'}>
                <div className={'col-span-3 xs:col-span-2'}>NewsLetterForm</div>
              </div>

              <Link
                href={'#'}
                className={
                  'text-primary-500 font-semibold inline-flex items-center gap-1'
                }>
                <span>More FAQ</span>
                <span>
                  <ArrowRightIcon className={'inline-block'} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
