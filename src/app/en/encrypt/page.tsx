import type { Metadata } from 'next';
import EncryptClient from './EncryptClient';

export const metadata: Metadata = {
  title: 'Encrypt PDF',
  description: 'Free online PDF encryption tool. Add password protection to PDF. Browser local processing, secure and fast.',
};

export default function EnEncryptPage() {
  return <EncryptClient />;
}
