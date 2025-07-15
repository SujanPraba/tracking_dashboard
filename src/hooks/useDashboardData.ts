import { useState, useEffect } from 'react';
import { MetricData, ChartDataPoint, SentimentData, VideoEngagementData, DashboardFilters } from '../types/dashboard';
import dashboardAPI from '../services/api';
import { metricsData, keywordData, sentimentData, frequencyData, videoEngagementData } from '../data/mockData';

interface DashboardData {
  metrics: MetricData[];
  keywordData: ChartDataPoint[];
  sentimentData: SentimentData[];
  frequencyData: ChartDataPoint[];
  videoEngagementData: VideoEngagementData[];
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (filters: DashboardFilters): DashboardData => {
  const [data, setData] = useState<DashboardData>({
    metrics: metricsData,
    keywordData: keywordData,
    sentimentData: sentimentData,
    frequencyData: frequencyData,
    videoEngagementData: videoEngagementData,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData(prev => ({ ...prev, loading: true, error: null }));

      try {
        // For demo purposes, we'll use mock data
        // In production, uncomment the API calls below:
        
        /*
        const [metrics, keywords, sentiment, frequency, videoEngagement] = await Promise.all([
          dashboardAPI.getMetrics(filters),
          dashboardAPI.getKeywordData(filters),
          dashboardAPI.getSentimentData(filters),
          dashboardAPI.getFrequencyData(filters),
          dashboardAPI.getVideoEngagementData(filters),
        ]);

        setData({
          metrics,
          keywordData: keywords,
          sentimentData: sentiment,
          frequencyData: frequency,
          videoEngagementData: videoEngagement,
          loading: false,
          error: null,
        });
        */

        // Simulate API delay for demo
        await new Promise(resolve => setTimeout(resolve, 1000));

        setData({
          metrics: metricsData,
          keywordData: keywordData,
          sentimentData: sentimentData,
          frequencyData: frequencyData,
          videoEngagementData: videoEngagementData,
          loading: false,
          error: null,
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch dashboard data. Please try again.',
        }));
      }
    };

    fetchData();
  }, [filters]);

  return data;
};