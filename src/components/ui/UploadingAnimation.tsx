import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import { fileTypeConfigs } from '../../utils/fileTypes';

interface UploadingAnimationProps {
  progress: number;
  fileType: keyof typeof fileTypeConfigs;
}

const UploadingAnimation: React.FC<UploadingAnimationProps> = ({ progress, fileType }) => {
  const fileConfig = fileTypeConfigs[fileType];
  const FileIcon = fileConfig.icon;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Cloud icon with shadow */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className={`absolute inset-0 blur-lg bg-${fileConfig.color}-500/30 dark:bg-${fileConfig.color}-400/20 rounded-full transform scale-90`}></div>
          <Cloud className={`w-24 h-24 text-${fileConfig.color}-200 dark:text-${fileConfig.color}-700`} />
        </motion.div>

        {/* File icon animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -20, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FileIcon className={`w-8 h-8 text-${fileConfig.color}-500 dark:text-${fileConfig.color}-400`} />
        </motion.div>
      </motion.div>

      {/* Progress text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Uploading {fileConfig.label}...
        </h3>
        <p className={`text-3xl font-bold text-${fileConfig.color}-600 dark:text-${fileConfig.color}-400`}>
          {progress}%
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className={`w-64 h-2 bg-${fileConfig.color}-100 dark:bg-${fileConfig.color}-900/20 rounded-full mt-4 overflow-hidden`}>
        <motion.div
          className={`h-full bg-${fileConfig.color}-500 dark:bg-${fileConfig.color}-400`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default UploadingAnimation;