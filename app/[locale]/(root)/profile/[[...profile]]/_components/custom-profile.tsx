'use client';

import { UserProfile, useUser } from '@clerk/nextjs';
import {
  BookOpenCheck,
  ListFilterPlusIcon,
  LogOut,
  PauseCircle,
  ShieldCheckIcon,
  UserRoundPen,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Spinner } from '@/components/ui/spinner';
import PropertiesOnHolds from './properties-on-holds';
import UpdateProfilePage from './update-profile';
import YourRecentListings from './YourRecentListings';

export default function CustomProfile() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const locale = useLocale();

  if (!isSignedIn) {
    router.push(`/${locale}/sign-in`);
    return;
  }

  if (!isLoaded) {
    <div>Loading...</div>;
    return;
  }

  return (
    <UserProfile
      fallback={
        <div>
          <Spinner className={'size-8'} />
        </div>
      }
      appearance={{
        elements: {
          rootBox: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          },
          cardBox: {
            width: '100%',
          },
        },
      }}
      path={`/profile`}
      routing='path'>
      <UserProfile.Page
        label='Update Profile'
        labelIcon={<UserRoundPen className={'size-4'} />}
        url={`${user.id}/update-profile`}>
        <UpdateProfilePage />
      </UserProfile.Page>

      <UserProfile.Page
        label='Recent Listings'
        labelIcon={<ListFilterPlusIcon className={'size-4'} />}
        url={`recent-listings`}>
        <YourRecentListings />
      </UserProfile.Page>

      <UserProfile.Page
        label='Properties on Hold'
        labelIcon={<PauseCircle className={'size-4'} />}
        url={`properties-on-hold`}>
        <PropertiesOnHolds />
      </UserProfile.Page>

      {/* You can also pass the content as direct children */}
      <UserProfile.Page
        label='Terms'
        labelIcon={<BookOpenCheck className={'size-4'} />}
        url='terms'>
        <div>
          <h1>Custom Terms Page</h1>
          <p>This is the content of the custom terms page.</p>
        </div>
      </UserProfile.Page>

      <UserProfile.Page
        label='Privacy'
        labelIcon={<ShieldCheckIcon className={'size-4'} />}
        url='privacy'>
        <div>
          <h1>Custom Terms Page</h1>
          <p>This is the content of the custom terms page.</p>
        </div>
      </UserProfile.Page>

      <UserProfile.Link
        label='Back to Home'
        url='/'
        labelIcon={<LogOut className='mr-3 size-4 -rotate-180' />}
      />
    </UserProfile>
  );
}
