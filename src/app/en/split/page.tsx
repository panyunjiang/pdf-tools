import type { Metadata } from 'next';
import SplitClient from './SplitClient';

export const metadata: Metadata = {
  title: 'Split PDF',
  description: 'Free online PDF split tool. Extract pages by range from PDF. Browser local processing, secure and fast.',
};

export default function EnSplitPage() {
  return <SplitClient />;
}
