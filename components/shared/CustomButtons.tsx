'use client';

import { cn } from '@/lib/utils';
import { Heart, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button, buttonVariants } from '../ui/button';

export function CreatePropertyButton() {}

export function LikeButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending} className={'hover:cursor-not-allowed'}>
          <Loader2 className={'animate-spin'} />
        </Button>
      ) : (
        <Button className={'hover:cursor-pointer'}>Like</Button>
      )}
    </>
  );
}

export function DislikeButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending} className={'hover:cursor-not-allowed'}>
          <Loader2 className={'animate-spin'} />
        </Button>
      ) : (
        <Button className={'hover:cursor-pointer'}>Dislike</Button>
      )}
    </>
  );
}

export function SaveButton({ isSaved }: { isSaved: boolean }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending} className={'hover:cursor-not-allowed'}>
          <Loader2 className={'animate-spin'} />
        </Button>
      ) : (
        <Button
          className={cn(
            buttonVariants({
              variant: isSaved ? 'default' : 'outline',
              className: isSaved ? 'text-tertiary-500' : 'text-primary-500',
              size: 'icon',
            }),
            'hover:cursor-pointer'
          )}>
          <Heart className={'size-4 animate-pulse'} />
          <span className={'sr-only'}>Save</span>
        </Button>
      )}
    </>
  );
}

export function ShareButton() {
  const { pending } = useFormStatus();

  return <>{pending ? <></> : <></>}</>;
}
