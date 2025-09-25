import { CustomerFeedbackTestimonials } from '@/components/dynamic';
import SectionHeading from '@/components/shared/SectionHeading';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function CustomerFeedback() {
  return (
    <SectionWrapper
      className={'space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12'}>
      <SectionHeading>
        <span className={'text-secondary-700'}>Customer</span>{' '}
        <span className={'text-primary-500'}>Feedback</span>
      </SectionHeading>

      <CustomerFeedbackTestimonials />
    </SectionWrapper>
  );
}
