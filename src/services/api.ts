import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { MetricData, ChartDataPoint, SentimentData, VideoEngagementData, DashboardFilters } from '../types/dashboard';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.socialmedia-dashboard.com/v1';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Functions
export const dashboardAPI = {
  // Get dashboard metrics
  getMetrics: async (filters: DashboardFilters): Promise<MetricData[]> => {
    try {
      const response = await apiClient.get('/metrics', {
        params: {
          platform: filters.platform,
          startDate: filters.dateRange.start.toISOString(),
          endDate: filters.dateRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  },

  // Get keyword analysis data
  getKeywordData: async (filters: DashboardFilters): Promise<ChartDataPoint[]> => {
    try {
      const response = await apiClient.get('/analytics/keywords', {
        params: {
          platform: filters.platform,
          startDate: filters.dateRange.start.toISOString(),
          endDate: filters.dateRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching keyword data:', error);
      throw error;
    }
  },

  // Get sentiment analysis data
  getSentimentData: async (filters: DashboardFilters): Promise<SentimentData[]> => {
    try {
      const response = await apiClient.get('/analytics/sentiment', {
        params: {
          platform: filters.platform,
          startDate: filters.dateRange.start.toISOString(),
          endDate: filters.dateRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sentiment data:', error);
      throw error;
    }
  },

  // Get posting frequency data
  getFrequencyData: async (filters: DashboardFilters): Promise<ChartDataPoint[]> => {
    try {
      const response = await apiClient.get('/analytics/frequency', {
        params: {
          platform: filters.platform,
          startDate: filters.dateRange.start.toISOString(),
          endDate: filters.dateRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching frequency data:', error);
      throw error;
    }
  },

  // Get video engagement data
  getVideoEngagementData: async (filters: DashboardFilters): Promise<VideoEngagementData[]> => {
    try {
      const response = await apiClient.get('/analytics/video-engagement', {
        params: {
          platform: filters.platform,
          startDate: filters.dateRange.start.toISOString(),
          endDate: filters.dateRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching video engagement data:', error);
      throw error;
    }
  },

  // Get available social media platforms
  getPlatforms: async () => {
    try {
      const response = await apiClient.get('/platforms');
      return response.data;
    } catch (error) {
      console.error('Error fetching platforms:', error);
      throw error;
    }
  },
};

// Export the configured axios instance for custom requests
export { apiClient };
export default dashboardAPI;