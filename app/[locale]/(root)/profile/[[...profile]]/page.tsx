import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import CustomProfile from './_components/custom-profile';

export const metadata: Metadata = {
  title: 'Rotate Key | User Profile',
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

export default function UserProfilePage() {
  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <CustomProfile />
    </div>
  );
}
