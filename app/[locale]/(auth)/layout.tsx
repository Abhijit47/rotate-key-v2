import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rotate Key | Authentication',
  description:
    "Unlock the Door to Your Next Adventure with Rotate Keys. Rotate Keys is not just a platform; it's a community of like-minded individuals sharing the joy of exploration and discovery. Your dream house swap is just a click away.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={
        'bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 aspect-video dark:bg-gradient-to-b dark:from-primary-800 dark:via-primary-900 dark:to-primary-950'
      }>
      {children}
    </main>
  );
}
