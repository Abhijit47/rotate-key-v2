import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';

import SignUpImagePNG from '@/public/sign-up/sign-up.png';
import SignUpImageSVG from '@/public/sign-up/sign-up.svg';

import SectionOverlay from '@/components/shared/SectionOverlay';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card } from '@/components/ui/card';
import OAuthSignInButtons from './_components/OAuthSignInButtons';
import SignInButton from './_components/SignInButton';
import SignInForm from './_components/SignInForm';
import SignInFormProvider from './_components/SignInFormProvider';

export const metadata: Metadata = {
  title: 'Rotate Key | Login',
  description:
    "Unlock the Door to Your Next Adventure with Rotate Keys. Rotate Keys is not just a platform; it's a community of like-minded individuals sharing the joy of exploration and discovery. Your dream house swap is just a click away.",
};

export default async function SignInPage() {
  const user = await currentUser();

  if (user) {
    return permanentRedirect('/');
  }

  return (
    <section>
      <SectionWrapper className={'py-20'}>
        <Card className={'grid grid-cols-5 gap-4 shadow-xl rounded-lg p-0'}>
          <SignInFormProvider>
            <SignInForm />
            <OAuthSignInButtons />
            <SignInButton />
          </SignInFormProvider>

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
            <SectionOverlay description='Welcome Back User, Enter your credential to continue.'>
              <span className={'block'}>Welcome Back</span>
            </SectionOverlay>
          </div>
        </Card>
      </SectionWrapper>
    </section>
  );
}
