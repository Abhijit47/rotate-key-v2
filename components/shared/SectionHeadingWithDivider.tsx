import { cn } from '@/lib/utils';

export default function SectionHeadingWithDivider(
  props: SectionHeadingWithDividerProps
) {
  return (
    <div className={'grid grid-cols-3 items-center'}>
      <div className={'col-span-3 lg:hidden 2xl:block xl:col-span-1 my-4'}>
        <div
          className={cn(
            props.dividerColor ? props.dividerColor : 'bg-secondary-700',
            'h-px max-w-64 mx-auto'
          )}></div>
      </div>
      <h2
        className={cn(
          props.className ? props.className : 'text-secondary-700',
          'text-center col-span-3 2xl:col-span-1 text-xl xs:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium xs:font-semibold lg:font-bold'
        )}>
        {props.children}
      </h2>
      <div className={'col-span-3 lg:hidden 2xl:block xl:col-span-1 my-4'}>
        <div
          className={cn(
            props.dividerColor ? props.dividerColor : 'bg-secondary-700',
            'h-px max-w-64 mx-auto'
          )}></div>
      </div>
    </div>
  );
}
