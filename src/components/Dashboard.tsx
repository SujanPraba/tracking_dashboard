import React, { useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import MetricCard from './MetricCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import ProductFilter from './ProductFilter';
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
import { getClicksPerPost, getEngagementDataByOverTime, getEngagementDataByPost, getTableData, getTileData, getWordCloudData } from '../api/dashboardApi';
import toast, { Toaster } from 'react-hot-toast';
import loadingUi from "../assets/loader.svg"
import MediaFilter from './MediaFilter';
import SearchInput from './SearchInput';
import DateRangeFilter from './DateRangeFilter';
import { Upload } from 'lucide-react';
import FileUploadModal from './FileUploadModal';
import InsightCharts from './charts/InsightCharts';
import { getInsights } from '../api/dashboardApi';
import PostEngagementTable from './PostEngagementTable';
import { getPostEngagementTable } from '../api/dashboardApi';

interface ApiParams {
  productType: string;
  startDate?: string; // Make dates optional
  endDate?: string;
  selectedPosts?: string[]; // Add selected posts
}

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    platform: 'linkedin',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    }
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [wordCloudData, setWordCloudData] = useState<any>([]);
  const [tileData, setTileData] = useState<LinkedInMetrics>({});
  const [engagementDataByPost, setEngagementDataByPost] = useState<any>([]);
  const [engagementDataByOverTime, setEngagementDataByOverTime] = useState<any>([]);
  const [clicksPerPost, setClicksPerPost] = useState<any>([]);
  const [hashtagPerformance, setHashtagPerformance] = useState<any>([]);
  const [sentimentData, setSentimentData] = useState<any>([]);
  const [insightsData, setInsightsData] = useState<any>(null);
  const [tableData, setTableData] = useState([]);
  const { metrics, keywordData, frequencyData, loading, error } = useDashboardData(filters);
  const [loadingUix, setLoadingUix] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState('pirai-infotech');
  const [apiParams, setApiParams] = useState<ApiParams>({
    productType: 'pirai-infotech'
    // Initialize without dates
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState('engagement');
  const [totalPosts, setTotalPosts] = useState(0);
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

  useEffect(() => {
    // Update API params when product changes
    setApiParams(prev => ({
      ...prev,
      productType: selectedProduct
    }));
  }, [selectedProduct]);

  // Add new useEffect for selectedMetric changes
  useEffect(() => {
    if (apiParams.productType) {  // Only call if we have a product selected
      setLoadingUix(true);
      getEngagementDataByOverTime(apiParams, setEngagementDataByOverTime, selectedMetric)
        .then(() => setLoadingUix(false))
        .catch((error) => {
          console.error('Error fetching engagement data:', error);
          toast.error('Failed to update engagement data');
          setLoadingUix(false);
        });
    }
  }, [selectedMetric]);

  const handleRetry = () => {
    setFilters({ ...filters });
  };

  useEffect(() => {
    initailCall();
  }, []);

  const initailCall = () => {
    setLoadingUix(false);
    getTileData(apiParams, setTileData);
    getWordCloudData(apiParams, setWordCloudData, setHashtagPerformance, setSentimentData);
    getEngagementDataByPost(apiParams, setEngagementDataByPost);
    getEngagementDataByOverTime(apiParams, setEngagementDataByOverTime, selectedMetric);
    getClicksPerPost(apiParams, setClicksPerPost);
    getInsights(apiParams).then(setInsightsData);
    getPostEngagementTable(apiParams, setTableData);
    getTableData(apiParams, setTableData, 1, 10, setTotalPosts);
  }

  // Transform tile data into metrics
  const linkedInMetrics = transformLinkedInMetrics(tileData);


  const fileUploadOnSuccess = () => {
    setLoadingUix(true);
    setTimeout(() => {
      refreshAllData(apiParams);
    }, 1500);
  };

  const handleProductChange = (product: any) => {
    const newProduct = product.id;
    setSelectedProduct(newProduct);

    // Keep existing dates if any when changing product
    const newParams = {
      ...apiParams,
      productType: newProduct
    };
    refreshAllData(newParams);
  };

  const handleMediaChange = (media: any) => {
    // Handle media change here
    console.log('Selected media:', media);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleSearchResultSelect = async (selectedPosts: string[]) => {
    try {
      // Refresh dashboard data with selected posts
      const newParams = {
        ...apiParams,
        postIds: selectedPosts
      };
      refreshAllData(newParams);
    } catch (error) {
      console.error('Error handling selected posts:', error);
      toast.error('Failed to update dashboard with selected posts');
    }
  };

  const handleDateRangeChange = (dates: { start: Date; end: Date }) => {
    if (dates.start && dates.end) {
      const newParams = {
        ...apiParams,
        startDate: dates.start.toISOString().split('T')[0],
        endDate: dates.end.toISOString().split('T')[0]
      };
      setApiParams(newParams);

      // Refresh all data with new date range
      refreshAllData(newParams);
    } else {
      // If dates are cleared, remove them from params
      const { startDate, endDate, ...restParams } = apiParams;
      setApiParams(restParams);
      refreshAllData(restParams);
    }
  };
  useEffect(() => {
    getTableData(apiParams, setTableData, currentPage, 10, setTotalPosts);
  }, [currentPage]);

  const refreshAllData = async (params: ApiParams) => {
    setLoadingUix(true);
    try {
      await Promise.all([
        getTileData(params, setTileData),
        getWordCloudData(params, setWordCloudData, setHashtagPerformance, setSentimentData),
        getEngagementDataByPost(params, setEngagementDataByPost),
        getEngagementDataByOverTime(params, setEngagementDataByOverTime, selectedMetric),
        getClicksPerPost(params, setClicksPerPost),
        getInsights(params).then(setInsightsData),
        getPostEngagementTable(params, setTableData)
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data');
    } finally {
      setLoadingUix(false);
    }
  };

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {linkedInMetrics.map(metric => (
                  <MetricCard key={metric.id} metric={metric as any} />
                ))}
              </div>
              {insightsData && (
                <InsightCharts data={insightsData} />
              )}

              {/* LinkedIn Charts */}
              <div className="grid grid-cols-2 gap-8 mt-8">
                <KeywordTrendsCharts words={wordCloudData} />
                {/* <FollowersGrowthChart data={mockLinkedInData.followers} /> */}
                <HashtagPerformanceChart data={hashtagPerformance} />


              </div>
              <div className="grid grid-cols-1 gap-8 mt-8">
                <EngagementTimeChart
                  data={engagementDataByOverTime}
                  selectedMetric={selectedMetric}
                  setSelectedMetric={setSelectedMetric}
                />
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

              {/* Add Insights Section */}

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
      <div className="min-h-screen dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center space-x-4">
            <div className="flex items-center space-x-4 min-w-[400px]">
              <div className="w-60">
                <ProductFilter onProductChange={handleProductChange} />
              </div>
              <div className="w-60">
                <MediaFilter onProductChange={handleMediaChange} />
              </div>
            </div>
            <div className="flex items-center space-x-4 mx-auto">
              <DateRangeFilter onDateChange={handleDateRangeChange} />
              <SearchInput
                onSearch={handleSearch}
                onResultSelect={handleSearchResultSelect}
                selectedProduct={selectedProduct}
                apiParams={apiParams}
              />
            </div>
            <div className="flex items-center justify-end space-x-4 mx-auto">
            <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-[#5b8bfb] hover:bg-primary-600 text-white px-4 py-2 rounded-md h-10 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Upload className="h-5" />
                Upload
              </button>
            </div>
            <FileUploadModal
              isOpen={isUploadModalOpen}
              onClose={() => setIsUploadModalOpen(false)}
              fileType="excel"
              onFileUpload={handleFileUpload}
            />
          </div>
          <Toaster />
          {/* <FilterSection filters={filters} onFiltersChange={setFilters} fileUploadOnSuccess={fileUploadOnSuccess} toast={toast} /> */}
          {renderContent()}
          <div className="mt-8">
            <PostEngagementTable data={tableData} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPosts={totalPosts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;