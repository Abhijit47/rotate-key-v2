// import { ChartAreaInteractive } from '@/components/chart-area-interactive';
// import { DataTable } from '@/components/data-table';
// import { SectionCards } from '@/components/section-cards';

import { Suspense } from 'react';
import { ChartAreaInteractive } from './_components/chart-area-interactive';
import { DataTable } from './_components/data-table';
// import { SectionCards } from './_components/section-cards';
import { protectByRole } from '@/lib/roles';
import StatsCard from './_components/stats-card';
import StatsCardLoader from './_components/stats-card-loader';
import data from './data.json' assert { type: 'json' };

export default async function Page() {
  // Protect the page from users who are not admins
  await protectByRole('admin');

  return (
    <div className={'space-y-8'}>
      {/* <SectionCards /> */}
      <Suspense fallback={<StatsCardLoader />}>
        <StatsCard />
      </Suspense>
      <div className='px-4 lg:px-6'>
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}
