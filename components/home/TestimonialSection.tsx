import { Testimonials } from '../dynamic';
import SectionBadge from '../shared/SectionBadge';
import SectionHeading from '../shared/SectionHeading';
import SectionWrapper from '../shared/SectionWrapper';

export default function TestimonialSection() {
  return (
    <section className={'py-8 md:py-10 lg:py-12 xl:py-16'}>
      <SectionWrapper className={'space-y-4 md:space-y-6 lg:space-y-8'}>
        <div className='grid content-center gap-4 text-center sm:gap-6 md:gap-8 lg:gap-10'>
          <SectionBadge className={'bg-secondary-200'}>
            Testimonials
          </SectionBadge>

          <SectionHeading className={'text-secondary-700'}>
            <span className={'block'}>What Our Happy</span>
            <span className={'inline lg:block'}>Customers Said.</span>
          </SectionHeading>
        </div>

        <div className=''>
          <Testimonials />
        </div>
      </SectionWrapper>
    </section>
  );
}
