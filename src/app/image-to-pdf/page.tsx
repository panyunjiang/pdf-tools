import type { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';

export const metadata: Metadata = {
  title: '图片转PDF',
  description: '免费在线图片转PDF工具，将多张图片合并为PDF文档。浏览器本地处理，安全快速。',
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
