export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface MetricData {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  category?: string;
}

export interface SentimentData {
  sentiment: string;
  value: number;
  color: string;
}

export interface VideoEngagementData {
  time: string;
  views: number;
  engagement: number;
}

export interface DashboardFilters {
  platform: string;
  dateRange: {
    start: Date;
    end: Date;
  };
}