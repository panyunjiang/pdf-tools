import type { Metadata } from 'next';
import WatermarkClient from './WatermarkClient';

export const metadata: Metadata = {
  title: 'Add Watermark',
  description: 'Free online PDF watermark tool. Add text watermark to PDF. Browser local processing, secure and fast.',
};

export default function EnWatermarkPage() {
  return <WatermarkClient />;
}
