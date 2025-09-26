import SectionBadge from '@/components/shared/SectionBadge';
import SectionHeadingWithDivider from '@/components/shared/SectionHeadingWithDivider';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { whyTurnKeys } from '@/constants';
import Image from 'next/image';

// import WhyImageImage1 from '@/public/how-it-works/why-img-1.svg';
// import WhyImageImage2 from '@/public/how-it-works/why-img-2.svg';
// import WhyImageImage3 from '@/public/how-it-works/why-img-3.svg';

export default function WhyTurnKeys() {
  return (
    <section className={'py-8 sm:py-12 md:py-16 lg-py-20'}>
      <SectionWrapper className={'space-y-8 md:space-y-12 lg:space-y-16'}>
        <div className={'space-y-4 md:space-y-6 lg:space-y-8'}>
          <SectionBadge align='center' className={'bg-secondary-100'}>
            Uniqueness of Us
          </SectionBadge>
          <SectionHeadingWithDivider>
            Why <span className={'inline-block text-primary-500'}>R</span>
            otate <span className={'inline-block text-primary-500'}>K</span>
            eys?
          </SectionHeadingWithDivider>
        </div>
        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'
          }>
          {whyTurnKeys.map((item) => (
            <Card
              key={item.id}
              className={
                'shadow-md hover:shadow-lg hover:cursor-pointer transition-all delay-150 ease-in-out'
              }>
              <CardContent>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className={'w-full h-full object-contain'}
                    width={324}
                    height={320}
                  />
                </AspectRatio>
              </CardContent>

              <Separator />

              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
          {/* {whyTurnKeys.map((item) => (
            <figure
              key={item.id}
              className={
                'flex flex-col p-2 items-center justify-center aspect-square space-y-2 md:space-y-4 lg:space-y-6'
              }>
              <Image
                src={item.image}
                alt={item.title}
                className={'w-full h-full object-contain'}
                width={324}
                height={320}
              />
              <figcaption
                className={'text-base lg:text-xl font-semibold lg:font-bold'}>
                {item.title}
              </figcaption>
              <p className={'text-sm sm:text-base md:text-lg text-center'}>
                {item.description}
              </p>
            </figure>
          ))} */}
        </div>
      </SectionWrapper>
    </section>
  );
}
