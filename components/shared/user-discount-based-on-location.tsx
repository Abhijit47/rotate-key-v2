'use client';

import { cn } from '@/lib/utils';
import { PopcornIcon, XCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';

export default function UserDiscountBasedOnLocation() {
  const [hide, setHide] = useState(false);

  const pathname = usePathname();

  const chatSlugRegex = /^\/chat\/[^/]+$/;
  const adminSlugRegex = /^\/admin(\/[^/]+)?$/;

  const pricingSlugRegex = /^\/pricing(\/[^/])?$/;

  if (pathname && chatSlugRegex.test(pathname)) {
    return null;
  }

  if (pathname && adminSlugRegex.test(pathname)) {
    return null;
  }

  if (pathname && pricingSlugRegex.test(pathname)) {
    return null;
  }

  function toggleHide() {
    setHide(!hide);
  }

  return (
    <Alert
      className={cn('absolute top-0 left-0 w-full z-[100]', hide && 'hidden')}>
      <PopcornIcon />
      <AlertTitle>You have a special discount!</AlertTitle>
      <AlertDescription className={'w-full flex justify-between items-center'}>
        <p>
          Youre from the US, so you get a special 10% discount on your next
          purchase! Use code <strong>USA10</strong> at checkout.
        </p>
        <Button variant={'destructive'} size={'sm'} onClick={toggleHide}>
          <XCircle className='size-4' />
          <span className={'sr-only'}>Close</span>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
