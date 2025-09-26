import OnboardingImagePNG from '@/public/onboarding/onboarding-img.png';
import OnboardingImageSVG from '@/public/onboarding/onboarding-img.svg';

import SectionWrapper from '@/components/shared/SectionWrapper';

import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { ArrowUpRightSquareIcon, PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { permanentRedirect } from 'next/navigation';

export default async function OnboardingPage() {
  const user = await currentUser();

  if (!user) {
    return permanentRedirect('/');
  }

  return (
    <section>
      <SectionWrapper className={'py-20'}>
        <Card className={'rounded-lg max-w-lg mx-auto p-4 gap-4'}>
          <CardHeader>
            <CardTitle>
              <h1 className={'text-2xl font-semibold text-center'}>
                <span className={'text-foreground block'}>Welcome to</span>
                <span className={'text-xl'}>
                  <span className={'text-primary-500'}>R</span>
                  <span>otate</span>{' '}
                  <span className={'text-primary-500'}>K</span>
                  eys
                </span>
              </h1>
            </CardTitle>
          </CardHeader>
          <Separator />

          <div className={'aspect-square'}>
            <Image
              src={OnboardingImageSVG}
              alt='Onboarding Image'
              width={402}
              height={365}
              className={'w-full h-full object-contain'}
              placeholder='blur'
              blurDataURL={OnboardingImagePNG.blurDataURL}
            />
          </div>

          <Separator className={'py-0'} />
          <div className={'flex w-full flex-wrap items-center justify-evenly'}>
            <Button asChild>
              <Link href={'/'}>
                Continue to Browse
                <span>
                  <ArrowUpRightSquareIcon />
                </span>
              </Link>
            </Button>
            <Button asChild variant={'ghost'}>
              <Link
                href={'/add-property'}
                className={
                  'text-primary-500 ring-1 ring-primary-500 inline-flex items-center gap-2 bg-tertiary-50 hover:bg-primary-500 hover:text-tertiary-50'
                }>
                <span>Create first Listing</span>
                <span>
                  <PlusCircleIcon />
                </span>
              </Link>
            </Button>
          </div>
        </Card>
      </SectionWrapper>
    </section>
  );
}
