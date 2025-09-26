import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense } from 'react';
import RevalidateData from '../_components/revalidate-data';
import ConnectionsListTable from './_components/connections-list-table';
import ConnectionsTableRowLoader from './_components/connections-table-loader';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ConnectionsPage() {
  return (
    <div className={'px-8 space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Connections List</CardTitle>
          <CardDescription>
            Manage your connections lists here. Here you can check the
            registered connections lists, and take suitable actions against
            them.
          </CardDescription>

          <RevalidateData tagName='connections' type='page' />
        </CardHeader>

        <Suspense fallback={<ConnectionsTableRowLoader />}>
          <ConnectionsListTable />
        </Suspense>
      </Card>
    </div>
  );
}
