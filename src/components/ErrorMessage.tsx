import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
          Error Loading Data
        </h3>
      </div>
      <p className="text-red-700 dark:text-red-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;