import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import { LazyPricingTableCards } from './_components';

export const metadata: Metadata = {
  title: {
    default: 'Pricing',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function PricingPage() {
  return <LazyPricingTableCards />;
}
