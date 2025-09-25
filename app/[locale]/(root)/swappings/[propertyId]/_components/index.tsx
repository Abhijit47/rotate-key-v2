'use client';

import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';

export const LazySwapRequestForm = dynamic(
  () => import('./swap-request-form').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-full flex items-center justify-center'>
        <span className='sr-only'>Loading form...</span>
        <Loader className='animate-spin size-6' />
      </div>
    ),
  }
);
