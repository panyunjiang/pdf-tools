'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

const navLinksZh = [
  { href: '/merge', label: '合并' },
  { href: '/split', label: '拆分' },
  { href: '/compress', label: '压缩' },
  { href: '/pdf-to-image', label: '转图片' },
  { href: '/image-to-pdf', label: '图片转PDF' },
  { href: '/watermark', label: '加水印' },
  { href: '/encrypt', label: '加密码' },
  { href: '/rotate', label: '旋转' },
];

const navLinksEn = [
  { href: '/en/merge', label: 'Merge' },
  { href: '/en/split', label: 'Split' },
  { href: '/en/compress', label: 'Compress' },
  { href: '/en/pdf-to-image', label: 'PDF to Image' },
  { href: '/en/image-to-pdf', label: 'Image to PDF' },
  { href: '/en/watermark', label: 'Watermark' },
  { href: '/en/encrypt', label: 'Encrypt' },
  { href: '/en/rotate', label: 'Rotate' },
];

export default function Navbar() {
  const pathname = usePathname();
  const lang: 'zh' | 'en' = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
  const [open, setOpen] = useState(false);
  const navLinks = lang === 'en' ? navLinksEn : navLinksZh;
  const homeHref = lang === 'en' ? '/en' : '/';
  const switchHref = lang === 'en' ? '/' : '/en';
  const switchLabel = lang === 'en' ? '中文' : 'EN';

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={homeHref} className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-gradient-primary">{lang === 'en' ? 'PDF Tools' : 'PDF工具箱'}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={switchHref}
              className="ml-2 px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              {switchLabel}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={switchHref}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              onClick={() => setOpen(false)}
            >
              <Globe className="w-4 h-4 inline mr-1" />
              {switchLabel}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
