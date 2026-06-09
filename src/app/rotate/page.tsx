import type { Metadata } from 'next';
import RotateClient from './RotateClient';

export const metadata: Metadata = {
  title: 'PDF旋转',
  description: '免费在线PDF旋转工具，旋转PDF页面方向。浏览器本地处理，安全快速。',
};

export default function RotatePage() {
  return <RotateClient />;
}
