import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangeFilterProps {
  onDateChange: (dates: { start: Date; end: Date }) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(selectedDate);
      setSelectedEndDate(null);
    } else {
      if (selectedDate < selectedStartDate) {
        setSelectedStartDate(selectedDate);
        setSelectedEndDate(selectedStartDate);
      } else {
        setSelectedEndDate(selectedDate);
        onDateChange({
          start: selectedStartDate,
          end: selectedDate
        });
      }
    }
  };

  const isDateInRange = (day: number) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return currentDay >= selectedStartDate && currentDay <= selectedEndDate;
  };

  const isDateSelected = (day: number) => {
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return (
      (selectedStartDate && currentDay.getTime() === selectedStartDate.getTime()) ||
      (selectedEndDate && currentDay.getTime() === selectedEndDate.getTime())
    );
  };

  const formatDateRange = () => {
    if (!selectedStartDate) return 'Select Date Range';
    if (!selectedEndDate) return selectedStartDate.toLocaleDateString('en-GB');
    return `${selectedStartDate.toLocaleDateString('en-GB')} - ${selectedEndDate.toLocaleDateString('en-GB')}`;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      const inRange = isDateInRange(day);
      const isToday = new Date().getDate() === day &&
                     new Date().getMonth() === currentDate.getMonth() &&
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
            transition-all duration-200 relative
            ${isSelected ? 'bg-blue-500 text-white' : ''}
            ${inRange ? 'bg-blue-100 text-blue-600' : ''}
            ${!isSelected && !inRange ? 'hover:bg-gray-100' : ''}
            ${isToday && !isSelected ? 'text-blue-600 font-bold' : 'text-gray-700'}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white h-[46px] px-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-2 hover:border-gray-300 transition-all duration-200 ${!selectedStartDate ? 'text-gray-400' : ''}`}
      >
        <CalendarIcon className={`w-5 h-5 ${!selectedStartDate ? 'text-gray-400' : 'text-gray-500'}`} />
        <span className={`text-sm font-medium ${!selectedStartDate ? 'text-gray-400' : 'text-gray-700'}`}>{formatDateRange()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 bg-white rounded-xl shadow-lg z-50 border border-gray-200 p-4"
            style={{ minWidth: '320px' }}
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-700">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(day => (
                <div key={day} className="w-10 h-10 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {renderCalendar()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangeFilter;