import 'stream-chat-react/dist/css/v2/index.css';
import './chat-layout.css';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { LazyStreamChatInterface } from './_components';
import { startConversationWithMatchedUser } from './action';

type PageProps = {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getCachedStartConversationWithMatchedUser = cache(async () => {
  return await startConversationWithMatchedUser();
});

export default async function ChatWithMatchedUser({ params }: PageProps) {
  const matchedUserId = (await params).userId;

  const { success, myDetails, matchedRecord } =
    await getCachedStartConversationWithMatchedUser();

  // const matchedUserDetails = await db.query.users.findFirst({
  //   where: (users, { eq }) => eq(users.id, matchedUserId),
  //   columns: {
  //     id: true,
  //     fullName: true,
  //     avatarUrl: true,
  //     streamToken: true,
  //     expireTime: true,
  //     issuedAt: true,
  //   },
  // });

  // if (!matchedUserDetails) {
  //   console.log('no matched user found for', matchedUserId);
  //   // optionally return early or render a "not found" UI
  //   return notFound();
  // }

  // const matchedRecord = await db.query.matches.findFirst({
  //   where: (matches, { eq, or }) =>
  //     or(
  //       eq(matches.user1Id, matchedUserDetails.id),
  //       eq(matches.user2Id, matchedUserDetails.id)
  //     ),
  //   columns: {
  //     id: true,
  //     channelId: true,
  //     channelType: true,
  //     // add other columns if you need them
  //   },
  // });

  if (!success || !myDetails || !matchedRecord) {
    return notFound();
  }

  // console.log('matchedUserDetails', myDetails, matchedRecord);

  return (
    <div>
      <LazyStreamChatInterface
        user={myDetails}
        matchedRecord={matchedRecord}
        matchedUserId={matchedUserId}
      />
    </div>
  );
}
