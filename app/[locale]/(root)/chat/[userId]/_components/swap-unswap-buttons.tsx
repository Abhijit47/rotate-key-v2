'use client';

import { Button } from '@/components/ui/button';
// import { requestSwap } from '@/lib/swap-actions';
import { RotateCcwKeyIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function SwapUnswapButtons({
  // eslint-disable-next-line
  matchId,
  // eslint-disable-next-line
  property1Id,
  // eslint-disable-next-line
  property2Id,
  // eslint-disable-next-line
  guestCount,
  // eslint-disable-next-line
  startDate,
  // eslint-disable-next-line
  endDate,
}: {
  matchId: string;
  property1Id: string;
  property2Id: string;
  guestCount: number;
  startDate: string;
  endDate: string;
}) {
  const [isSwapPending, startSwapTransition] = useTransition();
  const [isUnSwapPending, startUnSwapTransition] = useTransition();

  function handleSwap() {
    startSwapTransition(async () => {
      // simulate async action
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // await requestSwap({
      //   matchId,
      //   property1Id,
      //   property2Id,
      //   guestCount,
      //   startDate,
      //   endDate,
      // });
      toast.success('Swap requested successfully!');
    });
  }

  function handleUnSwap() {
    startUnSwapTransition(async () => {
      // simulate async action
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('UnSwap requested successfully!');
    });
  }

  return (
    <>
      <Button
        className={'w-full'}
        onClick={handleSwap}
        disabled={isSwapPending}>
        <RotateCcwKeyIcon className='size-6 rotate-y-180' />
        Swap
      </Button>
      <Button
        className={'w-full'}
        variant={'destructive'}
        onClick={handleUnSwap}
        disabled={isUnSwapPending}>
        <RotateCcwKeyIcon className='size-6' />
        UnSwap
      </Button>
    </>
  );
}
