import { metaInfo } from '@/constants/meta-info';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rotatekey - Smart Real Estate Technology Platform',
    short_name: 'Rotatekey',
    description: metaInfo.description!,
    start_url: '/',
    display: 'standalone',
    background_color: '#ddfdec',
    theme_color: '#09a350',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
