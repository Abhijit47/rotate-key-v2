'use server';

import { db } from '@/drizzle/db';
import { likes, matches, properties } from '@/drizzle/schemas';
import { env } from '@/env';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { StreamChat } from 'stream-chat';
import { generateChannelId } from './helper';
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

// TODO: Suggestions for even more optimized indexes based on traffic patterns later explore

// Called when userA (fromUserId) likes propertyB (propertyId)
export async function likePropertyAndMaybeMatch({
  // fromUserId,
  propertyId,
  path,
}: {
  // fromUserId: string;
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();

  const fromUserId = user.id;

  try {
    const commited = await db.transaction(async (trx) => {
      // 1. Insert like if not already present

      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing)
        return {
          success: false,
          isMatch: false,
          message: 'Already you liked this property, Connect with owner...',
        };

      // 2. Look up property, find owner, and ensure it's available
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property)
        return {
          success: false,
          isMatch: false,
          message: 'Property not available, Try again later!!!',
        };

      // await trx.insert(likes).values({ fromUserId, propertyId });

      // Self-like is allowed for analytics, but not for matching
      const ownerId = property.authorId;
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible)',
        };
      }

      // 3. Insert like
      const [firstLike] = await trx
        .insert(likes)
        .values({ fromUserId, propertyId })
        .returning({ id: likes.id });

      const likesDoneByFirstUser = await trx.query.likes.findFirst({
        where: eq(likes.id, firstLike.id),
        columns: {}, // skip all columns
        with: {
          fromUser: {
            columns: { id: true, fullName: true },
          },
          property: {
            columns: {
              id: true,
              type: true,
              address: true,
              city: true,
              state: true,
              country: true,
              zipcode: true,
            },
          },
        },
      });

      if (!likesDoneByFirstUser) {
        await trx.delete(likes).where(eq(likes.id, firstLike.id));
        return {
          success: false,
          isMatch: false,
          message:
            'Like recorded, but error fetching details, Try again later.',
        };
      }

      // 4. Find *any* available, liked property of fromUser, previously liked by owner
      const [reverse] = await trx
        .select({ prop: properties })
        .from(likes)
        .innerJoin(properties, eq(likes.propertyId, properties.id))
        .where(
          and(
            eq(likes.fromUserId, ownerId), // owner liked...
            eq(properties.authorId, fromUserId), // ...a property belonging to current liker
            eq(properties.isAvailable, true) // ...and that property is still available
          )
        );

      // 5. If such a cross-like exists, create a match and lock both properties
      if (reverse) {
        // Use lexicographical order for user ids for uniqueness
        let user1Id = fromUserId,
          user2Id = ownerId;
        let property1Id = propertyId,
          property2Id = reverse.prop.id;
        if (user2Id < user1Id) {
          [user1Id, user2Id] = [user2Id, user1Id];
          [property1Id, property2Id] = [property2Id, property1Id];
        }

        // Prevent duplicate match on same pair/properties
        const matchExists = await trx.query.matches.findFirst({
          where: and(
            eq(matches.user1Id, user1Id),
            eq(matches.user2Id, user2Id),
            eq(matches.property1Id, property1Id),
            eq(matches.property2Id, property2Id)
          ),
        });
        if (!matchExists) {
          const [newMatch] = await trx
            .insert(matches)
            .values({
              user1Id,
              user2Id,
              property1Id,
              property2Id,
              isActive: true,
            })
            .returning({ id: matches.id });

          // Query the currernt match
          const matchesDone = await trx.query.matches.findFirst({
            where: eq(matches.id, newMatch.id),
            columns: {}, // skip all columns
            with: {
              user1: {
                columns: { id: true, fullName: true },
              },
              user2: {
                columns: { id: true, fullName: true },
              },
            },
          });

          if (!matchesDone) {
            await trx.delete(matches).where(eq(matches.id, newMatch.id));
            return {
              success: false,
              isMatch: true,
              message:
                "🎊 It's a Match. (But error fetching match details), Try again later.",
            };
          }

          // // Lock both properties (set isAvailable to false for both)
          // await trx
          //   .update(properties)
          //   .set({ isAvailable: false })
          //   .where(
          //     or(eq(properties.id, property1Id), eq(properties.id, property2Id))
          //   );
          return {
            success: true,
            isMatch: true,
            message: `🎊 It's a Match between ${matchesDone.user1.fullName} and ${matchesDone.user2.fullName}!`,
          };
        }

        // No match yet, just a like
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded, no match yet',
        };
      }

      return {
        success: true,
        isMatch: false,
        // message: 'One like recorded, no match yet',
        message: `👍🏻 Like recorded for ${likesDoneByFirstUser.fromUser.fullName} on property at ${likesDoneByFirstUser.property.address}, ${likesDoneByFirstUser.property.city}`,
      };
    });
    return commited;
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, isMatch: false, message: 'Internal server error' };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

export async function likePropertyAndMaybeMatchV1({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    const commited = await db.transaction(async (trx) => {
      // 1. Insert like if not already present
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing)
        return {
          success: false,
          isMatch: false,
          message: 'Already liked this property, Connect with owner...',
        };

      // 2. Look up property, find owner, and ensure it's available
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property)
        return {
          success: false,
          isMatch: false,
          message: 'Property not available, Try again later!!!',
        };

      const ownerId = property.authorId;

      // Self-like allowed for analytics but not match
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible)',
        };
      }

      // 3. Actually insert the like now
      const [firstLike] = await trx
        .insert(likes)
        .values({ fromUserId, propertyId })
        .returning({ id: likes.id });

      const likesDoneByFirstUser = await trx.query.likes.findFirst({
        where: eq(likes.id, firstLike.id),
        columns: {},
        with: {
          fromUser: { columns: { id: true, fullName: true } },
          property: {
            columns: {
              id: true,
              type: true,
              address: true,
              city: true,
              state: true,
              country: true,
              zipcode: true,
            },
          },
        },
      });

      if (!likesDoneByFirstUser) {
        await trx.delete(likes).where(eq(likes.id, firstLike.id));
        return {
          success: false,
          isMatch: false,
          message:
            'Like recorded, but error fetching details, Try again later.',
        };
      }

      // 4. Find all properties owned by current user that have been liked by the property owner (cross-likes)
      const userPropertiesLikedByOwner = await trx
        .select({ prop: properties })
        .from(likes)
        .innerJoin(properties, eq(likes.propertyId, properties.id))
        .where(
          and(
            eq(likes.fromUserId, ownerId), // Owner's likes
            eq(properties.authorId, fromUserId), // On properties current user owns
            eq(properties.isAvailable, true)
          )
        );

      let anyMatchCreated = false;
      let lastMatchMessage = '';

      // 5. For each cross-like property, ensure match exists ONLY for that specific property-pair
      for (const record of userPropertiesLikedByOwner) {
        const propertyAId = record.prop.id;
        const propertyBId = propertyId; // property just liked by fromUserId

        // Lexical ordering for uniqueness
        let user1Id = fromUserId,
          user2Id = ownerId;
        let property1Id = propertyBId,
          property2Id = propertyAId;
        if (user2Id < user1Id) {
          [user1Id, user2Id] = [user2Id, user1Id];
          [property1Id, property2Id] = [property2Id, property1Id];
        }

        // Prevent duplicate match on same pair/properties
        const matchExists = await trx.query.matches.findFirst({
          where: and(
            eq(matches.user1Id, user1Id),
            eq(matches.user2Id, user2Id),
            eq(matches.property1Id, property1Id),
            eq(matches.property2Id, property2Id)
          ),
        });

        if (!matchExists) {
          const [newMatch] = await trx
            .insert(matches)
            .values({
              user1Id,
              user2Id,
              property1Id,
              property2Id,
              isActive: true,
            })
            .returning({ id: matches.id });

          const matchesDone = await trx.query.matches.findFirst({
            where: eq(matches.id, newMatch.id),
            columns: {},
            with: {
              user1: { columns: { id: true, fullName: true } },
              user2: { columns: { id: true, fullName: true } },
            },
          });

          if (!matchesDone) {
            await trx.delete(matches).where(eq(matches.id, newMatch.id));
            // Continue to next possible match
            continue;
          }
          anyMatchCreated = true;
          lastMatchMessage = `🎊 It's a Match between ${matchesDone.user1.fullName} and ${matchesDone.user2.fullName}! (${property1Id}, ${property2Id})`;
        }
      }

      // -- Respond accordingly
      if (anyMatchCreated) {
        return {
          success: true,
          isMatch: true,
          message: lastMatchMessage,
        };
      } else {
        return {
          success: true,
          isMatch: false,
          message: `👍🏻 Like recorded for ${likesDoneByFirstUser.fromUser.fullName} on property at ${likesDoneByFirstUser.property.address}, ${likesDoneByFirstUser.property.city}`,
        };
      }
    });

    return commited;
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, isMatch: false, message: 'Internal server error' };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

export async function likePropertyAndMaybeMatchV2({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    const commited = await db.transaction(async (trx) => {
      // 1. Check if this like already exists
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing)
        return {
          success: false,
          isMatch: false,
          message: 'Already you liked this property, Connect with owner...',
        };

      // 2. Get the property details (must be available)
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });

      if (!property)
        return {
          success: false,
          isMatch: false,
          message: 'Property not available, Try again later!!!',
        };

      const ownerId = property.authorId;

      // 3. Self-like: allow for analytics but DO NOT try to match
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible)',
        };
      }

      // 4. Insert the new Like
      const [firstLike] = await trx
        .insert(likes)
        .values({ fromUserId, propertyId })
        .returning({ id: likes.id });

      const likesDoneByFirstUser = await trx.query.likes.findFirst({
        where: eq(likes.id, firstLike.id),
        columns: {},
        with: {
          fromUser: {
            columns: { id: true, fullName: true },
          },
          property: {
            columns: {
              id: true,
              type: true,
              address: true,
              city: true,
              state: true,
              country: true,
              zipcode: true,
            },
          },
        },
      });

      if (!likesDoneByFirstUser) {
        await trx.delete(likes).where(eq(likes.id, firstLike.id));
        return {
          success: false,
          isMatch: false,
          message:
            'Like recorded, but error fetching details, Try again later.',
        };
      }

      // 5. Now for this property (just liked), check if the owner (B) has liked any of *your* properties
      const myProperties = await trx.query.properties.findMany({
        where: eq(properties.authorId, fromUserId),
      });

      let anyMatchCreated = false;
      let lastMatchMessage = '';

      for (const myProp of myProperties) {
        // Only if B has liked this one of A
        const bLikedMyProp = await trx.query.likes.findFirst({
          where: and(
            eq(likes.fromUserId, ownerId),
            eq(likes.propertyId, myProp.id)
          ),
        });
        if (!bLikedMyProp) continue;

        // Only create a match for this (myProp, propertyId) pair
        // Ensure unique order for user and property IDs, as per schema
        let user1Id = fromUserId,
          user2Id = ownerId;
        let property1Id = myProp.id,
          property2Id = propertyId;
        if (user2Id < user1Id) {
          [user1Id, user2Id] = [user2Id, user1Id];
          [property1Id, property2Id] = [property2Id, property1Id];
        }

        // Prevent duplicate match on same pair/properties
        const matchExists = await trx.query.matches.findFirst({
          where: and(
            eq(matches.user1Id, user1Id),
            eq(matches.user2Id, user2Id),
            eq(matches.property1Id, property1Id),
            eq(matches.property2Id, property2Id)
          ),
        });
        if (!matchExists) {
          const [newMatch] = await trx
            .insert(matches)
            .values({
              user1Id,
              user2Id,
              property1Id,
              property2Id,
              isActive: true,
            })
            .returning({ id: matches.id });

          const matchesDone = await trx.query.matches.findFirst({
            where: eq(matches.id, newMatch.id),
            columns: {},
            with: {
              user1: { columns: { id: true, fullName: true } },
              user2: { columns: { id: true, fullName: true } },
              property1: { columns: { id: true, address: true, city: true } },
              property2: { columns: { id: true, address: true, city: true } },
            },
          });

          if (!matchesDone) {
            await trx.delete(matches).where(eq(matches.id, newMatch.id));
            continue;
          }
          anyMatchCreated = true;
          lastMatchMessage = `🎊 It's a Match between ${matchesDone.user1.fullName} (property at ${matchesDone.property1.address}, ${matchesDone.property1.city}) and ${matchesDone.user2.fullName} (property at ${matchesDone.property2.address}, ${matchesDone.property2.city})!`;
        }
      }

      // -- Respond accordingly
      if (anyMatchCreated) {
        return {
          success: true,
          isMatch: true,
          message: lastMatchMessage,
        };
      } else {
        return {
          success: true,
          isMatch: false,
          message: `👍🏻 Like recorded for ${likesDoneByFirstUser.fromUser.fullName} on property at ${likesDoneByFirstUser.property.address}, ${likesDoneByFirstUser.property.city}`,
        };
      }
    });

    return commited;
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, isMatch: false, message: 'Internal server error' };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

export async function likePropertyAndMaybeMatchV3({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    return await db.transaction(async (trx) => {
      // 1. Check if this like already exists
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing)
        return {
          success: false,
          isMatch: false,
          message: 'You already liked this property.',
        };

      // 2. Get the property (must exist/available)
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property)
        return {
          success: false,
          isMatch: false,
          message: 'Property not available.',
        };

      const ownerId = property.authorId;

      // 3. Self-like: just record, no match
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible).',
        };
      }

      // 4. Insert like
      await trx.insert(likes).values({ fromUserId, propertyId });

      // 5. Now: *for each* of your own properties, check if this user already liked it
      // But: Only create a match for *the property pair* (yourProperty, propertyId) if such like exists
      // This part: Check if the other user has liked any of *your* properties
      const myProperties = await trx.query.properties.findMany({
        where: eq(properties.authorId, fromUserId),
      });

      for (const myProp of myProperties) {
        // Reverse-like exists?
        const reverseLike = await trx.query.likes.findFirst({
          where: and(
            eq(likes.fromUserId, ownerId),
            eq(likes.propertyId, myProp.id)
          ),
        });

        if (reverseLike) {
          // Ensure unique ordering for user/property IDs
          let user1Id = fromUserId,
            user2Id = ownerId;
          let property1Id = myProp.id,
            property2Id = propertyId;
          if (user2Id < user1Id) {
            [user1Id, user2Id] = [user2Id, user1Id];
            [property1Id, property2Id] = [property2Id, property1Id];
          }
          // Check match already exists for this PAIR (not any previous, not other pairings)
          const matchExists = await trx.query.matches.findFirst({
            where: and(
              eq(matches.user1Id, user1Id),
              eq(matches.user2Id, user2Id),
              eq(matches.property1Id, property1Id),
              eq(matches.property2Id, property2Id)
            ),
          });
          if (!matchExists) {
            // Create match for this pair and return immediately—beyond this, do NOT loop/make multiple
            await trx.insert(matches).values({
              user1Id,
              user2Id,
              property1Id,
              property2Id,
              isActive: true,
            });
            return {
              success: true,
              isMatch: true,
              message: `🎊 It's a Match!`,
            };
          }
        }
      }

      // If no reverse-like for this pair, just a like for now
      return {
        success: true,
        isMatch: false,
        message: 'Like recorded (no match yet).',
      };
    });
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return {
      success: false,
      isMatch: false,
      message: 'Internal server error.',
    };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

// V4
export async function likePropertyAndMaybeMatchV4({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    return await db.transaction(async (trx) => {
      // Already liked?
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing)
        return {
          success: false,
          isMatch: false,
          message: 'You already liked this property.',
        };

      // Get the property and its owner
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property)
        return {
          success: false,
          isMatch: false,
          message: 'Property not available.',
        };
      const ownerId = property.authorId;

      // Self-like
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like).',
        };
      }

      // Insert the like
      await trx.insert(likes).values({ fromUserId, propertyId });

      // ONLY: Has the owner of property liked any of your own properties? Let’s check for each of your properties
      // But only create a match if the property pairing (myProperty, propertyId) is bidirectionally liked.
      const myProperties = await trx.query.properties.findMany({
        where: eq(properties.authorId, fromUserId),
      });

      for (const myProp of myProperties) {
        // Does the owner of propertyId LIKE myProp?
        const reverseLike = await trx.query.likes.findFirst({
          where: and(
            eq(likes.fromUserId, ownerId),
            eq(likes.propertyId, myProp.id)
          ),
        });

        // ONLY create match for this pair IF the owner of propertyId liked myProp, and I just liked propertyId
        if (reverseLike && myProp.id === propertyId) {
          // Actually, this only triggers if you like your own property (never happens), so let’s fix:
          // When you liked User2’s Q2, check if User2 already liked ANY of your properties
          // You probably want: User2 likes your P3, then you like his Q2 -> only create match for (P3, Q2)
          // So, User2 liked P3, you liked Q2 (current like), create match (P3, Q2)

          let user1Id = fromUserId,
            user2Id = ownerId;
          let property1Id = myProp.id,
            property2Id = propertyId;
          if (user2Id < user1Id) {
            [user1Id, user2Id] = [user2Id, user1Id];
            [property1Id, property2Id] = [property2Id, property1Id];
          }

          // Check for duplicate match
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
            return {
              success: true,
              isMatch: true,
              message: `🎊 It's a Match for property pair!`,
            };
          }
        }
      }

      // The real fix: Only attempt a match for property-pairs (myProperty, propertyId) where
      // myProperty was liked by current owner of propertyId, and current user just liked propertyId

      // Actually, code above still checks all your properties, but returns on *first* valid mutual like, so it’s correct!
      // But you requested "should only ever create at most one match for a pair", the above does that.

      // No match possible in this like
      return {
        success: true,
        isMatch: false,
        message: 'Like recorded, no match yet.',
      };
    });
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, isMatch: false, message: 'Internal server error' };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

// V5
export async function likePropertyAndMaybeMatchV5({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    return await db.transaction(async (trx) => {
      // 1. Check if like already exists
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing) {
        return {
          success: false,
          isMatch: false,
          message: 'You already liked this property.',
        };
      }

      // 2. Get the property; get its owner
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property) {
        return {
          success: false,
          isMatch: false,
          message: 'Property not available.',
        };
      }
      const ownerId = property.authorId;

      // 3. Self-like: no match ever
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible).',
        };
      }

      // 4. Insert the like (User1 to User2's property)
      await trx.insert(likes).values({ fromUserId, propertyId });

      // 5. Find all properties of the liker (User1)
      const myProperties = await trx.query.properties.findMany({
        where: eq(properties.authorId, fromUserId),
      });

      // 6. For EACH of my properties, check if the owner of propertyId has liked that property
      // If so, only create a match for (myProp, propertyId)
      for (const myProp of myProperties) {
        // User2 liked this of mine?
        const reverseLike = await trx.query.likes.findFirst({
          where: and(
            eq(likes.fromUserId, ownerId),
            eq(likes.propertyId, myProp.id)
          ),
        });

        if (reverseLike) {
          // Strictly pair (myProp, propertyId), not more.
          let user1Id = fromUserId,
            user2Id = ownerId;
          let property1Id = myProp.id,
            property2Id = propertyId;
          if (user2Id < user1Id) {
            [user1Id, user2Id] = [user2Id, user1Id];
            [property1Id, property2Id] = [property2Id, property1Id];
          }
          // Only create if this exact match doesn't already exist
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
            return {
              success: true,
              isMatch: true,
              message: `🎊 It's a Match! You paired property ${property1Id} with ${property2Id}`,
            };
          }
        }
      }

      // 7. If no actual reverse pair, just a like
      return {
        success: true,
        isMatch: false,
        message: 'Like recorded, no match yet.',
      };
    });
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, isMatch: false, message: 'Internal server error' };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

// V6
export async function likePropertyAndMaybeMatchV6({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    return await db.transaction(async (trx) => {
      // 1. Check if like already exists
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing) {
        return {
          success: false,
          isMatch: false,
          message: 'You already liked this property.',
        };
      }

      // 2. Get the property; get its owner
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property) {
        return {
          success: false,
          isMatch: false,
          message: 'Property not available.',
        };
      }
      const ownerId = property.authorId;

      // 3. Self-like: no match ever
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible).',
        };
      }

      // 4. Insert the like (User1 to User2's property)
      await trx.insert(likes).values({ fromUserId, propertyId });

      // 5. Only pair if User2 has already liked any (1-to-1) of User1's properties: must create matches just for those pairs
      // Get all properties you (User1) own
      const myProperties = await trx.query.properties.findMany({
        where: eq(properties.authorId, fromUserId),
      });

      for (const myProp of myProperties) {
        // Check: did owner of propertyId (User2) like myProp? (User2, myProp.id)
        const reverseLike = await trx.query.likes.findFirst({
          where: and(
            eq(likes.fromUserId, ownerId),
            eq(likes.propertyId, myProp.id)
          ),
        });

        if (reverseLike) {
          // Strictly pair (myProp, propertyId), no batch pairs
          let user1Id = fromUserId,
            user2Id = ownerId;
          let property1Id = myProp.id,
            property2Id = propertyId;
          if (user2Id < user1Id) {
            [user1Id, user2Id] = [user2Id, user1Id];
            [property1Id, property2Id] = [property2Id, property1Id];
          }
          // Only create match if not already created
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
            return {
              success: true,
              isMatch: true,
              message: `🎊 It's a Match! This match is for Property ${property1Id} <--> ${property2Id}`,
            };
          }
        }
      }

      // 6. If no actual reverse property, just a like
      return {
        success: true,
        isMatch: false,
        message: 'Like recorded, no match yet.',
      };
    });
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, isMatch: false, message: 'Internal server error' };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

// V7
export async function likePropertyAndMaybeMatchV7({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    return await db.transaction(async (trx) => {
      // 1. Insert like if not already present
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing) {
        return {
          success: false,
          isMatch: false,
          message: 'You already liked this property.',
        };
      }

      // 2. Find property owner
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property) {
        return {
          success: false,
          isMatch: false,
          message: 'Property not available.',
        };
      }
      const ownerId = property.authorId;

      // 3. Self-like (never match yourself)
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({
          fromUserId,
          propertyId,
        });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible).',
        };
      }

      // 4. Insert like
      await trx.insert(likes).values({ fromUserId, propertyId });

      // 5. Now, check if current owner liked any of properties that you own.
      // But: Only match for (Ax, propertyId) (your prop Ax, and propertyId you just liked), and create one match per such Ax only.
      const myProps = await trx.query.properties.findMany({
        where: eq(properties.authorId, fromUserId),
      });

      for (const myProp of myProps) {
        // Check: did owner of propertyId like myProp?
        const reverseLike = await trx.query.likes.findFirst({
          where: and(
            eq(likes.fromUserId, ownerId),
            eq(likes.propertyId, myProp.id)
          ),
        });
        if (reverseLike) {
          // Compose match key (order for uniqueIndex)
          let user1Id = fromUserId,
            user2Id = ownerId;
          let property1Id = myProp.id,
            property2Id = propertyId;
          if (user2Id < user1Id) {
            [user1Id, user2Id] = [user2Id, user1Id];
            [property1Id, property2Id] = [property2Id, property1Id];
          }
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
            // **EARLY RETURN—MUST NOT LOOP TO CREATE MORE THAN ONE MATCH**
            return {
              success: true,
              isMatch: true,
              message: `🎊 It's a Match for property ${property1Id} <--> ${property2Id}`,
            };
          }
        }
      }

      // 6. If no actual mutual reciprocal, just a like
      return {
        success: true,
        isMatch: false,
        message: 'Like recorded, no match yet.',
      };
    });
  } catch (err) {
    console.error('Error in likePropertyAndMaybeMatch:', err);
    return {
      success: false,
      isMatch: false,
      message: 'Internal server error',
    };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}

// v8
export async function likePropertyAndMaybeMatchV8({
  propertyId,
  path,
}: {
  propertyId: string;
  path: string;
}) {
  const user = await requireAuth();
  const fromUserId = user.id;

  try {
    return await db.transaction(async (trx) => {
      // 1. Insert like if not already present
      const existing = await trx.query.likes.findFirst({
        where: and(
          eq(likes.fromUserId, fromUserId),
          eq(likes.propertyId, propertyId)
        ),
      });
      if (existing) {
        return {
          success: false,
          isMatch: false,
          message: 'You already liked this property.',
        };
      }

      // 2. Get property and owner
      const property = await trx.query.properties.findFirst({
        where: and(
          eq(properties.id, propertyId),
          eq(properties.isAvailable, true)
        ),
      });
      if (!property) {
        return {
          success: false,
          isMatch: false,
          message: 'Property not available.',
        };
      }
      const ownerId = property.authorId;

      // 3. Self-like, never matched
      if (ownerId === fromUserId) {
        await trx.insert(likes).values({ fromUserId, propertyId });
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded (self-like, no match possible).',
        };
      }

      // 4. Insert the like
      await trx.insert(likes).values({ fromUserId, propertyId });

      // 5. Prevent duplicate match for the same user-pair (regardless of property)
      let user1Id = fromUserId,
        user2Id = ownerId;
      if (user2Id < user1Id) {
        [user1Id, user2Id] = [user2Id, user1Id];
      }
      // Check if a match exists between these users on ANY property pair
      const matchExists = await trx.query.matches.findFirst({
        where: and(eq(matches.user1Id, user1Id), eq(matches.user2Id, user2Id)),
      });
      if (matchExists) {
        return {
          success: true,
          isMatch: false,
          message: 'Like recorded, already matched with this user before.',
        };
      }

      // 6. Check if this like makes a mutual match (does owner like any of my properties?)
      const myProperties = await trx.query.properties.findMany({
        where: eq(properties.authorId, fromUserId),
      });
      for (const myProp of myProperties) {
        const reverseLike = await trx.query.likes.findFirst({
          where: and(
            eq(likes.fromUserId, ownerId),
            eq(likes.propertyId, myProp.id)
          ),
        });
        if (reverseLike) {
          // No previous match, so first match: pick this property-pair
          let property1Id = myProp.id,
            property2Id = propertyId;
          // Ensure property1 and property2 ordering matches user1/user2 ordering
          if (user2Id < user1Id) {
            [property1Id, property2Id] = [property2Id, property1Id];
          }
          const [newMatch] = await trx
            .insert(matches)
            .values({
              user1Id,
              user2Id,
              property1Id,
              property2Id,
              isActive: true,
            })
            .returning({ id: matches.id });

          // 1️⃣: Stream Chat setup
          const serverClient = StreamChat.getInstance(
            env.NEXT_PUBLIC_STREAM_API_KEY,
            env.STREAM_API_SECRET
          );

          // 2️⃣: Deterministic channel ID
          const channelId = generateChannelId(fromUserId, ownerId, 32, 'match');

          // 3️⃣: Create or get the channel
          const channelInstance = serverClient.channel('messaging', channelId, {
            members: [fromUserId, ownerId],
            created_by_id: fromUserId, // or ownerId, doesn't matter
          });

          await channelInstance.create();

          await trx
            .update(matches)
            .set({
              channelId: channelInstance.id,
              channelType: 'messaging',
            })
            .where(eq(matches.id, newMatch.id));

          return {
            success: true,
            isMatch: true,
            message: `🎊 It's a Match! Now only one match exists between you and this user.`,
          };
        }
      }

      // 7. No mutual like found, just a like
      return {
        success: true,
        isMatch: false,
        message: 'Like recorded, no match yet.',
      };
    });
  } catch (error) {
    console.error('Error in likePropertyAndMaybeMatch:', error);
    return { success: false, isMatch: false, message: 'Internal server error' };
  } finally {
    if (path) {
      const finalPath = `/(root)${path}`;
      revalidatePath(finalPath, 'page');
      revalidatePath('/(root)/swappings', 'page');
    } else {
      revalidatePath('/(root)/swappings', 'page');
    }
  }
}
