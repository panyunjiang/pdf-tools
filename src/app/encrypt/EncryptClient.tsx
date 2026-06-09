'use client';

import { useState } from 'react';
import { Lock, Download, Loader2, AlertCircle } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { readFileAsArrayBuffer } from '@/lib/utils';

export default function EncryptClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState('');
  const [showNote, setShowNote] = useState(true);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
  };

  const handleRemove = () => {
    setFiles([]);
  };

  const handleEncrypt = async () => {
    if (files.length === 0 || !password) return;
    setProcessing(true);

    try {
      // Note: pdf-lib doesn't support encryption directly
      // We'll use a workaround by modifying the PDF trailer
      const bytes = await readFileAsArrayBuffer(files[0]);

      // For a proper implementation, we'd need a library that supports PDF encryption
      // Since pdf-lib doesn't support encryption, we'll inform the user
      alert(
        '注意：当前版本使用pdf-lib库，暂不支持PDF加密功能。' +
          '建议使用专业的PDF编辑软件（如Adobe Acrobat）进行加密。' +
          '此功能将在后续版本中通过集成其他库来实现。'
      );
    } catch {
      alert('处理失败');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Lock}
      title="PDF加密码"
      description="为PDF文档添加密码保护，防止未授权访问。"
    >
      <div className="space-y-6">
        {showNote && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">功能说明</p>
              <p className="text-sm text-amber-700 mt-1">
                PDF加密需要底层加密库支持。当前版本暂使用纯前端方案，加密功能将在后续版本中完善。
                如需立即加密PDF，建议使用Adobe Acrobat等专业工具。
              </p>
              <button
                onClick={() => setShowNote(false)}
                className="text-xs text-amber-600 mt-2 hover:underline"
              >
                知道了
              </button>
            </div>
          </div>
        )}

        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="拖拽PDF文件到此处"
          description="选择一个PDF文件进行加密"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">设置密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入密码"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <button
          onClick={handleEncrypt}
          disabled={files.length === 0 || !password || processing}
          className="w-full py-3 px-6 bg-gradient-primary text-white font-medium rounded-xl hover:bg-gradient-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              处理中...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              加密并下载
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
