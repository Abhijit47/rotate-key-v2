'use client';

import dynamic from 'next/dynamic';

export const LazyPDFCard = dynamic(() => import('./PDFCard'), {
  ssr: false,
  // loading: () => <div>Loading PDF...</div>,
});
