'use server';

import { db } from '@/drizzle/db';
import { properties, swaps } from '@/drizzle/schemas';
import { eq, or } from 'drizzle-orm';
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

// Approve Swap Action - only admin can do this
export async function approveSwap({
  swapId,
  property1Id,
  property2Id,
  matchId,
  user1Id,
  user2Id,
}: {
  swapId: string;
  property1Id: string;
  property2Id: string;
  matchId: string;
  user1Id: string;
  user2Id: string;
}) {
  const user = await requireAuth();

  try {
    const { publicMetadata } = user;
    if (publicMetadata.role !== 'admin') {
      return { success: false, message: 'Unauthorized' };
    }

    // Start transaction
    const commitedApproval = await db.transaction(async (trx) => {
      // Verify the match associated with the supplied user IDs
      const existingMatch = await trx.query.matches.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.id, matchId),
            eq(tbl.isActive, true),
            or(
              and(eq(tbl.user1Id, user1Id), eq(tbl.user2Id, user2Id)),
              and(eq(tbl.user1Id, user2Id), eq(tbl.user2Id, user1Id))
            )
          ),
      });

      if (!existingMatch) {
        trx.rollback();
        return {
          success: false,
          data: undefined,
          message: 'Match not found or inactive',
        };
      }

      // Find the pending swap by ID
      const swap = await trx.query.swaps.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.id, swapId),
            eq(tbl.status, 'pending'),
            eq(tbl.matchId, existingMatch.id),
            or(
              and(eq(tbl.user1Id, user1Id), eq(tbl.user2Id, user2Id)),
              and(eq(tbl.user1Id, user2Id), eq(tbl.user2Id, user1Id))
            ),
            or(
              and(
                eq(tbl.property1Id, property1Id),
                eq(tbl.property2Id, property2Id)
              ),
              and(
                eq(tbl.property1Id, property2Id),
                eq(tbl.property2Id, property1Id)
              )
            )

            //
            // eq(tbl.user1Id, user1Id),
            // eq(tbl.user2Id, user2Id)
          ),
      });
      if (!swap) {
        return {
          success: false,
          data: undefined,
          message: 'Swap not found or not pending',
        };
      }

      // 1. Set swap status to 'approved'
      const [updatedSwap] = await trx
        .update(swaps)
        .set({ status: 'approved' })
        // .where((tbl, { eq }) => eq(tbl.id, swapId))
        .where(eq(swaps.id, swapId))
        .returning({ id: swaps.id, status: swaps.status });

      if (!updatedSwap) {
        return {
          success: false,
          data: undefined,
          message: 'Failed to approve swap',
        };
      }

      // 2. Mark both properties as unavailable (isAvailable = false)
      await trx
        .update(properties)
        .set({ isAvailable: false })
        .where(
          or(eq(properties.id, property1Id), eq(properties.id, property2Id))
          // and(
          //   // eq(properties.id, swap.offeredPropertyId),
          //   // eq(properties.id, swap.requestedPropertyId)
          //   eq(properties.id, property1Id),
          //   eq(properties.id, property2Id)
          // )
        );

      // 3. (Optional) Inform both users about swap approval
      // TODO: Notify user swap.requesterId
      // TODO: Find the other userId (owner of requestedProperty) and notify them too

      // Example: const otherUserId = requestedProperty.authorId
      // TODO: Notify both swap.requesterId and otherUserId

      return {
        success: true,
        message: 'Swap approved, both properties are now unavailable.',
        data: updatedSwap,
      };
    });
    return commitedApproval;
  } catch (error) {
    console.error('Error approving swap:', error);
    return { success: false, data: undefined, message: 'Error approving swap' };
  } finally {
    // Revalidate the swaps and properties pages to reflect changes
    revalidatePath('/swappings');
    revalidatePath('/admin/swappings');
  }
}
