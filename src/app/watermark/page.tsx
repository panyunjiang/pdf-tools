import type { Metadata } from 'next';
import WatermarkClient from './WatermarkClient';

export const metadata: Metadata = {
  title: 'PDF加水印',
  description: '免费在线PDF加水印工具，为PDF添加文字水印。浏览器本地处理，安全快速。',
};

export default function WatermarkPage() {
  return <WatermarkClient />;
}
