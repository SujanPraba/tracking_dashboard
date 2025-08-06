export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface MetricData {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: any;
  gradient: string;
}

export interface LinkedInMetrics {
  profileViews?: {
    value: number;
    change: number;
  };
  postReach?: {
    value: number;
    change: number;
  };
  postLikes?: {
    value: number;
    change: number;
  };
  engagementRate?: {
    value: number;
    change: number;
  };
  clickThroughRate?: {
    value: number;
    change: number;
  };
  topPerformingPost?: {
    title: string;
    change: number;
  };
  impressions?: {
    value: number;
    change: number;
  };
  reactions?: {
    value: number;
    change: number;
  };
  comments?: {
    value: number;
    change: number;
  };
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