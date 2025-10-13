import SectionDescription from '@/components/shared/SectionDescription';
import SectionHeading from '@/components/shared/SectionHeading';
import SectionHeadingGroup from '@/components/shared/SectionHeadingGroup';

export default function SwappingBannerHeading() {
  return (
    <div
      className={
        'absolute w-full h-full grid place-items-start lg:place-items-center lg:content-center px-4 mt-16 md:mt-8 lg:mt-0'
      }>
      <SectionHeadingGroup
        className={'text-center space-y-4 md:space-y-6 lg:space-y-8'}>
        <SectionHeading align='center' className={'text-primary-300'}>
          DISCOVER YOUR DESIRED HOUSE
        </SectionHeading>
        <SectionDescription className={'text-primary-100'}>
          Welcome to Swapping Place, where finding your dream home is as easy as
          a swipe! Discover a world of possibilities as you browse through our
          diverse range of properties. Swipe right for the homes you love and
          let the adventure begin.
        </SectionDescription>
      </SectionHeadingGroup>
    </div>
  );
}
