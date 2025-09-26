// import { shuffleArray } from '@/lib/helpers';

import {
  Apartment,
  CoLivingSpace,
  ConstructionReadyLand,
  Cottage,
  DuplexORTriplex,
  GatedCommunityLand,
  GuestHouse,
  House,
  IndustrialSpace,
  MultiFamilyHome,
  OfficeSpace,
  PentHouese,
  RawLand,
  Resort,
  RetailSpace,
  SharedApartment,
  Studio,
  TownHouse,
  Villa,
} from '@/assets';
import { Freehold } from '@/assets/ownership';
import {
  AridOrDryRegion,
  CountrySide,
  Desert,
  EverGreenForestZone,
  FarmLand,
  Forest,
  GatedCommunity,
  HillStation,
  Island,
  Isolated,
  LakeSide,
  MetroCity,
  Mountain,
  SeaFacingOrCoastal,
  Snowy,
  SubUrban,
  TemparateZone,
  Town,
  Tropical,
  UrbanArea,
  Village,
  WindyCoastalArea,
} from '@/assets/surrounding-icons';
import {
  HomeIcon,
  IdCardIcon,
  IndianRupee,
  LockKeyholeIcon,
  MessageCircleMoreIcon,
  Share,
} from 'lucide-react';

// types
export type PropertyType = {
  id: string;
  categoryName: string;
  categoryTypes: {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
  }[];
};

export type PropertyOwnershipType = {
  id: string;
  categoryName: string;
  categoryTypes: {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
  }[];
};

export type PropertySwappingType = {
  id: string;
  categoryName: string;
  categoryTypes: {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
  }[];
};

export type PropertySurroundingsType = {
  id: string;
  categoryName: string;
  categoryTypes: {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
  }[];
};

export type PropertyEnvironmentType = {
  id: string;
  categoryName: string;
  categoryTypes: {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
  }[];
};

export type PropertyRentalPeriodType = {
  id: string;
  categoryName: string;
  categoryTypes: {
    id: string;
    name: string;
    description: string;
    rentType: {
      id: string;
      name: string;
      description: string;
    }[];
  }[];
};

export const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'How it Works', href: '/how-it-works', current: false },
  { name: 'Swapping Places', href: '/swapping-places', current: false },
  { name: 'Pricing', href: '/pricing', current: false },
  { name: 'About', href: '/about', current: false },
  // { name: 'property', href: '/property', current: false },
];

export const userNavigation = [
  {
    id: crypto.randomUUID(),
    name: 'My Profile',
    href: '/profile',
  },
  {
    id: crypto.randomUUID(),
    name: 'My Exchanges',
    href: '/my-exchanges',
  },
  {
    id: crypto.randomUUID(),
    name: 'Messages',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    name: 'Add a Property',
    href: '/add-property',
  },
  {
    id: crypto.randomUUID(),
    name: 'Favourite Home',
    href: '/favourite-home',
  },
  {
    id: crypto.randomUUID(),
    name: 'Help & Support',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    name: 'Log Out',
    href: '#',
  },
];

// PROFILE DASHBOARD
export const dashboardNavigation = [
  {
    id: crypto.randomUUID(),
    name: 'Profile-Home',
    href: '/profile',
    icon: HomeIcon,
  },
  {
    id: crypto.randomUUID(),
    name: 'Personal Info',
    href: '/profile/personal-info',
    icon: IdCardIcon,
  },
  {
    id: crypto.randomUUID(),
    name: 'Confidential Info',
    href: '/profile/confidential-info',
    icon: LockKeyholeIcon,
  },
  {
    id: crypto.randomUUID(),
    name: 'Social & Network',
    href: '/profile/social-network',
    icon: Share,
  },
  {
    id: crypto.randomUUID(),
    name: 'Chat',
    href: '/profile/chat',
    icon: MessageCircleMoreIcon,
  },
  {
    id: crypto.randomUUID(),
    name: 'Your Plan',
    href: '/profile/your-plan',
    icon: IndianRupee,
  },
];

export const initialTags = [
  'Global Community',
  'Personalized Matches',
  'Discover Your Perfect Home Exchange',
  'Global Community',
  'Personalized Matches',
  'Discover Your Perfect Home Exchange',
  'Global Community',
  'Personalized Matches',
  'Discover Your Perfect Home Exchange',
  'Global Community',
  'Personalized Matches',
  'Discover Your Perfect Home Exchange',
];

// this will be replaced with a real API call
export const trendingHomes = [
  {
    id: crypto.randomUUID(),
    title: 'Beautiful Home in the Heart of Paris',
    description: 'Mind blowing home',
    image: '/home/trending-home-1.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Luxurious Villa in the South of France',
    description: 'Mind blowing home',
    image: '/home/trending-home-2.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Modern Apartment in the Heart of London',
    description: 'Mind blowing home',
    image: '/home/trending-home-3.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Cozy Cottage in the Countryside',
    description: 'Mind blowing home',
    image: '/home/trending-home-4.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Stylish Loft in the Heart of New York',
    description: 'Mind blowing home',
    image: '/home/trending-home-5.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Beautiful Home in the Heart of Paris',
    description: 'Mind blowing home',
    image: '/home/trending-home-1.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Luxurious Villa in the South of France',
    description: 'Mind blowing home',
    image: '/home/trending-home-2.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Modern Apartment in the Heart of London',
    description: 'Mind blowing home',
    image: '/home/trending-home-3.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Cozy Cottage in the Countryside',
    description: 'Mind blowing home',
    image: '/home/trending-home-4.jpg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Stylish Loft in the Heart of New York',
    description: 'Mind blowing home',
    image: '/home/trending-home-5.jpg',
  },
];

export const features = [
  {
    id: crypto.randomUUID(),
    image: '/home/feature-1.svg',
    title: 'Trusted and Secure',
    description:
      'Your safety is our priority. Our rigorous identity verification process ensures that you can trust the Turn Keys community. Secure communication and payment systems provide peace of mind throughout the exchange process.',
  },
  {
    id: crypto.randomUUID(),
    image: '/home/feature-2.svg',
    title: 'Personalized Profiles',
    description:
      'Craft detailed profiles that showcase your property and preferences. Use our customizable search filters to find the perfect match for your next house swap adventure.',
  },
  {
    id: crypto.randomUUID(),
    image: '/home/feature-3.svg',
    title: 'User-Friendly Onboarding',
    description:
      'Our easy registration and identity verification process get you started in no time. Create your profile, add stunning photos, and begin exploring potential swaps effortlessly.',
  },
];

export const testimonials = [
  {
    id: crypto.randomUUID(),
    name: 'Amit & Manjit',
    message:
      "Turn Keys made our dream vacation a reality! Swapping homes with another family was not only cost-effective but also added a personal touch to our travels. We're now part of a community that values trust and shared experiences.",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Ramesh & Binod',
    message:
      "Our Turn Keys experience was fantastic. The platform's security measures gave us peace of mind, and connecting with fellow homeowners was seamless. We've made friends across borders, all thanks to Turn Keys!",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Karan & Kumbh',
    message:
      'As avid travelers, Turn Keys has become our go-to platform for unique accommodations. The personalized profiles helped us find the perfect match for our preferences. Our house swapping adventures have been nothing short of amazing.',
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Amit & Manjit',
    message:
      "Turn Keys made our dream vacation a reality! Swapping homes with another family was not only cost-effective but also added a personal touch to our travels. We're now part of a community that values trust and shared experiences.",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Ramesh & Binod',
    message:
      "Our Turn Keys experience was fantastic. The platform's security measures gave us peace of mind, and connecting with fellow homeowners was seamless. We've made friends across borders, all thanks to Turn Keys!",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Karan & Kumbh',
    message:
      'As avid travelers, Turn Keys has become our go-to platform for unique accommodations. The personalized profiles helped us find the perfect match for our preferences. Our house swapping adventures have been nothing short of amazing.',
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Amit & Manjit',
    message:
      "Turn Keys made our dream vacation a reality! Swapping homes with another family was not only cost-effective but also added a personal touch to our travels. We're now part of a community that values trust and shared experiences.",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Ramesh & Binod',
    message:
      "Our Turn Keys experience was fantastic. The platform's security measures gave us peace of mind, and connecting with fellow homeowners was seamless. We've made friends across borders, all thanks to Turn Keys!",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Karan & Kumbh',
    message:
      'As avid travelers, Turn Keys has become our go-to platform for unique accommodations. The personalized profiles helped us find the perfect match for our preferences. Our house swapping adventures have been nothing short of amazing.',
    rating: 5,
  },
];

export const footerLinks: { [key: string]: FooterLink[] } = {
  services: [
    {
      id: crypto.randomUUID(),
      title: 'Help & Support',
      link: '/#',
    },
    {
      id: crypto.randomUUID(),
      title: 'FAQs',
      link: '/#',
    },
    {
      id: crypto.randomUUID(),
      title: 'My Property',
      link: '/my-property',
    },
  ],
  importantLinks: [
    {
      id: crypto.randomUUID(),
      title: 'Home',
      link: '/',
    },
    {
      id: crypto.randomUUID(),
      title: 'How It Works?',
      link: '/how-it-works',
    },
    {
      id: crypto.randomUUID(),
      title: 'Swapping Places',
      link: '/swapping-places',
    },
    // {
    //   id: crypto.randomUUID(),
    //   title: 'Notifications',
    //   link: '/notifications',
    // },
    {
      id: crypto.randomUUID(),
      title: 'Terms & Conditions',
      link: '/terms-and-conditions',
    },
    // {
    //   id: crypto.randomUUID(),
    //   title: 'Help & Support',
    //   link: '/help-support',
    // },
    {
      id: crypto.randomUUID(),
      title: 'Privacy Policy',
      link: '/privacy-policy',
    },
    {
      id: crypto.randomUUID(),
      title: 'About',
      link: '/about',
    },
    {
      id: crypto.randomUUID(),
      title: 'Career',
      link: '/career',
    },
    {
      id: crypto.randomUUID(),
      title: 'Login',
      link: '/sign-in',
    },
    {
      id: crypto.randomUUID(),
      title: 'Register',
      link: '/sign-up',
    },
  ],
  socialMedia: [
    {
      id: crypto.randomUUID(),
      title: 'Instragram',
      link: 'https://www.instagram.com/rotatekey',
    },
    {
      id: crypto.randomUUID(),
      title: 'Twitter(X)',
      link: '/#',
    },
    {
      id: crypto.randomUUID(),
      title: 'Facebook',
      link: 'https://www.facebook.com/Rotatekey',
    },
    {
      id: crypto.randomUUID(),
      title: 'Linkedin',
      link: 'https://www.linkedin.com/company/rotatekey-com',
    },
    {
      id: crypto.randomUUID(),
      title: 'Reddit',
      link: '/#',
    },
  ],
};

// HOW IT WORKS
export const howItWorksSteps = [
  {
    id: crypto.randomUUID(),
    title: 'Registration and Verification',
    stepNumber: 1,
    steps: [
      {
        id: crypto.randomUUID(),
        title: 'Sign up for free with basic details.',
      },
      {
        id: crypto.randomUUID(),
        title:
          'Complete our identity verification process for a secure and trusted community.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Create your Profile',
    stepNumber: 2,
    steps: [
      {
        id: crypto.randomUUID(),
        title:
          'Browse through a diverse range of properties from around the world.',
      },
      {
        id: crypto.randomUUID(),
        title: 'Use customizable search filters to narrow down your options.',
      },
      {
        id: crypto.randomUUID(),
        title:
          'In fact our AI schema will assist you to shortlist your desired home.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Explore Listings',
    stepNumber: 3,
    steps: [
      {
        id: crypto.randomUUID(),
        title: 'Sign up for free with basic details.',
      },
      {
        id: crypto.randomUUID(),
        title:
          'Complete our identity verification process for a secure and trusted community.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Swapping',
    stepNumber: 4,
    steps: [
      {
        id: crypto.randomUUID(),
        title: 'Get lots of Exchanging Home option by our AI based filter.',
      },
      {
        id: crypto.randomUUID(),
        title:
          'Discuss potential swaps and get to know your exchange partners.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Initiate Contact and Confirm',
    stepNumber: 5,
    steps: [
      {
        id: crypto.randomUUID(),
        title: 'Connect with homeowners through secure messaging.',
      },
      {
        id: crypto.randomUUID(),
        title: 'Finalize the details and terms of your house swap.',
      },
      {
        id: crypto.randomUUID(),
        title: 'Enjoy a seamless and secure exchange experience.',
      },
    ],
  },
];

export const whyTurnKeys = [
  {
    id: crypto.randomUUID(),
    title: 'Exploring Virtual Tour',
    description:
      "At Turn Keys, we understand that seeing is believing. That's why we've introduced a cutting-edge feature that lets you explore properties like never before. When you find a listing that catches your eye, take your experience to the next level by requesting a virtual tour!",
    image: '/how-it-works/why-img-1.svg',
  },
  {
    id: crypto.randomUUID(),
    title: 'Secure and Trusted',
    description:
      'Ensure a trusted community with our identity verification process. Communicate securely with fellow homeowners through our encrypted messaging system. Experience safe and secure financial transactions with our reliable payment systems.',
    image: '/how-it-works/why-img-2.svg',
  },
  {
    id: crypto.randomUUID(),
    title: 'User-Friendly Experience',
    description:
      'Sign up effortlessly with our quick and straightforward registration process. Navigate our platform seamlessly with an intuitive interface. Begin your house-swapping journey with a hassle-free onboarding experience.',
    image: '/how-it-works/why-img-3.svg',
  },
];

export const faqs = [
  {
    id: crypto.randomUUID(),
    question: 'How to create an account?',
    answer:
      'To create an account, find the "Sign up" or "Create account" button, fill out the registration form with your personal information, and click "Create account" or "Sign up". Verify your email address if needed, and then log in to start using the platform.',
  },
  {
    id: crypto.randomUUID(),
    question: 'Have any trust issue?',
    answer:
      'Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.',
  },
  {
    id: crypto.randomUUID(),
    question: 'How can I reset my password?',
    answer:
      'Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.',
  },
  {
    id: crypto.randomUUID(),
    question: 'What is the payment process?',
    answer:
      'Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.',
  },
];

// this will be replaced with a real API call
export const notifications = [
  {
    today: [
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Morang Helsinki',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-1.jpg',
        },
        time: '1 Hours Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Lucia Sierra',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-2.jpg',
        },
        time: '1 Hours Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Oslo Boscovinch',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-3.jpg',
        },
        time: '1 Hours Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Paul Waden',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-4.jpg',
        },
        time: '1 Hours Ago',
      },
    ],

    yesterday: [
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Morang Helsinki',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-1.jpg',
        },
        time: '19 Hours Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Lucia Sierra',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-2.jpg',
        },
        time: '18 Hours Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Oslo Boscovinch',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-3.jpg',
        },
        time: '17 Hours Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Paul Waden',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-4.jpg',
        },
        time: '16 Hours Ago',
      },
    ],

    lastWeek: [
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Morang Helsinki',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-1.jpg',
        },
        time: '1 days Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Lucia Sierra',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-2.jpg',
        },
        time: '2 day Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Oslo Boscovinch',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-3.jpg',
        },
        time: '2 day Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Paul Waden',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-4.jpg',
        },
        time: '3 day Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Morang Helsinki',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-1.jpg',
        },
        time: '4 day Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Lucia Sierra',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-2.jpg',
        },
        time: '5 day Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Oslo Boscovinch',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-3.jpg',
        },
        time: '5 day Ago',
      },
      {
        id: crypto.randomUUID(),
        user: {
          name: 'Paul Waden',
          message: 'has liked your property and requesting a live video tour',
          avatar: '/notifications/user-4.jpg',
        },
        time: '6 day Ago',
      },
    ],
  },
];

export const hostLanguages = [
  {
    id: crypto.randomUUID(),
    language: 'arabic',
    flag: '/flag-svgs/sa.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'bengali',
    flag: '/flag-svgs/bd.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'english',
    flag: '/flag-svgs/gb.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'french',
    flag: '/flag-svgs/fr.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'german',
    flag: '/flag-svgs/de.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'hindi',
    flag: '/flag-svgs/in.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'italian',
    flag: '/flag-svgs/it.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'japanese',
    flag: '/flag-svgs/jp.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'javanese',
    flag: '/flag-svgs/id.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'korean',
    flag: '/flag-svgs/kr.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'marathi',
    flag: '/flag-svgs/in.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'portuguese',
    flag: '/flag-svgs/pt.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'russian',
    flag: '/flag-svgs/ru.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'spanish',
    flag: '/flag-svgs/es.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'swahili',
    flag: '/flag-svgs/ke.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'tamil',
    flag: '/flag-svgs/lk.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'telugu',
    flag: '/flag-svgs/in.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'turkish',
    flag: '/flag-svgs/tr.svg',
  },
  {
    id: crypto.randomUUID(),
    language: 'urdu',
    flag: '/flag-svgs/pk.svg',
  },
];

// PRICING
export const initialPlans: InitialPlan[] = [
  {
    id: '25aee7aa-db34-48a3-b523-24b0b4dbe57d',
    name: 'offer plan',
    tag: 'special offer',
    price: 0,
    duration: 'monthly',
    features: [
      {
        id: crypto.randomUUID(),
        feature: 'All features',
      },
    ],
    status: 'live',
    cta: 'see all features',
  },
  {
    id: '72ec8748-2dac-40fd-a1f1-bdf85c8e9526',
    name: 'free',
    tag: 'Free, trial version to explore',
    price: 0,
    duration: 'monthly',
    features: [
      {
        id: crypto.randomUUID(),
        feature: 'Allow users to create an account without any charges.',
      },
      {
        id: crypto.randomUUID(),
        feature:
          'Provide access to limited features like basic property listings and swapping options.',
      },
    ],
    status: 'coming soon',
    cta: 'see all features',
  },
  {
    id: '46a5c761-f6be-4ac3-a183-a654e0da0848',
    name: 'premium',
    tag: 'Recommended Plan',
    price: 5,
    duration: 'monthly',
    features: [
      {
        id: crypto.randomUUID(),
        feature:
          'Provide advanced search filters (e.g., location, amenities, property type).',
      },
      {
        id: crypto.randomUUID(),
        feature: 'Allow unlimited property listings.',
      },
      {
        id: crypto.randomUUID(),
        feature:
          'Highlight premium properties with priority placement in search results.',
      },
      {
        id: crypto.randomUUID(),
        feature: 'Offer analytics on listing performance (views, inquiries).',
      },
    ],
    status: 'coming soon',
    cta: 'see all features',
  },
  {
    id: '5a6548b9-cee4-4e56-83bd-8c45d84502d8',
    name: 'Enterprise',
    tag: 'Best Plan',
    price: 15,
    duration: 'monthly',
    features: [
      {
        id: crypto.randomUUID(),
        feature: 'Allow bulk property uploads via CSV or API integration.',
      },
      {
        id: crypto.randomUUID(),
        feature:
          'Provide advanced reporting tools to monitor property performance.',
      },
      {
        id: crypto.randomUUID(),
        feature: 'Include dedicated support for enterprise users.',
      },
      {
        id: crypto.randomUUID(),
        feature: 'Offer customizable branding options for agencies.',
      },
      {
        id: crypto.randomUUID(),
        feature: 'Addl. premium plan features',
      },
    ],
    status: 'coming soon',
    cta: 'see all features',
  },
];

// data
export const propertyTypes: PropertyType[] = [
  {
    id: '83285bf8-4ea3-4287-8955-88596d9290bf',
    categoryName: 'Residential',
    categoryTypes: [
      {
        id: 'f475e7b1-18f2-4f70-bc59-fcf398bf4305',
        name: 'Apartment',
        icon: Apartment,
        description: 'Single unit in a residential building',
      },
      {
        id: '39f4ce80-aa1e-472f-8db9-4c84d6e447c7',
        name: 'House',
        icon: House,
        description: 'Detached or semi-detached home',
      },
      {
        id: '6e08ce16-7c80-44d9-8480-cf25d45f57ce',
        name: 'Villa',
        icon: Villa,
        description: 'Luxury standalone house with outdoor space',
      },
      {
        id: '0c1e5fa5-70e6-41e6-ad0a-5ad2cdb14eb2',
        name: 'Penthouse',
        icon: PentHouese,
        description: 'Top-floor luxury apartment',
      },
      {
        id: '15f1278a-b63d-4431-ab2f-90c6824df67e',
        name: 'Studio',
        icon: Studio,
        description:
          'Single-room apartment with combined living, dining, and sleeping space',
      },
      {
        id: '903d9a00-8d0b-4276-9a94-dcc7bea2ed0d',
        name: 'Cottage',
        icon: Cottage,
        description: 'Small house, usually in a rural area',
      },
      {
        id: '7253957e-e8d5-4dee-9e89-e9004fc66eaf',
        name: 'Townhouse',
        icon: TownHouse,
        description: 'Multi-floor home sharing walls with other homes',
      },
      {
        id: '0d4f220b-2cf5-40f5-962c-7587ff2a262c',
        name: 'Duplex/Triplex',
        icon: DuplexORTriplex,
        description: 'Multi-unit home with separate living spaces',
      },
    ],
  },
  {
    id: '4eaf64da-a33f-4b8a-964f-099c2988bdf4',
    categoryName: 'Shared Living Spaces',
    categoryTypes: [
      {
        id: '0455bdcc-623e-4c89-bb2a-abb2a0a76b3e',
        name: 'Shared Apartment',
        icon: SharedApartment,
        description: 'Renting a room in an apartment with common areas',
      },
      {
        id: '267a35ef-a2ca-4ce0-9b82-9450b7c50285',
        name: 'Co-Living Space',
        icon: CoLivingSpace,
        description: 'Community-focused living with shared amenities',
      },
      {
        id: '2738b66d-58d7-4260-8996-1b211a679796',
        name: 'Guest House',
        icon: GuestHouse,
        description: 'Small residence offering lodging',
      },
    ],
  },
  {
    id: '1c193769-d74e-488f-b1f1-c7bed186a98e',
    categoryName: 'Commercial Properties',
    categoryTypes: [
      {
        id: '002e85b0-cd99-47f4-b7e5-cbb04f2b225d',
        name: 'Office Space',
        icon: OfficeSpace,
        description: 'Workspaces, co-working spaces, or corporate offices',
      },
      {
        id: '62a2909f-c985-4c14-bbd7-56909a16b4e5',
        name: 'Retail Space',
        icon: RetailSpace,
        description: 'Shops, showrooms, or commercial outlets',
      },
      {
        id: '239fb3a6-01e5-4246-a808-95a1b3242b55',
        name: 'Warehouse/Industrial Space',
        icon: IndustrialSpace,
        description: 'Storage, logistics, or manufacturing units',
      },
      {
        id: '195550f5-17ad-4f75-974e-55ab78b1428f',
        name: 'Hotel/Resort',
        icon: Resort,
        description: 'Properties offering temporary lodging',
      },
    ],
  },
  {
    id: '9de75058-5f5c-4cc1-b6db-c8be729ffc2f',
    categoryName: 'Land & Investment Properties',
    categoryTypes: [
      {
        id: '71797c0e-8e6d-47c9-b407-c09d9b17bb7b',
        name: 'Raw Land',
        icon: RawLand,
        description: 'Undeveloped land for future use',
      },
      {
        id: '47a885a2-cb58-4412-a5db-8084d33cfdbf',
        name: 'Construction-ready Land',
        icon: ConstructionReadyLand,
        description: 'Land with permits for development',
      },
      {
        id: '9b69c06e-c0a7-4f1e-be8d-4ca899503050',
        name: 'Multi-family Home',
        icon: MultiFamilyHome,
        description: 'Buildings with multiple residential units for rental',
      },
      {
        id: '2951b633-2fb4-4499-88c2-87f5213bc978',
        name: 'Gated Community Property',
        icon: GatedCommunityLand,
        description: 'Homes in secure, managed communities',
      },
    ],
  },
];

export const propertyAccomodations: PropertyType[] = [
  {
    id: crypto.randomUUID(),
    categoryName: 'Entire Place',
    categoryTypes: [
      {
        id: crypto.randomUUID(),
        name: 'Entire Apartment',
        icon: Freehold,
        description:
          'The user gets full access to the apartment, including bedrooms, kitchen, and living area.',
      },
      {
        id: crypto.randomUUID(),
        name: 'Entire House',
        icon: Freehold,
        description:
          'A standalone house, fully available for the user without sharing with others.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    categoryName: 'Private Accommodation',
    categoryTypes: [
      {
        id: crypto.randomUUID(),
        name: 'Private Room',
        icon: Freehold,
        description:
          'The user gets a private bedroom but shares common areas like the kitchen and living room.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    categoryName: 'Shared Accommodation',
    categoryTypes: [
      {
        id: crypto.randomUUID(),
        name: 'Shared Place',
        icon: Freehold,
        description:
          'The user shares both private and common spaces with other residents.',
      },
    ],
  },
];

export const propertyAccessibilities: PropertyType[] = [
  {
    id: '3b962f03-1df6-461b-99ad-8b3a41f9bad7',
    categoryName: 'Entrance & Parking',
    categoryTypes: [
      {
        id: 'baa39201-ae90-4098-b454-b2da5416740a',
        name: 'Step-free entrance',
        icon: Freehold,
        description: 'No stairs or steps to enter the property.',
      },
      {
        id: '6e1a7ede-55cb-4254-a38f-c7af7b862874',
        name: 'Ramp access',
        icon: Freehold,
        description: 'A smooth ramp leading to the entrance.',
      },
      {
        id: 'd403c679-562f-4305-89fb-fc23fba7700f',
        name: 'Wide doorways (80 cm or more)',
        icon: Freehold,
        description: 'Allows wheelchair access.',
      },
      {
        id: '5738e185-a171-43dc-9a2a-de9d328faeac',
        name: 'Designated accessible parking',
        icon: Freehold,
        description: 'Nearby parking with a wide space for easy access.',
      },
      {
        id: '81b4f13d-a019-42d4-a9c1-bd910e083356',
        name: 'Automatic doors or easy-to-open handles',
        icon: Freehold,
        description: 'No complex locks or heavy doors.',
      },
    ],
  },
  {
    id: '0feeaa30-5a8f-4f4b-a495-f9a589b30e8e',
    categoryName: 'Interior Mobility & Navigation',
    categoryTypes: [
      {
        id: 'a244a0a1-00cf-4187-88c9-e19e573ced9f',
        name: 'Step-free access inside',
        icon: Freehold,
        description: 'No stairs or uneven flooring between rooms.',
      },
      {
        id: '5b4599fd-5986-4b08-9530-76cfb34e02e1',
        name: 'Elevator access (if in an apartment building)',
        icon: Freehold,
        description: 'For easy movement between floors.',
      },
      {
        id: '73342175-34d6-413f-8598-5bb3eeb43ad7',
        name: 'Wide hallways (90 cm or more)',
        icon: Freehold,
        description: 'Sufficient space for wheelchair users.',
      },
      {
        id: 'acf185fc-f63b-4c91-a455-569288bf9a59',
        name: 'Lever-style door handles',
        icon: Freehold,
        description: 'Easier to open compared to round knobs.',
      },
      {
        id: 'c09a284e-6df2-4311-ad31-0068938857ff',
        name: 'Non-slip flooring',
        icon: Freehold,
        description: 'Reduces the risk of falls.',
      },
    ],
  },
  {
    id: '328c665c-97da-4fff-ace5-3e404b34deb3',
    categoryName: 'Bedroom Accessibility',
    categoryTypes: [
      {
        id: 'f0e78881-2e0a-43b9-aafd-b4ba13e9f2f0',
        name: 'Lowered bed height',
        icon: Freehold,
        description: 'Easier to transfer from a wheelchair.',
      },
      {
        id: '5807ecf2-e165-4fab-9346-20d065848bf5',
        name: 'Adjustable bed',
        icon: Freehold,
        description: 'Electric or manually adjustable for comfort.',
      },
      {
        id: 'aea85ba6-5208-4867-8848-e4811051479f',
        name: 'Space around the bed for wheelchair maneuverability',
        icon: Freehold,
        description: 'At least 90 cm of clearance.',
      },
      {
        id: 'c71ff281-6dab-4aab-bf0a-54ef1f281d23',
        name: 'Accessible closet/storage',
        icon: Freehold,
        description: 'Lower shelves and hanging rods.',
      },
    ],
  },
  {
    id: '8625ffd6-5f38-42f5-ac46-566955d8e474',
    categoryName: 'Bathroom Accessibility',
    categoryTypes: [
      {
        id: '6066ab07-0118-429b-a01a-54e1a6e5addc',
        name: 'Roll-in shower',
        icon: Freehold,
        description: 'Step-free, wide enough for wheelchair access.',
      },
      {
        id: 'e4ab3cbf-e012-4fba-86b0-7e8f2e777bd2',
        name: 'Grab bars',
        icon: Freehold,
        description:
          'Installed near the toilet, shower, and bathtub for support.',
      },
      {
        id: 'd2343783-23f4-4e10-b420-8d47f01d298a',
        name: 'Shower seat',
        icon: Freehold,
        description:
          'A secure seat for those who cannot stand for long periods.',
      },
      {
        id: 'ce40a9c8-621e-4384-97bd-05f27f98c3eb',
        name: 'Handheld showerhead',
        icon: Freehold,
        description: 'Adjustable for different heights and mobility levels.',
      },
      {
        id: 'd64f1cb9-fb50-4bd3-8f97-7b10d375fdc8',
        name: 'Raised toilet seat',
        icon: Freehold,
        description: 'Easier for those with mobility challenges.',
      },
      {
        id: '3fdb3e1d-1cb2-4da4-9808-b1fe4cd30167',
        name: 'Slip-resistant flooring',
        icon: Freehold,
        description: 'Reduces the risk of slipping.',
      },
    ],
  },
  {
    id: '97ce2e86-9926-476a-94c0-987573743f11',
    categoryName: 'Kitchen & Dining',
    categoryTypes: [
      {
        id: '4cf54f3f-8809-4104-b89f-a59755ac8b51',
        name: 'Lowered countertops',
        icon: Freehold,
        description: 'Accessible for seated users.',
      },
      {
        id: '624fa8fc-3081-424e-acc2-fea7a64d02b5',
        name: 'Easy-to-reach cabinets & storage',
        icon: Freehold,
        description: 'No high shelves.',
      },
      {
        id: '386c276c-759a-479a-9f9f-8a53a5413f94',
        name: 'Accessible dining table height',
        icon: Freehold,
        description: 'Provides knee clearance for wheelchairs.',
      },
      {
        id: 'b1db93f8-e897-447f-afdd-e9b260ef42fe',
        name: 'Push-button or touch-sensitive appliances',
        icon: Freehold,
        description: 'Easier operation for those with dexterity limitations.',
      },
    ],
  },
  {
    id: '5f0666d9-e6ab-4b7e-991f-81e99ddcdb99',
    categoryName: 'Smart & Assistive Technology',
    categoryTypes: [
      {
        id: '5d22a7a7-d196-4397-bc2a-dffcdae701a9',
        name: 'Voice-controlled devices',
        icon: Freehold,
        description:
          'Lights, thermostats, and locks controlled via voice commands.',
      },
      {
        id: 'd76a9660-624d-4dea-99fb-d6348c29132b',
        name: 'Smart home automation',
        icon: Freehold,
        description: 'Remote control of lighting, temperature, and security.',
      },
      {
        id: '8f710209-b3b7-4470-956a-7ca8b8fdde23',
        name: 'Visual and vibrating alarms',
        icon: Freehold,
        description:
          'Fire, smoke, and security alerts for guests with hearing impairments.',
      },
    ],
  },
  {
    id: '5512daab-eb0e-4b08-9b82-16145ed6b5a5',
    categoryName: 'Communication & Safety',
    categoryTypes: [
      {
        id: 'accfe1c0-c962-40be-96c8-ac713784d2c0',
        name: 'Braille signage',
        icon: Freehold,
        description: 'For key areas like rooms, elevators, and exits.',
      },
      {
        id: '16b6527f-4eb8-4f9d-b3bd-cd857858d7a4',
        name: 'Subtitles/closed captions on TV',
        icon: Freehold,
        description: 'Helpful for guests with hearing impairments.',
      },
      {
        id: 'a5d9e6e9-605a-4822-8b4f-43082d9385c5',
        name: 'Emergency assistance button',
        icon: Freehold,
        description: 'Easy access to help in case of emergencies.',
      },
      {
        id: 'bdf92828-b93b-4f96-8da7-2b92e5485b10',
        name: 'Service animal-friendly',
        icon: Freehold,
        description: 'Allows certified guide dogs and service animals.',
      },
    ],
  },
];

export const propertyAmenities: PropertyType[] = [
  {
    id: '999d0a25-be8b-48b2-8cc8-6c5fa5be128a',
    categoryName: 'General Amenities',
    categoryTypes: [
      {
        id: '0350b76c-f1dd-4584-96f7-da00c431db96',
        name: 'Wi-Fi',
        icon: Freehold,
        description: 'High-speed internet access for guests.',
      },
      {
        id: 'd513e243-4930-4961-ab3f-ededc073e335',
        name: 'Air Conditioning',
        icon: Freehold,
        description: 'Cooling system for hot weather.',
      },
      {
        id: 'ba6bb899-ad8c-4483-882f-ea442db16da2',
        name: 'Heating',
        icon: Freehold,
        description: 'Central heating or space heaters.',
      },
      {
        id: 'ccab731f-1405-4b96-8152-fe33d8fefcf8',
        name: 'Washing Machine',
        icon: Freehold,
        description: 'Laundry appliance for washing clothes.',
      },
      {
        id: '3737d8f9-b5a0-4c5b-a3f3-fdf24f9ec555',
        name: 'Dryer',
        icon: Freehold,
        description: 'Laundry appliance for drying clothes.',
      },
      {
        id: '4eed5877-9436-4d23-b3c5-4d01132af478',
        name: 'Hot Water',
        icon: Freehold,
        description: 'Available for showers and cleaning.',
      },
      {
        id: '4c55fb0a-769e-454a-8a17-fc2bf2367225',
        name: 'TV & Streaming Services',
        icon: Freehold,
        description: 'Entertainment options like Netflix, Amazon Prime, etc.',
      },
      {
        id: '0f012ab8-7cc3-41da-a0cc-fc90e4e87f60',
        name: 'Work Desk / Home Office Space',
        icon: Freehold,
        description: 'Dedicated area for work or study.',
      },
      {
        id: 'ade0debf-f179-46e7-b237-39852babf9fa',
        name: 'Closet / Wardrobe Space',
        icon: Freehold,
        description: 'Storage for clothes and personal items.',
      },
      {
        id: '298f43fd-1b7e-49dd-9457-b30277660f93',
        name: 'Iron & Ironing Board',
        icon: Freehold,
        description: 'For keeping clothes neat and wrinkle-free.',
      },
      {
        id: 'f111f734-7ce8-483f-b771-0dbae6e25d17',
        name: 'Hangers',
        icon: Freehold,
        description: 'For hanging clothes in the closet.',
      },
    ],
  },
  {
    id: '0f82c4de-c35c-4e20-b675-034660d52cb1',
    categoryName: 'Kitchen Amenities',
    categoryTypes: [
      {
        id: '124bf294-0623-4569-8f72-06bed553eeb4',
        name: 'Fully Equipped Kitchen',
        icon: Freehold,
        description: 'Oven, stove, microwave, refrigerator, and more.',
      },
      {
        id: 'a77e3cb5-ac32-4688-9336-ff2a789934b0',
        name: 'Dishwasher',
        icon: Freehold,
        description: 'For easy cleaning after meals.',
      },
      {
        id: '46ada7bf-80fc-4906-a01f-09cf78b4295e',
        name: 'Cooking Basics',
        icon: Freehold,
        description: 'Pots, pans, utensils, and more.',
      },
      {
        id: '93cd1712-e1e2-4b30-ade8-bea6839f2b87',
        name: 'Coffee Maker / Kettle',
        icon: Freehold,
        description: 'For brewing coffee or tea.',
      },
      {
        id: '15f71130-04ea-4363-bb4a-4d6ef2a36fdc',
        name: 'Toaster',
        icon: Freehold,
        description: 'For toasting bread or bagels.',
      },
      {
        id: 'd97545ec-9650-47de-ae50-74339a03f6f6',
        name: 'Dining Table & Chairs',
        icon: Freehold,
        description: 'For enjoying meals together.',
      },
      {
        id: 'e69d446d-0233-4e92-b975-f2e0ce9a5c05',
        name: 'Cutlery & Dishware',
        icon: Freehold,
        description: 'Plates, bowls, glasses, and more.',
      },
    ],
  },
  {
    id: '7ac04267-6fa4-41bf-8285-d7cc8fff803a',
    categoryName: 'Bedroom Amenities',
    categoryTypes: [
      {
        id: '3acb2dee-c2a6-4ef5-af2f-7a42d05faddd',
        name: 'Comfortable Bed & Fresh Linen',
        icon: Freehold,
        description: 'Quality mattress and clean sheets.',
      },
      {
        id: '315074ae-5015-4f10-b1c2-b2b8f97a3df7',
        name: 'Extra Pillows & Blankets',
        icon: Freehold,
        description: 'For added comfort and warmth.',
      },
      {
        id: '944451b8-8218-4c28-a150-5235136e31d8',
        name: 'Blackout Curtains',
        icon: Freehold,
        description: 'Blocks out light for better sleep.',
      },
      {
        id: 'bd188030-f28a-4693-b413-b498989f9fd1',
        name: 'Bedside Lamps',
        icon: Freehold,
        description: 'For reading or relaxing.',
      },
      {
        id: '83435f3a-55f6-4789-8561-ee3a36ee5ba9',
        name: 'Alarm Clock',
        icon: Freehold,
        description: 'Wakes guests up on time.',
      },
    ],
  },
  {
    id: 'bba2df0b-1b1a-4c54-a2f8-849629a8452a',
    categoryName: 'Bathroom Amenities',
    categoryTypes: [
      {
        id: '1f62421b-a4b8-4586-97cf-bc0202211a81',
        name: 'Private Bathroom',
        icon: Freehold,
        description: 'For the guestâ€™s exclusive use.',
      },
      {
        id: '12be4d05-2fb7-4d45-9996-a0a97384037a',
        name: 'Bathtub / Shower',
        icon: Freehold,
        description: 'For bathing or showering.',
      },
      {
        id: '57e0e2d0-e5d9-413c-bcc6-575254a680ce',
        name: 'Fresh Towels',
        icon: Freehold,
        description: 'Clean towels for guests.',
      },
      {
        id: '2abb1812-b49f-44c7-8da1-aec7178046e8',
        name: 'Hair Dryer',
        icon: Freehold,
        description: 'For drying hair after washing.',
      },
      {
        id: '410540df-883d-4b22-8a53-0ded3d7ffa8c',
        name: 'Toiletries (Soap, Shampoo, Conditioner)',
        icon: Freehold,
        description: 'Basic personal care items.',
      },
      {
        id: '7c050f66-d7f2-4694-bde5-ba7aba9aa38d',
        name: 'Toilet Paper',
        icon: Freehold,
        description: 'Essential for bathroom use.',
      },
      {
        id: 'e19f1814-2f5d-44ba-ac6d-55aa06701230',
        name: 'First Aid Kit',
        icon: Freehold,
        description: 'For minor injuries or emergencies.',
      },
    ],
  },
  {
    id: '82a28574-b9f9-438c-ab8a-2cfae66cf26d',
    categoryName: 'Outdoor & Recreational Amenities',
    categoryTypes: [
      {
        id: 'd2e5cb1d-3729-4084-95c3-0a5d7d9bf11d',
        name: 'Private Garden / Backyard',
        icon: Freehold,
        description: 'Outdoor space for relaxation or activities.',
      },
      {
        id: 'f2c5c39a-1480-43b2-a794-61253d6b1c24',
        name: 'Balcony / Terrace',
        icon: Freehold,
        description: 'Outdoor seating area with a view.',
      },
      {
        id: 'f0eda1fb-c9f0-4ee0-9f6c-ca4063aa3366',
        name: 'BBQ Grill',
        icon: Freehold,
        description: 'For outdoor cooking and dining.',
      },
      {
        id: 'f6ebb833-9f46-45ab-8f4a-69569232afdf',
        name: 'Outdoor Seating & Dining Area',
        icon: Freehold,
        description: 'Furniture for enjoying meals outside.',
      },
      {
        id: '6eae2e03-7e59-4b7e-807a-c308ecb79a7b',
        name: 'Swimming Pool',
        icon: Freehold,
        description: 'For swimming and relaxation.',
      },
      {
        id: 'e9da4eda-7f38-4335-8d60-39f84d0eed02',
        name: 'Jacuzzi / Hot Tub',
        icon: Freehold,
        description: 'Relaxing spa experience.',
      },
      {
        id: 'f4079954-60f0-480f-a892-2d0163065576',
        name: 'Rooftop Access',
        icon: Freehold,
        description: 'Outdoor space with a view.',
      },
    ],
  },
  {
    id: '45f4d1b0-d12a-48b8-a25d-1072b89452ec',
    categoryName: 'Fitness & Wellness Amenities',
    categoryTypes: [
      {
        id: '64ac9dd4-1cbf-4e17-8af3-a413f47e1f05',
        name: 'Gym / Workout Equipment',
        icon: Freehold,
        description: 'Exercise machines and weights.',
      },
      {
        id: 'f2dbe4e4-bd68-4cd9-88af-4b86fc4997f4',
        name: 'Yoga Mat',
        icon: Freehold,
        description: 'For yoga and stretching exercises.',
      },
      {
        id: '6b1365b8-bd0c-4955-a7df-64b725232886',
        name: 'Sauna / Steam Room',
        icon: Freehold,
        description: 'Relaxing heat therapy.',
      },
    ],
  },
  {
    id: '481c3548-7cfa-436c-a415-b447de0475c8',
    categoryName: 'Family-Friendly Amenities',
    categoryTypes: [
      {
        id: '15b529e1-4bc9-4d4e-85ba-ffbbd36fca71',
        name: 'Baby Crib / Cot',
        icon: Freehold,
        description: 'For infants and toddlers.',
      },
      {
        id: '08dea13c-532b-4252-b660-d7a78924d1b0',
        name: 'High Chair',
        icon: Freehold,
        description: 'For feeding young children.',
      },
      {
        id: '0bd73502-7c66-4c97-991b-3e9e644a73d1',
        name: 'Childrenâ€™s Toys & Books',
        icon: Freehold,
        description: 'Entertainment for kids.',
      },
      {
        id: 'e466e572-3f69-46ea-b008-d574a8f4c7df',
        name: 'Childproof Home Features',
        icon: Freehold,
        description: 'Safety measures for young children.',
      },
    ],
  },
  {
    id: '15f132d2-1985-4b2a-b686-7d35255c42f4',
    categoryName: 'Pet-Friendly Amenities',
    categoryTypes: [
      {
        id: '9929db57-7d83-4e61-8c24-6a0ed6b99636',
        name: 'Pet Allowed',
        icon: Freehold,
        description: 'Pets are welcome.',
      },
      {
        id: 'f457ee7f-9ed0-4672-ba8a-8d741139d01c',
        name: 'Pet Bed & Bowls',
        icon: Freehold,
        description: 'For the comfort of pets.',
      },
      {
        id: 'cdcfa7c2-917d-45e2-ad61-e65b05f0658a',
        name: 'Nearby Pet-Friendly Parks',
        icon: Freehold,
        description: 'Outdoor spaces for pets to play.',
      },
    ],
  },
  {
    id: 'ba80d213-545f-4cad-a489-5865f3d44bf4',
    categoryName: 'Parking & Transport',
    categoryTypes: [
      {
        id: 'c8c4de38-4433-4928-b4d7-8b6b794bb4d4',
        name: 'Free Parking on Premises',
        icon: Freehold,
        description: 'Complimentary parking available.',
      },
      {
        id: '6bfd49b1-2330-405c-a2d6-398a0a93f24a',
        name: 'Paid Parking Nearby',
        icon: Freehold,
        description: 'Parking available for a fee.',
      },
      {
        id: '4ca9fb3c-95e9-4592-95ca-0220146bdc72',
        name: 'EV Charging Station',
        icon: Freehold,
        description: 'For electric vehicles.',
      },
      {
        id: '5ec4d7b3-7ff1-49de-9883-7e6547497ded',
        name: 'Bicycle / Scooter Storage',
        icon: Freehold,
        description: 'Secure storage for bikes and scooters.',
      },
    ],
  },
  {
    id: '14f327ef-e8ba-4c85-81d7-555904530a5b',
    categoryName: 'Convenience & Accessibility',
    categoryTypes: [
      {
        id: 'c9c704c4-9aea-45db-ad7d-93a4c8f0e731',
        name: 'Parking Area',
        icon: Freehold,
        description: 'Dedicated space for vehicle parking.',
      },
      {
        id: 'd4bd108b-5baf-42ed-b155-083bd6415ab6',
        name: 'Public Transportation Access',
        icon: Freehold,
        description: 'Easy commute via nearby transport options.',
      },
      {
        id: 'f6b87e23-86d5-4d3b-90fa-b3a84e35c041',
        name: 'Elevator',
        icon: Freehold,
        description: 'Available for higher floors or accessibility needs.',
      },
      {
        id: 'efd3662e-8090-4399-8428-fae16ad78562',
        name: 'Disabled People Suitability',
        icon: Freehold,
        description: 'Property designed to accommodate disabled guests.',
      },
    ],
  },
  {
    id: 'aa6a533f-93d1-4764-a6d1-687f7efb52e8',
    categoryName: 'Building & Security Features',
    categoryTypes: [
      {
        id: 'f4f435c6-c49e-4a7c-811a-b3d668903ecb',
        name: 'Elevator Access',
        icon: Freehold,
        description: 'Available for higher floors.',
      },
      {
        id: '28f5a3e8-c5ce-4fd4-b0d9-613a314b077f',
        name: 'Secure Entry (Keycard, Smart Lock, etc.)',
        icon: Freehold,
        description: 'For controlled access.',
      },
      {
        id: '9f9b31b2-d444-4e60-bf72-71c96f2921e7',
        name: '24/7 Security & Surveillance',
        icon: Freehold,
        description: 'For guest safety.',
      },
      {
        id: '35945470-dd20-4329-b1df-87919a99cc79',
        name: 'Smoke Detector & Fire Extinguisher',
        icon: Freehold,
        description: 'For fire safety.',
      },
    ],
  },
  {
    id: '8ab095a6-10da-41de-8d67-da14ff4df349',
    categoryName: 'Sustainable & Eco-Friendly Amenities',
    categoryTypes: [
      {
        id: '28fa2f6d-9f03-4d6e-8942-84d2204158e9',
        name: 'Solar Panels',
        icon: Freehold,
        description:
          'Renewable energy source to reduce electricity consumption.',
      },
      {
        id: 'b04a76e1-bd75-4304-b4ca-f48104e510f0',
        name: 'Rainwater Harvesting System',
        icon: Freehold,
        description: 'Collect and reuse rainwater for household needs.',
      },
      {
        id: 'de711386-b848-4b78-a3c3-a07123a09645',
        name: 'Energy-Efficient Appliances',
        icon: Freehold,
        description: 'Low-energy consumption devices for sustainability.',
      },
      {
        id: '97da6508-3b84-4d1a-ba9d-3cc01472dada',
        name: 'LED Lighting',
        icon: Freehold,
        description: 'Reduces energy usage compared to traditional bulbs.',
      },
      {
        id: 'b165a4c6-60b1-48af-ac17-0f3c39928a67',
        name: 'Smart Thermostat',
        icon: Freehold,
        description: 'Automated temperature control for efficient energy use.',
      },
      {
        id: 'a04a4f62-cfc6-47f1-8e3f-05543960adb6',
        name: 'Compost Bin',
        icon: Freehold,
        description: 'Encourages organic waste recycling.',
      },
      {
        id: 'b3489d79-861c-420e-94d8-4554e93cabfb',
        name: 'Recycling Bins',
        icon: Freehold,
        description: 'Proper waste segregation for sustainability.',
      },
      {
        id: '9eac5f17-606d-4e38-ad3a-b6bf1e74b047',
        name: 'Electric Vehicle (EV) Charging Station',
        icon: Freehold,
        description: 'Support for electric cars.',
      },
      {
        id: '061061ef-e59e-425a-8887-2a183980500d',
        name: 'Green Rooftop / Vertical Garden',
        icon: Freehold,
        description: 'Improves air quality and insulation.',
      },
      {
        id: '4d99e586-2336-4696-8b40-336e5bf37859',
        name: 'Water-Saving Fixtures',
        icon: Freehold,
        description: 'Low-flow taps, showers, and dual-flush toilets.',
      },
      {
        id: 'a95dd5fc-3402-4939-a4e1-9457c194ccaa',
        name: 'Sustainable Building Materials',
        icon: Freehold,
        description: 'Eco-friendly and non-toxic construction materials.',
      },
      {
        id: '7960fb8e-085d-4d8d-8582-c7e51ce43a0d',
        name: 'Bicycle-Friendly Features',
        icon: Freehold,
        description: 'Bike racks, repair stations, and cycle-friendly routes.',
      },
      {
        id: '4759685d-b16d-4445-819b-0e315830c2cf',
        name: 'Organic Garden / Homegrown Produce',
        icon: Freehold,
        description: 'Access to fresh fruits and vegetables.',
      },
      {
        id: 'd5b4da9d-dc0c-4b79-ab65-00adac8a7881',
        name: 'Locally Sourced / Eco-Friendly Furniture',
        icon: Freehold,
        description: 'Sustainable interior choices.',
      },
      {
        id: '4b269a5d-72b2-4a4b-8ceb-f8610a0e5ec6',
        name: 'Carbon Offset Initiatives',
        icon: Freehold,
        description: 'Contributions to sustainability projects.',
      },
      {
        id: '74dc2cf9-a17a-4691-9295-538aec73b77b',
        name: 'Smart Home Automation',
        icon: Freehold,
        description:
          'Reduce energy wastage with automated lighting and appliances.',
      },
    ],
  },
];

export const propertyRules: PropertyType[] = [
  {
    id: '5d1e5217-aed2-46b3-91e5-fcc919015214',
    categoryName: 'General Rules',
    categoryTypes: [
      {
        id: 'a8433c1a-6611-4ebb-a36a-396edca63788',
        name: 'Respect the Property',
        icon: Freehold,
        description: 'Treat the home as if it were your own.',
      },
      {
        id: 'a6ac75d1-112f-4ffa-8006-3c507d150c19',
        name: 'No Unauthorized Guests',
        icon: Freehold,
        description: 'Only registered guests are allowed to stay.',
      },
      {
        id: 'f25afbdc-9c3f-4533-84d6-a79c7f834067',
        name: 'Check-In & Check-Out',
        icon: Freehold,
        description:
          'Follow the agreed-upon schedule for arrival and departure.',
      },
    ],
  },
  {
    id: '25a3c1f4-b135-45a4-a439-91aeb3c475b6',
    categoryName: 'Noise & Conduct',
    categoryTypes: [
      {
        id: '7bbe28dc-a2ab-4dc5-a0ec-3fbd714760a7',
        name: 'Quiet Hours',
        icon: Freehold,
        description: 'Maintain low noise levels from 10:00 PM to 7:00 AM.',
      },
      {
        id: '491002f7-83aa-42ff-b986-7ff1f27151b2',
        name: 'No Parties or Events',
        icon: Freehold,
        description: 'Gatherings must be approved by the host.',
      },
      {
        id: '5d23bfb9-aa2e-4670-ab86-95971f72144f',
        name: 'Respect the Neighbors',
        icon: Freehold,
        description: 'Keep shared spaces clean and noise minimal.',
      },
    ],
  },
  {
    id: '839d5c20-988d-419a-a673-73c528a9022f',
    categoryName: 'Smoking, Pets & Alcohol',
    categoryTypes: [
      {
        id: '4625a998-070d-4321-941d-fa769d2d9b1c',
        name: 'No Smoking Indoors',
        icon: Freehold,
        description: 'Only permitted in designated outdoor areas.',
      },
      {
        id: '6eeb2753-fa27-4fab-8732-6eb2078b454e',
        name: 'Pet Policy',
        icon: Freehold,
        description: 'Pets are allowed only if approved by the host.',
      },
      {
        id: 'f72ffec2-76dd-4a81-8562-9f3e2812f3b1',
        name: 'Keep Pets Supervised',
        icon: Freehold,
        description: 'Do not leave pets unattended in the home.',
      },
      {
        id: 'b73db88f-3ee1-425b-b361-e4cd45d7253d',
        name: 'Clean Up After Pets',
        icon: Freehold,
        description: 'Dispose of waste properly.',
      },
      {
        id: '55092048-7026-44c0-8f28-433f8eef395f',
        name: 'No Pets on Furniture',
        icon: Freehold,
        description: 'Unless permitted by the host.',
      },
      {
        id: '4640868b-57ec-4ad6-92e0-82e656d399a0',
        name: 'Pet Noise Control',
        icon: Freehold,
        description: 'Ensure pets do not cause disturbances to neighbors.',
      },
      {
        id: 'f5e64a72-21cf-44be-9164-5219562f3e00',
        name: 'Pet Safety Measures',
        icon: Freehold,
        description: 'Keep pets on a leash in shared or outdoor areas.',
      },
      {
        id: 'a7133a98-5af0-44f9-8ca4-bdbffb581be0',
        name: 'Alcohol Consumption',
        icon: Freehold,
        description:
          'Responsible drinking is allowed, but excessive behavior is prohibited.',
      },
    ],
  },
  {
    id: 'a79b4c2a-1977-4e1b-99eb-58a281285a70',
    categoryName: 'Cleanliness & Maintenance',
    categoryTypes: [
      {
        id: '59f1dcef-8654-4dad-9427-37e731699ed6',
        name: 'Keep the Property Clean',
        icon: Freehold,
        description: 'Tidy up after yourself and dispose of waste properly.',
      },
      {
        id: 'dddf1788-af1f-48ad-9ad2-1abc3df92c42',
        name: 'Report Damages Immediately',
        icon: Freehold,
        description: 'Any accidental damage must be reported to the host.',
      },
      {
        id: '8a3ac71b-f50b-4958-afef-ddfadd4202ea',
        name: 'Use Appliances Responsibly',
        icon: Freehold,
        description:
          'Avoid overloading electrical circuits or misusing appliances.',
      },
    ],
  },
  {
    id: '63fc3cbd-a936-4624-ab24-1b67f395bef5',
    categoryName: 'Security & Safety',
    categoryTypes: [
      {
        id: 'c6246c2d-fba3-45cd-9dad-fa7275aeee04',
        name: 'Lock Doors & Windows',
        icon: Freehold,
        description: 'Secure the property when leaving.',
      },
      {
        id: '9f1dd321-29de-4770-88c5-09a4cd55e836',
        name: 'Follow Fire Safety Measures',
        icon: Freehold,
        description:
          'Locate fire exits, extinguishers, and alarms upon arrival.',
      },
      {
        id: '18900b79-6d4f-42a4-b039-922baff8721d',
        name: 'Do Not Share Access Codes/Keys',
        icon: Freehold,
        description: 'Keep entry credentials private.',
      },
    ],
  },
  {
    id: '6d3ef155-5f70-48d9-a997-5f41f9264515',
    categoryName: 'Internet & Tech Usage',
    categoryTypes: [
      {
        id: '8f158759-57e3-41eb-9cea-dfcb71919046',
        name: 'Respect Data Limits',
        icon: Freehold,
        description:
          'Avoid excessive streaming if internet bandwidth is limited.',
      },
      {
        id: '14039f6e-a67a-4101-bc52-06d85673668b',
        name: 'No Illegal Activities',
        icon: Freehold,
        description: 'Do not use the internet for unlawful purposes.',
      },
    ],
  },
  {
    id: '2d7b86cb-0147-4dce-8770-0ed358aa84ea',
    categoryName: 'Waste Management',
    categoryTypes: [
      {
        id: '7842463c-79db-4e50-b306-93be9cb2e3af',
        name: 'Recycling Rules',
        icon: Freehold,
        description: 'Sort waste into designated bins.',
      },
      {
        id: '790b81ba-e812-448f-bfa6-727947d2fd16',
        name: 'Food Disposal',
        icon: Freehold,
        description: 'Avoid leaving food out to prevent pests.',
      },
    ],
  },
  {
    id: 'b318a814-86bd-4d68-9b2a-df482d197f47',
    categoryName: 'Departure Guidelines',
    categoryTypes: [
      {
        id: '0177b403-17dd-4684-b3be-5d578cb4b451',
        name: 'Leave Property in Good Condition',
        icon: Freehold,
        description: 'Ensure the home is as clean as when you arrived.',
      },
      {
        id: '153551a5-1ff1-4bfa-8867-70f64f49331a',
        name: 'Check for Personal Belongings',
        icon: Freehold,
        description: 'Double-check all rooms before leaving.',
      },
      {
        id: 'd5e89472-23d5-4b25-84cb-c182d3780b98',
        name: 'Leave Keys in Agreed Location',
        icon: Freehold,
        description: 'Follow host instructions for key return.',
      },
    ],
  },
];

export const propertySurroundings: PropertySurroundingsType[] = [
  {
    id: '11e14c1a-fa95-46a0-a7f1-c031e463438c',
    categoryName: 'Natural & Scenic Surroundings',
    categoryTypes: [
      {
        id: 'bd53c79a-04cd-4955-8718-236745b289e0',
        name: 'Mountain',
        icon: Mountain,
        description:
          'Nestled in the hills or mountains, ideal for nature lovers and hikers.',
      },
      {
        id: 'cec54b51-d875-4822-a66c-86a5a0119912',
        name: 'Island',
        icon: Island,
        description:
          'Located on or near an island, offering stunning water views.',
      },
      {
        id: '6b80626c-efd4-4535-a4a6-8fafa676dd69',
        name: 'Hill Station',
        icon: HillStation,
        description:
          'Elevated area with a cooler climate and panoramic scenery.',
      },
      {
        id: 'ef78aed3-f4a1-454e-997b-6d60690de8ad',
        name: 'Sea Facing / Coastal',
        icon: SeaFacingOrCoastal,
        description: 'Direct views or proximity to the ocean/sea.',
      },
      {
        id: '7917a2d4-6bc1-4df6-bfef-3f3e429cf445',
        name: 'Lakeside',
        icon: LakeSide,
        description:
          'Situated near a peaceful lake, great for water activities.',
      },
      {
        id: '7b05c583-fceb-43a7-88a6-23566561eaf6',
        name: 'Forest',
        icon: Forest,
        description:
          'Surrounded by dense trees, ideal for a tranquil, nature-rich environment.',
      },
      {
        id: 'e2ff168b-b827-46ad-91ab-dbc0c2d1b4e1',
        name: 'Desert',
        icon: Desert,
        description:
          'A dry, arid region with unique landscapes and warm climates.',
      },
    ],
  },
  // {
  //   id: '2ac09a78-a7b1-4d40-8181-d9eedd2f05cf',
  //   categoryName: 'Rural & Countryside Settings',
  //   categoryTypes: [
  //     {
  //       id: '56b9534a-03e8-415e-adb6-9fd7e38cf27f',
  //       name: 'Village',
  //       icon: Village,
  //       description:
  //         'Small, close-knit rural community with traditional living.',
  //     },
  //     {
  //       id: 'daa86acd-3944-4d57-8075-4d8056885cd1',
  //       name: 'Countryside',
  //       icon: CountrySide,
  //       description:
  //         'Open land with rolling fields, farms, and quiet surroundings.',
  //     },
  //     {
  //       id: '6a7e1377-a7c2-4080-9f5c-acfe48b97d72',
  //       name: 'Isolated',
  //       icon: Isolated,
  //       description: 'Remote area with little to no nearby properties.',
  //     },
  //     {
  //       id: '0d09cd29-1b5c-4639-8e92-6dc2621b1c30',
  //       name: 'Farmland',
  //       icon: FarmLand,
  //       description:
  //         'Surrounded by agricultural fields, ideal for organic living.',
  //     },
  //   ],
  // },
  // {
  //   id: 'd3c49d3d-1a63-4baa-ae41-a8b0b8fac0f4',
  //   categoryName: 'Urban & City Environments',
  //   categoryTypes: [
  //     {
  //       id: '952ee624-9540-4090-aed7-f2a1b2de7838',
  //       name: 'Urban Area',
  //       icon: UrbanArea,
  //       description:
  //         'A developed city or town with access to modern amenities.',
  //     },
  //     {
  //       id: '14615ca0-bd9d-4457-8b06-965ee4c11570',
  //       name: 'Metro City',
  //       icon: MetroCity,
  //       description: 'Located in a major city with high population density.',
  //     },
  //     {
  //       id: 'd0a89ff8-2af8-4b63-b49d-aa35560d140e',
  //       name: 'Town',
  //       icon: Town,
  //       description:
  //         'A mid-sized settlement offering essential services and amenities.',
  //     },
  //     {
  //       id: '41d7cbcc-2c5f-4658-baef-70d6ab2ebb4e',
  //       name: 'Suburban',
  //       icon: SubUrban,
  //       description:
  //         'A residential neighborhood on the outskirts of a major city.',
  //     },
  //     {
  //       id: '1030c4d5-22bd-489b-960c-f9d2aa532751',
  //       name: 'Gated Community',
  //       icon: GatedCommunity,
  //       description: 'A private, secured neighborhood with shared facilities.',
  //     },
  //   ],
  // },
  {
    id: '17e77b82-0e78-4357-a964-332a3bba7b71',
    categoryName: 'Climate-Based Surroundings',
    categoryTypes: [
      {
        id: '646b0fd1-a721-4ed4-8dcd-4b712bb1d4d3',
        name: 'Tropical',
        icon: Tropical,
        description:
          'Warm, humid climate with lush vegetation (e.g., near beaches or jungles).',
      },
      {
        id: 'ea31fa73-d4cf-40b1-9971-f0c21f14bc89',
        name: 'Snowy Region',
        icon: Snowy,
        description: 'Cold, snowy climate, perfect for winter sports.',
      },
      {
        id: '87ae030d-b8aa-4ef2-bf7e-b5cf68d84987',
        name: 'Temperate Zone',
        icon: TemparateZone,
        description: 'Balanced climate with distinct seasons.',
      },
      {
        id: '82019c5e-23ec-4eba-a1df-c2647ef73759',
        name: 'Arid / Dry Region',
        icon: AridOrDryRegion,
        description: 'Hot and dry climate, often in desert-like areas.',
      },
      {
        id: '11f5a18c-522b-44ea-88c2-95ad4526805b',
        name: 'Windy Coastal Area',
        icon: WindyCoastalArea,
        description:
          'Located near the ocean with strong winds and fresh sea breezes.',
      },
      {
        id: '0071d304-4ba7-4d7e-ab52-a80167b6bb1a',
        name: 'Evergreen Forest Zone',
        icon: EverGreenForestZone,
        description: 'Surrounded by year-round green trees and mild weather.',
      },
    ],
  },
];

export const propertyEnvironments: PropertyEnvironmentType[] = [
  {
    id: '2ac09a78-a7b1-4d40-8181-d9eedd2f05cf',
    categoryName: 'Rural & Countryside',
    categoryTypes: [
      {
        id: '56b9534a-03e8-415e-adb6-9fd7e38cf27f',
        name: 'Village',
        icon: Village,
        description:
          'Small, close-knit rural community with traditional living.',
      },
      {
        id: 'daa86acd-3944-4d57-8075-4d8056885cd1',
        name: 'Countryside',
        icon: CountrySide,
        description:
          'Open land with rolling fields, farms, and quiet surroundings.',
      },
      {
        id: '6a7e1377-a7c2-4080-9f5c-acfe48b97d72',
        name: 'Isolated',
        icon: Isolated,
        description: 'Remote area with little to no nearby properties.',
      },
      {
        id: '0d09cd29-1b5c-4639-8e92-6dc2621b1c30',
        name: 'Farmland',
        icon: FarmLand,
        description:
          'Surrounded by agricultural fields, ideal for organic living.',
      },
    ],
  },
  {
    id: 'd3c49d3d-1a63-4baa-ae41-a8b0b8fac0f4',
    categoryName: 'Urban & City',
    categoryTypes: [
      {
        id: '952ee624-9540-4090-aed7-f2a1b2de7838',
        name: 'Urban Area',
        icon: UrbanArea,
        description:
          'A developed city or town with access to modern amenities.',
      },
      {
        id: '14615ca0-bd9d-4457-8b06-965ee4c11570',
        name: 'Metro City',
        icon: MetroCity,
        description: 'Located in a major city with high population density.',
      },
      {
        id: 'd0a89ff8-2af8-4b63-b49d-aa35560d140e',
        name: 'Town',
        icon: Town,
        description:
          'A mid-sized settlement offering essential services and amenities.',
      },
      {
        id: '41d7cbcc-2c5f-4658-baef-70d6ab2ebb4e',
        name: 'Suburban',
        icon: SubUrban,
        description:
          'A residential neighborhood on the outskirts of a major city.',
      },
      {
        id: '1030c4d5-22bd-489b-960c-f9d2aa532751',
        name: 'Gated Community',
        icon: GatedCommunity,
        description: 'A private, secured neighborhood with shared facilities.',
      },
    ],
  },
];

export const propertyOwnerships: PropertyOwnershipType[] = [
  {
    id: '493e31f0-b032-442c-b7ee-02cb7b7e8f31',
    categoryName: 'Ownership Types',
    categoryTypes: [
      {
        id: '341c4e29-f33e-4dd1-a5cd-abdf7296325e',
        name: 'Freehold',
        icon: Freehold,
        description:
          'Full ownership of the property and land with no time limit.',
      },
      {
        id: '648f4236-4d53-4ff8-a0c0-49d87ed5b1b5',
        name: 'Leasehold',
        icon: Freehold,
        description:
          'Ownership for a fixed period (e.g., 99 years, 50 years) with a lease agreement.',
      },
      {
        id: '4323b181-0698-4e1e-acc7-5c20345e4e3d',
        name: 'Co-ownership',
        icon: Freehold,
        description:
          'Shared ownership between multiple individuals or entities.',
      },
      {
        id: '62871bfc-b143-4f3b-b752-485bb38c3ba0',
        name: 'Timeshare Ownership',
        icon: Freehold,
        description:
          'Shared usage rights for vacation properties at specific times.',
      },
      {
        id: '571da17b-a39a-4145-9b32-04e3c1a495fe',
        name: 'Inherited Property',
        icon: Freehold,
        description: 'Property received through family inheritance.',
      },
      {
        id: 'fd494e69-31b2-4261-bddc-f5526fb46e77',
        name: 'Joint Ownership',
        icon: Freehold,
        description:
          'Property owned by two or more people, either as joint tenants or tenants in common.',
      },
      {
        id: '5ca1441a-4d9a-4887-b892-5c5fac757a15',
        name: 'Corporate-Owned',
        icon: Freehold,
        description: 'Property owned by a company or organization.',
      },
      {
        id: 'b4c5c7bc-f580-4a90-b7c2-36a210744324',
        name: 'Rented Property',
        icon: Freehold,
        description:
          'Property rented for a fixed duration with a contractual agreement.',
      },
    ],
  },
  // {
  //   id: '441197ea-902f-4a0d-b3fc-bf8d75325ddb',
  //   categoryName: 'Swapping Types',
  //   categoryTypes: [
  //     {
  //       id: '904681f5-6fdf-4a1f-8bdb-926f8d43b01b',
  //       name: 'Permanent Swap',
  //       icon: Freehold,
  //       description:
  //         'Exchanging homes with another party on a permanent basis.',
  //     },
  //     {
  //       id: '56ba883b-1a8a-443a-8aa7-70bb1cf75341',
  //       name: 'Temporary Swap',
  //       icon: Freehold,
  //       description: 'Short-term exchange of homes for vacations or holidays.',
  //     },
  //   ],
  // },
];

export const propertySwappings: PropertySwappingType[] = [
  {
    id: '441197ea-902f-4a0d-b3fc-bf8d75325ddb',
    categoryName: 'Swapping Types',
    categoryTypes: [
      {
        id: '904681f5-6fdf-4a1f-8bdb-926f8d43b01b',
        name: 'Permanent Swap',
        icon: Freehold,
        description:
          'Exchanging homes with another party on a permanent basis.',
      },
      {
        id: '56ba883b-1a8a-443a-8aa7-70bb1cf75341',
        name: 'Temporary Swap',
        icon: Freehold,
        description: 'Short-term exchange of homes for vacations or holidays.',
      },
    ],
  },
];

export const propertyRentalPeriods: PropertyRentalPeriodType[] = [
  {
    id: '191c86ed-de1e-44ce-814f-15b7d2cbd8c3',
    categoryName: 'Rental Types',
    categoryTypes: [
      {
        id: '9a9b26c7-95ba-4b55-8f1b-f8db7b2ae9e5',
        name: 'Short-Term Rentals',
        description:
          'Ideal for vacationers, digital nomads, or business travelers',
        rentType: [
          {
            id: '5f2eccaa-3fca-44d7-837c-e343ca5dfb43',
            name: 'Daily Rental',
            description: 'Hotels, Airbnb, homestays.',
          },
          {
            id: 'c40f60a1-0a69-431b-b562-1b26cdc27a92',
            name: 'Weekly Rental',
            description: 'Holiday homes, serviced apartments.',
          },
          {
            id: '88dc012d-6c22-4cc7-a3ee-218b7e9d6f98',
            name: 'Monthly Rental',
            description: 'Co-living spaces, temporary stays.',
          },
        ],
      },
      {
        id: 'd894e035-c090-43ab-b92c-8b4f708bbf03',
        name: 'Medium-Term Rentals',
        description:
          'Flexible leases for professionals, students, and relocations.',
        rentType: [
          {
            id: '61ad3d0d-3c55-466b-b9e5-48afdf079fe5',
            name: '3-Month Lease',
            description: 'Short work contracts, internships.',
          },
          {
            id: '94432097-68b7-4c27-848b-568311a0e48b',
            name: '6-Month Lease',
            description: 'Ideal for students or temporary assignments.',
          },
        ],
      },
      {
        id: 'a11e94f7-9fff-40cf-ad3c-3d0eba21920f',
        name: 'Long-Term Rentals',
        description: 'Stability-focused agreements for tenants and landlords.',
        rentType: [
          {
            id: '5e9f6643-27f9-47c7-88a8-f5e7107be635',
            name: '1-Year Lease (Long-Term)',
            description: 'Standard residential lease.',
          },
          {
            id: 'fb227798-8aa7-45f0-83e4-42bec6844a64',
            name: '2-Year Lease',
            description: 'Preferred for secure housing arrangements.',
          },
          {
            id: '06d95fd2-abc9-4825-ab98-38d6ae08776b',
            name: '5-Year Lease',
            description: 'Often used for commercial properties.',
          },
          {
            id: '7334b83c-8b43-442c-8f3f-c66ee068e959',
            name: '10+ Year Lease',
            description: 'Corporate leasing, large business contracts.',
          },
        ],
      },
      {
        id: 'e26c2fe9-2d76-4a86-a966-df4b09b6c024',
        name: 'Leased Property',
        description:
          'A property rented for a fixed duration with a contractual agreement.',
        rentType: [
          {
            id: '4dc5d3b2-0126-4e3f-a28d-7fa0c71687ab',
            name: '1-Year Lease (contractual)',
            description: 'A traditional rental agreement for one year.',
          },
          {
            id: '746a2bbc-7ba5-480c-9aa7-4189cc5d716c',
            name: 'Month-to-Month Lease',
            description:
              'Flexible lease that requires a shorter notice period.',
          },
        ],
      },
    ],
  },
];

export const propertyBedRooms = [
  {
    id: 'd4c14f81-1989-4df3-adc9-6ea0d1d2c27e',
    value: 0,
  },
  {
    id: 'bed249c1-bfe9-414d-975d-2b32185ec37a',
    value: 1,
  },
  {
    id: '12f37e1e-fb6e-4e52-8328-9c8eca12ae66',
    value: 2,
  },
  {
    id: '6d8ed415-2b74-4bac-9ece-0371d4408de5',
    value: 3,
  },
  {
    id: '54165b11-abad-4d65-a9cd-43f472a7b325',
    value: 4,
  },
  {
    id: '66b65cce-e0a2-4f2c-978d-5359086ec3ad',
    value: 5,
  },
  {
    id: 'b39d374a-4a5e-47f3-8ac5-d00db3bbd166',
    value: 6,
  },
  {
    id: 'b95546ba-288c-4aea-8609-0e32727d7f5b',
    value: 7,
  },
  {
    id: '39c382d5-293e-45bf-a79b-4fa46270eaaa',
    value: 8,
  },
  {
    id: '4dee8dbd-ec60-4f0f-b65c-3721765ec4f0',
    value: 9,
  },
  {
    id: 'b1a08837-39c5-4a05-bc2f-98e1381134ed',
    value: 10,
  },
];

export const propertyBathRooms = [
  {
    id: '59be9773-4ee9-44d8-8da8-7e6dc481bada',
    value: 0,
  },
  {
    id: 'cdf0c3f1-11cc-482d-939c-8f94ab4a7f8f',
    value: 1,
  },
  {
    id: 'a2d2aeb7-8013-4748-98d9-ad43e3c85dc4',
    value: 2,
  },
  {
    id: '5b07abc5-ad72-460a-af16-ee1e72eff386',
    value: 3,
  },
  {
    id: '0368bd00-e276-4781-b4ae-772b42904365',
    value: 4,
  },
  {
    id: '5f7f99ac-3c94-4b68-96a7-ab0ba5364607',
    value: 5,
  },
  {
    id: '35e66711-6bf1-4962-944f-067b9650b25c',
    value: 6,
  },
  {
    id: '077ecd0f-e1f3-40b6-827b-c6ea2888ca6c',
    value: 7,
  },
  {
    id: '4b82bd6d-e905-4eea-94cf-84e68db2e5ba',
    value: 8,
  },
  {
    id: '7b870747-36c3-4d08-9461-e384c05b3e04',
    value: 9,
  },
  {
    id: '848088be-e52f-4ced-8f61-44e62251d49a',
    value: 10,
  },
];

export const propertyBeds = [
  {
    id: 'd46be2cb-44aa-418c-b0f3-ad7d7c417489',
    value: 0,
  },
  {
    id: '05818950-52d6-406b-b51d-810923690700',
    value: 1,
  },
  {
    id: '059d42be-71b7-4c9a-a248-3f5119081c75',
    value: 2,
  },
  {
    id: '8e5b6ad9-f63c-4c09-89e6-87e9f7fe7af1',
    value: 3,
  },
  {
    id: '3bedd921-e3e0-4339-b633-9c2080db41e4',
    value: 4,
  },
  {
    id: 'b6707e69-ed7f-4e27-8e31-6a702e1a8de8',
    value: 5,
  },
  {
    id: '4624c011-157f-4e11-b0f9-f5ec6942ebd1',
    value: 6,
  },
  {
    id: '4d2a6141-f9cf-4d1b-bbd9-833bd5fd3ade',
    value: 7,
  },
  {
    id: '6758b6cb-ef82-4b3d-8963-b90894b852d5',
    value: 8,
  },
  {
    id: '2d342ed5-d1bb-4270-8f12-49e7305a1897',
    value: 9,
  },
  {
    id: '6b8c6168-9ed0-422e-bb33-9d875fbe0246',
    value: 10,
  },
];

export const propertyGuests = [
  {
    id: 'd7d8b13e-928a-4a95-9e73-b6270d66e068',
    value: 0,
  },
  {
    id: '0e5a0aef-1020-408f-bb14-9e81b68a89c9',
    value: 1,
  },
  {
    id: 'ceb44f74-edd9-45b2-96eb-8900e1303a40',
    value: 2,
  },
  {
    id: '02d5b07c-2690-4598-8674-7cc73bf8ae55',
    value: 3,
  },
  {
    id: 'eb8527fc-6f58-425d-9a2e-997dc5bdc7d0',
    value: 4,
  },
  {
    id: '904fb6c9-f6b5-4364-b965-03202b4b054a',
    value: 5,
  },
  {
    id: '6ad6903b-ea92-496d-849e-df6e47a880b2',
    value: 6,
  },
  {
    id: 'f4aeefea-f9d0-4fc4-acd5-39ae18b82304',
    value: 7,
  },
  {
    id: '3f6b6679-52cf-479b-8cfc-c4e3de041cad',
    value: 8,
  },
  {
    id: '0ac116ab-e4e0-4d30-8daa-cb0f7cb9a052',
    value: 9,
  },
  {
    id: '9cbd8a4a-16a5-4f4f-8e6c-a20f24fb9986',
    value: 10,
  },
];

// create enums for zod schemas
export const propertyTypesEnum = propertyTypes
  .map((type) => {
    return type.categoryTypes.map((category) => category.name.toLowerCase());
  })
  .flat() as [string, ...string[]];

export const propertyOwnershipsEnum = propertyOwnerships
  .map((type) => {
    return type.categoryTypes.map((category) => category.name.toLowerCase());
  })
  .flat() as [string, ...string[]];

export const propertySwappingsEnum = propertySwappings
  .map((type) => {
    return type.categoryTypes.map((category) => category.name.toLowerCase());
  })
  .flat() as [string, ...string[]];

export const propertySurroundingsEnum = propertySurroundings
  .map((type) => {
    return type.categoryTypes.map((category) => category.name.toLowerCase());
  })
  .flat() as [string, ...string[]];

export const propertyEnvironmentsEnum = propertyEnvironments
  .map((type) => {
    return type.categoryTypes.map((category) => category.name.toLowerCase());
  })
  .flat() as [string, ...string[]];

export const propertyAccomodationsEnum = propertyAccomodations
  .map((type) => {
    return type.categoryTypes.map((category) => category.name.toLowerCase());
  })
  .flat() as [string, ...string[]];

// USED IN (MY EXCHANGES PAGE)
export const roomIds = [
  'cd932f84-9b6e-4f84-a0d1-6f504ca5e6e9',
  '46fe84f9-5fc1-423d-bf10-dd69f0203c0b',
  'cc623901-c13b-4335-b187-1b5831f66af3',
  '7078bee1-24d7-4ce7-b8d3-224f8294c10d',
  'a711b9c2-a899-4400-9f7b-85963d99f7fa',
  '938417d6-0598-4b4a-b570-995daae924dd',
  '6373b3e6-b892-4c61-a9b6-6193d8084e3d',
  '66491bec-31d0-4ad5-ae86-e2afdb18b451',
  '5996c954-1517-4f23-b6b9-9cb5d53f243f',
  'fe12d0dd-aa23-41a2-812f-1ca3ce5cb5f2',
  '5ba80b74-bf79-45b8-8f44-ea7ec5791e06',
  '02fe7da2-ef8a-4d09-b75f-877e95fd211f',
  '17edd32d-1229-4b75-ae53-84378a742ec8',
  'cf271eb3-477b-48f8-b14e-5b6017bfb40f',
  '6a8b0cb1-41f5-4640-9a8c-772d70b2f245',
  '5bd1f882-7201-4fb8-ac64-fc7dd9d3fada',
  '419ad57b-479d-4ee9-8db8-0b2f11d21ba8',
  'd828856b-601c-4973-8219-7ce7539e1904',
  '63520416-9194-4589-8299-d0e23174b7ee',
  'ed896345-2797-48dd-8db4-620d09cb3fdc',
  '0630ed7d-073e-4be5-a586-e2afc3e5f7e0',
  '684e62d0-13c5-415f-9454-0cadf60512ab',
  '02d5201c-4594-406e-818a-f91b24aa4480',
  'd4de3e8f-bfa9-4744-ad28-8e130aa2d897',
  '071c5d02-d841-4f50-8a7c-796ec4f52041',
  '3efe280e-b452-423f-8ce8-5c9b0ba425f0',
  '9f0c0d2e-7f70-49e2-9d03-5748228a9757',
  '1ee14c4c-8356-43ff-a6ee-128ddf7ec28a',
  '40b341fa-6568-42e0-aaac-5082347f23ca',
  '6f156e52-5cea-463f-8b3a-843faafdd50c',
  'c889d818-f143-4493-b74a-7c0c3abca754',
  '116b7492-3fb7-477a-9dac-84242c3197db',
  '6111b5d9-1fce-42a5-8674-c0fff8b424fc',
  'cbf0565e-b050-4720-8d15-e6f6281566fd',
  '4ac23a05-5baa-40d1-8bb7-f96be9370b49',
  'c60ba521-4326-41dd-97fb-038b30f4a2d4',
  'd318a728-dd5d-4815-a06e-73ac54ee54e7',
  'c385be35-f969-47ce-bda6-28d093cd77f4',
  'c0e05e08-341d-4258-85a3-f1f1e6647dfd',
  '260016a5-577d-4694-9f8a-1fbde63a626c',
  '87833240-47e4-4249-9dfc-b4d98cae71c4',
  'c1c1edb5-c8d0-4286-b25d-f790cd402987',
  '70c8b588-7d8a-49a5-b441-0d3586186989',
  'a98f6f61-6861-41b0-8adb-bc35bff9ed79',
  '66520780-867a-42ae-8d62-2a86742542bf',
  '233eeaa4-4f47-4ac4-a75b-b275215d5bcd',
  '1973de38-4c8e-4f7b-a24a-a1ff036f88b5',
  '1e1e1ee3-4e5f-4613-80df-682bfe575aae',
  'ec6140b6-b23d-439d-a2c4-16ff7c0a641d',
  '308d8468-e16e-4621-acd2-d48877442218',
  '25aa35ae-8976-4e9e-8a6d-3ec4625bf269',
  'fca53ac3-21c6-483d-8bac-733991c4e22d',
];

export const rooms = [
  {
    id: crypto.randomUUID(),
    title: '4 BHK Villa + Swimming Pool',
    description:
      'Location is Huahin soi 88. Hua Hin vacation home style minimalist. private Suitable for guests who are couples up to 4 couples and can also sleep up to 8-12 persons (Maximum 12 persons)',
    roomlocation: 'Goa, India',
    userLocation: '150 Km away',
    date: '7-12 Jan',
    rating: 4.68,
    images: [
      '/swapping/swapping-card-1.jpg',
      '/swapping/swapping-card-2.png',
      '/swapping/swapping-card-3.png',
      '/swapping/swapping-card-4.jpg',
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Mansion',
    description:
      'Location is Huahin soi 88. Hua Hin vacation home style minimalist. private Suitable for guests who are couples up to 4 couples and can also sleep up to 8-12 persons (Maximum 12 persons)',
    roomlocation: 'Kerala, India',
    userLocation: '2300 Km away',
    date: '7-12 Jan',
    rating: 3.68,
    images: [
      '/swapping/swapping-card-1.jpg',
      '/swapping/swapping-card-2.png',
      '/swapping/swapping-card-3.png',
      '/swapping/swapping-card-4.jpg',
    ],
  },
  {
    id: crypto.randomUUID(),
    title: '2 BHK Bungalow',
    description:
      'Location is Huahin soi 88. Hua Hin vacation home style minimalist. private Suitable for guests who are couples up to 4 couples and can also sleep up to 8-12 persons (Maximum 12 persons)',
    roomlocation: 'Kerala, India',
    userLocation: '750 Km away',
    date: '7-12 Jan',
    rating: 4.68,
    images: [
      '/swapping/swapping-card-1.jpg',
      '/swapping/swapping-card-2.png',
      '/swapping/swapping-card-3.png',
      '/swapping/swapping-card-4.jpg',
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Mansion',
    description:
      'Location is Huahin soi 88. Hua Hin vacation home style minimalist. private Suitable for guests who are couples up to 4 couples and can also sleep up to 8-12 persons (Maximum 12 persons)',
    roomlocation: 'Kerala, India',
    userLocation: '2300 Km away',
    date: '7-12 Jan',
    rating: 3.68,
    images: [
      '/swapping/swapping-card-1.jpg',
      '/swapping/swapping-card-2.png',
      '/swapping/swapping-card-3.png',
      '/swapping/swapping-card-4.jpg',
    ],
  },
];

// CHAT CONSTANTS
export const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours from now
export const issuedAt = Math.floor(new Date().getTime() / 1000); // current time in seconds

// DASHBOARD - MOCK DATA
export const uploadedDocuments = [
  {
    id: crypto.randomUUID(),
    name: 'Document 1',
    type: 'pdf',
    size: '2MB',
    uploadedAt: '2023-10-01',
    status: 'completed',
    docLink: '/Land-Deed.pdf',
  },
  {
    id: crypto.randomUUID(),
    name: 'Document 2',
    type: 'pdf',
    size: '2MB',
    uploadedAt: '2023-10-01',
    status: 'completed',
    docLink: '/Land-Deed.pdf',
  },
  {
    id: crypto.randomUUID(),
    name: 'Document 3',
    type: 'pdf',
    size: '2MB',
    uploadedAt: '2023-10-01',
    status: 'completed',
    docLink: '/Land-Deed.pdf',
  },
  {
    id: crypto.randomUUID(),
    name: 'Document 4',
    type: 'pdf',
    size: '2MB',
    uploadedAt: '2023-10-01',
    status: 'completed',
    docLink: '/Land-Deed.pdf',
  },
  {
    id: crypto.randomUUID(),
    name: 'Document 5',
    type: 'pdf',
    size: '2MB',
    uploadedAt: '2023-10-01',
    status: 'completed',
    docLink: '/Land-Deed.pdf',
  },
  {
    id: crypto.randomUUID(),
    name: 'Document 5',
    type: 'pdf',
    size: '2MB',
    uploadedAt: '2023-10-01',
    status: 'completed',
    docLink: '/Land-Deed.pdf',
  },
];
