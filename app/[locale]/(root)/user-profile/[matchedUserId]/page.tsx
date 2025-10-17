import { requireAuth } from '@/lib/require-auth';

type PageProps = {
  params: Promise<{ matchedUserId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
