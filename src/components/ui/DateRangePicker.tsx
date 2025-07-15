import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, isBefore, isAfter } from 'date-fns';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (dateRange: DateRange) => void;
  label?: string;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  label,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [tempRange, setTempRange] = useState<DateRange>(value);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTempRange(value);
        setSelectingStart(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const handleDateClick = (date: Date) => {
    if (selectingStart) {
      setTempRange({ start: date, end: date });
      setSelectingStart(false);
    } else {
      const newRange = {
        start: isBefore(date, tempRange.start) ? date : tempRange.start,
        end: isBefore(date, tempRange.start) ? tempRange.start : date
      };
      setTempRange(newRange);
      onChange(newRange);
      setIsOpen(false);
      setSelectingStart(true);
    }
  };

  const handleApply = () => {
    onChange(tempRange);
    setIsOpen(false);
    setSelectingStart(true);
  };

  const handleCancel = () => {
    setTempRange(value);
    setIsOpen(false);
    setSelectingStart(true);
  };

  const isDateInRange = (date: Date) => {
    if (!tempRange.start || !tempRange.end) return false;
    return (isSameDay(date, tempRange.start) || isSameDay(date, tempRange.end) || 
            (isAfter(date, tempRange.start) && isBefore(date, tempRange.end)));
  };

  const isDateRangeStart = (date: Date) => {
    return tempRange.start && isSameDay(date, tempRange.start);
  };

  const isDateRangeEnd = (date: Date) => {
    return tempRange.end && isSameDay(date, tempRange.end);
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            type="button"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const isInRange = isDateInRange(day);
            const isStart = isDateRangeStart(day);
            const isEnd = isDateRangeEnd(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDateClick(day)}
                disabled={!isCurrentMonth}
                className={`
                  p-2 text-sm rounded-lg transition-all duration-150 relative
                  ${!isCurrentMonth ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : ''}
                  ${isCurrentMonth && !isInRange ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                  ${isInRange && !isStart && !isEnd ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}
                  ${isStart || isEnd ? 'bg-blue-600 text-white' : ''}
                  ${isTodayDate && !isInRange ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {selectingStart ? 'Select start date' : 'Select end date'}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!tempRange.start || !tempRange.end}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-gray-900 dark:text-white">
            {format(value.start, 'MMM dd, yyyy')} - {format(value.end, 'MMM dd, yyyy')}
          </span>
        </div>
        <ChevronRight 
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-90' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;