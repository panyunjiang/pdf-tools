import type { Metadata } from 'next';
import RotateClient from './RotateClient';

export const metadata: Metadata = {
  title: 'Rotate PDF',
  description: 'Free online PDF rotation tool. Rotate PDF page orientation. Browser local processing, secure and fast.',
};

export default function EnRotatePage() {
  return <RotateClient />;
}
