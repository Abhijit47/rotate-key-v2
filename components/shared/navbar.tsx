'use client';

import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { SignedOut } from '@clerk/nextjs';
import { BellOff } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import CustomUserButton from './custom-user-button';
import LanguageSwitcher from './language-switcher';
import { ThemeModeToggle } from './theme-mode-toggle';

// import type { Route } from 'next';

// type NavItem<T extends string = string> = {
//   href: T;
//   label: string;
//   active?: boolean;
// };

const navigationLinks = [
  { href: '/', label: 'Home', active: true },
  { href: '/about', label: 'About' },
  { href: '/swappings', label: 'Swappings' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/notifications', label: 'Notifications' },
  // { href: '/add-property', label: 'Add Property' },
  // { href: '/terms-and-conditions', label: 'Terms' },
  // { href: '/privacy-policy', label: 'Privacy' },
  // { href: '/matches', label: 'Matches' },
  // { href: '/my-properties', label: 'My Properties' },
  // { href: '/my-matches', label: 'My Matches' },
  // { href: '/profile', label: 'Profile' },
  // { href: '/chat', label: 'Live Chat' },
  // { href: '/admin', label: 'Admin' },
];

// Navigation links array to be used in both desktop and mobile menus

export default function Navbar() {
  const locale = useLocale();
  // const t = useTranslations();
  const pathname = usePathname();

  // Regex to match /chat/[userId] paths
  const chatSlugRegex = /^\/chat\/[^/]+$/;
  const pricingSlugRegex = /^\/pricing(\/[^/])?$/;

  // const profileSlugRegex = /^\/profile\/.*$/;
  const profileSlugRegex = /^\/profile(\/.*)?$/;

  // Hide navbar on specific routes
  if (pathname && profileSlugRegex.test(pathname)) {
    return null;
  }

  if (pathname && chatSlugRegex.test(pathname)) {
    return null;
  }

  if (pathname && pricingSlugRegex.test(pathname)) {
    return null;
  }

  return (
    <header className='border-b px-4 md:px-6 sticky top-0 z-40 bg-background/95 backdrop-blur-sm'>
      <div className='flex h-16 justify-between gap-4'>
        {/* Left side */}
        <div className='flex gap-2'>
          <div className='flex items-center md:hidden'>
            {/* Mobile menu trigger */}
            <MobileMenu />
          </div>
          {/* Main nav */}
          <div className='flex items-center gap-6'>
            <Link href='/' className='text-primary hover:text-primary/90'>
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className='h-full *:h-full max-md:hidden'>
              <NavigationMenuList className='h-full gap-2'>
                {navigationLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <NavigationMenuItem key={index} className='h-full'>
                      <NavigationMenuLink
                        active={isActive}
                        asChild
                        className={cn(
                          pathname === link.href &&
                            'text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary',
                          'h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!'
                        )}>
                        <Link href={link.href} locale={locale}>
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-2'>
          <LanguageSwitcher />
          <Button
            variant={'ghost'}
            size={'icon'}
            className='cursor-not-allowed opacity-50'>
            <BellOff className='size-4' />
          </Button>
          <ThemeModeToggle />
          <CustomUserButton />
          <SignedOut>
            <Button asChild variant='ghost' size='sm' className='text-sm'>
              <Link href='/sign-in' locale={locale}>
                Sign In
              </Link>
            </Button>
            <Button asChild size='sm' className='text-sm'>
              <Link href='/sign-up' locale={locale}>
                Get Started
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Popover open={isOpen} onOpenChange={toggleMenu}>
      <PopoverTrigger asChild>
        <Button className='group size-8' variant='ghost' size='icon'>
          <svg
            className='pointer-events-none'
            width={16}
            height={16}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M4 12L20 12'
              className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]'
            />
            <path
              d='M4 12H20'
              className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
            />
            <path
              d='M4 12H20'
              className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]'
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-36 p-1 md:hidden'>
        <NavigationMenu className='max-w-none *:w-full'>
          <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index} className='w-full'>
                <NavigationMenuLink
                  asChild
                  className='py-1.5'
                  // active={pathname === link.href || pathname === t.name}
                  active={pathname === link.href}
                  onClick={toggleMenu}>
                  <Link href={link.href} locale={locale}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  );
}
