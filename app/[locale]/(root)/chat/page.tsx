import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { getUserMatchesV2 } from '@/lib/user-matches';
import {
  CalendarClock,
  CheckCircle2,
  LockKeyholeIcon,
  MessageCircleMore,
  Video,
  X,
} from 'lucide-react';
import { Suspense } from 'react';
// import TestSwpping from './[userId]/_components/test-swpping';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ChatPage() {
  return (
    <div className={'container mx-auto max-w-7xl px-4 2xl:px-0 py-8 space-y-8'}>
      <Card className={'gap-4 py-4'}>
        <CardHeader>
          <CardTitle>
            <h1 className='text-2xl font-bold flex items-center gap-2'>
              Continue your chat ...{' '}
              <span>
                <MessageCircleMore className='size-6' />
              </span>
            </h1>
          </CardTitle>
          <CardDescription>
            <p>Select a match to start chatting with the matched user.</p>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* <TestSwpping /> */}

      <Suspense fallback={<div>Loading matches...</div>}>
        <MyMatchedUsers />
      </Suspense>
    </div>
  );
}

async function MyMatchedUsers() {
  const { data, currentUserId } = await getUserMatchesV2();
  return (
    <div>
      {data.length === 0 ? (
        <div className={'container mx-auto max-w-7xl px-4 2xl:px-0 py-8'}>
          <Card>
            <CardDescription>
              <p className='text-center'>
                No matches found. Please like some properties to see matches.
              </p>
            </CardDescription>
          </Card>
        </div>
      ) : (
        <>
          {data.map((match) => {
            const oppositeUserfullName =
              match.user1Id === currentUserId
                ? match.user2.fullName
                : match.user1.fullName;

            const myName =
              match.user1Id === currentUserId
                ? match.user1.fullName
                : match.user2.fullName;

            const oppositeUserId =
              match.user1Id === currentUserId ? match.user2.id : match.user1.id;

            return (
              <Card key={match.id} className={'gap-4 py-4'}>
                <CardHeader>
                  <CardTitle>
                    <h2>
                      You, ({myName}) connect with {oppositeUserfullName}
                    </h2>
                  </CardTitle>
                  <CardDescription className={'flex items-center gap-2'}>
                    <p className={'flex items-center gap-2'}>
                      <CalendarClock className={'size-4'} /> Matched on:{' '}
                      {new Date(match.createdAt).toLocaleDateString()}
                    </p>

                    {match.isActive ? (
                      <Badge>
                        <CheckCircle2 className={'size-4'} />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant={'destructive'}>
                        <X className={'size-4'} />
                        InActive
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <Separator />

                <CardContent>
                  <p
                    className={
                      'text-sm font-semibold underline underline-offset-2'
                    }>
                    Owner Details:
                  </p>
                  <CardDescription>
                    {/* Detect the opposite user not currentUser */}

                    {match.user1Id === currentUserId ? (
                      <>
                        <div>
                          <p>{match.user2.fullName}</p>
                          <p>{match.user2.username}</p>
                          <p>{match.user2.email}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p>{match.user1.fullName}</p>
                          <p>{match.user1.username}</p>
                          <p>{match.user1.email}</p>
                        </div>
                      </>
                    )}
                  </CardDescription>
                </CardContent>

                <Separator />

                <CardFooter>
                  <CardAction className={'w-full space-y-4 relative'}>
                    {!match.iSentConnectionRequest ? (
                      <div
                        className={
                          'bg-primary/30 opacity-75 z-10 w-full h-full absolute top-0 left-0 rounded-lg'
                        }>
                        <LockKeyholeIcon className='size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-accent-foreground' />
                        <span className={'sr-only'}>Locked</span>
                      </div>
                    ) : null}
                    <Link
                      href={`${
                        !match.iSentConnectionRequest
                          ? '#'
                          : `/chat/${oppositeUserId}`
                      }`}
                      className={buttonVariants({
                        variant: 'default',
                        className: 'w-full',
                      })}>
                      <MessageCircleMore className={'size-4'} /> Message
                    </Link>
                    <Link
                      href={`${
                        !match.iSentConnectionRequest
                          ? '#'
                          : `/chat/${oppositeUserId}`
                      }`}
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full',
                      })}>
                      <Video className={'size-4'} /> Request a Virtual Tour
                    </Link>
                  </CardAction>
                </CardFooter>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
}
