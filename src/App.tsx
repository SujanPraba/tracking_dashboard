import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Integration from './components/Integration';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'integration':
        return <Integration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="flex">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className="flex-1 lg:ml-0">
            <Header />
            <main className="p-6 max-h-[90vh] overflow-y-auto">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;