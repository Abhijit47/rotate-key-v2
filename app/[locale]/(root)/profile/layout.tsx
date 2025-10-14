import type { Metadata } from 'next';

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

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={
        'bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 dark:bg-gradient-to-b dark:from-primary-800 dark:via-primary-900 dark:to-primary-950'
      }>
      {children}
    </section>
  );
}
