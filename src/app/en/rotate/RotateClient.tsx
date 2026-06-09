'use client';

import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { RotateCw, Download, Loader2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { ProgressBar } from '@/components/ProgressBar';
import { downloadPdfBytes, readFileAsArrayBuffer } from '@/lib/utils';

export default function RotateClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
  };

  const handleRemove = () => {
    setFiles([]);
  };

  const handleRotate = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);

    try {
      const bytes = await readFileAsArrayBuffer(files[0]);
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotation));
        setProgress(((i + 1) / pages.length) * 100);
      }

      const pdfBytes = await pdf.save();
      downloadPdfBytes(pdfBytes, 'rotated.pdf');
    } catch {
      alert('Rotation failed. Please ensure the file is a valid PDF.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={RotateCw}
      title="Rotate PDF"
      description="Rotate all pages of a PDF document. Supports 90°, 180°, and 270° rotation."
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="Drag PDF file here"
          description="Select a PDF file to rotate"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rotation Angle</label>
          <div className="flex gap-3">
            {([90, 180, 270] as const).map((deg) => (
              <button
                key={deg}
                onClick={() => setRotation(deg)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  rotation === deg
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                {deg}°
              </button>
            ))}
          </div>
        </div>

        {processing && <ProgressBar progress={progress} label="Rotation Progress" />}

        <button
          onClick={handleRotate}
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
              Rotate & Download
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
