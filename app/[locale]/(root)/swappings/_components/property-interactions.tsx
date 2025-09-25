'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  // likePropertyAndMaybeMatch,
  // likePropertyAndMaybeMatchV1,
  // likePropertyAndMaybeMatchV2,
  // likePropertyAndMaybeMatchV3,
  // likePropertyAndMaybeMatchV4,
  // likePropertyAndMaybeMatchV5,
  // likePropertyAndMaybeMatchV6,
  // likePropertyAndMaybeMatchV7,
  likePropertyAndMaybeMatchV8,
} from '@/lib/interactions-actions';
import { cn } from '@/lib/utils';
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function PropertyInteractions({
  propertyId,
  iLikedThisProperty,
  totalLikes,
}: {
  propertyId: string;
  iLikedThisProperty: boolean;
  totalLikes: number;
}) {
  const [isLikePending, startLikeTransition] = useTransition();
  const path = usePathname();

  function handleLike() {
    startLikeTransition(async () => {
      const result = await likePropertyAndMaybeMatchV8({
        propertyId: propertyId,
        path,
      });
      console.log('Like result:', result);
      if (result.success) {
        toast.success(result.message, {
          duration: 15000,
          position: 'top-center',
        });
        return;
      } else {
        toast.error(result.message || 'Error liking property', {
          duration: 15000,
          position: 'top-center',
        });
        return;
      }
    });
  }

  return (
    <CardContent>
      <div
        className={
          'flex items-center justify-center gap-2 ring-muted-foreground ring-1 rounded-full px-3 py-0.5 text-xs font-semibold'
        }>
        <Button
          className={cn(
            iLikedThisProperty ? 'cursor-none' : 'cursor-pointer',
            isLikePending && 'cursor-progress',
            iLikedThisProperty && 'text-primary',
            'relative'
          )}
          size={'icon'}
          variant={'ghost'}
          onClick={handleLike}
          disabled={isLikePending || iLikedThisProperty}>
          <Badge className={'absolute top-0 right-0 px-1'}>
            {totalLikes === 99 ? '99+' : totalLikes}
          </Badge>
          {iLikedThisProperty ? (
            <ThumbsUp className={'size-4 fill-primary-foreground'} />
          ) : (
            <ThumbsDown className={'size-4'} />
          )}
        </Button>

        <Button size={'icon'} variant={'ghost'} disabled={isLikePending}>
          <Bookmark className={'size-4'} />
        </Button>
        <Button size={'icon'} variant={'ghost'} disabled={isLikePending}>
          <Share2 className={'size-4'} />
        </Button>
      </div>
    </CardContent>
  );
}
