import ForgotPasswordFormProvider from '@/components/forms/forgot-password/ForgotPasswordFormProvider';
import ForgotPasswordFormStep from '@/components/forms/forgot-password/ForgotPasswordFormStep';
import SectionOverlay from '@/components/shared/SectionOverlay';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { AuthContextProvider } from '@/contexts/auth-context';
import SignUpImagePNG from '@/public/sign-up/sign-up.png';
import SignUpImageSVG from '@/public/sign-up/sign-up.svg';
import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';

import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Rotate Key | Forgot Password',
  description:
    "Unlock the Door to Your Next Adventure with Rotate Keys. Rotate Keys is not just a platform; it's a community of like-minded individuals sharing the joy of exploration and discovery. Your dream house swap is just a click away.",
};

export default async function ForgotPassword() {
  const user = await currentUser();

  if (user) {
    return permanentRedirect('/');
  }

  return (
    <main>
      <section
        className={
          'bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 aspect-video'
        }>
        <SectionWrapper className={'py-20'}>
          <div
            className={
              'grid grid-cols-5 gap-4 bg-tertiary-50 shadow-xl rounded-lg'
            }>
            <div
              className={
                'col-span-full md:col-span-2 p-4 md:p-6 inline-grid content-center h-full relative'
              }>
              <AuthContextProvider>
                <ForgotPasswordFormProvider>
                  <ForgotPasswordFormStep />
                </ForgotPasswordFormProvider>
              </AuthContextProvider>
            </div>

            <div className={'col-span-full md:col-span-3 relative'}>
              <div
                className={
                  'aspect-square h-full w-full overflow-hidden rounded-tr-lg rounded-br-lg relative'
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
              <SectionOverlay description="Forgot your password don't worry.">
                <span className={'block'}>Forgot Password ?</span>
              </SectionOverlay>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </main>
  );
}
