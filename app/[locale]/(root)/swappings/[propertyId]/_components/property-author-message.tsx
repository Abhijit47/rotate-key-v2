import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export default function PropertyAuthorMessage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You cannot swap with your own property</CardTitle>
        <CardDescription>You are the owner of this property.</CardDescription>
      </CardHeader>
      <CardFooter>
        <CardAction className={'w-full'}>
          <Button asChild>
            <Link
              href={'/my-properties'}
              className={cn(
                buttonVariants({ variant: 'outline', className: 'w-full' })
              )}>
              Go Back
            </Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
