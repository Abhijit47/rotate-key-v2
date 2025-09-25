import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useSwapUnswapContext } from '@/contexts/swap-unswap-context';
import FeedbackForm from './feedback-form';

export default function FeedbackModal() {
  const { isFeedbackModalOpen, onToggleFeedbackModal } = useSwapUnswapContext();

  return (
    <Dialog open={isFeedbackModalOpen} onOpenChange={onToggleFeedbackModal}>
      <DialogTrigger asChild>
        <Button variant='outline' className={'w-full'}>
          Leave Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Provide a Feedback</DialogTitle>
          <DialogDescription>
            Please fill out the form below to provide your feedback. Your input
            is valuable to us.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-96 w-full pr-4 pb-4'>
          <FeedbackForm />
        </ScrollArea>

        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit'>Submit you review</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
