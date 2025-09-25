'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

export default function AdminHeaderHeading() {
  const segment = useSelectedLayoutSegment();
  if (segment === null) {
    return <h1 className='text-base font-medium capitalize'>Dashboard</h1>;
  }

  return <h1 className='text-base font-medium capitalize'>{segment}</h1>;
}
