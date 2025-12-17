// import UserDiscountBasedOnLocation from '@/components/shared/user-discount-based-on-location';
import { Toaster } from '@/components/ui/sonner';
import { metaInfo } from '@/constants/meta-info';
import { routing } from '@/i18n/routing';
import AuthProvider from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Baumans, Freehand, Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const baumans = Baumans({
  variable: '--font-baumans',
  subsets: ['latin'],
  weight: ['400'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const freehand = Freehand({
  variable: '--font-freehand',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  // title: metaInfo.title,
  title: { default: 'Home', template: `%s | ${metaInfo.title}` },
  // description: metaInfo.description,
  // keywords: metaInfo.keywords,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load locale messages
  // const messages = (await import(`@/locales/${locale}.json`)).default;

  // Enable static rendering
  setRequestLocale(locale);

  // return (
  //   <html lang={locale} suppressHydrationWarning>
  //     <body
  //       className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  //       <NextIntlClientProvider>
  //         <ThemeProvider
  //           attribute='class'
  //           defaultTheme='system'
  //           enableSystem
  //           disableTransitionOnChange>
  //           {children}
  //           <Toaster richColors closeButton position='top-center' />
  //         </ThemeProvider>
  //       </NextIntlClientProvider>
  //     </body>
  //   </html>
  // );
  return (
    <NextIntlClientProvider>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={`${poppins.variable} ${baumans.variable} ${freehand.variable} antialiased relative`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            <AuthProvider>
              <NuqsAdapter>
                {/*<UserDiscountBasedOnLocation />*/}
                {children}
              </NuqsAdapter>
              <Toaster richColors closeButton />
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
