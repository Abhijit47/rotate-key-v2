import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarClock, HeartHandshake } from 'lucide-react';
import { Suspense } from 'react';
import MyMatchesCard from './_components/my-matches-card';
// import SwapUnswapButtons from './_components/swap-unswap-buttons';

import { routing } from '@/i18n/routing';
import { requireAuth } from '@/lib/require-auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'My Matches',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MyMatches() {
  await requireAuth();

  return (
    <div className={'container mx-auto max-w-7xl px-4 2xl:px-0 py-8 space-y-8'}>
      <Card className={'gap-4 py-4'}>
        <CardHeader>
          <CardTitle>
            <h1 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              My Matches{' '}
              <span>
                <HeartHandshake className='size-6' />
              </span>
            </h1>
          </CardTitle>
          <CardDescription>
            <p>
              Here are the properties you&apos;ve liked that have resulted in
              matches. You can message your matches to discuss further details.
            </p>
          </CardDescription>
        </CardHeader>
        <Separator />

        <Suspense fallback={<Loading />}>
          <MyMatchesCard />
        </Suspense>
      </Card>
    </div>
  );
}

function Loading() {
  return (
    <>
      <Skeleton className='h-6 w-1/4 mx-auto mb-4' />
      <CardContent className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <Card className={'gap-4 py-4'}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className='h-4 w-full' />
                </CardTitle>
                <CardDescription className={'flex items-center gap-2'}>
                  <div className={'flex items-center gap-2'}>
                    <CalendarClock className={'size-4'} /> Matched on:{' '}
                    <Skeleton className='h-4 w-24' />
                  </div>
                  <Skeleton className='h-4 w-16' />
                </CardDescription>
              </CardHeader>
              <Separator />

              <CardContent className={'space-y-2'}>
                <p
                  className={
                    'text-sm font-semibold underline underline-offset-2'
                  }>
                  Owner Details:
                </p>
                <CardDescription className={'space-y-2'}>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                </CardDescription>
              </CardContent>
              <Separator />
              <CardFooter>
                <CardAction className={'w-full space-y-4 relative'}>
                  <Skeleton className='h-8 w-full' />
                  <Skeleton className='h-8 w-full' />
                  <Skeleton className='h-8 w-full' />
                </CardAction>
              </CardFooter>
            </Card>
          </div>
        ))}
      </CardContent>
    </>
  );
}
