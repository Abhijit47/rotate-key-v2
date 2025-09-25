import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useSwapUnswapContext } from '@/contexts/swap-unswap-context';
import SwapRequestForm from './swap-request-form';

export default function SwapModal() {
  const { isLoading, isOpenSwapModal, onToggleSwapModal } =
    useSwapUnswapContext();

  return (
    <Dialog open={isOpenSwapModal} onOpenChange={onToggleSwapModal}>
      <form>
        <DialogTrigger asChild>
          <Button disabled={isLoading} variant='outline' size={'sm'}>
            Swap
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[576px]'>
          <DialogHeader>
            <DialogTitle>Swap Property</DialogTitle>
            <DialogDescription>
              Select a property to swap and specify the move-in and move-out
              dates.
            </DialogDescription>
          </DialogHeader>

          <Separator />
          <SwapRequestForm />
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Swap Now</Button>
          </DialogFooter> */}
        </DialogContent>
      </form>
    </Dialog>
  );
}
