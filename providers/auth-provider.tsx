'use client';

import {
  ClerkFailed,
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
} from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';
import { useTheme } from 'next-themes';
import Image from 'next/image';

// import { cn } from '@/lib/utils';

import LogoDark from '@/public/logos/logo-landscape-2.webp';
// import LogoLight from '@/public/logos/logo-landscape.png';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { systemTheme } = useTheme();

  return (
    <ClerkProvider
      standardBrowser
      appearance={{
        baseTheme: systemTheme ? shadcn : undefined,
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
          shimmer: true,
          animations: true,
        },
      }}>
      <ClerkLoading>
        <div className={'h-dvh flex items-center justify-center'}>
          <div
            className={'h-full w-36'}
            // suppressHydrationWarning
            // className={cn(
            //   systemTheme === 'dark' && 'h-full w-36',
            //   systemTheme === 'light' && 'h-full w-36',
            //   'block'
            // )}
          >
            <Image
              src={LogoDark}
              alt='logo'
              width={2500}
              height={2500}
              className={'object-contain w-full h-full'}
              priority={true}
              placeholder='blur'
              blurDataURL={LogoDark.blurDataURL}
            />
            {/* {systemTheme === 'dark' ? (
              <Image
                src={LogoDark}
                alt='logo'
                width={2500}
                height={2500}
                className={'object-cover w-full h-full'}
                priority={true}
                placeholder='blur'
                blurDataURL={LogoDark.blurDataURL}
              />
            ) : (
              <Image
                src={LogoLight}
                alt='logo'
                width={106}
                height={80}
                className={'object-contain w-full h-full'}
                priority={true}
                placeholder='blur'
                blurDataURL={LogoLight.blurDataURL}
              />
            )} */}
          </div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
      <ClerkFailed>
        <div>Auth Provider Failed to load</div>
      </ClerkFailed>
    </ClerkProvider>
  );
}
