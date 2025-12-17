import COMING_SOON_IMG from '@/public/coming-soon.svg';
import Image from 'next/image';

import { routing } from '@/i18n/routing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Notifications',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function NotificationsPage() {
  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <Image
        src={COMING_SOON_IMG}
        alt='Coming Soon'
        width={2122}
        height={2122}
        className={'w-full h-full object-contain'}
        priority
        placeholder='blur'
        blurDataURL={COMING_SOON_IMG.src}
      />
    </div>
  );
}
