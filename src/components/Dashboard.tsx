import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import FilterSection from './FilterSection';
import MetricCard from './MetricCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import KeywordChart from './charts/KeywordChart';
import SentimentChart from './charts/SentimentChart';
import FrequencyChart from './charts/FrequencyChart';
import VideoEngagementChart from './charts/VideoEngagementChart';
import { DashboardFilters } from '../types/dashboard';
import { useDashboardData } from '../hooks/useDashboardData';

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    platform: 'all',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    }
  });

  const { metrics, keywordData, sentimentData, frequencyData, videoEngagementData, loading, error } = useDashboardData(filters);

  const handleRetry = () => {
    // Force re-fetch by updating filters
    setFilters({ ...filters });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-1 py-0 space-y-4">
        {/* Dashboard Header */}
        {/* <div className="flex items-center gap-3 mb-6">
          <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time social media performance insights
            </p>
          </div>
        </div> */}

        {/* Filters */}
        <FilterSection filters={filters} onFiltersChange={setFilters} />

        {/* Loading State */}
        {loading && <LoadingSpinner text="Loading dashboard data..." />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {/* Dashboard Content */}
        {!loading && !error && (
          <>
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map(metric => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <KeywordChart data={keywordData} />
            <SentimentChart data={sentimentData} />
            <FrequencyChart data={frequencyData} />
            <VideoEngagementChart data={videoEngagementData} />
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;