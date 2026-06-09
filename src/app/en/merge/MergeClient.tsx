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
      alert('Merge failed. Please ensure all files are valid PDFs.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Merge}
      title="Merge PDF"
      description="Combine multiple PDF files into one. Drag to reorder, supports batch merging."
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="Drag PDF files here"
          description="Supports uploading multiple PDF files at once"
        />

        {processing && <ProgressBar progress={progress} label="Merge Progress" />}

        <button
          onClick={handleMerge}
          disabled={files.length < 2 || processing}
          className="w-full py-3 px-6 bg-gradient-primary text-white font-medium rounded-xl hover:bg-gradient-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Merge & Download ({files.length} files)
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
