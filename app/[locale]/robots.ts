import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ['Googlebot', 'Applebot', 'Bingbot', 'GPTBot'],
      allow: [
        '/',
        'about',
        '/how-it-works',
        '/pricing',
        '/privacy-policy',
        '/terms-of-conditions',
        '/add-property',
        '/swappings',
      ],
      disallow: [
        '/favourite-homes/',
        '/my-exchanges/',
        '/my-matches/',
        '/my-properties/',
        '/notifications/',
        '/profile/',
        '/user-profile/',
        '/matches/',
        '/chat/**',
        '/dashboard/**',
        '/api/**',
      ],
    },
    sitemap: 'https://rotatekey.com/sitemap.xml',
  };
}
