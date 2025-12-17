import { Metadata } from 'next';
import Image from 'next/image';

import SignUpImagePNG from '@/public/sign-up/sign-up.png';
import SignUpImageSVG from '@/public/sign-up/sign-up.svg';

import SectionOverlay from '@/components/shared/SectionOverlay';
import SectionWrapper from '@/components/shared/SectionWrapper';

import { Card } from '@/components/ui/card';
import { routing } from '@/i18n/routing';
import { LazySignUpCompleteForm } from './_components';

export const metadata: Metadata = {
  title: {
    default: 'Sign Up Complete',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function SignUpComplete() {
  // const user = (await currentUser()) as User;

  // const email = user.emailAddresses[0].emailAddress;
  // const lastActive = user.lastActiveAt || 0;
  // const lastSignInAt = user.lastSignInAt || 0;

  // const formData = new FormData();
  // formData.append('clerkId', user.id as string);
  // formData.append('firstName', user.firstName as string);
  // formData.append('lastName', user.lastName as string);
  // formData.append('hasImage', user.hasImage ? 'true' : 'false');
  // formData.append('avatar', user.imageUrl as string);
  // formData.append('email', email);
  // formData.append('lastActive', String(lastActive));
  // formData.append('lastSignedAt', String(lastSignInAt));
  // formData.append('banned', user.banned ? 'true' : 'false');
  // formData.append('locked', user.locked ? 'true' : 'false');
  // formData.append('passwordEnabled', user.passwordEnabled ? 'true' : 'false');
  // const result = await SignUpWithSSO(formData);
  // console.log('result', result);

  return (
    <section>
      <SectionWrapper className={'py-20'}>
        <Card className={'grid grid-cols-4 gap-4 shadow-xl rounded-lg p-0'}>
          <div className={'col-span-full md:col-span-2 relative'}>
            <div
              className={
                'aspect-square overflow-hidden h-full w-full rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:rounded-bl-lg relative'
              }>
              <Image
                src={SignUpImageSVG}
                alt='Sign Up Image'
                width={945}
                height={800}
                className={'w-full h-full object-cover'}
                placeholder='blur'
                blurDataURL={SignUpImagePNG.blurDataURL}
              />
            </div>
            <SectionOverlay description='Create your Turn Keys account with basic details. It only takes a few minutes to get started.'>
              <span className={'block'}>Your Journey Starts </span>
              <span className={'block'}>Here</span>
            </SectionOverlay>
          </div>
          <div
            className={
              'col-span-full md:col-span-2 p-4 md:p-6 inline-grid content-center h-full'
            }>
            <div className='space-y-6'>
              <div className={'space-y-2'}>
                <h2 className='text-xl sm:text-2xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-foreground'>
                  Let&apos;s get to know each other!
                </h2>
                <p className={'text-sm font-medium text-muted-foreground'}>
                  We need to know a little bit about you before we can get
                  started.
                </p>
              </div>
              <LazySignUpCompleteForm />
            </div>
          </div>
        </Card>
      </SectionWrapper>
    </section>
  );
}
