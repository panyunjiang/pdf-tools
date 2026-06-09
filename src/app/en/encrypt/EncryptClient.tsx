'use client';

import { useState } from 'react';
import { Lock, Download, Loader2, AlertCircle } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { FileUpload } from '@/components/FileUpload';

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
      alert(
        'Note: The current version uses pdf-lib which does not support PDF encryption. ' +
          'This feature will be implemented in a future version by integrating other libraries. ' +
          'For now, please use professional PDF editing software (like Adobe Acrobat) for encryption.'
      );
    } catch {
      alert('Processing failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      icon={Lock}
      title="Encrypt PDF"
      description="Add password protection to your PDF document to prevent unauthorized access."
    >
      <div className="space-y-6">
        {showNote && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">Feature Note</p>
              <p className="text-sm text-amber-700 mt-1">
                PDF encryption requires underlying encryption library support. The current version uses a pure frontend approach, and the encryption feature will be improved in future versions.
                If you need to encrypt PDF immediately, please use professional tools like Adobe Acrobat.
              </p>
              <button
                onClick={() => setShowNote(false)}
                className="text-xs text-amber-600 mt-2 hover:underline"
              >
                Got it
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
          label="Drag PDF file here"
          description="Select a PDF file to encrypt"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Set Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
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
              Processing...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Encrypt & Download
            </>
          )}
        </button>
      </div>
    </ToolPageLayout>
  );
}
