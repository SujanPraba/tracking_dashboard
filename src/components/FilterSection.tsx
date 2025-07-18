import React, { useState } from 'react';
import { Filter, Globe, Users, MessageCircle, Camera, Briefcase, Play, Image, Upload } from 'lucide-react';
import FileUploadModal from './ui/FileUploadModal';
// import { socialMediaPlatforms } from '../data/mockData';
import { DashboardFilters } from '../types/dashboard';
// import Dropdown, { DropdownOption } from './ui/Dropdown';
// import DateRangePicker from './ui/DateRangePicker';
// import youTube from '../assets/you.svg'
// import instagram from '../assets/insta.svg'
// import facebook from '../assets/fb.svg'
// import twitter from '../assets/x.svg'
// import linkedin from '../assets/linkdln.svg'
import linkedinLogo from '../assets/linkdln.svg'


interface FilterSectionProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  fileUploadOnSuccess: () => void;
  toast: any;
}

const FilterSection: React.FC<FilterSectionProps> = ({ fileUploadOnSuccess, toast }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleFileUpload = async (success: boolean) => {
    if (success) {
      fileUploadOnSuccess();
      toast.success('File uploaded successfully', {
        duration: 2000,
      });
    } else {
      toast.error('File upload failed', {
        duration: 2000,
      });
    }
  };

  return (
    <div className="mb-4 flex justify-between py-0 transition-colors duration-200">
      <div className="flex items-center gap-2">
        <img src={linkedinLogo} alt="LinkedIn" className="h-10 w-10" />
        <h2 className="text-lg font-semibold dark:text-white">LinkedIn Analytics</h2>
      </div>

      <div className="flex justify-end -mt-2">
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#5b8bfb] hover:bg-primary-600 text-white px-4 py-2 rounded-md h-10 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Upload className="h-5" />
          Upload File
        </button>
      </div>

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        fileType="excel"
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default FilterSection;