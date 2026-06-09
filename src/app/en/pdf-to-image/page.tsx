import type { Metadata } from 'next';
import PdfToImageClient from './PdfToImageClient';

export const metadata: Metadata = {
  title: 'PDF to Image',
  description: 'Free online PDF to image tool. Export PDF pages as PNG/JPG. Browser local processing, secure and fast.',
};

export default function EnPdfToImagePage() {
  return <PdfToImageClient />;
}
