import type { Metadata } from 'next';
import CompressClient from './CompressClient';

export const metadata: Metadata = {
  title: 'Compress PDF',
  description: 'Free online PDF compression tool. Reduce PDF file size. Browser local processing, secure and fast.',
};

export default function EnCompressPage() {
  return <CompressClient />;
}
