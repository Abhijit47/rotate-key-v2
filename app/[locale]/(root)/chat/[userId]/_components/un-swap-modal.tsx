import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useSwapUnswapContext } from '@/contexts/swap-unswap-context';
import FeedbackModal from './feedback-modal';

export default function UnSwapModal() {
  const { isOpenUnSwapModal, onToggleUnSwapModal } = useSwapUnswapContext();

  return (
    <Dialog open={isOpenUnSwapModal} onOpenChange={onToggleUnSwapModal}>
      <form>
        <DialogTrigger asChild>
          <Button variant='destructive' size={'sm'}>
            UnSwap
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Unswap a Property</DialogTitle>
            <DialogDescription>
              Why do you want to un-swap this property? Please provide a reason.
              We will review your request and take appropriate action.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className='grid gap-4'>
            <FeedbackModal />
          </div>
          <Separator />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
