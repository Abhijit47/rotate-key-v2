'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

import PropertyAccessibilitiesLoader from './loaders/property-accessibilities-loader';
import PropertyAccomodationLoader from './loaders/property-accomodation-loader';
import PropertyAdditionalInformationLoader from './loaders/property-additional-information-loader';
import PropertyAmenitiesLoader from './loaders/property-amenities-loader';
import PropertyCheckInOrCheckoutLoader from './loaders/property-checkin-or-checkout-loader';
import PropertyEnvironmentLoader from './loaders/property-environment-loader';
import PropertyImagesUploadLoader from './loaders/property-images-upload-loader';
import PropertyInformationLoader from './loaders/property-information-loader';
import PropertyOwnerDetailsLoader from './loaders/property-owner-details-loader';
import PropertyOwnershipLoader from './loaders/property-ownership-loader';
import PropertyRentalPeriodLoader from './loaders/property-rental-period-loader';
import PropertyRulesLoader from './loaders/property-rules-loader';
import PropertySurroundingLoader from './loaders/property-surrounding-loader';
import PropertySwappingLoader from './loaders/property-swapping-loader';
import PropertyTypeLoader from './loaders/property-type-loader';

const componentPath = {
  propertyInformation: import('../form-fields/property-information-fields'),
  propertyType: import('../form-fields/property-type-field'),
  propertyOwnership: import('../form-fields/property-ownership-field'),
  propertySwapping: import('../form-fields/property-swapping-field'),
  propertyOwnerDetails: import('../form-fields/property-owner-deatils-fields'),
  propertyRentalPeriod: import('../form-fields/property-rental-period-field'),
  propertyAdditionalInformation: import(
    '../form-fields/property-additional-infomation-fields'
  ),
  propertySurrounding: import('../form-fields/property-surrounding-field'),
  propertyEnvironment: import('../form-fields/property-environment-field'),
  propertyAccomodation: import('../form-fields/property-accomodation-field'),
  propertyAmenities: import('../form-fields/property-amenities-field'),
  propertyRules: import('../form-fields/property-rules-field'),
  propertyAccessibilities: import(
    '../form-fields/property-accessibilities-field'
  ),
  propertyImagesUpload: import('../form-fields/property-images-upload-field'),
  propertyCheckinOrCheckOut: import(
    '../form-fields/property-checkin-checkout-field'
  ),
};

const LazyPropertyInformation = dynamic(
  () => componentPath.propertyInformation,
  {
    ssr: false,
    loading: PropertyInformationLoader,
  }
);

const LazyPropertyType = dynamic(() => componentPath.propertyType, {
  ssr: false,
  loading: PropertyTypeLoader,
});

const LazyPropertyOwnership = dynamic(() => componentPath.propertyOwnership, {
  ssr: false,
  loading: PropertyOwnershipLoader,
});

const LazyPropertySwapping = dynamic(() => componentPath.propertySwapping, {
  ssr: false,
  loading: PropertySwappingLoader,
});

const LazyPropertyRentalPeriod = dynamic(
  () => componentPath.propertyRentalPeriod,
  {
    ssr: false,
    loading: PropertyRentalPeriodLoader,
  }
);

const LazyPropertySurrounding = dynamic(
  () => componentPath.propertySurrounding,
  {
    ssr: false,
    loading: PropertySurroundingLoader,
  }
);

const LazyPropertyEnvironment = dynamic(
  () => componentPath.propertyEnvironment,
  {
    ssr: false,
    loading: PropertyEnvironmentLoader,
  }
);

const LazyPropertyOwnerDetails = dynamic(
  () => componentPath.propertyOwnerDetails,
  {
    ssr: false,
    loading: PropertyOwnerDetailsLoader,
  }
);

const LazyPropertyAdditionalInformation = dynamic(
  () => componentPath.propertyAdditionalInformation,
  {
    ssr: false,
    loading: PropertyAdditionalInformationLoader,
  }
);

const LazyPropertyAccomodation = dynamic(
  () => componentPath.propertyAccomodation,
  {
    ssr: false,
    loading: PropertyAccomodationLoader,
  }
);

const LazyPropertyAmenities = dynamic(() => componentPath.propertyAmenities, {
  ssr: false,
  loading: PropertyAmenitiesLoader,
});

const LazyPropertyRules = dynamic(() => componentPath.propertyRules, {
  ssr: false,
  loading: PropertyRulesLoader,
});

const LazyPropertyAccessibilities = dynamic(
  () => componentPath.propertyAccessibilities,
  {
    ssr: false,
    loading: PropertyAccessibilitiesLoader,
  }
);

const LazyPropertyCheckinOrCheckOut = dynamic(
  () => componentPath.propertyCheckinOrCheckOut,
  {
    ssr: false,
    loading: PropertyCheckInOrCheckoutLoader,
  }
);

const LazyPropertyImagesUpload = dynamic(
  () => componentPath.propertyImagesUpload,
  {
    ssr: false,
    loading: PropertyImagesUploadLoader,
  }
);

const LazyDevtool = dynamic(
  () => import('@hookform/devtools').then((mod) => mod.DevTool),
  {
    ssr: false,
    loading: () => <Skeleton className='h-10 w-10 animate-pulse' />,
  }
);

export {
  LazyDevtool,
  LazyPropertyAccessibilities,
  LazyPropertyAccomodation,
  LazyPropertyAdditionalInformation,
  LazyPropertyAmenities,
  LazyPropertyCheckinOrCheckOut,
  LazyPropertyEnvironment,
  LazyPropertyImagesUpload,
  LazyPropertyInformation,
  LazyPropertyOwnerDetails,
  LazyPropertyOwnership,
  LazyPropertyRentalPeriod,
  LazyPropertyRules,
  LazyPropertySurrounding,
  LazyPropertySwapping,
  LazyPropertyType,
};
