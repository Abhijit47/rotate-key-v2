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

export async function getConnectionRequestsWithLikes() {
  /*
  This approach is scalable and precise for your scenario (N properties, M requests, and only paired requests+likes are listed).
  Let me know if you want any counts, extra user details, or the opposite symmetry (other users liking/sending requests to you)!
  */
  const user = await requireAuth();
  try {
    const userId = user.id;

    const commited = await db.transaction(async (tx) => {
      // 1️⃣ Get all connection requests I've sent (fromUserId === userId)
      const myConnectionRequests = await tx.query.connectionRequests.findMany({
        where: (cr, { eq }) => eq(cr.fromUserId, userId),
        // You can control what columns to include here, properties, authors, etc.
        with: {
          property: {
            with: {
              author: true, // If you want author details for each property
            },
          },
        },
        columns: {
          id: true,
          propertyId: true,
          authorId: true,
          startDate: true,
          endDate: true,
          guests: true,
          status: true,
          matchId: true,
        },
      });

      // 2️⃣ Get ALL propertyIds for which I sent connection requests
      const propertyIds = myConnectionRequests.map((req) => req.propertyId);
      if (!propertyIds.length) return { success: false, count: 0, data: [] };

      // 3️⃣ Get all my likes on these properties
      const myLikes = await tx.query.likes.findMany({
        where: (like, { eq, inArray }) =>
          eq(like.fromUserId, userId) && inArray(like.propertyId, propertyIds),
        columns: { propertyId: true },
      });
      const likedPropertyIdSet = new Set(
        myLikes.map((like) => like.propertyId)
      );

      // 4️⃣ Compose final array: Keep only those where I ALSO liked the property
      const enriched = myConnectionRequests
        .filter((cr) => likedPropertyIdSet.has(cr.propertyId))
        .map((cr) => ({
          // Your desired result shape:
          connectionRequest: {
            id: cr.id,
            propertyId: cr.propertyId,
            authorId: cr.authorId,
            startDate: cr.startDate,
            endDate: cr.endDate,
            guests: cr.guests,
            status: cr.status,
            matchId: cr.matchId,
          },
          property: {
            id: cr.property?.id,
            type: cr.property?.type,
            address: cr.property?.address,
            city: cr.property?.city,
            state: cr.property?.state,
            country: cr.property?.country,
            zipcode: cr.property?.zipcode,
            // images: cr.property?.images,
            isAvailable: cr.property?.isAvailable,
            authorId: cr.property?.authorId,
            author: {
              id: cr.property?.author?.id,
              fullName: cr.property?.author?.fullName,
            },
          },
          // author: cr.property?.author,
          // optionally: liked: true,
          liked: likedPropertyIdSet.has(cr.propertyId),
        }));

      return {
        success: true,
        count: enriched.length,
        data: enriched,
      };
    });

    return commited;
  } catch (error) {
    console.log('Error getting connection requests with likes:', error);
    return {
      success: false,
      count: 0,
      data: undefined,
    };
  }
}

export type ConnectionRequestsWithLikesReturnType = Awaited<
  ReturnType<typeof getConnectionRequestsWithLikes>
>;
