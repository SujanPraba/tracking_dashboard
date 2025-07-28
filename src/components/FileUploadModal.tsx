import React, { useState } from 'react';
import { X, Upload, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: 'excel' | 'csv';
  onFileUpload: (success: boolean) => void;
}

interface FileStatus {
  file: File;
  status: 'idle' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  fileType,
  onFileUpload
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileStatus[]>([]);
  const [uploading, setUploading] = useState(false);

  const allowedTypes = {
    excel: ['.xlsx', '.xls'],
    csv: ['.csv']
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        status: 'idle' as const
      }));

      // Only add new files if total won't exceed 5
      if (selectedFiles.length + newFiles.length <= 5) {
        setSelectedFiles([...selectedFiles, ...newFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    let allSuccess = true;

    try {
      // Upload all files in parallel
      const uploadPromises = selectedFiles.map(async (fileStatus, index) => {
        const formData = new FormData();
        formData.append('file', fileStatus.file);

        try {
          setSelectedFiles(prev => prev.map((f, i) =>
            i === index ? { ...f, status: 'uploading' } : f
          ));

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Upload failed');
          }

          setSelectedFiles(prev => prev.map((f, i) =>
            i === index ? { ...f, status: 'success' } : f
          ));
        } catch (error: any) {
          allSuccess = false;
          setSelectedFiles(prev => prev.map((f, i) =>
            i === index ? { ...f, status: 'error', errorMessage: error.message || 'Upload failed' } : f
          ));
        }
      });

      await Promise.all(uploadPromises);
      onFileUpload(allSuccess);

      if (allSuccess) {
        setTimeout(() => {
          onClose();
          setSelectedFiles([]);
        }, 1500);
      }
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Upload {fileType.toUpperCase()} Files (Max 5)
        </h2>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mb-4">
          <input
            type="file"
            accept={allowedTypes[fileType].join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            multiple
            max="5"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="text-blue-500">Click to upload</span> or drag and drop
              <br />
              {allowedTypes[fileType].join(', ')} files only
              <br />
              <span className="text-xs text-gray-500">
                {5 - selectedFiles.length} slots remaining
              </span>
            </p>
          </label>
        </div>

        {/* File List */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {selectedFiles.map((fileStatus, index) => (
            <div
              key={fileStatus.file.name + index}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded"
            >
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-sm truncate">{fileStatus.file.name}</p>
                {fileStatus.status === 'error' && (
                  <p className="text-xs text-red-500">{fileStatus.errorMessage}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {fileStatus.status === 'uploading' && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
                {fileStatus.status === 'success' && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                {fileStatus.status === 'error' && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                {fileStatus.status === 'idle' && (
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || uploading}
          className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium
            ${selectedFiles.length === 0 || uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors duration-200`}
        >
          {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
};

export default FileUploadModal;