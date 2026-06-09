import type { Metadata } from 'next';
import CompressClient from './CompressClient';

export const metadata: Metadata = {
  title: 'PDF压缩',
  description: '免费在线PDF压缩工具，减小PDF文件体积。浏览器本地处理，安全快速。',
};

export default function CompressPage() {
  return <CompressClient />;
}
