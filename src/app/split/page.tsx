import type { Metadata } from 'next';
import SplitClient from './SplitClient';

export const metadata: Metadata = {
  title: 'PDF拆分',
  description: '免费在线PDF拆分工具，按页码范围提取PDF页面。浏览器本地处理，安全快速。',
};

export default function SplitPage() {
  return <SplitClient />;
}
