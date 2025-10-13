'use client';

import dynamic from 'next/dynamic';
import DynamicLoader from '../shared/DynamicLoader';

export const LazyHeroSearch = dynamic(
  () => import('../shared/PropertyFilter'),
  {
    ssr: false,
    loading: () => (
      <div className={'inline-grid place-items-center content-center'}>
        <DynamicLoader />
      </div>
    ),
  }
);

export const LazyKeyWordTags = dynamic(() => import('../home/KeywordTags'), {
  ssr: false,
  loading: () => (
    <div className={'absolute bottom-16 left-10 translate-y-1/2'}>
      <DynamicLoader />
    </div>
  ),
});

export const Testimonials = dynamic(() => import('../home/Testimonials'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});

export const TrendingHomeCarousel = dynamic(
  () => import('../home/TreandingHomeCarousel'),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);

export const CustomerFeedbackTestimonials = dynamic(
  () => import('../home/Testimonials'),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);

export const NewRoomsCategoryTab = dynamic(
  () => import('../shared/NewRoomsCategoryTab'),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);
