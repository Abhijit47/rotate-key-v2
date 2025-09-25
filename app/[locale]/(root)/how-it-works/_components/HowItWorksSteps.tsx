import SectionBadge from '@/components/shared/SectionBadge';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { howItWorksSteps } from '@/constants';
import {
  CheckCircle2Icon,
  FootprintsIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
// import {
//   HiOutlineArrowTopRightOnSquare,
//   HiOutlineCheckCircle,
// } from 'react-icons/hi2';
// import { IoFootstepsOutline } from 'react-icons/io5';

export default function HowItWorksSteps() {
  return (
    <section className={''}>
      <SectionWrapper>
        <div className='bg-primary-50 dark:bg-primary-700/30 space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-10 lg-py-12'>
          <div className='space-y-4 md:space-y-6 lg:space-y-8'>
            <SectionBadge
              align='center'
              className={'bg-primary-400 text-tertiary-50'}>
              How to begin your journey?
            </SectionBadge>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center'>
              Steps to House Swapping
            </h2>
          </div>

          <div className='max-w-32 sm:max-w-40 md:max-w-48 lg:max-w-56 mx-auto relative'>
            <div className='ring-1 ring-primary-500 aspect-square inline-grid w-full h-full place-items-center content-center rounded-full'>
              <Link
                href={'/auth/sign-up'}
                className={
                  'inline-grid text-center place-items-center content-center gap-2'
                }>
                <span>
                  <SquareArrowOutUpRightIcon
                    className={'size-4 md:size-6 lg:size-8'}
                  />
                </span>
                <span className='text-primary-500 text-sm md:text-base lg:text-lg font-medium px-2'>
                  Get Started For Free
                </span>
              </Link>
            </div>
          </div>

          <div className={'max-w-5xl mx-auto'}>
            <div className={'grid grid-cols-1 gap-4 md:gap-6 lg:gap-8'}>
              {howItWorksSteps.map((step) => (
                <div key={step.id} className={'grid grid-cols-3'}>
                  <div
                    className={
                      'hidden sm:col-span-1 sm:inline-grid place-items-center'
                    }>
                    <p
                      className={
                        'text-9xl font-extrabold bg-clip-text text-transparent bg-[url("/how-it-works/step-text-bg.png")] bg-center bg-cover bg-no-repeat'
                      }>
                      {step.stepNumber}
                    </p>
                  </div>
                  <div
                    className={
                      'col-span-3 sm:col-span-2 flex flex-col items-start justify-center p-4 space-y-4'
                    }>
                    <h3
                      className={
                        'text-lg lg:text-xl font-semibold inline-flex items-center gap-2'
                      }>
                      <span>
                        <FootprintsIcon
                          className={'size-4 md:size-6 lg:size-8'}
                        />
                      </span>
                      {step.title}
                    </h3>
                    <div className={'grid grid-cols-1 gap-2'}>
                      <ul className={'space-y-2 inline-grid'}>
                        {step.steps.map((item) => (
                          <li
                            key={item.id}
                            className={
                              'text-sm inline-flex items-center gap-1'
                            }>
                            <span>
                              <CheckCircle2Icon
                                className={
                                  'inline-block stroke-primary-500 size-4 md:size-6'
                                }
                              />
                            </span>
                            <span className={'text-sm md:text-base'}>
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
