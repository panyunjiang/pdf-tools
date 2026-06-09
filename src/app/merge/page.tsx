import type { Metadata } from 'next';
import MergeClient from './MergeClient';

export const metadata: Metadata = {
  title: 'PDF合并',
  description: '免费在线PDF合并工具，将多个PDF文件合并为一个。浏览器本地处理，安全快速。',
  openGraph: {
    title: 'PDF合并 - PDF工具箱',
    description: '免费在线PDF合并工具，将多个PDF文件合并为一个。浏览器本地处理，安全快速。',
  },
};

export default function MergePage() {
  return <MergeClient />;
}
