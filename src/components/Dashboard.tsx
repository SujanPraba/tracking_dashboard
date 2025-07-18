import React, { useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import MetricCard from './MetricCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import KeywordChart from './charts/KeywordChart';
import SentimentChart from './charts/SentimentChart';
import FrequencyChart from './charts/FrequencyChart';
import {
  EngagementTimeChart,
  PostTypeEngagementChart,
  DemographicsChart,
  ClicksPerPostTypeChart,
  SentimentChart as LinkedInSentimentChart,
  TimeOfDayEngagementChart,
  HashtagPerformanceChart,
  KeywordTrendsCharts
} from './charts/LinkedInCharts';
import { DashboardFilters, LinkedInMetrics } from '../types/dashboard';
import { transformLinkedInMetrics } from '../utils/transformMetrics';
import { useDashboardData } from '../hooks/useDashboardData';
import { motion, AnimatePresence } from 'framer-motion';
import { getClicksPerPost, getEngagementDataByOverTime, getEngagementDataByPost, getTileData, getWordCloudData } from '../api/dashboardApi';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    platform: 'linkedin',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    }
  });
  const [wordCloudData, setWordCloudData] = useState<any>([]);
  const [tileData, setTileData] = useState<LinkedInMetrics>({});
  const [engagementDataByPost, setEngagementDataByPost] = useState<any>([]);
  const [engagementDataByOverTime, setEngagementDataByOverTime] = useState<any>([]);
  const [clicksPerPost, setClicksPerPost] = useState<any>([]);
  const [hashtagPerformance, setHashtagPerformance] = useState<any>([]);
  const [sentimentData, setSentimentData] = useState<any>([]);
  const { metrics, keywordData, frequencyData, videoEngagementData, loading, error } = useDashboardData(filters);

  const handleRetry = () => {
    setFilters({ ...filters });
  };

  useEffect(() => {
    initailCall();
  }, []);

  const initailCall =()=>{
    getTileData(null,setTileData);
    getWordCloudData(null, setWordCloudData, setHashtagPerformance, setSentimentData);
    getEngagementDataByPost(null, setEngagementDataByPost);
    getEngagementDataByOverTime(null, setEngagementDataByOverTime);
    getClicksPerPost(null, setClicksPerPost);
  }

  // Transform tile data into metrics
  const linkedInMetrics = transformLinkedInMetrics(tileData);

  // Mock data for LinkedIn charts
  const mockLinkedInData = {
    engagement: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      engagement: Math.floor(Math.random() * 100)
    })).reverse(),
    followers: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      followers: 1000 + Math.floor(Math.random() * 100)
    })).reverse(),
    postTypes: [
      { type: 'Text', engagement: 45 },
      { type: 'Image', engagement: 75 },
      { type: 'Video', engagement: 60 },
      { type: 'Article', engagement: 30 }
    ],
    demographics: [
      { name: 'Technology', value: 35 },
      { name: 'Marketing', value: 25 },
      { name: 'Finance', value: 20 },
      { name: 'HR', value: 15 },
      { name: 'Others', value: 5 }
    ],
    clicks: [
      { postType: 'Text', clicks: 120, ctr: 2.5 },
      { postType: 'Image', clicks: 250, ctr: 3.8 },
      { postType: 'Video', clicks: 180, ctr: 3.2 },
      { postType: 'Article', clicks: 90, ctr: 1.8 }
    ],
    sentiment: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      positive: 30 + Math.random() * 20,
      neutral: 40 + Math.random() * 20,
      negative: 10 + Math.random() * 10
    })).reverse(),
    timeOfDay: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      engagement: 20 + Math.random() * 80
    })),
    hashtags: [
      { hashtag: '#innovation', engagement: 85 },
      { hashtag: '#technology', engagement: 72 },
      { hashtag: '#leadership', engagement: 68 },
      { hashtag: '#business', engagement: 55 },
      { hashtag: '#marketing', engagement: 48 }
    ],

  };
  const fileUploadOnSuccess = ()=>{
    initailCall();
  }

  const renderContent = () => {
    if (loading) return <LoadingSpinner text="Loading dashboard data..." />;
    if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={filters.platform}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filters.platform === 'linkedin' ? (
            <>
              {/* LinkedIn Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {linkedInMetrics.map(metric => (
                  <MetricCard key={metric.id} metric={metric as any} />
                ))}
              </div>

              {/* LinkedIn Charts */}
              <div className="grid grid-cols-2 gap-8 mt-8">
              <KeywordTrendsCharts words={wordCloudData} />
              {/* <FollowersGrowthChart data={mockLinkedInData.followers} /> */}
              <HashtagPerformanceChart data={hashtagPerformance} />


              </div>
              <div className="grid grid-cols-1 gap-8 mt-8">
                <EngagementTimeChart data={engagementDataByOverTime} />
              </div>
              {/* <div className="grid grid-cols-1 gap-8 mt-8">
              <TimeOfDayEngagementChart data={mockLinkedInData.timeOfDay} />
              </div> */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <PostTypeEngagementChart data={engagementDataByPost} />
                {/* <DemographicsChart data={mockLinkedInData.demographics} /> */}
                <ClicksPerPostTypeChart data={clicksPerPost} />
                <LinkedInSentimentChart data={sentimentData} />
              {/* <VideoEngagementChart data={videoEngagementData} /> */}

              </div>

            </>
          ) : (
            <>
              {/* Default Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map(metric => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>

              {/* Default Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <KeywordChart data={keywordData} />
                <SentimentChart data={sentimentData} />
                <FrequencyChart data={frequencyData} />
                {/* <VideoEngagementChart data={videoEngagementData} /> */}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-1 py-0 space-y-2">
        <Toaster/>
        <FilterSection filters={filters} onFiltersChange={setFilters} fileUploadOnSuccess={fileUploadOnSuccess}  toast={toast}/>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;