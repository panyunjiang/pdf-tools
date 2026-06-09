import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PDF工具箱 - 免费在线PDF处理工具',
    template: '%s | PDF工具箱',
  },
  description:
    '免费在线PDF工具箱，支持PDF合并、拆分、压缩、转图片、加水印、加密等功能。所有处理在浏览器端完成，安全快速，无需上传服务器。',
  keywords: ['PDF工具', 'PDF合并', 'PDF拆分', 'PDF压缩', 'PDF转图片', '在线PDF处理', '免费PDF工具'],
  openGraph: {
    title: 'PDF工具箱 - 免费在线PDF处理工具',
    description:
      '免费在线PDF工具箱，支持PDF合并、拆分、压缩、转图片、加水印、加密等功能。所有处理在浏览器端完成，安全快速。',
    url: 'https://pdf.aiv.yn.cn',
    siteName: 'PDF工具箱',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
