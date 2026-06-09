'use client';

import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { Droplets, Download, Loader2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';
import { ProgressBar } from '@/components/ProgressBar';
import { downloadPdfBytes, readFileAsArrayBuffer } from '@/lib/utils';

export default function WatermarkClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [watermarkText, setWatermarkText] = useState('机密文件');
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(0.3);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
  };

  const handleRemove = () => {
    setFiles([]);
  };

  const handleWatermark = async () => {
    if (files.length === 0 || !watermarkText) return;
    setProcessing(true);
    setProgress(0);

    try {
      const bytes = await readFileAsArrayBuffer(files[0]);
      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        const textHeight = font.heightAtSize(fontSize);

        // Draw watermark diagonally across the page
        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: (height - textHeight) / 2,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(45),
        });

        setProgress(((i + 1) / pages.length) * 100);
      }

      const pdfBytes = await pdf.save();
      downloadPdfBytes(pdfBytes, 'watermarked.pdf');
    } catch {
      alert('添加水印失败，请确保文件是有效的PDF');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Droplets}
      title="PDF加水印"
      description="为PDF添加文字水印，支持自定义文字、字号和透明度。"
    >
      <div className="space-y-6">
        <FileUpload
          accept={{ 'application/pdf': ['.pdf'] }}
          multiple={false}
          onFilesSelected={handleFiles}
          files={files}
          onRemoveFile={handleRemove}
          label="拖拽PDF文件到此处"
          description="选择一个PDF文件添加水印"
        />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">水印文字</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              placeholder="输入水印文字"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              字号：{fontSize}
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              透明度：{Math.round(opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {processing && <ProgressBar progress={progress} label="添加水印进度" />}

        <button
          onClick={handleWatermark}
          disabled={files.length === 0 || !watermarkText || processing}
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
              添加水印并下载
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
