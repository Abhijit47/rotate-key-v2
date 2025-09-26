import { routing } from '@/i18n/routing';
import { LazyPricingTableCards } from './_components';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function PricingPage() {
  return <LazyPricingTableCards />;
}
