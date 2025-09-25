'use server';

import { db } from '@/drizzle/db';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './require-auth';

export async function clearCache(
  pathName: string,
  type: 'layout' | 'page' = 'page'
) {
  console.log(`Revalidating cache for tag: ${pathName}`);
  revalidatePath(pathName, type);
  return;
}

export async function getProperties() {
  try {
    const data = await db.query.properties.findMany({
      columns: { updatedAt: false },
      with: {
        author: {
          columns: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
        receivedLikes: {
          columns: {
            id: true,
            fromUserId: true,
            propertyId: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

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
