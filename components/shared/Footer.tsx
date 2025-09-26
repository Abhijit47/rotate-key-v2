import { footerLinks } from '@/constants';
import { Link } from '@/i18n/navigation';
import Logo from '@/public/logos/logo-landscape-2.webp';
import Image from 'next/image';
// import { BsArrowRight } from 'react-icons/bs';
// import { FaEnvelope, FaPhone, FaRegMap } from 'react-icons/fa6';
// import { HiChevronDoubleDown } from 'react-icons/hi2';
import {
  ArrowRight,
  ChevronsDownIcon,
  Mails,
  MapPinned,
  PhoneCall,
} from 'lucide-react';
import { Separator } from '../ui/separator';
import SectionWrapper from './SectionWrapper';

export default function Footer() {
  return (
    <footer className='py-20 bg-foreground dark:bg-background'>
      <SectionWrapper>
        <div className={'space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12'}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8'>
            <div className='inline-grid gap-8'>
              <Link
                href='/'
                className='flex items-center w-auto h-16 xs:w-48 sm:w-72 justify-self-start lg:w-full'>
                <Image
                  className='object-cover w-full h-full'
                  src={Logo}
                  alt='footer-logo'
                  width={800}
                  height={80}
                />
              </Link>

              <Separator />
              {/* <div className='border-b border-secondary-200' /> */}

              <div className='space-y-4 text-sm text-tertiary-300'>
                <div className={'flex items-center gap-2'}>
                  <span className={'block self-start'}>
                    <MapPinned className={'size-4 md:size-6'} />
                  </span>
                  <div>
                    <h5 className={'test-xs sm:text-sm md:text-base'}>
                      Bengaluru (HQ)
                    </h5>
                    <p className={'test-xs sm:text-sm'}>
                      #12 Second Floor 3rd Cross
                      <br />
                      Patel Narayana Reddy Layout
                      <br />
                      6th Block Koramangala <br />
                      Bengaluru -560095
                    </p>
                  </div>
                </div>

                <div
                  className={
                    'flex items-center gap-2 group transition-all delay-300 ease-in-out'
                  }>
                  <span
                    className={'block self-start group-hover:text-primary-500'}>
                    <PhoneCall className={'size-4 md:size-6'} />
                  </span>
                  <Link
                    href={`tel:+91 12345-67890`}
                    target='_blank'
                    className={
                      'block test-xs sm:text-sm group-hover:text-primary-500'
                    }>
                    +91 12345-67890
                  </Link>
                </div>

                <div
                  className={
                    'flex items-center gap-2 group transition-all delay-300 ease-in-out'
                  }>
                  <span
                    className={'block self-start group-hover:text-primary-500'}>
                    <Mails className={'size-4 md:size-6'} />
                  </span>
                  <Link
                    href={`mailto:rotatekey@gmail.com`}
                    target='_blank'
                    className={
                      'block test-xs sm:text-sm group-hover:text-primary-500'
                    }>
                    rotatekey@gmail.com
                  </Link>
                </div>

                <Link
                  href='#'
                  className={
                    'flex w-full items-center gap-2 test-xs sm:text-sm'
                  }>
                  <span>See Details</span>
                  <span>
                    <ArrowRight className={'size-4 md:size-6'} />
                  </span>
                </Link>
              </div>
            </div>

            {Object.keys(footerLinks).map((header: string) => (
              <div key={header} className='space-y-4'>
                <div className='flex items-center gap-2 text-tertiary-600'>
                  <h6 className='text-xl capitalize'>{header}</h6>

                  <span className=''>
                    <ChevronsDownIcon className='size-4' />
                  </span>
                </div>

                <ul className='space-y-2 text-sm text-tertiary-500'>
                  {Object.values(footerLinks[header]).map(
                    (link: FooterLink) => (
                      <li
                        key={link.id}
                        className={
                          'group transition-all delay-300 ease-in-out'
                        }>
                        <Link
                          href={link.link}
                          className={'group-hover:text-primary-500'}>
                          {link.title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className='flex justify-center'>
            <p className='text-sm font-bold text-tertiary-500'>
              Copyright &copy; {new Date().getFullYear()} Rotate Keys. All Right
              Reserved
            </p>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
