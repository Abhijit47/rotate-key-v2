import { db } from '@/drizzle/db';
// import { sql } from 'drizzle-orm';
import { unstable_cache as cache } from 'next/cache';
import { PropertyTable } from './property-table';

const preparedProperties = db.query.properties
  .findMany({
    orderBy: (properties, { desc }) => [desc(properties.createdAt)],
    // limit: sql.placeholder('limit'),
    // offset: sql.placeholder('offset'),
    columns: {
      id: true,
      type: true,
      address: true,
      city: true,
      state: true,
      country: true,
      zipcode: true,
      images: true,
      area: true,
      bedRooms: true,
      bathRooms: true,
      isAvailable: true,
      ownerName: true,
      ownerEmail: true,
      createdAt: true,
    },
    with: {
      author: {
        columns: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
        },
      },
      bookings: {
        columns: {
          id: true,
          startDate: true,
          endDate: true,
          guestCount: true,
          createdAt: true,
        },
      },
      receivedLikes: {
        columns: {
          id: true,
          createdAt: true,
        },
      },
      connectionRequests: {
        columns: {
          id: true,
          guests: true,
          status: true,
          startDate: true,
          endDate: true,
          createdAt: true,
        },
      },
      propertyViews: {
        columns: {
          id: true,
          viewedAt: true,
        },
      },
    },
  })
  .prepare('getProperties');

const getCachedProperties = cache(
  // async ({ limit, offset }: { limit: number; offset: number }) => {
  async () => {
    // return await preparedProperties.execute({ limit: limit, offset: offset });
    return await preparedProperties.execute();
  },
  ['properties'],
  {
    revalidate: 60 * 60, // 1 hour
    tags: ['properties'],
  }
);

// type GetProperties = Awaited<ReturnType<typeof getCachedProperties>>[number];

export default async function PropertiesListTable() {
  // const properties = await getCachedProperties({
  //   limit: 10,
  //   offset: 0,
  // });
  const properties = await getCachedProperties();
  return <PropertyTable data={properties} />;
}
