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
export async function getProperty(propertyId: string) {
  await requireAuth();

  try {
    const data = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.id, propertyId),
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
    console.error('Error fetching property:', error);
    return null;
  }
}

// v1
export async function getPropertyV1(propertyId: string) {
  const user = await requireAuth();

  try {
    // Fetch property and author details
    const property = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.id, propertyId),
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

    if (!property) {
      return null;
    }

    const userId = user.id;
    const authorId = property.author.id;

    // Check: did current user like this property?
    const userLiked = await db.query.likes.findFirst({
      where: (likes, { eq }) =>
        eq(likes.fromUserId, userId) && eq(likes.propertyId, propertyId),
      columns: { id: true },
    });

    // Find one property owned by the current user
    const myProperty = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.authorId, userId),
      columns: { id: true },
    });

    let authorLiked:
      | {
          id: string;
        }
      | undefined = undefined;

    if (myProperty) {
      // Did this property's author like *my* property?
      authorLiked = await db.query.likes.findFirst({
        where: (likes, { eq }) =>
          eq(likes.fromUserId, authorId) && eq(likes.propertyId, myProperty.id),
        columns: { id: true },
      });
    }

    // Final "mutual like" condition: both exist
    const isMatched = Boolean(userLiked && authorLiked);

    return {
      ...property,
      isMatched, // <-- Add this!
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

// v2
export async function getPropertyV2(propertyId: string) {
  const user = await requireAuth();
  try {
    // Get property with author
    const property = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.id, propertyId),
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
    if (!property) return null;

    const userId = user.id;
    const authorId = property.author.id;

    // 1️⃣ Get ALL my property IDs
    const myProperties = await db.query.properties.findMany({
      where: (properties, { eq }) => eq(properties.authorId, userId),
      columns: { id: true },
    });
    const myPropertyIds = myProperties.map((p) => p.id);

    // 2️⃣ Get ALL author's property IDs
    const theirProperties = await db.query.properties.findMany({
      where: (properties, { eq }) => eq(properties.authorId, authorId),
      columns: { id: true },
    });
    const theirPropertyIds = theirProperties.map((p) => p.id);

    // 3️⃣ Did I like ANY of the author's properties? (You to them)
    let iLikedThem = false;
    if (theirPropertyIds.length) {
      const liked = await db.query.likes.findFirst({
        where: (likes, { eq, inArray }) =>
          eq(likes.fromUserId, userId) &&
          inArray(likes.propertyId, theirPropertyIds),
        columns: { id: true },
      });
      iLikedThem = Boolean(liked);
    }

    // 4️⃣ Did the author like ANY of my properties? (Them to you)
    let theyLikedMe = false;
    if (myPropertyIds.length) {
      const liked = await db.query.likes.findFirst({
        where: (likes, { eq, inArray }) =>
          eq(likes.fromUserId, authorId) &&
          inArray(likes.propertyId, myPropertyIds),
        columns: { id: true },
      });
      theyLikedMe = Boolean(liked);
    }

    // 5️⃣ Mutual?
    const isMatched = iLikedThem && theyLikedMe;

    return {
      ...property,
      isMatched,
    };
  } catch (err) {
    console.error('Error fetching property:', err);
    return null;
  }
}

// v3
export async function getPropertyV3(propertyId: string) {
  const user = await requireAuth();
  try {
    // Get property with author
    const property = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.id, propertyId),
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
    if (!property) return null;

    const userId = user.id;
    const authorId = property.author.id;

    // 0️⃣ --- Did current user like THIS property? --
    let iLikedThisProperty = false;
    const likedThis = await db.query.likes.findFirst({
      where: (likes, { and, eq }) =>
        and(eq(likes.fromUserId, userId), eq(likes.propertyId, propertyId)),
      columns: { id: true },
    });
    iLikedThisProperty = Boolean(likedThis);

    // 1️⃣ Get ALL my property IDs
    const myProperties = await db.query.properties.findMany({
      where: (properties, { eq }) => eq(properties.authorId, userId),
      columns: { id: true },
    });
    const myPropertyIds = myProperties.map((p) => p.id);

    // 2️⃣ Get ALL author's property IDs
    const theirProperties = await db.query.properties.findMany({
      where: (properties, { eq }) => eq(properties.authorId, authorId),
      columns: { id: true },
    });
    const theirPropertyIds = theirProperties.map((p) => p.id);

    // 3️⃣ Did I like ANY of the author's properties? (You to them)
    let iLikedThem = false;
    if (theirPropertyIds.length) {
      const liked = await db.query.likes.findFirst({
        where: (likes, { and, eq, inArray }) =>
          and(
            eq(likes.fromUserId, userId),
            inArray(likes.propertyId, theirPropertyIds)
          ),
        columns: { id: true },
      });
      iLikedThem = Boolean(liked);
    }

    // 4️⃣ Did the author like ANY of my properties? (Them to you)
    let theyLikedMe = false;
    if (myPropertyIds.length) {
      const liked = await db.query.likes.findFirst({
        where: (likes, { and, eq, inArray }) =>
          and(
            eq(likes.fromUserId, authorId),
            inArray(likes.propertyId, myPropertyIds)
          ),
        columns: { id: true },
      });
      theyLikedMe = Boolean(liked);
    }

    // 5️⃣ Mutual?
    const isMatched = iLikedThem && theyLikedMe;

    return {
      ...property,
      isMatched,
      iLikedThisProperty,
    };
  } catch (err) {
    console.error('Error fetching property:', err);
    return null;
  }
}

// v4
export async function getPropertyV4(propertyId: string) {
  const user = await requireAuth();
  try {
    // Get property with author
    const property = await db.query.properties.findFirst({
      where: (properties, { eq }) => eq(properties.id, propertyId),
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
    if (!property) return null;

    const userId = user.id;
    const authorId = property.author.id;

    // 0️⃣ --- Did current user send connection req for THIS property (to this author)? ---
    let iSentConnectionRequest = false;
    const sentRequest = await db.query.connectionRequests.findFirst({
      where: (cr, { and, eq }) =>
        and(
          eq(cr.fromUserId, userId),
          eq(cr.propertyId, propertyId),
          eq(cr.authorId, authorId)
        ),
      columns: {
        id: true,
        startDate: true,
        endDate: true,
        guests: true,
        status: true,
        matchId: true,
      },
    });

    iSentConnectionRequest = Boolean(sentRequest);

    // 1️⃣ --- Did current user like THIS property? --
    let iLikedThisProperty = false;
    const likedThis = await db.query.likes.findFirst({
      where: (likes, { and, eq }) =>
        and(eq(likes.fromUserId, userId), eq(likes.propertyId, propertyId)),
      columns: { id: true },
    });
    iLikedThisProperty = Boolean(likedThis);

    // 2️⃣ Get ALL my property IDs
    const myProperties = await db.query.properties.findMany({
      where: (properties, { eq }) => eq(properties.authorId, userId),
      columns: { id: true },
    });
    const myPropertyIds = myProperties.map((p) => p.id);

    // 3️⃣ Get ALL author's property IDs
    const theirProperties = await db.query.properties.findMany({
      where: (properties, { eq }) => eq(properties.authorId, authorId),
      columns: { id: true },
    });
    const theirPropertyIds = theirProperties.map((p) => p.id);

    // 4️⃣ Did I like ANY of the author's properties? (You to them)
    let iLikedThem = false;
    if (theirPropertyIds.length) {
      const liked = await db.query.likes.findFirst({
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
      const liked = await db.query.likes.findFirst({
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

    return {
      ...property,
      isMatched,
      iLikedThisProperty,
      iSentConnectionRequest,
      sentRequest,
      isOwner: authorId === userId,
    };
  } catch (err) {
    console.error('Error fetching property:', err);
    return null;
  }
}

// v5
export async function getPropertyV5(propertyId: string) {
  const user = await requireAuth();
  try {
    const commited = await db.transaction(async (tx) => {
      const viewsCount = await tx.$count(views);
      // Get property with author
      const property = await tx.query.properties.findFirst({
        where: (properties, { eq }) => eq(properties.id, propertyId),
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
      if (!property) {
        tx.rollback();
        return null;
      }

      const userId = user.id;
      const authorId = property.author.id;

      // 0️⃣ --- Did current user send connection req for THIS property (to this author)? ---
      let iSentConnectionRequest = false;
      const sentRequest = await tx.query.connectionRequests.findFirst({
        where: (cr, { and, eq }) =>
          and(
            eq(cr.fromUserId, userId),
            eq(cr.propertyId, propertyId),
            eq(cr.authorId, authorId)
          ),
        columns: {
          id: true,
          startDate: true,
          endDate: true,
          guests: true,
          status: true,
          matchId: true,
        },
      });
      iSentConnectionRequest = Boolean(sentRequest);

      // 1️⃣ --- Did current user like THIS property? --
      let iLikedThisProperty = false;
      const likedThis = await tx.query.likes.findFirst({
        where: (likes, { and, eq }) =>
          and(eq(likes.fromUserId, userId), eq(likes.propertyId, propertyId)),
        columns: { id: true },
      });
      iLikedThisProperty = Boolean(likedThis);

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

      // 7️⃣ Get matchId for this user and author (regardless of property direction!)
      let matchId: string | undefined = undefined;
      const match = await tx.query.matches.findFirst({
        where: (match, { or, and, eq }) =>
          // Match must involve both users (as user1/user2 in any order)
          or(
            and(eq(match.user1Id, userId), eq(match.user2Id, authorId)),
            and(eq(match.user1Id, authorId), eq(match.user2Id, userId))
          ),
        columns: { id: true },
      });

      if (match) {
        matchId = match.id;
      }

      return {
        ...property,
        isMatched,
        iLikedThisProperty,
        iSentConnectionRequest,
        sentRequest,
        isOwner: authorId === userId,
        matchId, // <--- ADDED
        viewsCount, // <--- ADDED
      };
    });
    return commited;
  } catch (err) {
    console.error('Error fetching property:', err);
    return null;
  }
}
