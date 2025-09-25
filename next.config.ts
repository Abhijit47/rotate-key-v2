import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.NODE_ENV === 'development' ? false : true;

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
    optimizePackageImports: [
      '@clerk/nextjs',
      '@clerk/themes',
      '@dnd-kit/core',
      '@dnd-kit/modifiers',
      '@dnd-kit/sortable',
      '@dnd-kit/utilities',
      '@emoji-mart/data',
      '@emoji-mart/react',
      '@hookform/resolvers',
      '@neondatabase/serverless',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      '@stream-io/video-react-sdk',
      '@t3-oss/env-nextjs',
      '@tabler/icons-react',
      '@tanstack/react-table',
      'chrono-node',
      'class-variance-authority',
      'clsx',
      'cmdk',
      // 'date-fns',
      'drizzle-orm',
      'drizzle-seed',
      'embla-carousel-autoplay',
      'embla-carousel-react',
      'emoji-mart',
      'input-otp',
      // 'lucide-react',
      'next',
      'next-themes',
      'pdfjs-dist',
      'react',
      'react-day-picker',
      'react-dom',
      'react-hook-form',
      'react-pdf',
      'react-resizable-panels',
      // 'recharts',
      'sonner',
      'stream-chat',
      'stream-chat-react',
      'tailwind-merge',
      'vaul',
      'zod',
    ],
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
        port: '',
      },
    ],
  },
  serverExternalPackages: [
    'bcrypt',
    '@highlight-run/node',
    'require-in-the-middle',
  ],
};

// export default nextConfig;

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);