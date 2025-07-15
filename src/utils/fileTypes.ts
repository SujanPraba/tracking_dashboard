import { FileSpreadsheet, FileText, FileImage, File } from 'lucide-react';

export type FileTypeConfig = {
  accept: string;
  icon: any;
  label: string;
  color: string;
};

export const fileTypeConfigs: Record<string, FileTypeConfig> = {
  excel: {
    accept: '.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
    icon: FileSpreadsheet,
    label: 'Excel Spreadsheet',
    color: 'emerald'
  },
  csv: {
    accept: '.csv,text/csv',
    icon: FileText,
    label: 'CSV File',
    color: 'blue'
  },
  pdf: {
    accept: '.pdf,application/pdf',
    icon: FileText,
    label: 'PDF Document',
    color: 'rose'
  },
  image: {
    accept: 'image/*',
    icon: FileImage,
    label: 'Image',
    color: 'violet'
  }
};