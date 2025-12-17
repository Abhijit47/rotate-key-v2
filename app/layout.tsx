import { metaInfo } from '@/constants/meta-info';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
  keywords: metaInfo.keywords,
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
