import { Button } from '@/components/ui/button';
import { clearCache } from '@/lib/property-actions';
import { Suspense } from 'react';
import MyPreferenceBasedProperties from './_components/my-preference-based-properties';
import MyPreferenceBasedPropertiesLoader from './_components/my-preference-based-properties-loader';
import PreferenceLoader from './_components/preference-loader';
import UserPreferenceCard from './_components/user-preference-card';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const revalidate = 3600; // 1 hour

export default function SwappingsPage() {
  return (
    <div className={'container mx-auto px-4 2xl:px-0 py-8 max-w-7xl space-y-8'}>
      <form
        action={async () => {
          'use server';
          await clearCache('/(root)/swappings', 'page');
        }}>
        <Button variant={'destructive'}>Clear cache</Button>
      </form>

      <Suspense fallback={<PreferenceLoader />}>
        <UserPreferenceCard />
      </Suspense>

      <Suspense fallback={<MyPreferenceBasedPropertiesLoader />}>
        <MyPreferenceBasedProperties />
      </Suspense>
    </div>
  );
}
