'use server';

import { db } from '@/drizzle/db';
import { requireAuth } from '@/lib/require-auth';

export async function startConversationWithMatchedUser() {
  const user = await requireAuth();

  try {
    const committed = await db.transaction(async (tx) => {
      const myDetails = await tx.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
        columns: {
          id: true,
          fullName: true,
          avatar: true,
          streamToken: true,
          expireTime: true,
          issuedAt: true,
        },
      });

      if (!myDetails) {
        return { success: false, message: 'Current user not found' };
      }

      // const matchedUserDetails = await tx.query.users.findFirst({
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
      //   return { success: false, message: 'Matched user not found' };
      // }

      const matchedRecord = await db.query.matches.findFirst({
        where: (matches, { eq, or }) =>
          or(
            eq(matches.user1Id, myDetails.id),
            eq(matches.user2Id, myDetails.id)
          ),
        columns: {
          id: true,
          channelId: true,
          channelType: true,
          // add other columns if you need them
        },
      });

      if (!matchedRecord) {
        return { success: false, message: 'No match record found' };
      }

      return {
        success: true,
        message: 'Conversation started',
        myDetails,
        matchedRecord,
      };
    });

    return committed;
  } catch (error) {
    console.error('Error in startConversationWithMatchedUser:', error);
    return { success: false, message: 'Internal server error' };
  }
}
