import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function PropertyAuthorCard({
  ownerDetails,
}: {
  ownerDetails: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    avatar: string | null;
  };
}) {
  return (
    <Card className={'gap-4 py-4'}>
      <div className={'flex items-center gap-4 px-4'}>
        <div className={'size-16'}>
          <Image
            src={ownerDetails.avatar!}
            alt={ownerDetails.username}
            height={40}
            width={40}
            className={
              'w-full h-full object-cover rounded-full overflow-hidden'
            }
          />
        </div>
        <Separator orientation='vertical' className='h-16!' />
        <CardHeader className={'px-0 w-full'}>
          <CardTitle>{ownerDetails.fullName}</CardTitle>
          <CardDescription>{ownerDetails.username}</CardDescription>
          <CardDescription>{ownerDetails.email}</CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
}
