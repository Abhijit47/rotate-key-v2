// import featureImage1 from '@/public/home/feature-1.svg';
// import featureImage2 from '@/public/home/feature-2.svg';
// import featureImage3 from '@/public/home/feature-3.svg';
import { features } from '@/constants';
import Image from 'next/image';
// import SectionHeading from '../shared/SectionHeading';
import SectionWrapper from '../shared/SectionWrapper';
import { AspectRatio } from '../ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function FeaturesSection() {
  return (
    <section className='bg-primary-50 dark:bg-primary-700/30'>
      <SectionWrapper
        className={
          'space-y-6 lg:space-y-8 xl:space-y-12 py-8 lg:py-12 xl:py-16'
        }>
        {/* <SectionHeading align='center' className={'text-secondary-500'}>
          <span className={'block'}>Features That Set Us Apart</span>
        </SectionHeading> */}

        <h2
          className={
            'text-6xl font-bold text-center font-primary bg-gradient-to-t bg-clip-text text-transparent from-primary-600 to-primary-300'
          }>
          Features That Set Us Apart
        </h2>

        <div className='grid w-full h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8'>
          {features.map((feature) => (
            <Card
              className={
                'lg:hover:-translate-y-2 transition-all delay-150 ease-in-out cursor-pointer w-full h-full ring-1 ring-primary-400 shadow-xl hover:shadow-md'
              }
              key={feature.id}>
              <CardContent className={'p-2'}>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className='object-contain w-full h-full'
                    // fill={true}
                    // sizes='(max-width: 768px) 100vw, 422px'
                    width={422}
                    height={300}
                  />
                </AspectRatio>
              </CardContent>
              <CardHeader className={''}>
                <CardTitle>
                  <h4 className='text-base font-medium text-center lg:text-lg'>
                    {feature.title}
                  </h4>
                </CardTitle>
                <CardDescription>
                  <p className='text-sm text-center text-secondary-400 md:text-base font-regular'>
                    {feature.description}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* <div className='grid w-full h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8'>
          {features.map((feature) => (
            <figure
              key={feature.id}
              className={
                'h-full ring-1 p-4 ring-primary-400 shadow-xl hover:shadow-md transition-all delay-300 cursor-pointer ease-in-out rounded-lg w-full space-y-6'
              }>
              <div className={'w-full h-fit aspect-square'}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className='object-contain w-full h-full'
                  // fill={true}
                  // sizes='(max-width: 768px) 100vw, 422px'
                  width={422}
                  height={300}
                />
              </div>

              <div
                className={'px-4 space-y-2 md:space-y-4 py-4 md:py-6 lg:py-8'}>
                <h4 className='text-base font-medium text-center lg:text-lg'>
                  {feature.title}
                </h4>
                <p className='text-sm text-center text-secondary-400 md:text-base font-regular'>
                  {feature.description}
                </p>
              </div>
            </figure>
          ))}
        </div> */}
      </SectionWrapper>
    </section>
  );
}
