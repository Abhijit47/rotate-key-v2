import { getMyProfile } from '@/lib/user-actions';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getCachedMyProperties = cache(async () => {
  const data = getMyProfile();
  return data;
});

export default async function ProfilePage() {
  const myProfile = await getCachedMyProperties();

  if (!myProfile.success) {
    return notFound();
  }

  return (
    <div>
      ProfilePage
      <pre>{JSON.stringify(myProfile.profile?.preferences, null, 2)}</pre>
    </div>
  );
}
