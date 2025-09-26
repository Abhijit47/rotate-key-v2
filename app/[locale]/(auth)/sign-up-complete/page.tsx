import SectionOverlay from '@/components/shared/SectionOverlay';
import SectionWrapper from '@/components/shared/SectionWrapper';

import Image from 'next/image';

import SignUpCompleteForm from '@/components/forms/sign-up/SignUpCompleteForm';
// import { SignUpWithSSO } from '@/lib/actions/auth.actions';
import SignUpImagePNG from '@/public/sign-up/sign-up.png';
import SignUpImageSVG from '@/public/sign-up/sign-up.svg';
// import { currentUser, User } from '@clerk/nextjs/server';
import { Metadata } from 'next';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Rotate Key | Sign Up Complete',
  description:
    "Unlock the Door to Your Next Adventure with Rotate Keys. Rotate Keys is not just a platform; it's a community of like-minded individuals sharing the joy of exploration and discovery. Your dream house swap is just a click away.",
};

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
    <section
      className={
        'bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600'
      }>
      <SectionWrapper className={'py-20'}>
        <div
          className={
            'grid grid-cols-4 gap-4 bg-tertiary-50 shadow-xl rounded-lg'
          }>
          <div className={'col-span-full md:col-span-2 relative'}>
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
              'col-span-full md:col-span-2 p-4 md:p-6 inline-grid content-center h-full'
            }>
            <SignUpCompleteForm />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
