import { db } from '@/drizzle/db';
import { sql } from 'drizzle-orm';
import { unstable_cache as cache } from 'next/cache';
import { BookingsTable } from './bookings-table';

const preparedBookings = db.query.bookings
  .findMany({
    limit: sql.placeholder('limit'),
    offset: sql.placeholder('offset'),
    columns: {
      id: true,
      userId: true,
      propertyId: true,
      startDate: true,
      endDate: true,
      guestCount: true,
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
          createdAt: true,
        },
      },
      property: {
        columns: {
          id: true,
          type: true,
          images: true,
          address: true,
          city: true,
          state: true,
          country: true,
          zipcode: true,
          isAvailable: true,
          createdAt: true,
        },
      },
      match: {
        columns: {
          id: true,
          isActive: true,
          user1Id: true,
          user2Id: true,
          createdAt: true,
        },
      },
    },
    // count the bookings sql query
    // extras(fields, { sql }) {
    //   return {
    //     totalBookings: sql`count(${fields.id})`.as('total_bookings'),
    //   };
    // },
  })
  .prepare('getBookings');

const getCachedBookings = cache(
  async ({ limit, offset }: { limit: number; offset: number }) => {
    return await preparedBookings.execute({ limit, offset });
  },
  ['bookings'],
  {
    revalidate: 60 * 60, // 1 hour
    tags: ['bookings'],
  }
);

// type GetBookings = Awaited<ReturnType<typeof getCachedBookings>>;

export default async function BookingsListTable() {
  const swappingLists = await getCachedBookings({
    limit: 10,
    offset: 0,
  });
  return <BookingsTable data={swappingLists} />;
}
