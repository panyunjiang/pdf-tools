import type { Metadata } from 'next';
import MergeClient from './MergeClient';

export const metadata: Metadata = {
  title: 'Merge PDF',
  description: 'Free online PDF merge tool. Combine multiple PDF files into one. Browser local processing, secure and fast.',
};

export default function EnMergePage() {
  return <MergeClient />;
}
