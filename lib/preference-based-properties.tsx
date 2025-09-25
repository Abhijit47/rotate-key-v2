'use server';

import { db } from '@/drizzle/db';
import { views } from '@/drizzle/schemas';
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

// v0
export async function getPreferenceBasedPotentialProperties() {
  const user = await requireAuth();

  try {
    const commited = await db.transaction(async (tx) => {
      const existingUserPreference = await tx.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
        columns: { id: true, preferences: true },
      });
      if (!existingUserPreference) {
        return { success: false, data: [] };
      }

      // find the properties that match the user's preferences.toLocation based
      // that matching might be if the country or state or city matches return those properties

      const toLocation = existingUserPreference.preferences?.toLocation;
      if (!toLocation) {
        return { success: false, data: [] };
      }

      const potentialProperties = await tx.query.properties.findMany({
        where: (properties, { or, like }) => {
          // return and(
          //   eq(properties.isAvailable, true),
          //   or(
          //     like(properties.city, `%${toLocation.city}%`),
          //     like(properties.state, `%${toLocation.state}%`),
          //     like(properties.country, `%${toLocation.country}%`)
          //   )
          // );
          return or(
            like(properties.city, `%${toLocation.city}%`),
            like(properties.state, `%${toLocation.state}%`),
            like(properties.country, `%${toLocation.country}%`)
          );
        },
        columns: { updatedAt: false },
        with: {
          author: {
            columns: {
              id: true,
              fullName: true,
              username: true,
              email: true,
              preferences: true,
            },
          },
        },
      });

      return { success: true, data: potentialProperties };
    });

    if (!commited.success) {
      return [];
    }
    return commited.data;
  } catch (error) {
    console.error('Error fetching potential properties:', error);
    return [];
  }
}

// v1 with like info
export async function getPreferenceBasedPotentialPropertiesV1() {
  const user = await requireAuth();

  try {
    const commited = await db.transaction(async (tx) => {
      const viewsCount = await tx.$count(views);
      const existingUserPreference = await tx.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
        columns: { id: true, preferences: true },
      });
      if (!existingUserPreference) {
        return { success: false, data: [] };
      }

      const toLocation = existingUserPreference.preferences?.toLocation;
      if (!toLocation) {
        return { success: false, data: [] };
      }

      const potentialProperties = await tx.query.properties.findMany({
        where: (properties, { and, eq, or, like }) => {
          // return or(
          //   like(properties.city, `%${toLocation.city}%`),
          //   like(properties.state, `%${toLocation.state}%`),
          //   like(properties.country, `%${toLocation.country}%`)
          // );
          return and(
            eq(properties.isAvailable, true),
            or(
              like(properties.city, `%${toLocation.city}%`),
              like(properties.state, `%${toLocation.state}%`),
              like(properties.country, `%${toLocation.country}%`)
            )
          );
        },
        columns: { updatedAt: false },
        with: {
          author: {
            columns: {
              id: true,
              fullName: true,
              username: true,
              email: true,
              preferences: true,
            },
          },
        },
      });

      // 1️⃣ Get all property IDs to check likes in one query
      const propertyIds = potentialProperties.map((p) => p.id);
      if (propertyIds.length === 0) {
        console.log('No potential properties found');
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
      const withLikeInfo = potentialProperties.map((property) => ({
        ...property,
        iLikedThisProperty: likedIdsSet.has(property.id),
        totalLikes: likeCounts.filter((l) => l.propertyId === property.id)
          .length,
        viewsCount, // <--- ADDED
      }));

      return { success: true, data: withLikeInfo };
    });

    if (!commited.success) {
      return [];
    }

    return commited.data;
  } catch (error) {
    console.error('Error fetching potential properties:', error);
    return [];
  }
}
