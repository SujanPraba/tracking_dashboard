import React, { useState } from 'react';
import { Filter, Globe, Users, MessageCircle, Camera, Briefcase, Play, Image, Upload } from 'lucide-react';
import FileUploadModal from './ui/FileUploadModal';
import { socialMediaPlatforms } from '../data/mockData';
import { DashboardFilters } from '../types/dashboard';
import Dropdown, { DropdownOption } from './ui/Dropdown';
import DateRangePicker from './ui/DateRangePicker';
import youTube from '../assets/you.svg'
import instagram from '../assets/insta.svg'
import facebook from '../assets/fb.svg'
import twitter from '../assets/x.svg'
import linkedin from '../assets/linkdln.svg'


interface FilterSectionProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFiltersChange }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Globe': <Image className="h-5 w-5" />,
      'Users': <img src={facebook} alt="Facebook" className="h-5 w-5" />,
      'MessageCircle': <img src={twitter} alt="Instagram" className="h-5 w-5" />,
      'Camera': <img src={instagram} alt="Instagram" className="h-5 w-5" />,
      'Briefcase': <img src={linkedin} alt="LinkedIn" className="h-5 w-5" />,
      'Play': <img src={youTube} alt="YouTube" className="h-5 w-5" />,
    };
    return iconMap[iconName] || <Globe className="h-5 w-5 text-gray-500" />;
  };

  const handlePlatformChange = (platformId: string) => {
    onFiltersChange({
      ...filters,
      platform: platformId
    });
  };

  const handleDateRangeChange = (dateRange: { start: Date; end: Date }) => {
    onFiltersChange({
      ...filters,
      dateRange
    });
  };

  // Convert social media platforms to dropdown options
  const platformOptions: DropdownOption[] = socialMediaPlatforms.map(platform => ({
    id: platform.id,
    label: platform.name,
    icon: getIconComponent(platform.icon),
    color: platform.color
  }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md px-6 py-4 transition-colors duration-200">
      {/* <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Dashboard Filters
        </h2>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Filter */}
        <Dropdown
          options={platformOptions}
          value={filters.platform}
          onChange={handlePlatformChange}
          label="Social Media Platform"
          placeholder="Select a platform"
        />

        {/* Date Range Filter */}
        <DateRangePicker
          value={filters.dateRange}
          onChange={handleDateRangeChange}
          label="Date Range"
        />
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md h-12 mt-7 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Upload className="h-5 w-5" />
            Upload
          </button>
      </div>
      <div className="flex items-center justify-end">

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        fileType="excel"
      />
      </div>
    </div>
  );
};

export default FilterSection;