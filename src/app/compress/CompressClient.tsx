'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Minimize2, Download, Loader2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { ProgressBar } from '@/components/ProgressBar';
import { downloadPdfBytes, readFileAsArrayBuffer } from '@/lib/utils';

export default function CompressClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
    setResult(null);
  };

  const handleRemove = () => {
    setFiles([]);
    setResult(null);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    setResult(null);

    try {
      const bytes = await readFileAsArrayBuffer(files[0]);
      setProgress(30);

      const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
      setProgress(60);

      // Remove metadata to reduce size
      pdf.setTitle('');
      pdf.setAuthor('');
      pdf.setSubject('');
      pdf.setKeywords([]);
      pdf.setProducer('');
      pdf.setCreator('');

      setProgress(80);

      const compressedBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      setProgress(100);

      setResult({
        original: files[0].size,
        compressed: compressedBytes.length,
      });

      downloadPdfBytes(compressedBytes, 'compressed.pdf');
    } catch {
      alert('压缩失败，请确保文件是有效的PDF');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Minimize2}
      title="PDF压缩"
      description="减小PDF文件体积，优化存储和传输。通过移除冗余数据实现压缩。"
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="拖拽PDF文件到此处"
          description="选择一个PDF文件进行压缩"
        />

        {processing && <ProgressBar progress={progress} label="压缩进度" />}

        {result && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-sm text-emerald-800">
              压缩完成！原始大小：{(result.original / 1024 / 1024).toFixed(2)} MB → 压缩后：
              {(result.compressed / 1024 / 1024).toFixed(2)} MB
              <span className="ml-2 font-semibold">
                (节省 {((1 - result.compressed / result.original) * 100).toFixed(1)}%)
              </span>
            </p>
          </div>
        )}

        <button
          onClick={handleCompress}
          disabled={files.length === 0 || processing}
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
              压缩并下载
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
