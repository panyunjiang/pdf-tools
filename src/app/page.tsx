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
    href: '/merge',
    icon: Merge,
    title: 'PDF合并',
    description: '多个PDF文件合并为一个',
    color: 'from-violet-500 to-purple-600',
  },
  {
    href: '/split',
    icon: Scissors,
    title: 'PDF拆分',
    description: '按页码范围拆分PDF',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    href: '/compress',
    icon: Minimize2,
    title: 'PDF压缩',
    description: '减小PDF文件体积',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    href: '/pdf-to-image',
    icon: Image,
    title: 'PDF转图片',
    description: 'PDF页面导出为PNG/JPG',
    color: 'from-orange-500 to-amber-500',
  },
  {
    href: '/image-to-pdf',
    icon: ImageIcon,
    title: '图片转PDF',
    description: '多张图片合成PDF文档',
    color: 'from-pink-500 to-rose-500',
  },
  {
    href: '/watermark',
    icon: Droplets,
    title: 'PDF加水印',
    description: '添加文字或图片水印',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    href: '/encrypt',
    icon: Lock,
    title: 'PDF加密码',
    description: '加密保护PDF文档',
    color: 'from-red-500 to-pink-500',
  },
  {
    href: '/rotate',
    icon: RotateCw,
    title: 'PDF旋转',
    description: '旋转PDF页面方向',
    color: 'from-sky-500 to-blue-500',
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          免费在线
          <span className="text-gradient-primary"> PDF工具箱</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          所有PDF处理均在浏览器端完成，文件不会上传到服务器。安全、快速、完全免费。
          支持PDF合并、拆分、压缩、转图片、加水印、加密等功能。
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>本地处理，隐私安全</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>极速处理，无需等待</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>完全免费，无限制使用</span>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么选择PDF工具箱？</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">🔒 隐私安全</h3>
            <p className="text-sm text-gray-600">
              所有文件处理均在您的浏览器中完成，文件不会上传到任何服务器。您的文档始终在您的掌控之中。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">⚡ 极速处理</h3>
            <p className="text-sm text-gray-600">
              利用浏览器本地计算能力，处理速度极快。无需排队等待，即传即处理，节省您的宝贵时间。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">💯 完全免费</h3>
            <p className="text-sm text-gray-600">
              所有功能完全免费，无文件大小限制，无使用次数限制。无需注册，打开即用。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
