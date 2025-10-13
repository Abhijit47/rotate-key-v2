import { BadgeCheck, CheckCircle } from 'lucide-react';

import SectionWrapper from '@/components/shared/SectionWrapper';
import { SelectProperty } from '@/drizzle/schemas';
import PropertyDetailsModal from './property-details-modal';

export default function WhatWeOffered({
  property,
}: {
  property: Partial<SelectProperty>;
}) {
  return (
    <section>
      <SectionWrapper>
        <div className={'space-y-2 md:space-y-6'}>
          <h4
            className={'text-2xl font-semibold inline-flex items-center gap-2'}>
            <span>
              <BadgeCheck className={'size-6 inline-block text-primary-500'} />
            </span>
            <span>What this place offer</span>
          </h4>

          <ul className={'grid grid-cols-2 gap-2 max-w-lg w-full'}>
            {property?.amenities?.slice(0, 6).map((amenity) => (
              <li
                key={amenity}
                className={
                  'text-sm font-medium capitalize inline-flex items-center gap-2'
                }>
                <span>
                  <CheckCircle
                    className={'inline-block size-4 text-primary-500'}
                  />
                </span>
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
          <PropertyDetailsModal property={property} />
        </div>
      </SectionWrapper>
    </section>
  );
}
