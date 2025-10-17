/*
'use server';

import { db } from '@/drizzle/db';
import { likes, matches, properties } from '@/drizzle/schemas';
import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const user = await currentUser();
  if (!user) {
    return redirect('/sign-in');
  }
  return user;
}

// Called when a user likes a property v2
export async function likePropertyAndMaybeMatchV2({
  propertyId,
}: {
  propertyId: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    const result = await db.transaction(async (trx) => {
      // 1. Prevent duplicate likes by the same user
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing) return { success: false, message: 'Already liked' };

      // 2. Make sure property is available
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property)
        return { success: false, message: 'Property not available' };

      // Self-like is allowed for analytics, but not for matching
      const ownerId = property.authorId;
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return { success: true, isMatch: false };
      }

      // 3. Insert like
      await trx.insert(likes).values({ fromUserId, propertyId });

      // 4. Check for cross-like (did the owner previously like any of this user's available properties?)
      const [reverse] = await trx
        .select({ prop: properties })
        .from(likes)
        .innerJoin(properties, eq(likes.propertyId, properties.id))
        .where(
          and(
            eq(likes.fromUserId, ownerId),
            eq(properties.authorId, fromUserId),
            eq(properties.isAvailable, true)
          )
        );

      // 5. If cross-like exists, create a match, but DO NOT LOCK either property.
      if (reverse) {
        // Always store match with lowest user ID as user1 for deduplication
        let user1Id = fromUserId,
          user2Id = ownerId;
        let property1Id = propertyId,
          property2Id = reverse.prop.id;
        if (user2Id < user1Id) {
          [user1Id, user2Id] = [user2Id, user1Id];
          [property1Id, property2Id] = [property2Id, property1Id];
        }

        // Prevent duplicate match for same two properties
        const matchExists = await trx.query.matches.findFirst({
          where: and(
            eq(matches.user1Id, user1Id),
            eq(matches.user2Id, user2Id),
            eq(matches.property1Id, property1Id),
            eq(matches.property2Id, property2Id)
          ),
        });
        if (!matchExists) {
          await trx.insert(matches).values({
            user1Id,
            user2Id,
            property1Id,
            property2Id,
            isActive: true,
          });
        }

        return { success: true, isMatch: true };
      }

      // No match yet, just a like
      return { success: true, isMatch: false };
    });
    return result;
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, message: 'Internal server error' };
  } finally {
    revalidatePath('/swappings');
  }
}
*/
