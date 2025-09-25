import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense } from 'react';
import RevalidateData from '../_components/revalidate-data';
import SwapListTable from './_components/swap-list-table';
import SwapTableRowLoader from './_components/swap-table-loader';

export default function SwappingListsPage() {
  return (
    <div className={'px-8 space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Swapping Listing</CardTitle>
          <CardDescription>
            Manage your swapping listings here. Here you can check the
            registered swapping listings, and take suitable actions against
            them.
          </CardDescription>

          <RevalidateData tagName='swappingLists' type='page' />
        </CardHeader>
        {/* <DataTable data={data} /> */}

        <Suspense fallback={<SwapTableRowLoader />}>
          <SwapListTable />
        </Suspense>
      </Card>
    </div>
  );
}
