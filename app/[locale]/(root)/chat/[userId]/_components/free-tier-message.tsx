import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function FreeTierMessage() {
  return (
    <div className='p-2 bg-muted-foreground/20 backdrop-blur-md text-center'>
      <p>
        You have reached the free tier message limit. Please
        <Link
          href={'/subscription'}
          className={buttonVariants({
            variant: 'link',
            size: 'sm',
            class: 'p-0',
          })}>
          upgrade
        </Link>
        to continue chatting.
      </p>
    </div>
  );
}
