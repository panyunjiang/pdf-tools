'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ImageIcon, Download, Loader2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { ProgressBar } from '@/components/ProgressBar';
import { downloadPdfBytes, readFileAsArrayBuffer } from '@/lib/utils';

export default function ImageToPdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 595, height: 842 }); // A4 fallback
      img.src = dataUrl;
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);

    try {
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bytes = await readFileAsArrayBuffer(file);

        let image;
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(bytes);
        } else {
          image = await pdfDoc.embedJpg(bytes);
        }

        const dims = getImageDimensions(URL.createObjectURL(file));
        const { width, height } = await dims;

        // Scale to fit A4 if needed
        const maxWidth = 595;
        const maxHeight = 842;
        const scale = Math.min(maxWidth / width, maxHeight / height, 1);

        const page = pdfDoc.addPage([width * scale, height * scale]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: width * scale,
          height: height * scale,
        });

        setProgress(((i + 1) / files.length) * 100);
      }

      const pdfBytes = await pdfDoc.save();
      downloadPdfBytes(pdfBytes, 'images.pdf');
    } catch {
      alert('Conversion failed. Please ensure all files are valid images (PNG or JPG).');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={ImageIcon}
      title="Image to PDF"
      description="Combine multiple PNG or JPG images into a single PDF document. Each image occupies one page."
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }}
          multiple
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="Drag image files here"
          description="Supports PNG and JPG formats, upload multiple images"
        />

        {processing && <ProgressBar progress={progress} label="Conversion Progress" />}

        <button
          onClick={handleConvert}
          disabled={files.length === 0 || processing}
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
              Convert & Download ({files.length} images)
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
