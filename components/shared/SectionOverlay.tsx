import CompanyLogoPNG from '@/public/logos/company-symbol.png';
import CompanyLogoSVG from '@/public/logos/company-symbol.svg';
import Image from 'next/image';

export default function SectionOverlay(props: SectionOverlayProps) {
  const { children, description } = props;

  return (
    <div
      className={
        'absolute inset-0 h-full w-full grid place-items-center content-center gap-4 px-4 md:px-6 lg:px-8 xl:px-12 text-center'
      }>
      <div className={'size-20 xs:24 sm:28 md:size-32 lg:size-36 mx-auto'}>
        <Image
          src={CompanyLogoSVG}
          alt='Company Logo'
          width={140}
          height={192}
          className='w-full h-full object-contain'
          placeholder='blur'
          blurDataURL={CompanyLogoPNG.blurDataURL}
        />
      </div>
      <h2
        className={
          'text-primary-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold'
        }>
        {children}
      </h2>
      <p
        className={
          'text-tertiary-50 text-xs xs:text-sm md:text-base lg:text-lg font-medium'
        }>
        {description}
      </p>
    </div>
  );
}
