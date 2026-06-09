'use client';

import { useState } from 'react';
import { Image, Download, Loader2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { ProgressBar } from '@/components/ProgressBar';
import { readFileAsArrayBuffer } from '@/lib/utils';

export default function PdfToImageClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
  };

  const handleRemove = () => {
    setFiles([]);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);

    try {
      const bytes = await readFileAsArrayBuffer(files[0]);

      // Use pdf.js via CDN for rendering
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const totalPages = pdf.numPages;

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const quality = format === 'jpeg' ? 0.85 : undefined;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `page-${i}.${format}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }
          },
          mimeType,
          quality
        );

        setProgress((i / totalPages) * 100);
        // Small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    } catch {
      alert('Conversion failed. Please ensure the file is a valid PDF.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Image}
      title="PDF to Image"
      description="Export each PDF page as a PNG or JPG image. Supports HD output, preserves original layout."
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="Drag PDF file here"
          description="Select a PDF file to convert to images"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
          <div className="flex gap-3">
            <button
              onClick={() => setFormat('png')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                format === 'png'
                  ? 'bg-gradient-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              PNG (Lossless)
            </button>
            <button
              onClick={() => setFormat('jpeg')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                format === 'jpeg'
                  ? 'bg-gradient-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              JPG (Compressed)
            </button>
          </div>
        </div>

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
              Convert & Download
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
