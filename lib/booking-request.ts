'use server';

import { db } from '@/drizzle/db';
import { bookings, swaps } from '@/drizzle/schemas';
import { requireAuth } from './require-auth';

// import { currentUser } from '@clerk/nextjs/server';
// import { cache } from 'react';
// import { redirect } from 'next/navigation';
// export const requireAuth = cache(async () => {
//   const user = await currentUser();
//   if (!user) {
//     return redirect('/sign-in');
//   }
//   return user;
// });

/**
 * Accepts booking info as FormData:
 * propertyId: string
 * startDate, endDate: string
 * guests: string (number)
 * matchId: string
 */
export async function createBookingRequest(unsafeData: FormData) {
  const user = await requireAuth();
  try {
    if (!unsafeData) {
      return { success: false, message: 'No data provided' };
    }
    const propertyId = unsafeData.get('propertyId') as string;
    const startDate = unsafeData.get('startDate') as string;
    const endDate = unsafeData.get('endDate') as string;
    const guests = unsafeData.get('guests') as string;
    const matchId = unsafeData.get('matchId') as string;

    // Insert the booking
    const bookingInsert = await db
      .insert(bookings)
      .values({
        propertyId,
        userId: user.id,
        startDate,
        endDate,
        guestCount: Number(guests),
        matchId,
      })
      .returning({ id: bookings.id });

    // Fetch match details to know user1Id/user2Id, property1Id/property2Id
    const match = await db.query.matches.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, matchId),
    });
    if (!match) return { success: false, message: 'Invalid matchId' };

    // Find the matching/complementary booking in this match
    // Get the "other" property in the match, not the one just booked
    let otherPropertyId: string, otherUserId: string;
    if (propertyId === match.property1Id) {
      otherPropertyId = match.property2Id;
      otherUserId = match.user2Id;
    } else if (propertyId === match.property2Id) {
      otherPropertyId = match.property1Id;
      otherUserId = match.user1Id;
    } else {
      return { success: false, message: 'Property not part of match' };
    }

    // Check if "other" user has booked "your" property for the same match
    const reciprocalBooking = await db.query.bookings.findFirst({
      where: (tbl, { eq, and }) =>
        and(
          eq(tbl.propertyId, otherPropertyId),
          eq(tbl.userId, otherUserId),
          eq(tbl.matchId, matchId)
        ),
    });

    // If reciprocal booking exists, create a swap (if it does not already exist)
    let swapCreated:
      | {
          id: string;
          status: 'pending' | 'approved' | 'declined' | 'completed';
        }[]
      | null = null;

    if (reciprocalBooking) {
      // Ensure swap doesn't exist already
      const priorSwap = await db.query.swaps.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.user1Id, match.user1Id),
            eq(tbl.user2Id, match.user2Id),
            eq(tbl.property1Id, match.property1Id),
            eq(tbl.property2Id, match.property2Id),
            eq(tbl.matchId, matchId)
          ),
      });
      if (!priorSwap) {
        swapCreated = await db
          .insert(swaps)
          .values({
            user1Id: match.user1Id,
            user2Id: match.user2Id,
            property1Id: match.property1Id,
            property2Id: match.property2Id,
            matchId,
            status: 'pending',
          })
          .returning({ id: swaps.id, status: swaps.status });
        // TODO: Notify admin and users swapCreated[0]!
      }
    }

    return {
      success: true,
      bookingId: bookingInsert[0]?.id,
      swapCreated: swapCreated ? swapCreated[0] : null,
      message: swapCreated
        ? 'Swap created and admin/user notified'
        : 'Booking logged',
    };
  } catch (error) {
    console.error('Error creating booking request:', error);
    return { success: false, message: 'Error creating booking request' };
  }
}

export async function createBookingRequestV1(unsafeData: FormData) {
  const user = await requireAuth();
  try {
    if (!unsafeData) {
      return { success: false, message: 'No data provided' };
    }
    const propertyId = unsafeData.get('propertyId') as string;
    const startDate = unsafeData.get('startDate') as string;
    const endDate = unsafeData.get('endDate') as string;
    const guests = unsafeData.get('guests') as string;
    const matchId = unsafeData.get('matchId') as string;

    // Insert the booking
    const bookingInsert = await db
      .insert(bookings)
      .values({
        propertyId,
        userId: user.id,
        startDate,
        endDate,
        guestCount: Number(guests),
        matchId,
      })
      .returning({ id: bookings.id });

    // Fetch the match details
    const match = await db.query.matches.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, matchId),
    });
    if (!match) return { success: false, message: 'Invalid matchId' };

    // Always check for reciprocal booking, regardless of who books first
    const property1Id = match.property1Id;
    const property2Id = match.property2Id;
    const user1Id = match.user1Id;
    const user2Id = match.user2Id;

    // Look for:
    //  (propertyId == property1Id, userId == user2Id)  AND
    //  (propertyId == property2Id, userId == user1Id)
    // Do they BOTH exist?

    const booking1 = await db.query.bookings.findFirst({
      where: (tbl, { eq, and }) =>
        and(
          eq(tbl.propertyId, property1Id),
          eq(tbl.userId, user2Id),
          eq(tbl.matchId, matchId)
        ),
    });

    const booking2 = await db.query.bookings.findFirst({
      where: (tbl, { eq, and }) =>
        and(
          eq(tbl.propertyId, property2Id),
          eq(tbl.userId, user1Id),
          eq(tbl.matchId, matchId)
        ),
    });

    let swapCreated:
      | {
          id: string;
          status: 'pending' | 'approved' | 'declined' | 'completed';
        }[]
      | null = null;

    // Swap only if both reciprocal bookings exist and swap does not yet exist
    if (booking1 && booking2) {
      const priorSwap = await db.query.swaps.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.user1Id, user1Id),
            eq(tbl.user2Id, user2Id),
            eq(tbl.property1Id, property1Id),
            eq(tbl.property2Id, property2Id),
            eq(tbl.matchId, matchId)
          ),
      });
      if (!priorSwap) {
        swapCreated = await db
          .insert(swaps)
          .values({
            user1Id,
            user2Id,
            property1Id,
            property2Id,
            matchId,
            status: 'pending',
          })
          .returning({ id: swaps.id, status: swaps.status });
        // TODO: Notify admin and users
      }
    }

    // Return result as before
    return {
      success: true,
      bookingId: bookingInsert[0]?.id,
      swapCreated: swapCreated ? swapCreated[0] : null,
      message: swapCreated
        ? 'Swap created and admin/user notified'
        : 'Booking logged',
    };

    // // Fetch match details to know user1Id/user2Id, property1Id/property2Id
    // const match = await db.query.matches.findFirst({
    //   where: (tbl, { eq }) => eq(tbl.id, matchId),
    // });
    // if (!match) return { success: false, message: 'Invalid matchId' };

    // // Find the matching/complementary booking in this match
    // // Get the "other" property in the match, not the one just booked
    // let otherPropertyId: string, otherUserId: string;
    // if (propertyId === match.property1Id) {
    //   otherPropertyId = match.property2Id;
    //   otherUserId = match.user2Id;
    // } else if (propertyId === match.property2Id) {
    //   otherPropertyId = match.property1Id;
    //   otherUserId = match.user1Id;
    // } else {
    //   return { success: false, message: 'Property not part of match' };
    // }

    // // Check if "other" user has booked "your" property for the same match
    // const reciprocalBooking = await db.query.bookings.findFirst({
    //   where: (tbl, { eq, and }) =>
    //     and(
    //       eq(tbl.propertyId, otherPropertyId),
    //       eq(tbl.userId, otherUserId),
    //       eq(tbl.matchId, matchId)
    //     ),
    // });

    // // If reciprocal booking exists, create a swap (if it does not already exist)
    // let swapCreated:
    //   | {
    //       id: string;
    //       status: 'pending' | 'approved' | 'declined' | 'completed';
    //     }[]
    //   | null = null;

    // if (reciprocalBooking) {
    //   // Ensure swap doesn't exist already
    //   const priorSwap = await db.query.swaps.findFirst({
    //     where: (tbl, { eq, and }) =>
    //       and(
    //         eq(tbl.user1Id, match.user1Id),
    //         eq(tbl.user2Id, match.user2Id),
    //         eq(tbl.property1Id, match.property1Id),
    //         eq(tbl.property2Id, match.property2Id),
    //         eq(tbl.matchId, matchId)
    //       ),
    //   });
    //   if (!priorSwap) {
    //     swapCreated = await db
    //       .insert(swaps)
    //       .values({
    //         user1Id: match.user1Id,
    //         user2Id: match.user2Id,
    //         property1Id: match.property1Id,
    //         property2Id: match.property2Id,
    //         matchId,
    //         status: 'pending',
    //       })
    //       .returning({ id: swaps.id, status: swaps.status });
    //     // TODO: Notify admin and users swapCreated[0]!
    //   }
    // }

    // return {
    //   success: true,
    //   bookingId: bookingInsert[0]?.id,
    //   swapCreated: swapCreated ? swapCreated[0] : null,
    //   message: swapCreated
    //     ? 'Swap created and admin/user notified'
    //     : 'Booking logged',
    // };
  } catch (error) {
    console.error('Error creating booking request:', error);
    return { success: false, message: 'Error creating booking request' };
  }
}

export async function createBookingRequestV2(unsafeData: FormData) {
  const user = await requireAuth();
  try {
    if (!unsafeData) {
      return { success: false, message: 'No data provided' };
    }

    const propertyId = unsafeData.get('propertyId') as string;
    const startDate = unsafeData.get('startDate') as string;
    const endDate = unsafeData.get('endDate') as string;
    const guests = unsafeData.get('guests') as string;
    const matchId = unsafeData.get('matchId') as string;

    // Insert the booking as usual
    const bookingInsert = await db
      .insert(bookings)
      .values({
        propertyId,
        userId: user.id,
        startDate,
        endDate,
        guestCount: Number(guests),
        matchId,
      })
      .returning({ id: bookings.id });

    // Get the match
    const match = await db.query.matches.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, matchId),
    });
    if (!match) return { success: false, message: 'Invalid matchId' };

    const property1Id = match.property1Id;
    const property2Id = match.property2Id;
    const user1Id = match.user1Id;
    const user2Id = match.user2Id;

    // Pull both possible cross bookings for this match
    const allBookings = await db.query.bookings.findMany({
      where: (tbl, { eq }) => eq(tbl.matchId, matchId),
      columns: { propertyId: true, userId: true },
    });

    // Find the needed pairs (cross-bookings)
    const hasUser1BookedProperty2 = allBookings.some(
      (b) => b.propertyId === property2Id && b.userId === user1Id
    );
    const hasUser2BookedProperty1 = allBookings.some(
      (b) => b.propertyId === property1Id && b.userId === user2Id
    );

    let swapCreated = null;

    if (hasUser1BookedProperty2 && hasUser2BookedProperty1) {
      // Ensure swap doesn't exist
      const priorSwap = await db.query.swaps.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.user1Id, user1Id),
            eq(tbl.user2Id, user2Id),
            eq(tbl.property1Id, property1Id),
            eq(tbl.property2Id, property2Id),
            eq(tbl.matchId, matchId)
          ),
      });
      if (!priorSwap) {
        swapCreated = await db
          .insert(swaps)
          .values({
            user1Id,
            user2Id,
            property1Id,
            property2Id,
            matchId,
            status: 'pending',
          })
          .returning({ id: swaps.id, status: swaps.status });
        // TODO: notify admin and both users
      }
    }

    // For further debug, optionally return bookings:
    return {
      success: true,
      bookingId: bookingInsert[0]?.id,
      swapCreated: swapCreated ? swapCreated[0] : null,
      allBookings,
      message: swapCreated
        ? 'Swap created and admin/user notified'
        : 'Booking logged, waiting for cross-booking',
    };
  } catch (error) {
    console.error('Error creating booking request:', error);
    return { success: false, message: 'Error creating booking request' };
  }
}

export async function createBookingRequestV3(unsafeData: FormData) {
  const user = await requireAuth();
  try {
    if (!unsafeData) {
      return { success: false, message: 'No data provided' };
    }

    const propertyId = unsafeData.get('propertyId') as string;
    const startDate = unsafeData.get('startDate') as string;
    const endDate = unsafeData.get('endDate') as string;
    const guests = unsafeData.get('guests') as string;
    const matchId = unsafeData.get('matchId') as string;

    // 🛑 Prevent self-booking
    const property = await db.query.properties.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, propertyId),
    });
    if (property && property.authorId === user.id) {
      return {
        success: false,
        message: 'You cannot book your own property in a match swap!',
      };
    }

    // Insert the booking as usual
    const bookingInsert = await db
      .insert(bookings)
      .values({
        propertyId,
        userId: user.id,
        startDate,
        endDate,
        guestCount: Number(guests),
        matchId,
      })
      .returning({ id: bookings.id });

    // Get the match
    const match = await db.query.matches.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, matchId),
    });
    if (!match) return { success: false, message: 'Invalid matchId' };

    const property1Id = match.property1Id;
    const property2Id = match.property2Id;
    const user1Id = match.user1Id;
    const user2Id = match.user2Id;

    // Get all bookings for this match
    const allBookings = await db.query.bookings.findMany({
      where: (tbl, { eq }) => eq(tbl.matchId, matchId),
      columns: { propertyId: true, userId: true },
    });

    // Check for reciprocal cross-bookings
    const hasUser1BookedProperty2 = allBookings.some(
      (b) => b.propertyId === property2Id && b.userId === user1Id
    );
    const hasUser2BookedProperty1 = allBookings.some(
      (b) => b.propertyId === property1Id && b.userId === user2Id
    );

    let swapCreated = null;
    if (hasUser1BookedProperty2 && hasUser2BookedProperty1) {
      // Ensure swap doesn't already exist
      const priorSwap = await db.query.swaps.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.user1Id, user1Id),
            eq(tbl.user2Id, user2Id),
            eq(tbl.property1Id, property1Id),
            eq(tbl.property2Id, property2Id),
            eq(tbl.matchId, matchId)
          ),
      });
      if (!priorSwap) {
        swapCreated = await db
          .insert(swaps)
          .values({
            user1Id,
            user2Id,
            property1Id,
            property2Id,
            matchId,
            status: 'pending',
          })
          .returning({ id: swaps.id, status: swaps.status });
        // TODO: Notify admin and both users here if needed
        console.log('notify admin and users of new swap');
      }
    }

    return {
      success: true,
      bookingId: bookingInsert[0]?.id,
      swapCreated: swapCreated ? swapCreated[0] : null,
      allBookings,
      message: swapCreated
        ? 'Swap created and admin/user notified'
        : 'Booking logged, waiting for cross-booking',
    };
  } catch (error) {
    console.error('Error creating booking request:', error);
    return { success: false, message: 'Error creating booking request' };
  }
}

export async function createBookingRequestV4(unsafeData: FormData) {
  const user = await requireAuth();
  try {
    if (!unsafeData) {
      return { success: false, message: 'No data provided' };
    }

    const propertyId = unsafeData.get('propertyId') as string;
    const startDate = unsafeData.get('startDate') as string;
    const endDate = unsafeData.get('endDate') as string;
    const guests = unsafeData.get('guests') as string;
    const matchId = unsafeData.get('matchId') as string;

    // Get property
    const property = await db.query.properties.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, propertyId),
    });

    if (!property) {
      return { success: false, message: 'Invalid propertyId.' };
    }
    if (property.authorId === user.id) {
      return {
        success: false,
        message: 'You cannot book your own property in a match swap!',
      };
    }

    // Get match
    const match = await db.query.matches.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, matchId),
    });
    if (!match) return { success: false, message: 'Invalid matchId.' };
    console.log('MATCH:', {
      user1Id: match.user1Id,
      user2Id: match.user2Id,
      property1Id: match.property1Id,
      property2Id: match.property2Id,
    });

    // Only allow booking for match properties
    if (propertyId !== match.property1Id && propertyId !== match.property2Id) {
      return {
        success: false,
        message:
          'You can only book one of the properties involved in this match.',
      };
    }

    // Only allow user1 to book property2, user2 to book property1
    if (propertyId === match.property1Id && user.id !== match.user2Id) {
      return {
        success: false,
        message: 'Only the matched user can book this property.',
      };
    }
    if (propertyId === match.property2Id && user.id !== match.user1Id) {
      return {
        success: false,
        message: 'Only the matched user can book this property.',
      };
    }

    // Insert the booking
    const bookingInsert = await db
      .insert(bookings)
      .values({
        propertyId,
        userId: user.id,
        startDate,
        endDate,
        guestCount: Number(guests),
        matchId,
      })
      .returning({ id: bookings.id });

    // Bookings for match
    const allBookings = await db.query.bookings.findMany({
      where: (tbl, { eq }) => eq(tbl.matchId, matchId),
      columns: { propertyId: true, userId: true },
    });
    console.log('ALL BOOKINGS:', allBookings);

    const hasUser1BookedProperty2 = allBookings.some(
      (b) => b.propertyId === match.property2Id && b.userId === match.user1Id
    );
    console.log('hasUser1BookedProperty2:', hasUser1BookedProperty2);
    const hasUser2BookedProperty1 = allBookings.some(
      (b) => b.propertyId === match.property1Id && b.userId === match.user2Id
    );
    console.log('hasUser2BookedProperty1:', hasUser2BookedProperty1);

    let swapCreated = null;
    if (hasUser1BookedProperty2 && hasUser2BookedProperty1) {
      const priorSwap = await db.query.swaps.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.user1Id, match.user1Id),
            eq(tbl.user2Id, match.user2Id),
            eq(tbl.property1Id, match.property1Id),
            eq(tbl.property2Id, match.property2Id),
            eq(tbl.matchId, matchId)
          ),
      });
      if (!priorSwap) {
        swapCreated = await db
          .insert(swaps)
          .values({
            user1Id: match.user1Id,
            user2Id: match.user2Id,
            property1Id: match.property1Id,
            property2Id: match.property2Id,
            matchId,
            status: 'pending',
          })
          .returning({ id: swaps.id, status: swaps.status });
      }
    }

    return {
      success: true,
      bookingId: bookingInsert[0]?.id,
      swapCreated: swapCreated ? swapCreated[0] : null,
      allBookings,
      message: swapCreated
        ? 'Swap created and admin/user notified'
        : 'Booking logged, waiting for cross-booking',
    };
  } catch (error) {
    console.error('Error creating booking request:', error);
    return { success: false, message: 'Error creating booking request' };
  }
}

export async function createBookingRequestV5(unsafeData: FormData) {
  const user = await requireAuth();
  try {
    if (!unsafeData) {
      return { success: false, message: 'No data provided' };
    }

    const propertyId = unsafeData.get('propertyId') as string;
    const startDate = unsafeData.get('startDate') as string;
    const endDate = unsafeData.get('endDate') as string;
    const guests = unsafeData.get('guests') as string;
    const matchId = unsafeData.get('matchId') as string;

    // Get property (to prevent self-booking abuse)
    const property = await db.query.properties.findFirst({
      where: (tbl, { eq }) => eq(tbl.id, propertyId),
    });
    if (!property) return { success: false, message: 'Invalid propertyId' };
    if (property.authorId === user.id) {
      return { success: false, message: 'You cannot book your own property.' };
    }

    // Insert the booking
    const bookingInsert = await db
      .insert(bookings)
      .values({
        propertyId,
        userId: user.id,
        startDate,
        endDate,
        guestCount: Number(guests),
        matchId,
      })
      .returning({ id: bookings.id });

    // Fetch all bookings for this matchId (after this new one)
    const allBookings = await db.query.bookings.findMany({
      where: (tbl, { eq }) => eq(tbl.matchId, matchId),
      columns: { propertyId: true, userId: true },
    });

    // Deduplicate by userId (to handle accidental double bookings)
    const uniqueBookings = Object.values(
      allBookings.reduce((acc, b) => {
        acc[b.userId] = b;
        return acc;
      }, {} as Record<string, { propertyId: string; userId: string }>)
    );

    // Only create swap if exactly two unique users and two distinct propertyIds
    if (
      uniqueBookings.length === 2 &&
      uniqueBookings[0].propertyId !== uniqueBookings[1].propertyId
    ) {
      // Sort for consistent field assignment
      const [firstBooking, secondBooking] = uniqueBookings;

      // Double-check: don't create duplicate swap for same match+properties+users combo
      const priorSwap = await db.query.swaps.findFirst({
        where: (tbl, { eq, and }) =>
          and(
            eq(tbl.matchId, matchId),
            eq(tbl.user1Id, firstBooking.userId),
            eq(tbl.user2Id, secondBooking.userId),
            eq(tbl.property1Id, firstBooking.propertyId),
            eq(tbl.property2Id, secondBooking.propertyId)
          ),
      });

      let swapCreated:
        | {
            id: string;
            status: 'pending' | 'approved' | 'declined' | 'completed';
          }[]
        | null = null;

      if (!priorSwap) {
        swapCreated = await db
          .insert(swaps)
          .values({
            user1Id: firstBooking.userId,
            user2Id: secondBooking.userId,
            property1Id: firstBooking.propertyId,
            property2Id: secondBooking.propertyId,
            matchId,
            status: 'pending',
          })
          .returning({ id: swaps.id, status: swaps.status });
        return {
          success: true,
          bookingId: bookingInsert[0]?.id,
          swapCreated: swapCreated ? swapCreated[0] : null,
          allBookings: uniqueBookings,
          message: 'Swap created and admin/user notified',
        };
      } else {
        return {
          success: true,
          bookingId: bookingInsert[0]?.id,
          swapCreated: priorSwap,
          allBookings: uniqueBookings,
          message: 'Swap already exists for these bookings',
        };
      }
    }

    // Only one booking exists or both bookings are for the same property/user, so just log
    return {
      success: true,
      bookingId: bookingInsert[0]?.id,
      allBookings,
      message: 'Booking logged, waiting for cross-booking',
    };
  } catch (error) {
    console.error('Error creating booking request:', error);
    return { success: false, message: 'Error creating booking request' };
  }
}

export async function createBookingRequestV6(unsafeData: FormData) {
  const user = await requireAuth();
  try {
    if (!unsafeData) {
      return { success: false, message: 'No data provided' };
    }

    const propertyId = unsafeData.get('propertyId') as string;
    const startDate = unsafeData.get('startDate') as string;
    const endDate = unsafeData.get('endDate') as string;
    const guests = unsafeData.get('guests') as string;
    const matchId = unsafeData.get('matchId') as string;

    const commitedBooking = await db.transaction(async (tx) => {
      // 1️⃣ Verify match exists and user is part of it
      const existingMatch = await tx.query.matches.findFirst({
        where(fields, operators) {
          return operators.and(
            operators.eq(fields.id, matchId),
            operators.or(
              operators.eq(fields.user1Id, user.id),
              operators.eq(fields.user2Id, user.id)
            )
          );
        },
      });
      if (!existingMatch) {
        tx.rollback();
        return { success: false, message: 'Invalid matchId or unauthorized' };
      }

      // Get property (to prevent self-booking abuse)
      const property = await tx.query.properties.findFirst({
        where: (tbl, { eq }) => eq(tbl.id, propertyId),
      });
      if (!property) {
        tx.rollback();
        return { success: false, message: 'Invalid propertyId' };
      }
      if (property.authorId === user.id) {
        tx.rollback();
        return {
          success: false,
          message: 'You cannot book your own property.',
        };
      }

      // Insert the booking
      const [bookingInsert] = await tx
        .insert(bookings)
        .values({
          propertyId,
          userId: user.id,
          startDate,
          endDate,
          guestCount: Number(guests),
          matchId,
        })
        .returning({ id: bookings.id });

      // Fetch all bookings for this matchId (after this new one)
      const allBookings = await tx.query.bookings.findMany({
        where: (tbl, { eq }) => eq(tbl.matchId, matchId),
        columns: { propertyId: true, userId: true },
      });
      const uniqueBookings = Object.values(
        allBookings.reduce((acc, b) => {
          acc[b.userId] = b;
          return acc;
        }, {} as Record<string, { propertyId: string; userId: string }>)
      );

      // Deduplicate by userId (to handle accidental double bookings)

      // Only create swap if exactly two unique users and two distinct propertyIds
      if (
        uniqueBookings.length === 2 &&
        uniqueBookings[0].propertyId !== uniqueBookings[1].propertyId
      ) {
        // Sort for consistent field assignment
        const [firstBooking, secondBooking] = uniqueBookings;

        // Double-check: don't create duplicate swap for same match+properties+users combo
        const priorSwap = await tx.query.swaps.findFirst({
          where: (tbl, { eq, and }) =>
            and(
              eq(tbl.matchId, matchId),
              eq(tbl.user1Id, firstBooking.userId),
              eq(tbl.user2Id, secondBooking.userId),
              eq(tbl.property1Id, firstBooking.propertyId),
              eq(tbl.property2Id, secondBooking.propertyId)
            ),
        });

        let swapCreated:
          | {
              id: string;
              status: 'pending' | 'approved' | 'declined' | 'completed';
            }[]
          | null = null;

        if (!priorSwap) {
          swapCreated = await db
            .insert(swaps)
            .values({
              user1Id: firstBooking.userId,
              user2Id: secondBooking.userId,
              property1Id: firstBooking.propertyId,
              property2Id: secondBooking.propertyId,
              matchId,
              status: 'pending',
            })
            .returning({ id: swaps.id, status: swaps.status });
          return {
            success: true,
            bookingId: bookingInsert.id,
            swapCreated: swapCreated ? swapCreated[0] : null,
            allBookings: uniqueBookings,
            message: 'Swap created and admin/user notified',
          };
        } else {
          return {
            success: true,
            bookingId: bookingInsert.id,
            swapCreated: priorSwap,
            allBookings: uniqueBookings,
            message: 'Swap already exists for these bookings',
          };
        }
      }

      // Only one booking exists or both bookings are for the same property/user, so just log
      return {
        success: true,
        bookingId: bookingInsert.id,
        allBookings,
        message: 'Booking logged, waiting for cross-booking',
      };
    });

    return commitedBooking;
  } catch (error) {
    console.error('Error creating booking request:', error);
    return { success: false, message: 'Error creating booking request' };
  }
}
