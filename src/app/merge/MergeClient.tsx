'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Merge, Download, Loader2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { ProgressBar } from '@/components/ProgressBar';
import { downloadPdfBytes, readFileAsArrayBuffer } from '@/lib/utils';

export default function MergeClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    setProgress(0);

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const bytes = await readFileAsArrayBuffer(files[i]);
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
        setProgress(((i + 1) / files.length) * 100);
      }

      const pdfBytes = await mergedPdf.save();
      downloadPdfBytes(pdfBytes, 'merged.pdf');
    } catch {
      alert('合并失败，请确保所有文件都是有效的PDF');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Merge}
      title="PDF合并"
      description="将多个PDF文件合并为一个文件。拖拽调整顺序，支持批量合并。"
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="拖拽PDF文件到此处"
          description="支持同时上传多个PDF文件"
        />

        {processing && <ProgressBar progress={progress} label="合并进度" />}

        <button
          onClick={handleMerge}
          disabled={files.length < 2 || processing}
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
              合并并下载 ({files.length}个文件)
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
