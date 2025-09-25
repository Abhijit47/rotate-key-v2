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

export async function getMyProperties() {
  const user = await requireAuth();

  try {
    const data = await db.query.properties.findMany({
      where: (properties, { eq }) => {
        return eq(properties.authorId, user.id);
      },
      columns: { updatedAt: false },
      with: {
        author: {
          columns: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching user properties:', error);
    return [];
  }
}

export async function getMyPropertiesV1() {
  const user = await requireAuth();

  try {
    const commited = await db.transaction(async (tx) => {
      const myProperties = await tx.query.properties.findMany({
        where: (properties, { eq }) => {
          return eq(properties.authorId, user.id);
        },
        columns: { updatedAt: false },
        with: {
          author: {
            columns: {
              id: true,
              fullName: true,
              username: true,
              email: true,
              avatarUrl: true,
            },
          },
        },
      });

      // 1️⃣ Get all my property IDs to check likes in one query
      const propertyIds = myProperties.map((p) => p.id);
      if (propertyIds.length === 0) {
        return { success: true, data: [] };
      }

      // 2️⃣ Get all user likes for these properties in one query
      const likes = await tx.query.likes.findMany({
        where: (likes, { and, eq, inArray }) =>
          and(
            eq(likes.fromUserId, user.id),
            inArray(likes.propertyId, propertyIds)
          ),
        columns: { propertyId: true },
      });
      const likedIdsSet = new Set(likes.map((l) => l.propertyId));

      // 3️⃣ Get the total count of likes for each property
      const likeCounts = await tx.query.likes.findMany({
        where: (likes, { inArray }) => inArray(likes.propertyId, propertyIds),
        columns: { propertyId: true },
      });

      // 4️⃣ Map liked boolean to each property
      const withLikeInfo = myProperties.map((property) => ({
        ...property,
        iLikedThisProperty: likedIdsSet.has(property.id),
        totalLikes: likeCounts.filter((l) => l.propertyId === property.id)
          .length,
      }));

      return { success: true, data: withLikeInfo };
    });

    if (!commited.success) {
      return [];
    }

    return commited.data;
  } catch (error) {
    console.error('Error fetching user properties:', error);
    return [];
  }
}
