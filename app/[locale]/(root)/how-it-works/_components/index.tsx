'use client';

import DynamicLoader from '@/components/shared/DynamicLoader';
import dynamic from 'next/dynamic';

export const LazyFAQs = dynamic(() => import('./Faqs'), {
  ssr: false,
  loading: () => (
    <div className={'inline-grid place-items-center content-center'}>
      <DynamicLoader />
    </div>
  ),
});

export const LazyNewsLetterForm = dynamic(() => import('./NewsLetterForm'), {
  ssr: false,
  loading: () => <DynamicLoader />,
});
