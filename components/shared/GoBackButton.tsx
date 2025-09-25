import { LucideCircleChevronLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation'; 
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import SectionWrapper from './SectionWrapper';

export default function GoBackButton({
  whereToGo,
  postition,
}: {
  whereToGo?: string;
  postition?: 'top' | 'bottom' | 'right' | 'left' | undefined;
}) {
  return (
    <TooltipProvider>
      <SectionWrapper>
        <Tooltip defaultOpen={true}>
          <TooltipTrigger asChild>
            {/* <Button variant='outline'>Hover</Button> */}
            <div className={'size-6 sm:size-8'}>
              <Link href={`${whereToGo || '/'}`}>
                <LucideCircleChevronLeft
                  className={'stroke-primary-500 w-full h-full'}
                />
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent side={postition || 'top'}>
            <p>Go Back</p>
          </TooltipContent>
        </Tooltip>
      </SectionWrapper>
    </TooltipProvider>
  );
}
