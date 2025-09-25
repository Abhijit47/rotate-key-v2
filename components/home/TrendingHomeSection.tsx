// import { getMostViewedProperties } from '@/lib/actions/property.actions';
// import { notFound } from 'next/navigation';
// import { cache } from 'react';
// import { unstable_cache as cache } from 'next/cache';
// import { TrendingHomeCarousel } from '../dynamic';
import SectionBadge from '../shared/SectionBadge';
import SectionHeading from '../shared/SectionHeading';
import SectionWrapper from '../shared/SectionWrapper';

// const getCachedMostViewedProperties = cache(async () => {
//   const { success, data } = await getMostViewedProperties(10);
//   return { success, data };
// });

// const getCachedMostViewedProperties = cache(
//   async () => {
//     const { success, data } = await getMostViewedProperties(10);
//     return { success, data };
//   },
//   ['trending-properties'],
//   {
//     tags: ['trending-properties'],
//     revalidate: 60 * 60, // 1 hour
//   }
// );

export default async function TrendingHomeSection() {
  // const { success, data } = await getCachedMostViewedProperties();

  // if (!success || !data) {
  //   return notFound();
  // }

  // const trendingProperties = data;

  return (
    <section>
      <SectionWrapper
        className={
          'space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12'
        }>
        <div className='space-y-2 sm:space-y-4 md:space-y-6'>
          <SectionBadge align='left'>
            Top trending home of the week!
          </SectionBadge>

          <SectionHeading align='left' className={'text-secondary-700'}>
            <span className={'block'}>Have your eye on these,</span>
            <span className={'inline lg:block'}>
              Most liked Home of the Week
            </span>
          </SectionHeading>
        </div>

        <div>
          {/* <TrendingHomeCarousel trendingProperties={trendingProperties} /> */}
        </div>
      </SectionWrapper>
    </section>
  );
}
