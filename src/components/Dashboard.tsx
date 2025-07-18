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
import loadingUi from "../assets/loader.svg"

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
  const [loadingUix, setLoadingUix] = useState<boolean>(false);
  const handleRetry = () => {
    setFilters({ ...filters });
  };

  useEffect(() => {
    initailCall();
  }, []);

  const initailCall =()=>{
    setLoadingUix(false);
    getTileData(null,setTileData);
    getWordCloudData(null, setWordCloudData, setHashtagPerformance, setSentimentData);
    getEngagementDataByPost(null, setEngagementDataByPost);
    getEngagementDataByOverTime(null, setEngagementDataByOverTime);
    getClicksPerPost(null, setClicksPerPost);
  }

  // Transform tile data into metrics
  const linkedInMetrics = transformLinkedInMetrics(tileData);


  const fileUploadOnSuccess = ()=>{
    setLoadingUix(true);
    setTimeout(()=>{
      initailCall();

    },1500)
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
    <>
    {loadingUix && <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50"><img src={loadingUi} alt="loading" className="w-[100px] h-[100px]" /></div>}
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-1 py-0 space-y-2">
        <Toaster/>
        <FilterSection filters={filters} onFiltersChange={setFilters} fileUploadOnSuccess={fileUploadOnSuccess}  toast={toast}/>
        {renderContent()}
      </div>
    </div>
    </>
  );
};

export default Dashboard;