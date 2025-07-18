import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fileTypeConfigs, type FileTypeConfig } from '../../utils/fileTypes';
import DASHBOARD_ENDPOINTS, { BASE_URL } from '../../api/endPoints';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: keyof typeof fileTypeConfigs;
  onFileUpload: (success: boolean) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, fileType, onFileUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fileConfig: FileTypeConfig = fileTypeConfigs[fileType];
  const FileIcon = fileConfig.icon;

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      setError(`Please upload only ${fileConfig.label} files`);
      return;
    }
    setError(null);
    setFiles(prev => [...prev, ...acceptedFiles]);
    setUploadStatus('idle');
  }, [fileConfig]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);
    setUploadStatus('idle');

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('file', file);
      });

      const response = await fetch(`${DASHBOARD_ENDPOINTS.FILE_UPLOAD}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.status) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      onFileUpload(true);
      setTimeout(() => {
        onClose();
        setFiles([]);
        setUploadStatus('idle');
      }, 1000);
    } catch (error: any) {
      setUploadStatus('error');
      setError(error.message || 'Something went wrong');
      onFileUpload(false);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full max-w-2xl mx-4 z-10"
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              {isUploading ? (
                <div className="mt-3 text-gray-500 text-sm flex items-center">
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </div>
              ) : (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                    Upload {fileConfig.label}
                  </h3>

                  {/* Dropzone */}
                  <div
                    {...getRootProps()}
                    className={`
                      mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg
                      ${isDragging || isDragActive
                        ? `border-${fileConfig.color}-500 bg-${fileConfig.color}-50 dark:bg-${fileConfig.color}-900/20`
                        : 'border-gray-300 dark:border-gray-600'
                      }
                      transition-all duration-300 ease-in-out cursor-pointer
                      hover:border-${fileConfig.color}-500 dark:hover:border-${fileConfig.color}-500
                    `}
                  >
                    <input {...getInputProps()} />
                    <motion.div
                      className="space-y-1 text-center"
                      animate={{
                        scale: isDragging || isDragActive ? 1.02 : 1,
                        y: isDragging || isDragActive ? -5 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-col items-center">
                        <FileIcon
                          className={`
                            h-12 w-12 mb-3
                            ${isDragging || isDragActive ? `text-${fileConfig.color}-500` : 'text-gray-400'}
                          `}
                        />
                        <motion.div
                          animate={{
                            scale: isDragging || isDragActive ? 1.05 : 1
                          }}
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className={`font-medium text-${fileConfig.color}-600 dark:text-${fileConfig.color}-400 hover:text-${fileConfig.color}-500`}>
                              Drop your {fileConfig.label} here
                            </span>{' '}
                            or click to browse
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Only {fileConfig.label} files are supported
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  )}

                  {/* File list */}
                  {files.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Selected files ({files.length})
                      </h4>
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {files.map((file, index) => (
                            <motion.li
                              key={`${file.name}-${index}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="py-3 flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <FileIcon className={`h-5 w-5 text-${fileConfig.color}-500 mr-3`} />
                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                  {file.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(file)}
                                className="ml-4 flex-shrink-0 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500"
                              >
                                Remove
                              </button>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Add status messages */}
          {uploadStatus === 'error' && (
            <div className="mt-3 text-red-500 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
          {uploadStatus === 'success' && (
            <div className="mt-3 text-green-500 text-sm flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              File uploaded successfully!
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FileUploadModal;