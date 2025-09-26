import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Suspense } from 'react';
import RevalidateData from '../_components/revalidate-data';
import UserListLoader from './_components/user-list-loader';
import UsersList from './_components/users-lists';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function UsersPage() {
  return (
    <div className={'px-8 space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your users here. Here you can check the registered users, and
            take suitable actions against them.
          </CardDescription>

          <RevalidateData tagName='users' type='page' />
        </CardHeader>

        <Suspense fallback={<UserListLoader />}>
          <UsersList />
        </Suspense>
      </Card>
    </div>
  );
}
