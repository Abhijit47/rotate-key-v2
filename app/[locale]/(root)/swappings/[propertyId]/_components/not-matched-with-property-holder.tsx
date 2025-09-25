import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PropertyInteractions from '../../_components/property-interactions';

export default function NotMatchedWithPropertyHolder({
  propertyId,
  iLikedThisProperty,
}: {
  propertyId: string;
  iLikedThisProperty: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You are not matched with this property owner yet.</CardTitle>
        <CardDescription>
          To send a swap request, you need to be matched with the property
          holder first. Please explore other properties and initiate matches to
          unlock swap requests.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardFooter>
        <CardAction className={'w-full space-y-4'}>
          <PropertyInteractions
            propertyId={propertyId}
            iLikedThisProperty={iLikedThisProperty}
            totalLikes={0}
          />

          <Button asChild className={'w-full'} variant={'outline'}>
            <Link href={'/swappings'}>
              <ArrowLeftCircle className={'size-4'} /> Back to Listings
            </Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
