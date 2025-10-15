import { db } from '@/drizzle/db';
import { sql } from 'drizzle-orm';
import { unstable_cache as cache } from 'next/cache';
import { ConnectionsTable } from './connections-table';

const preparedConnections = db.query.connectionRequests
  .findMany({
    limit: sql.placeholder('limit'),
    offset: sql.placeholder('offset'),
    columns: {
      id: true,
      status: true,
      guests: true,
      startDate: true,
      endDate: true,
      createdAt: true,
    },
    with: {
      fromUser: {
        columns: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
        },
      },
      author: {
        columns: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
        },
      },
      // match: {
      //   columns: {
      //     id: true,
      //     isActive: true,
      //     user1Id: true,
      //     user2Id: true,
      //     channelId: true,
      //     channelType: true,
      //     createdAt: true,
      //     updatedAt: true,
      //     property1Id: true,
      //     property2Id: true,
      //   },
      // },

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
  })
  .prepare('getConnections');

const getCachedConnections = cache(
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const connections = await preparedConnections.execute({ limit, offset });
    return connections;
  },
  ['connections'],
  {
    revalidate: 60 * 60, // 1 hour
    tags: ['connections'],
  }
);

// type ConnectionsDataInferred = Awaited<
//   ReturnType<typeof getCachedConnections>
// >[number];

export default async function ConnectionsListTable() {
  const swappingLists = await getCachedConnections({
    limit: 10,
    offset: 0,
  });
  return <ConnectionsTable data={swappingLists} />;
}
