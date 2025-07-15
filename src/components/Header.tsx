import React from 'react';
import { Moon, Sun, BarChart3, Settings, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import socialMedia from '../assets/social-media.svg'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className=" rounded-lg">
              <img src={socialMedia} alt="Social Media" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Social Media Dashboard
              </h1>
              <p className="text-sm italic text-gray-500 dark:text-gray-400">
                Professional Analytics & Tracking
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            {/* <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button> */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;