import type { Metadata } from 'next';
import PdfToImageClient from './PdfToImageClient';

export const metadata: Metadata = {
  title: 'PDF转图片',
  description: '免费在线PDF转图片工具，将PDF页面导出为PNG/JPG。浏览器本地处理，安全快速。',
};

export default function PdfToImagePage() {
  return <PdfToImageClient />;
}
