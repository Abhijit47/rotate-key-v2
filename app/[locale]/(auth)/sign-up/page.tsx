import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';

import SignUpImagePNG from '@/public/sign-up/sign-up.png';
import SignUpImageSVG from '@/public/sign-up/sign-up.svg';

import SectionOverlay from '@/components/shared/SectionOverlay';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card } from '@/components/ui/card';
import { AuthContextProvider } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import RegistrationFormStep from './_components/registratio-form-step';
import SignUpFormProvider from './_components/sign-up-form-provider';

export const metadata: Metadata = {
  title: {
    default: 'Sign Up',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export default async function SignUpPage() {
  const user = await currentUser();

  if (user) {
    return permanentRedirect('/');
  }

  return (
    <section className={cn('h-dvh w-full')}>
      <SectionWrapper className={'py-20'}>
        <Card
          className={
            'grid grid-cols-2 gap-4 items-center h-full rounded-lg p-0'
          }>
          <div className={'col-span-full md:col-span-1 h-full w-full relative'}>
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
              'col-span-full md:col-span-1 p-4 lg:p-6 inline-grid h-full relative'
            }>
            <AuthContextProvider>
              <SignUpFormProvider>
                <RegistrationFormStep />
              </SignUpFormProvider>
            </AuthContextProvider>
          </div>
        </Card>
      </SectionWrapper>
    </section>
  );
}
