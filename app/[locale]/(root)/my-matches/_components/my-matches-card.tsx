import { getUserMatchesV2 } from '@/lib/user-matches';

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
import {
  CalendarClock,
  CheckCircle2,
  IdCard,
  LockKeyholeIcon,
  MessageCircleMore,
  Video,
  X,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default async function MyMatchesCard() {
  // await new Promise((resolve) => setTimeout(resolve, 20000));
  const { success, data, currentUserId } = await getUserMatchesV2();

  if (!success || data.length === 0 || !currentUserId) {
    return (
      <div>
        <p className='text-center'>
          No matches found. Please like some properties to see matches.
        </p>
      </div>
    );
  }

  return (
    <>
      <CardContent className={'flex w-full justify-center'}>
        <CardDescription className={'text-center'}>
          <p>
            You have <Badge>{data.length}</Badge> Matches
          </p>
        </CardDescription>
      </CardContent>

      <CardContent className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
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
                    You, ({myName}) matched with {oppositeUserfullName}
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
                  {/* <SwapUnswapButtons
                       matchId={match.id}
                       property1Id={match.property1.id}
                       property2Id={match.property2.id}
                       guestCount={1}
                       startDate={new Date().toISOString()}
                       endDate={new Date(
                         Date.now() + 7 * 24 * 60 * 60 * 1000
                       ).toISOString()}
                     /> */}

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
                        : `/user-profile/${oppositeUserId}`
                    }`}
                    className={buttonVariants({
                      variant: 'secondary',
                      className: 'w-full',
                    })}>
                    <IdCard className={'size-4'} /> View Profile
                  </Link>
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
      </CardContent>
    </>
  );
}
