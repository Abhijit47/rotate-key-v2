import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import { clearCache } from '@/lib/property-actions';
import MyPreferenceBasedProperties from './_components/my-preference-based-properties';
import MyPreferenceBasedPropertiesLoader from './_components/my-preference-based-properties-loader';
import PreferenceLoader from './_components/preference-loader';
import UserPreferenceCard from './_components/user-preference-card';

import SectionWrapper from '@/components/shared/SectionWrapper';
import { routing } from '@/i18n/routing';
import { requireAuth } from '@/lib/require-auth';
import { LazySwappingCarousel } from './_components';
import SwappingBanner from './_components/swapping-banner';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const revalidate = 3600; // 1 hour

export default async function SwappingsPage() {
  await requireAuth();

  return (
    <section
      className={
        'container mx-auto px-4 2xl:px-0 py-8 max-w-7xl space-y-8 relative'
      }>
      <form
        className={'absolute top-0 right-0'}
        action={async () => {
          'use server';
          await clearCache('/(root)/swappings', 'page');
        }}>
        <Button variant={'destructive'}>Clear cache</Button>
      </form>
      <SwappingBanner />

      <LazySwappingCarousel />
      <section>
        <SectionWrapper>Carousel</SectionWrapper>
      </section>

      <Suspense name='user-preference' fallback={<PreferenceLoader />}>
        <UserPreferenceCard />
      </Suspense>

      <Suspense fallback={<MyPreferenceBasedPropertiesLoader />}>
        <MyPreferenceBasedProperties />
      </Suspense>
    </section>
  );
}
