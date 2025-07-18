import React, { useState } from 'react';
import { X, Upload, FileIcon, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: 'excel' | 'csv';
  onFileUpload: (success: boolean) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  fileType,
  onFileUpload
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const allowedTypes = {
    excel: ['.xlsx', '.xls'],
    csv: ['.csv']
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      setUploadStatus('success');
      onFileUpload(true);
      setTimeout(() => {
        onClose();
        setSelectedFile(null);
        setUploadStatus('idle');
      }, 1500);
    } catch (error: any) {
      setUploadStatus('error');
      setErrorMessage(error.message || 'Something went wrong');
      onFileUpload(false);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Upload {fileType.toUpperCase()} File
        </h2>

        {/* Upload area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            accept={allowedTypes[fileType].join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedFile ? (
                <span className="text-blue-500">{selectedFile.name}</span>
              ) : (
                <>
                  <span className="text-blue-500">Click to upload</span> or drag and drop
                  <br />
                  {allowedTypes[fileType].join(', ')} files only
                </>
              )}
            </p>
          </label>
        </div>

        {/* Status messages */}
        {uploadStatus === 'error' && (
          <div className="mt-3 text-red-500 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errorMessage}
          </div>
        )}
        {uploadStatus === 'success' && (
          <div className="mt-3 text-green-500 text-sm flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            File uploaded successfully!
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium
            ${!selectedFile || uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors duration-200`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default FileUploadModal; 