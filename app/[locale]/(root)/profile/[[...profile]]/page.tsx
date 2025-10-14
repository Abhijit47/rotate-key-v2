import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { forbidden } from 'next/navigation';

import { routing } from '@/i18n/routing';
import CustomProfile from './_components/custom-profile';

export const metadata: Metadata = {
  title: 'Rotate Key | My Profile',
  description:
    'Your Profile - Manage Your Account and Preferences on Rotate Keys',
  keywords: [
    'Rotate Key',
    'User Profile',
    'Account Management',
    'Preferences',
    'House Swapping',
    'Travel Community',
    'Explore',
    'Discover',
    'Adventure',
  ],
  authors: [{ name: 'Rotate Key', url: 'https://rotatekey.com' }],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function UserProfilePage() {
  const user = await currentUser({ treatPendingAsSignedOut: true });

  if (!user) {
    return forbidden();
  }

  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <CustomProfile />
    </div>
  );
}
