'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// import { useTranslations } from 'next-intl';
// import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { IconAlertTriangle } from '@tabler/icons-react';

// export default function NotFound() {
//   const t = useTranslations('NotFoundPage');

//   // console.log(t('title'));

//   return (
//     <main className={'flex flex-col gap-4 items-center justify-center h-dvh'}>
//       <h1 className={'text-2xl text-primary'}>{t('title')}</h1>
//       <p className={'text-xl text-primary'}>{t('description')}</p>
//       <Link
//         href='/'
//         className={'text-white px-6 py-2 rounded-lg bg-indigo-600'}>
//         {t('href')}
//       </Link>
//     </main>
//   );
// }

export default function NotFound() {
  return (
    <main
      className={
        'flex items-center justify-center h-dvh bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 aspect-video dark:bg-gradient-to-b dark:from-primary-800 dark:via-primary-900 dark:to-primary-950 w-full'
      }>
      <Card className={'w-full max-w-md mx-4'}>
        <CardHeader>
          <CardTitle className={'text-center space-y-2'}>
            <span className={'flex items-center justify-center'}>
              <IconAlertTriangle
                className={'size-6 md:size-8 lg:size-12 stroke-destructive'}
              />
            </span>
            <h1 className={'text-2xl text-primary'}>404 - Page Not Found</h1>
          </CardTitle>
          <CardDescription>
            <p className={'text-md text-muted-foreground text-center'}>
              The page you are looking for does not exist.
            </p>
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardFooter>
          <CardAction className={'w-full'}>
            <Link
              href='/'
              className={cn(
                buttonVariants({ variant: 'default', className: 'w-full' })
              )}>
              Go back home
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </main>
  );
}
