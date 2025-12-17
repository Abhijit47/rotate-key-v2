import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'My Profile',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={
        'bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 dark:bg-gradient-to-b dark:from-primary-800 dark:via-primary-900 dark:to-primary-950'
      }>
      {children}
    </section>
  );
}
