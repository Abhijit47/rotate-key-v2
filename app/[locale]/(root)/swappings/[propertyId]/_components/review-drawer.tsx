import SectionWrapper from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import ReviewForm from './review-form';

export default function ReviewDrawer({ propertyId }: { propertyId: string }) {
  return (
    <section>
      <SectionWrapper className={'text-center'}>
        <Drawer defaultOpen={false}>
          <DrawerTrigger asChild>
            <Button>Leave a review</Button>
          </DrawerTrigger>

          <DrawerContent>
            <div className='mx-auto w-full max-w-sm'>
              <DrawerHeader>
                <DrawerTitle>Give your feedback on this property</DrawerTitle>
                <DrawerDescription>
                  We appreciate your feedback and look forward to hearing from
                  you.
                </DrawerDescription>
              </DrawerHeader>
              <div className='p-4 pb-0'>
                <ReviewForm propertyId={propertyId} />
              </div>
              <DrawerFooter>
                {/* <Button>Submit</Button> */}
                <DrawerClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </SectionWrapper>
    </section>
  );
}
