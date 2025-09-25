'use client';

import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

export const LazyPricingTableCards = dynamic(
  () => import('./pricing-table-cards'),
  {
    ssr: false,
    loading: () => (
      <div className={'h-dvh flex items-center justify-center'}>
        <span className={'sr-only'}>Loading...</span>
        <Loader2 className={'w-6 h-6 animate-spin'} />
      </div>
    ),
  }
);
