import COMING_SOON_IMG from '@/public/coming-soon.svg';
import Image from 'next/image';

import { Locale, routing } from '@/i18n/routing';
import { Metadata, ResolvingMetadata } from 'next';
type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const metaParam = await params;
  console.log('metaParam', metaParam);
  // console.log('parent', await parent);

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: 'Privacy Policy - RotateKey',
    description: 'Privacy Policy page of RotateKey',
    //
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export function generateStaticParams() {
  // return routing.locales.map((locale) => ({ locale }));
  return routing.locales.slice(0, 1).map((locale) => ({ locale }));
}

export default function PrivacyPolicyPage() {
  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <Image
        src={COMING_SOON_IMG}
        alt='Coming Soon'
        width={2122}
        height={2122}
        className={'w-full h-full object-contain'}
        priority
        placeholder='blur'
        blurDataURL={COMING_SOON_IMG.src}
      />
    </div>
  );
}
