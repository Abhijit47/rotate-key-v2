// Shared Component Types
declare type ElementAlign = 'left' | 'center' | 'right';

declare type SectionWrapperProps = React.ComponentProps<'div'> &
  React.PropsWithChildren<object>;

declare type SectionHeadingGroupProps = React.ComponentProps<'hgroup'> &
  React.PropsWithChildren<object>;

declare type SectionHeadingProps = React.ComponentProps<'h2'> &
  React.PropsWithChildren<{ align?: ElementAlign }>;

declare type SectionDescriptionProps = React.ComponentProps<'p'> &
  React.PropsWithChildren<{ align?: ElementAlign }>;

declare type SectionBadgeProps = React.ComponentProps<'span'> &
  React.PropsWithChildren<{ align?: ElementAlign }>;

declare type SectionHeadingWithDividerProps = React.ComponentProps<
  'div' | 'h2'
> &
  React.PropsWithChildren<{
    dividerColor?: string;
  }>;

declare type SectionBannerProps = React.ComponentProps<'section'> &
  React.PropsWithChildren<{
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    coverImage?: {
      src: string;
      height: number;
      width: number;
      blurDataURL: string | undefined;
      blurWidth: number | undefined;
      blurHeight: number | undefined;
    };
  }>;

declare type SectionOverlayProps = React.PropsWithChildren<{
  description: string;
}>;

declare type FooterLink = {
  id: string;
  title: string;
  link: string;
};

// Component Types
// declare type SwappingCarouselData = {
//   id: string;
//   title: string;
//   roomlocation: string;
//   userLocation: string;
//   images: string[];
// };

declare type RoomsCategoryTabProps = {
  roomsCategories: RoomsCategoryData[];
};

declare type RoomsTabListProps = {
  roomsCategory: RoomsCategoryData[];
  onShuffleRooms: () => void;
};

declare type MyExchangeCarouselProps = {
  roomImages: string[];
};

declare type RoomData = {
  roomTitle: string;
  roomDescription: string[];
  roomCapacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  roomAmenities: {
    id: string;
    name: string;
  }[];
  roomReview: {
    rating: number;
    count: number;
    testimonials: {
      id: string;
      name: string;
      avatar: string;
      location: string;
      rating: number;
      date: string;
      content: string;
    }[];
  };
  author: {
    name: string;
    avatar: string;
    time: string;
  };
};

declare type InitialPlan = {
  id: string;
  name: string;
  tag: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: {
    id: string;
    feature: string;
  }[];
  status: 'live' | 'coming soon';
  cta: string;
};

declare type PriceListDuration = 'monthly' | 'yearly';

declare type Pricelist = {
  price: {
    monthly: number;
    yearly: number;
  };
  id: string;
  name: string;
  tag: string;
  duration: 'monthly' | 'yearly';
  features: {
    id: string;
    feature: string;
  }[];
  status: 'live' | 'coming soon';
  cta: string;
};

declare type Roles = 'admin' | 'moderator' | 'guest';

declare type Plans = 'basic' | 'pro' | 'enterprise' | 'free';

// Data Types
declare type RoomsCategoryData = {
  id: string;
  name: string;
  tabLogo: string;
  rooms: {
    id: string;
    images: string[];
    title: string;
    description: string;
    roomlocation: string;
    userLocation: string;
    date: string;
    rating: number;
  }[];
};

// UTILS
declare interface ExchangeRateResponse {
  rates: {
    INR: number;
  };
}

// Add a property formdata
declare type UnSafeFormValues = {
  streetAddress: string;
  state: string;
  cityOrDistrict: string;
  nation: string;
  zipcode: string;
  propertyArea: string;
  propertyAreaUnit: string;
  propertyDescription: string;
  propertyType: string;
  propertyOwnership: string;
  propertyOwnerName: string | undefined;
  propertyOwnerEmail: string | undefined;
  propertyOwnerPhone: string | undefined;
  propertyRentalTypes: string;
  propertyBedRooms: string;
  propertyBathRooms: string;
  numberOfGuests: string;
  numberOfBeds: string;
  hostLanguages: Array<string>;
  propertySurrounding: string;
  propertyAccomodationType: string;
  propertyAmenities: Array<string>;
  propertyRules: Array<string>;
  propertyAccessibilities: Array<string>;
  propertyImages: Array<string | undefined>;
  staysDateRange: {
    from: string;
    to: string;
  };
  staysDurationInDays: string | undefined;
};

// declare type Pretify<T> = {
//   [K in keyof T]: T[K] extends object
//     ? T[K] extends Array<infer U>
//       ? Array<Pretify<U>>
//       : Pretify<T[K]>
//     : T[K];
// };

declare type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

declare type GenderPreference = 'male' | 'female' | 'other';
declare type PreferencesType = {
  fromLocation: {
    city: string;
    state: string;
    country: string;
  };
  toLocation: {
    city: string;
    state: string;
    country: string;
  };
};

declare interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  birthdate: string;
  bio: string;
  avatar_url: string;
  preferences: UserPreferences;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

declare interface UserPreferences {
  age_range: {
    min: number;
    max: number;
  };
  distance: number;
  gender_preference: ('male' | 'female' | 'other')[];
}
