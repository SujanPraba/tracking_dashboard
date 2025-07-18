import { FileSpreadsheet } from 'lucide-react';

export interface FileTypeConfig {
  label: string;
  accept: string;
  icon: any;
  color: string;
}

export const fileTypeConfigs = {
  excel: {
    label: 'Excel',
    accept: '.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
    icon: FileSpreadsheet,
    color: 'blue'
  }
} as const;