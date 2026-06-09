import type { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';

export const metadata: Metadata = {
  title: 'Image to PDF',
  description: 'Free online image to PDF tool. Combine multiple images into PDF. Browser local processing, secure and fast.',
};

export default function EnImageToPdfPage() {
  return <ImageToPdfClient />;
}
