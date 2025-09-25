import { db } from '@/drizzle/db';
import { sql } from 'drizzle-orm';
import { unstable_cache as cache } from 'next/cache';
import { SwapTable } from './swap-table';

const preparedSwaps = db.query.swaps
  .findMany({
    with: {
      user1: { columns: { id: true, fullName: true, email: true } },
      user2: { columns: { id: true, fullName: true, email: true } },
      property1: {
        columns: {
          id: true,
          type: true,
          address: true,
          city: true,
          state: true,
          country: true,
          zipcode: true,
          ownerName: true,
          ownerEmail: true,
        },
      },
      property2: {
        columns: {
          id: true,
          type: true,
          address: true,
          city: true,
          state: true,
          country: true,
          zipcode: true,
          ownerName: true,
          ownerEmail: true,
        },
      },
      match: {
        columns: {
          id: true,
          isActive: true,
          createdAt: true,
        },
      },
    },
    orderBy: (swaps, { desc }) => [desc(swaps.createdAt)],
    limit: sql.placeholder('limit'),
    offset: sql.placeholder('offset'),
  })
  .prepare('getSwappingLists');

const getCachedSwappingLists = cache(
  async ({ limit, offset }: { limit: number; offset: number }) => {
    return await preparedSwaps.execute({ limit: limit, offset: offset });
  },
  ['swappingLists'],
  {
    revalidate: 60 * 60, // 1 hour
    tags: ['swappingLists'],
  }
);

// type GetSwappingLists = Awaited<ReturnType<typeof getCachedSwappingLists>>;

export default async function SwapListTable() {
  const swappingLists = await getCachedSwappingLists({
    limit: 10,
    offset: 0,
  });
  return <SwapTable data={swappingLists} />;
}
