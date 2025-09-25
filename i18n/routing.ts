import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en-IN', 'bn-IN', 'es'],

  // Used when no locale matches
  defaultLocale: 'en-IN',
  // GDPR compliance
  localeCookie: {
    // Expire the cookie after 1 year
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },

  localePrefix: 'as-needed',

  // localePrefix: {
  //   mode: 'as-needed',
  //   prefixes: {
  //     'en-IN': '/en/IN',
  //     'bn-IN': '/bn/IN',
  //   },
  // },

  // pathnames: {
  //   '/': '/',
  //   '/about': {
  //     'en-IN': '/about',
  //     'bn-IN': '/সম্পর্কে',
  //     es: '/acerca-de',
  //   },
  //   '/how-it-works': {
  //     'en-IN': '/how-it-works',
  //     'bn-IN': '/কিভাবে-কাজ-করে',
  //     es: '/como-funciona',
  //   },
  // },
});

export type Locale = (typeof routing.locales)[number];
