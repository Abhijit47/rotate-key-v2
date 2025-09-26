import SectionBanner from '@/components/shared/SectionBanner';
import HowItWorksCTA from './_components/HowItWorksCTA';
import HowItWorksSteps from './_components/HowItWorksSteps';
import WhyTurnKeys from './_components/WhyTurnKeys';

import { routing } from '@/i18n/routing';
import FAQSection from './_components/FAQSection';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HowItWorksPage() {
  // await new Promise((resolve) => setTimeout(resolve, 1200));

  return (
    <main className={''}>
      <SectionBanner
        description='"From Registration to Adventure - A Seamless Experience
              Awaits You"'
        buttonText='Create your account for free'
        buttonLink='/sign-up'>
        <span className={'text-primary-500'}>Rotate Keys</span>
        <span className={'text-tertiary-50'}> : How does it works?</span>
      </SectionBanner>
      <HowItWorksSteps />
      <WhyTurnKeys />
      <HowItWorksCTA />
      <FAQSection />
    </main>
  );
}
