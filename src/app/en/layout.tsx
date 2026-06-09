import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'PDF Tools - Free Online PDF Processing',
    template: '%s | PDF Tools',
  },
  description:
    'Free online PDF tools supporting merge, split, compress, PDF to image, watermark, encryption and more. All processing happens in your browser - secure, fast, and no server upload required.',
  keywords: ['PDF tools', 'PDF merge', 'PDF split', 'PDF compress', 'PDF to image', 'online PDF', 'free PDF tools'],
  openGraph: {
    title: 'PDF Tools - Free Online PDF Processing',
    description:
      'Free online PDF tools supporting merge, split, compress, PDF to image, watermark, encryption and more. All processing happens in your browser.',
    url: 'https://pdf.aiv.yn.cn/en',
    siteName: 'PDF Tools',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
