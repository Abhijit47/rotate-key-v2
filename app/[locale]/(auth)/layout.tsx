import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rotate Key | Authentication',
  description:
    "Unlock the Door to Your Next Adventure with Rotate Keys. Rotate Keys is not just a platform; it's a community of like-minded individuals sharing the joy of exploration and discovery. Your dream house swap is just a click away.",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
