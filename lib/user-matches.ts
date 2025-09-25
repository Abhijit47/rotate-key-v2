'use server';

import { db } from '@/drizzle/db';
import { requireAuth } from './require-auth';

// import { currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { cache } from 'react';
// export const requireAuth = cache(async () => {
//   const user = await currentUser();
//   if (!user) {
//     return redirect('/sign-in');
//   }
//   return user;
// });

export async function getUserMatches() {
  const user = await requireAuth();

  try {
    // Find all matches where user is user1 or user2 AND is active
    const userMatches = await db.query.matches.findMany({
      where(fields, operators) {
        const { and, eq, or } = operators;
        return and(
          eq(fields.isActive, true),
          or(eq(fields.user1Id, user.id), eq(fields.user2Id, user.id))
        );
      },
      with: {
        user1: true,
        user2: true,
        property1: true,
        property2: true,
      },
      orderBy: (fields, { desc }) => [desc(fields.createdAt)],
    });

    if (!userMatches) {
      return { success: false, data: [] };
    }

    // Get other user details in batch (efficient)
    const otherUserIds = userMatches.map((m) =>
      m.user1Id === user.id ? m.user2Id : m.user1Id
    );

    const result = await db.query.users.findMany({
      // where: inArray(users.id, otherUserIds),
      where(fields, operators) {
        // Use the inArray operator to filter users whose IDs are in otherUserIds
        return operators.inArray(fields.id, otherUserIds);
      },
      columns: {
        password: false,
        streamToken: false,
        expireTime: false,
        issuedAt: false,
      },
      with: {
        // properties: {
        //   where(fields, operators) {
        //     // this property was liked by the current user
        //     return operators.eq(fields.likedByUserId, user.id);
        //   }
        // },
        matchesAsUser1: {
          where(fields, operators) {
            // check which matches are made by the current user
            const { eq, and } = operators;
            return and(eq(fields.isActive, true), eq(fields.user1Id, user.id));
          },
        },
        matchesAsUser2: {
          where(fields, operators) {
            // check which matches are made by the current user
            const { eq, and } = operators;
            return and(eq(fields.isActive, true), eq(fields.user2Id, user.id));
          },
        },
      },
    });

    // const matchedUsers = await db
    //   .select()
    //   .from(users)
    //   .where(inArray(users.id, otherUserIds));
    // Zip the match records with user info if desired

    return { success: true, data: result, currentUserId: user.id };
  } catch (error) {
    console.error('Error fetching matched properties:', error);
    return { success: false, data: [] };
  }
}

export async function getUserMatchesV1() {
  const user = await requireAuth();
  try {
    const userId = user.id;

    // 1️⃣ Get all active matches where user is involved
    const userMatches = await db.query.matches.findMany({
      where(fields, operators) {
        const { and, eq, or } = operators;
        return and(
          eq(fields.isActive, true),
          or(eq(fields.user1Id, user.id), eq(fields.user2Id, user.id))
        );
      },
      with: {
        user1: {
          columns: {
            streamToken: false,
            expireTime: false,
            issuedAt: false,
            password: false,
            updatedAt: false,
            createdAt: false,
          },
        },
        user2: {
          columns: {
            streamToken: false,
            expireTime: false,
            issuedAt: false,
            password: false,
            updatedAt: false,
            createdAt: false,
          },
        },
        property1: true,
        property2: true,
      },
      orderBy: (fields, { desc }) => [desc(fields.createdAt)],
    });

    if (!userMatches || userMatches.length === 0) {
      return { success: false, data: [] };
    }

    // 2️⃣ Build the list of property/author pairs for each match where the "other" user owns the property
    const requestTuples = userMatches.map((match) => {
      // If user is user1, they could have sent req for property2/author2
      // If user is user2, they could have sent req for property1/author1
      if (match.user1.id === user.id) {
        return {
          propertyId: match.property2.id,
          authorId: match.user2.id,
        };
      } else {
        return {
          propertyId: match.property1.id,
          authorId: match.user1.id,
        };
      }
    });

    // 3️⃣ Batch fetch all connection requests for these pairs sent by current user
    const connectionRequests = await db.query.connectionRequests.findMany({
      where: (cr, { and, eq, or }) =>
        and(
          eq(cr.fromUserId, userId),
          or(
            ...requestTuples.map((pair) =>
              and(
                eq(cr.propertyId, pair.propertyId),
                eq(cr.authorId, pair.authorId)
              )
            )
          )
        ),
      columns: { propertyId: true, authorId: true },
    });

    // 4️⃣ Build a Set for O(1) lookup
    const sentReqSet = new Set(
      connectionRequests.map((cr) => `${cr.propertyId}:${cr.authorId}`)
    );

    // 5️⃣ Attach the boolean to each match in result
    const resultWithSentReq = userMatches.map((match) => {
      let propertyId: string, authorId: string;
      if (match.user1.id === user.id) {
        propertyId = match.property2.id;
        authorId = match.user2.id;
      } else {
        propertyId = match.property1.id;
        authorId = match.user1.id;
      }
      return {
        ...match,
        iSentConnectionRequest: sentReqSet.has(`${propertyId}:${authorId}`),
      };
    });

    return { success: true, data: resultWithSentReq, currentUserId: user.id };
  } catch (error) {
    console.error('Error fetching matched properties:', error);
    return { success: false, data: [] };
  }
}

export async function getUserMatchesV2() {
  /*
  For each match, you check if you (the current user) have ever sent a connection request to that matched user, for any property—not just the match's property.

  Correct logic: If you sent N requests for N properties to matched user, OR just 1, it counts as true.

  No longer comparing with propertyId, just with authorId (matchedUserId).
  */

  const user = await requireAuth();
  try {
    const userId = user.id;

    const commitedMatches = await db.transaction(async (tx) => {
      // 1️⃣ Get all active matches where user is involved
      const userMatches = await tx.query.matches.findMany({
        where(fields, operators) {
          const { and, eq, or } = operators;
          return and(
            eq(fields.isActive, true),
            or(eq(fields.user1Id, userId), eq(fields.user2Id, userId))
          );
        },
        with: {
          user1: {
            columns: {
              streamToken: false,
              expireTime: false,
              issuedAt: false,
              password: false,
              updatedAt: false,
              createdAt: false,
            },
          },
          user2: {
            columns: {
              streamToken: false,
              expireTime: false,
              issuedAt: false,
              password: false,
              updatedAt: false,
              createdAt: false,
            },
          },
          property1: true,
          property2: true,
        },
        orderBy: (fields, { desc }) => [desc(fields.createdAt)],
      });

      if (!userMatches || userMatches.length === 0) {
        // tx.rollback();
        return { success: false, data: [] };
      }

      // 2️⃣ For each match, determine the "other" user's id (matched user)
      const uniqueMatchedUserIds = [
        ...new Set(
          userMatches.map((match) =>
            match.user1.id === userId ? match.user2.id : match.user1.id
          )
        ),
      ];

      // 3️⃣ Get all connection requests you've sent to ANY of these matched users
      const connectionRequestsToMatchedUsers =
        await tx.query.connectionRequests.findMany({
          where: (cr, { eq, inArray }) =>
            eq(cr.fromUserId, userId) &&
            inArray(cr.authorId, uniqueMatchedUserIds),
          columns: { authorId: true },
        });

      // 4️⃣ Set for fast lookup (did I send any req to userX)
      const sentToUserIdSet = new Set(
        connectionRequestsToMatchedUsers.map((cr) => cr.authorId)
      );

      // 5️⃣ Map over matches, flag if connection req SENT to matched user (regardless of property)
      const resultWithSentReq = userMatches.map((match) => {
        const matchedUserId =
          match.user1.id === userId ? match.user2.id : match.user1.id;
        return {
          ...match,
          iSentConnectionRequest: sentToUserIdSet.has(matchedUserId),
        };
      });

      return { success: true, data: resultWithSentReq, currentUserId: userId };
    });

    return commitedMatches;
  } catch (error) {
    console.error('Error fetching matched properties:', error);
    return { success: false, data: [] };
  }
}
