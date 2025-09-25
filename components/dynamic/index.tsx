'use client';

import dynamic from 'next/dynamic';
import DynamicLoader from '../shared/DynamicLoader';

export const HeroSearch = dynamic(() => import('../shared/PropertyFilter'), {
  ssr: false,
  loading: () => (
    <div className={''}>
      <DynamicLoader />
    </div>
  ),
});

export const KeyWordTags = dynamic(() => import('../home/KeywordTags'), {
  ssr: false,
  loading: () => (
    <div className={'absolute bottom-16 left-10'}>
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

// export const FAQs = dynamic(() => import('../ui/FAQs'), {
//   ssr: false,
//   loading: () => (
//     <div className={'inline-grid place-items-center content-center'}>
//       <DynamicLoader />
//     </div>
//   ),
// });

// export const RoomsCategoryTab = dynamic(
//   () => import('../shared/RoomsCategoryTab'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );

// export const SwappingCarousel = dynamic(
//   () => import('../../app/(root)/swapping-places/_components/SwappingCarousel'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );

// export const SwappingPagination = dynamic(
//   () =>
//     import('../../app/(root)/swapping-places/_components/SwappingPagination'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );

// export const AboutCounter = dynamic(
//   () => import('../../app/(root)/about/_components/AboutCounter'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );

export const CustomerFeedbackTestimonials = dynamic(
  () => import('../home/Testimonials'),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);

// export const MyExchangeCarousel = dynamic(
//   () => import('../../app/(root)/my-exchanges/_components/MyExchangeCarousel'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );

// export const NewsLetterForm = dynamic(
//   () => import('../../app/(root)/how-it-works/_components/NewsLetterForm'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );

export const NewRoomsCategoryTab = dynamic(
  () => import('../shared/NewRoomsCategoryTab'),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);

// export const LazyJOTFormWidget = dynamic(() => import('../jot-widget'), {
//   ssr: false,
//   loading: () => (
//     <div className={''}>
//       <DynamicLoader />
//     </div>
//   ),
// });

// export const LazySwappingsLimit = dynamic(
//   () => import('../../app/(root)/swapping-places/_components/SwappingsLimit'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );

// export const LazySwappingFilterByType = dynamic(
//   () =>
//     import('../../app/(root)/swapping-places/_components/SwappingFilterByType'),
//   {
//     ssr: false,
//     loading: () => <DynamicLoader />,
//   }
// );
