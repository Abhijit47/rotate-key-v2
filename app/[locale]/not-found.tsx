'use client';

// import { useTranslations } from 'next-intl';
// import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

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
    <main className={'flex flex-col gap-4 items-center justify-center h-dvh'}>
      <h1 className={'text-2xl text-primary'}>404 - Page Not Found</h1>
      <p className={'text-xl text-primary'}>
        The page you are looking for does not exist.
      </p>
      <Link
        href='/'
        className={'text-white px-6 py-2 rounded-lg bg-indigo-600'}>
        Go back home
      </Link>
    </main>
  );
}
