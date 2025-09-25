'use client';

import { useObserver } from '@/contexts/observer-context';
import { cn } from '@/lib/utils';

type SectionContextWrapperProps = React.ComponentProps<'section'> &
  React.PropsWithChildren<object>;

export default function SectionContextWrapper(
  props: SectionContextWrapperProps
) {
  const { ref } = useObserver();

  return (
    <section
      ref={ref}
      className={
        cn(
          props.className
            ? props.className
            : 'relative bg-gradient-to-bl from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-950'
        )
        // props.className
        //   ? props.className
        //   : 'relative bg-gradient-to-b from-primary-50 to-primary-100'
      }>
      {props.children}
    </section>
  );
}

// export default function HeroSectionWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { ref } = useObserver();
//   return (
//     <section
//       ref={ref}
//       className='relative bg-gradient-to-b from-primary-50 to-primary-100'>
//       {children}
//     </section>
//   );
// }
