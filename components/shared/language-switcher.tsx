'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Locale, routing } from '@/i18n/routing';
import { Globe2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  // const [locale, setLocale] = React.useState('en');
  const [isPending, startTransition] = useTransition();

  const params = useParams();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale as Locale }
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Globe2 className={'size-4'} />
          <span className={'sr-only'}>Select a locale</span>
          <span className='ml-1 text-muted-foreground uppercase'>{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-28'>
        <DropdownMenuLabel>Select a locale</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale} onValueChange={onSelectChange}>
          {routing.locales.map((cur) => (
            <DropdownMenuRadioItem
              key={cur}
              value={cur}
              className={'uppercase'}
              disabled={isPending}>
              {cur}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/*
As per docs
https://next-intl.dev/docs/environments/server-client-components

import {useLocale, useTranslations} from 'next-intl';
import {locales} from '@/config';
 
// A Client Component that registers an event listener for
// the `change` event of the select, uses `useRouter`
// to change the locale and uses `useTransition` to display
// a loading state during the transition.
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
 
export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
 
  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
*/
