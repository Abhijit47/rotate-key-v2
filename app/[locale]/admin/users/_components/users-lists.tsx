import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/drizzle/db';
import { formatDistance } from 'date-fns';
import { sql } from 'drizzle-orm';
import { unstable_cache as cache } from 'next/cache';
import Image from 'next/image';
import UserRoleUpdate from './user-role-update';

const preparedUsers = db.query.users
  .findMany({
    limit: sql.placeholder('limit'),
    offset: sql.placeholder('offset'),
    orderBy: (users, { desc }) => [desc(users.createdAt)],
    columns: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      avatar: true,
      // gender: true,
      // attchedImages: true,
      // attchedFiles: true,
      // messagesSent: true,
      // messagesReceived: true,
      // callsDone: true,
      // callsReceived: true,
    },
    with: {
      userInfo: {
        columns: {
          location: true,
        },
      },
    },
  })
  .prepare('getUsers');

const getCachedUsers = cache(
  async ({ limit, offset }: { limit: number; offset: number }) => {
    return await preparedUsers.execute({ limit: limit, offset: offset });
  },
  ['users'],
  {
    revalidate: 60 * 60, // 1 hour
    tags: ['users'],
  }
);

export default async function UsersList() {
  // await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate a delay
  const users = await getCachedUsers({ limit: 20, offset: 0 });

  return (
    <CardContent>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {users.map((user) => (
          <Card
            key={user.id}
            className='py-4 px-0 border-2 border-primary dark:border-primary-foreground gap-2'>
            <CardHeader>
              <CardTitle>
                <h3 className='text-lg font-semibold'>{user.fullName}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className={'grid grid-cols-6 gap-4'}>
              <div className={'col-span-1 aspect-square'}>
                <Image
                  src={user.avatar ?? 'https://placehold.co/400x400.png'}
                  alt={user.fullName}
                  width={300}
                  height={300}
                  className={'w-full h-full object-cover rounded-full'}
                />
              </div>
              <CardDescription className={'col-span-5'}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                  <div className={'space-y-1'}>
                    <p>Email: {user.email}</p>
                    {/* <p>Gender: {user.gender}</p> */}
                    <p>
                      Role: <Badge className={'capitalize'}>{user.role}</Badge>
                    </p>
                    <p>
                      Signed In:{' '}
                      <span className={'font-medium'}>
                        {formatDistance(new Date(user.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </p>

                    <div className={'w-full mt-6'}>
                      <UserRoleUpdate role={user.role} />
                    </div>
                  </div>
                  <div className={'space-y-1'}>
                    <p>Attach Files: 0</p>
                    <p>Attach Images: 0</p>
                    <p>Calls done: 0</p>
                    <p>Calls received: 0</p>
                    <p>Message sent: 0</p>
                    <p>Message received: 0</p>
                    <p>Docs uploaded: 0</p>
                  </div>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  );
}
