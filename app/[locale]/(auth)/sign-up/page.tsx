import SectionOverlay from '@/components/shared/SectionOverlay';
import SectionWrapper from '@/components/shared/SectionWrapper';

import Image from 'next/image';

import RegistrationFormStep from '@/components/forms/sign-up/RegistrationFormStep';
import SignUpFormProvider from '@/components/forms/sign-up/SignUpFormProvider';
import { AuthContextProvider } from '@/contexts/auth-context';
import SignUpImagePNG from '@/public/sign-up/sign-up.png';
import SignUpImageSVG from '@/public/sign-up/sign-up.svg';
import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Rotate Key | Sign Up',
  description:
    "Unlock the Door to Your Next Adventure with Rotate Keys. Rotate Keys is not just a platform; it's a community of like-minded individuals sharing the joy of exploration and discovery. Your dream house swap is just a click away.",
};

export default async function SignUpPage() {
  const user = await currentUser();

  if (user) {
    return permanentRedirect('/');
  }

  return (
    <section
      className={
        'bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 aspect-video'
      }>
      <SectionWrapper className={'py-20'}>
        <div
          className={
            'grid grid-cols-2 gap-4 bg-tertiary-50 shadow-xl rounded-lg'
          }>
          <div className={'col-span-full lg:col-span-1 relative'}>
            <div
              className={
                'aspect-square overflow-hidden rounded-tl-lg rounded-bl-lg relative'
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
              'col-span-full lg:col-span-1 p-4 md:p-6 inline-grid h-full relative'
            }>
            <AuthContextProvider>
              <SignUpFormProvider>
                <RegistrationFormStep />
              </SignUpFormProvider>
            </AuthContextProvider>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
