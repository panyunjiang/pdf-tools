import type { Metadata } from 'next';
import EncryptClient from './EncryptClient';

export const metadata: Metadata = {
  title: 'PDF加密码',
  description: '免费在线PDF加密工具，为PDF添加密码保护。浏览器本地处理，安全快速。',
};

export default function EncryptPage() {
  return <EncryptClient />;
}
