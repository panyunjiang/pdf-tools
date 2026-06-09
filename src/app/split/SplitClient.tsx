'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Scissors, Download, Loader2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { downloadPdfBytes, readFileAsArrayBuffer } from '@/lib/utils';

export default function SplitClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [pageRange, setPageRange] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleFiles = async (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
    if (newFiles[0]) {
      try {
        const bytes = await readFileAsArrayBuffer(newFiles[0]);
        const pdf = await PDFDocument.load(bytes);
        setTotalPages(pdf.getPageCount());
      } catch {
        setTotalPages(0);
      }
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setTotalPages(0);
    setPageRange('');
  };

  const parseRange = (range: string, max: number): number[] => {
    const pages: number[] = [];
    const parts = range.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number);
        if (start >= 1 && end <= max && start <= end) {
          for (let i = start; i <= end; i++) pages.push(i - 1);
        }
      } else {
        const num = Number(trimmed);
        if (num >= 1 && num <= max) pages.push(num - 1);
      }
    }
    return [...new Set(pages)];
  };

  const handleSplit = async () => {
    if (files.length === 0 || !pageRange) return;
    setProcessing(true);

    try {
      const bytes = await readFileAsArrayBuffer(files[0]);
      const srcPdf = await PDFDocument.load(bytes);
      const pageIndices = parseRange(pageRange, srcPdf.getPageCount());

      if (pageIndices.length === 0) {
        alert('请输入有效的页码范围');
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      downloadPdfBytes(pdfBytes, 'split.pdf');
    } catch {
      alert('拆分失败，请确保文件是有效的PDF');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Scissors}
      title="PDF拆分"
      description="按页码范围从PDF中提取指定页面。支持单页、多页和范围选择。"
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="拖拽PDF文件到此处"
          description="选择一个PDF文件进行拆分"
        />

        {totalPages > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">共 {totalPages} 页</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">页码范围</label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="例如：1-3, 5, 7-10"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">用逗号分隔多个范围，如：1-3, 5, 7-10</p>
            </div>
          </div>
        )}

        <button
          onClick={handleSplit}
          disabled={files.length === 0 || !pageRange || processing}
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
              拆分并下载
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
