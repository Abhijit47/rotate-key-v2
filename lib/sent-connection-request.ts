'use server';

import { db } from '@/drizzle/db';
import { connectionRequests } from '@/drizzle/schemas';
import { revalidatePath } from 'next/cache';
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

export async function sentConnectionRequest(unsafeReqData: FormData) {
  const user = await requireAuth();

  try {
    const reqData = Object.fromEntries(unsafeReqData.entries());

    if (
      !reqData.startDate ||
      !reqData.endDate ||
      !reqData.guests ||
      !reqData.propertyId
    )
      return { success: false, message: 'Invalid form data' };

    const userId = user.id;
    console.log('userId', userId);

    // 1️⃣ find the user in users table and update sentConnectionRequest to true

    // 2️⃣ find the property in properties table and update the startDate, endDate, guests
    // and also add the userId to connectionRequests array
  } catch (error) {
    console.log('Error sending connection request:', error);
    return { success: false, message: 'Failed to send connection request' };
  }
}

export async function sentConnectionRequestV1(unsafeReqData: FormData) {
  const user = await requireAuth();

  const startDate = unsafeReqData.get('startDate') as string;
  const endDate = unsafeReqData.get('endDate') as string;
  const guests = unsafeReqData.get('guests') as string;
  const propertyId = unsafeReqData.get('propertyId') as string;
  const matchId = unsafeReqData.get('matchId') as string;

  try {
    // const reqData = Object.fromEntries(unsafeReqData.entries());
    // const { startDate, endDate, guests, propertyId } = reqData;
    const userId = user.id;

    if (!startDate || !endDate || !guests || !propertyId || !matchId) {
      return { success: false, message: 'Invalid form data' };
    }

    const commited = await db.transaction(async (tx) => {
      // Fetch property details and author
      const property = await tx.query.properties.findFirst({
        where: (properties, { eq }) => eq(properties.id, propertyId),
        with: { author: true },
      });
      if (!property) {
        tx.rollback();
        return { success: false, message: 'Property not found' };
      }

      const authorId = property.author.id;

      // 1️⃣ Check for an existing request from this user to this property
      const alreadyRequested = await tx.query.connectionRequests.findFirst({
        where: (connectionRequests, { eq, and }) =>
          and(
            eq(connectionRequests.fromUserId, user.id),
            eq(connectionRequests.propertyId, propertyId)
          ),
        columns: { id: true },
      });
      if (alreadyRequested) {
        tx.rollback();
        return { success: false, message: 'Already requested this property' };
      }

      // 2️⃣ Get ALL my property IDs
      const myProperties = await tx.query.properties.findMany({
        where: (properties, { eq }) => eq(properties.authorId, userId),
        columns: { id: true },
      });
      const myPropertyIds = myProperties.map((p) => p.id);

      // 3️⃣ Get ALL author's property IDs
      const theirProperties = await tx.query.properties.findMany({
        where: (properties, { eq }) => eq(properties.authorId, authorId),
        columns: { id: true },
      });
      const theirPropertyIds = theirProperties.map((p) => p.id);

      // 4️⃣ Did I like ANY of the author's properties? (You to them)
      let iLikedThem = false;
      if (theirPropertyIds.length) {
        const liked = await tx.query.likes.findFirst({
          where: (likes, { and, eq, inArray }) =>
            and(
              eq(likes.fromUserId, userId),
              inArray(likes.propertyId, theirPropertyIds)
            ),
          columns: { id: true },
        });
        iLikedThem = Boolean(liked);
      }

      // 5️⃣ Did the author like ANY of my properties? (Them to you)
      let theyLikedMe = false;
      if (myPropertyIds.length) {
        const liked = await tx.query.likes.findFirst({
          where: (likes, { and, eq, inArray }) =>
            and(
              eq(likes.fromUserId, authorId),
              inArray(likes.propertyId, myPropertyIds)
            ),
          columns: { id: true },
        });
        theyLikedMe = Boolean(liked);
      }

      // 6️⃣ Mutual?
      const isMatched = iLikedThem && theyLikedMe;

      if (!isMatched) {
        tx.rollback();
        return {
          success: false,
          message: 'No match found, cannot send request',
        };
      }

      // 3️⃣ Insert new connection request
      const [newConnectionRequest] = await tx
        .insert(connectionRequests)
        .values({
          fromUserId: user.id,
          propertyId: propertyId,
          authorId,
          matchId, // <--- ADDED
          guests: Number(guests),
          startDate: startDate,
          endDate: endDate,
          status: 'pending',
        })
        .returning({ id: connectionRequests.id });

      if (!newConnectionRequest.id) {
        tx.rollback();
        return {
          success: false,
          message: 'Failed to create connection request',
        };
      }

      return { success: true, message: 'Connection request sent!' };
    });

    return commited;
  } catch (error) {
    console.log('Error sending connection request:', error);
    return { success: false, message: 'Failed to send connection request' };
  } finally {
    revalidatePath(`/(root)/swappings/${propertyId}`, 'page');
  }
}
