import { routing } from '@/i18n/routing';
import { requireAuth } from '@/lib/require-auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Matches',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MatchesPage() {
  await requireAuth();
  return <div>MatchesPage</div>;
}
