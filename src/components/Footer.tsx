'use client';

import { usePathname } from 'next/navigation';
import { FileText } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const lang: 'zh' | 'en' = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-700">{lang === 'en' ? 'PDF Tools' : 'PDF工具箱'}</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {lang === 'en' ? 'PDF Tools - All processing happens in your browser' : 'PDF工具箱 - 所有PDF处理均在浏览器端完成，安全快速'}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>pdf.aiv.yn.cn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
