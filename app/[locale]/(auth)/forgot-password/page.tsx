import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';

import SignUpImagePNG from '@/public/sign-up/sign-up.png';
import SignUpImageSVG from '@/public/sign-up/sign-up.svg';

import SectionOverlay from '@/components/shared/SectionOverlay';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { ThemeModeToggle } from '@/components/shared/theme-mode-toggle';
import { Card } from '@/components/ui/card';
import { AuthContextProvider } from '@/contexts/auth-context';
import ForgotPasswordFormProvider from './_components/ForgotPasswordFormProvider';
import ForgotPasswordFormStep from './_components/ForgotPasswordFormStep';

export const metadata: Metadata = {
  title: 'Rotate Key | Forgot Password',
  description:
    "Unlock the Door to Your Next Adventure with Rotate Keys. Rotate Keys is not just a platform; it's a community of like-minded individuals sharing the joy of exploration and discovery. Your dream house swap is just a click away.",
};

const isDev = process.env.NODE_ENV === 'development';

export default async function ForgotPassword() {
  const user = await currentUser();

  if (user) {
    return permanentRedirect('/');
  }

  return (
    <section>
      <SectionWrapper className={'py-20'}>
        <Card className={'grid grid-cols-5 gap-4 p-0 rounded-lg'}>
          <div
            className={
              'col-span-full md:col-span-2 p-4 md:p-6 inline-grid content-center h-full relative'
            }>
            {isDev ? <ThemeModeToggle /> : null}
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
        </Card>
      </SectionWrapper>
    </section>
  );
}
