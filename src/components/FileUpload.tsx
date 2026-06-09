'use client';

import { useCallback, useState } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  accept?: Record<string, string[]>;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  files: File[];
  onRemoveFile?: (index: number) => void;
  label?: string;
  description?: string;
}

export function FileUpload({
  accept,
  multiple = true,
  onFilesSelected,
  files,
  onRemoveFile,
  label = '拖拽文件到此处或点击上传',
  description,
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null);
      if (rejectedFiles.length > 0) {
        setError(rejectedFiles[0].errors[0].message);
        return;
      }
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`upload-zone rounded-2xl p-8 text-center cursor-pointer bg-white ${
          isDragActive ? 'active' : ''
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
        <p className="text-lg font-medium text-gray-700 mb-2">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              {onRemoveFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(index);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
