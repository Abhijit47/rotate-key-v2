import { routing } from '@/i18n/routing';
import { requireAuth } from '@/lib/require-auth';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MatchesPage() {
  await requireAuth();
  return <div>MatchesPage</div>;
}
