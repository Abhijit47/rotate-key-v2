import { Separator } from '@/components/ui/separator';
import { LazySwapRequestForm } from '.';
import NotMatchedWithPropertyHolder from './not-matched-with-property-holder';
import PropertyAuthorCard from './property-author-card';
import PropertyAuthorMessage from './property-author-message';

type SwappingRequestCardProps = {
  propertyId: string;
  ownerDetails: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    avatar: string | null;
  };
  isMatched: boolean;
  iLikedThisProperty: boolean;
  iSentConnectionRequest: boolean;
  sentRequest:
    | {
        status: 'pending' | 'approved' | 'declined' | 'completed';
        id: string;
        matchId: string | null;
        guests: number;
        startDate: string;
        endDate: string;
      }
    | undefined;
  isOwner: boolean;
  matchId: string | undefined;
};

export default function SwappingRequestCard(props: SwappingRequestCardProps) {
  const {
    ownerDetails,
    isMatched,
    propertyId,
    iLikedThisProperty,
    iSentConnectionRequest,
    sentRequest,
    isOwner,
    matchId,
  } = props;

  return (
    <div className={'space-y-4 flex-auto lg:flex-1 w-full'}>
      <PropertyAuthorCard ownerDetails={ownerDetails} />

      <Separator />

      {/* if this was my property */}
      {isOwner ? (
        <PropertyAuthorMessage />
      ) : !isMatched || !iLikedThisProperty ? (
        <NotMatchedWithPropertyHolder
          propertyId={propertyId}
          iLikedThisProperty={iLikedThisProperty}
        />
      ) : (
        <LazySwapRequestForm
          propertyId={propertyId}
          iSentConnectionRequest={iSentConnectionRequest}
          sentRequest={sentRequest}
          matchId={matchId}
        />
      )}

      {/* {!isMatched && !iLikedThisProperty ? (
        <NotMatchedWithPropertyHolder
          propertyId={propertyId}
          iLikedThisProperty={iLikedThisProperty}
        />
      ) : (
        <SwapRequestForm
          propertyId={propertyId}
          iSentConnectionRequest={iSentConnectionRequest}
          sentRequest={sentRequest}
        />
      )} */}
    </div>
  );
}
