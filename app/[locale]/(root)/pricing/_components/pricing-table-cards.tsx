'use client';

import { ThemeModeToggle } from '@/components/shared/theme-mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PricingTable } from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';
import { ArrowLeftCircle, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function PricingTableCards() {
  const { systemTheme } = useTheme();
  return (
    <div className={'relative h-full py-20 my-8 space-y-8 px-4 2xl:px-0'}>
      <Card className={'max-w-[85em] mx-auto relative'}>
        <CardHeader>
          <CardTitle>
            <h1 className={'text-2xl lg:text-3xl font-bold text-center'}>
              Choose the plan that&apos;s right for you
            </h1>
          </CardTitle>
          <CardDescription>
            <p className={'text-center'}>
              Simple and transparent pricing. No hidden fees, no surprises.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <section className={'h-full flex items-center justify-center'}>
            <PricingTable
              newSubscriptionRedirectUrl='/'
              appearance={{
                baseTheme: systemTheme ? shadcn : undefined,
                layout: {
                  shimmer: true,
                  animations: true,
                },
              }}
              fallback={
                <div>
                  <Loader2 className={'w-6 h-6 animate-spin'} />
                </div>
              }
            />
          </section>
        </CardContent>

        <CardFooter>
          <CardAction
            className={'w-full flex items-center justify-center gap-4'}>
            <Link
              href={'/'}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                })
              )}>
              <ArrowLeftCircle className={'size-4'} />
              Go Back
            </Link>
            <ThemeModeToggle />
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
