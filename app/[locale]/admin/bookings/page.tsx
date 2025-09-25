import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense } from 'react';
import RevalidateData from '../_components/revalidate-data';
import BookingTableRowLoader from './_components/booking-table-loader';
import BookingsListTable from './_components/bookings-list-table';

export default function BookingsPage() {
  return (
    <div className={'px-8 space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Booking List</CardTitle>
          <CardDescription>
            Manage your bookings lists here. Here you can check the registered
            bookings lists, and take suitable actions against them.
          </CardDescription>

          <RevalidateData tagName='bookings' type='page' />
        </CardHeader>

        <Suspense fallback={<BookingTableRowLoader />}>
          <BookingsListTable />
        </Suspense>
      </Card>
    </div>
  );
}
