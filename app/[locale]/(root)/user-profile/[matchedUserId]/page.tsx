import { requireAuth } from '@/lib/require-auth';
import { Metadata } from 'next';

type PageProps = {
  params: Promise<{ matchedUserId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: {
    default: 'Matched User Profile',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export default async function MatchedUserProfilePage({ params }: PageProps) {
  const matchedUserId = (await params).matchedUserId;
  await requireAuth();

  return (
    <div>
      MatchedUserProfilePage
      <h1>Matched User Profile Page - {matchedUserId}</h1>
    </div>
  );
}
