import { LucideIcon } from 'lucide-react';

interface ToolPageLayoutProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolPageLayout({ icon: Icon, title, description, children }: ToolPageLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-600 max-w-xl mx-auto">{description}</p>
      </div>
      {children}
    </div>
  );
}
