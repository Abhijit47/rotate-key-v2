import { cn } from '@/lib/utils';

export default function SectionWrapper(props: SectionWrapperProps) {
  return (
    <div
      className={cn(
        props.className ? props.className : '',
        'max-w-[85em] mx-auto px-4 sm:px-6 lg:px-8'
      )}>
      {props.children}
    </div>
  );
}
