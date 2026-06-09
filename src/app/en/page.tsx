import Link from 'next/link';
import {
  Merge,
  Scissors,
  Minimize2,
  Image,
  ImageIcon,
  Droplets,
  Lock,
  RotateCw,
  Shield,
  Zap,
  Globe,
} from 'lucide-react';

const tools = [
  {
    href: '/en/merge',
    icon: Merge,
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one',
    color: 'from-violet-500 to-purple-600',
  },
  {
    href: '/en/split',
    icon: Scissors,
    title: 'Split PDF',
    description: 'Extract pages by range from PDF',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    href: '/en/compress',
    icon: Minimize2,
    title: 'Compress PDF',
    description: 'Reduce PDF file size',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    href: '/en/pdf-to-image',
    icon: Image,
    title: 'PDF to Image',
    description: 'Export PDF pages as PNG/JPG',
    color: 'from-orange-500 to-amber-500',
  },
  {
    href: '/en/image-to-pdf',
    icon: ImageIcon,
    title: 'Image to PDF',
    description: 'Convert images to PDF document',
    color: 'from-pink-500 to-rose-500',
  },
  {
    href: '/en/watermark',
    icon: Droplets,
    title: 'Add Watermark',
    description: 'Add text or image watermark to PDF',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    href: '/en/encrypt',
    icon: Lock,
    title: 'Encrypt PDF',
    description: 'Password protect your PDF',
    color: 'from-red-500 to-pink-500',
  },
  {
    href: '/en/rotate',
    icon: RotateCw,
    title: 'Rotate PDF',
    description: 'Rotate PDF page orientation',
    color: 'from-sky-500 to-blue-500',
  },
];

export default function EnHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Free Online
          <span className="text-gradient-primary"> PDF Tools</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          All PDF processing happens in your browser. Files are never uploaded to any server.
          Secure, fast, and completely free. Supports merge, split, compress, PDF to image, watermark, encryption and more.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Local processing, privacy safe</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Lightning fast, no waiting</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Completely free, unlimited use</span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          const isLarge = index === 0 || index === 3;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={`card-hover bg-white rounded-2xl p-6 border border-gray-100 ${
                isLarge ? 'sm:col-span-2' : ''
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{tool.title}</h3>
              <p className="text-sm text-gray-500">{tool.description}</p>
            </Link>
          );
        })}
      </div>

      {/* SEO Text */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose PDF Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">🔒 Privacy Safe</h3>
            <p className="text-sm text-gray-600">
              All file processing happens in your browser. Files are never uploaded to any server. Your documents are always under your control.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">⚡ Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Leverages your browser&apos;s local computing power for extremely fast processing. No queues, instant processing, saving your valuable time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">💯 Completely Free</h3>
            <p className="text-sm text-gray-600">
              All features are completely free with no file size limits and no usage limits. No registration required, just open and use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
