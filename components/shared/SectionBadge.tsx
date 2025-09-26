import { cn } from '@/lib/utils';

export default function SectionBadge(props: SectionBadgeProps) {
  return (
    <div
      className={cn(
        props.align === 'left' ? 'text-left' : '',
        props.align === 'right' ? 'text-right' : '',
        props.align === 'center' ? 'text-center' : ''
      )}>
      <span
        className={cn(
          props.className
            ? props.className
            : 'text-tertiary-50 bg-secondary-500',
          'text-xs sm:text-sm md:text-base px-10 py-2 rounded'
        )}>
        {props.children}
      </span>
    </div>
  );
}
