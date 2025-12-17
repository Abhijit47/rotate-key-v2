// import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
// import { forbidden } from 'next/navigation';

// import { routing } from '@/i18n/routing';
import { requireAuth } from '@/lib/require-auth';
import CustomProfile from './_components/custom-profile';

export const metadata: Metadata = {
  title: {
    default: 'My Profile',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};
// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function UserProfilePage() {
  await requireAuth();

  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <CustomProfile />
    </div>
  );
}
