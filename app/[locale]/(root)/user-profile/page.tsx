import { permanentRedirect } from 'next/navigation';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default function UserProfilePage() {
  return permanentRedirect('/my-matches');
}
