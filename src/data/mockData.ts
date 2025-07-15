import { SocialMediaPlatform, MetricData, ChartDataPoint, SentimentData, VideoEngagementData } from '../types/dashboard';

export const socialMediaPlatforms: SocialMediaPlatform[] = [
  { id: 'all', name: 'All Platforms', icon: 'Globe', color: '#6B7280' },
  { id: 'facebook', name: 'Facebook', icon: 'Users', color: '#1877F2' },
  { id: 'twitter', name: 'Twitter', icon: 'MessageCircle', color: '#1DA1F2' },
  { id: 'instagram', name: 'Instagram', icon: 'Camera', color: '#E4405F' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'Briefcase', color: '#0A66C2' },
  { id: 'youtube', name: 'YouTube', icon: 'Play', color: '#FF0000' },
];

export const metricsData: MetricData[] = [
  {
    id: 'likes',
    title: 'Total Likes',
    value: 24567,
    change: 12.5,
    changeType: 'increase',
    icon: 'Heart'
  },
  {
    id: 'comments',
    title: 'Comments',
    value: 3421,
    change: -2.1,
    changeType: 'decrease',
    icon: 'MessageCircle'
  },
  {
    id: 'shares',
    title: 'Shares',
    value: 1234,
    change: 8.3,
    changeType: 'increase',
    icon: 'Share2'
  },
  {
    id: 'performance',
    title: 'Page Performance',
    value: 87,
    change: 5.2,
    changeType: 'increase',
    icon: 'TrendingUp'
  }
];

export const keywordData: ChartDataPoint[] = [
  { name: 'Social Media', value: 450 },
  { name: 'Marketing', value: 380 },
  { name: 'Content', value: 320 },
  { name: 'Engagement', value: 280 },
  { name: 'Analytics', value: 240 },
  { name: 'Strategy', value: 200 },
  { name: 'Digital', value: 180 },
  { name: 'Brand', value: 160 },
  { name: 'Influencer', value: 140 },
  { name: 'Campaign', value: 120 },
  { name: 'ROI', value: 100 },
  { name: 'Conversion', value: 85 }
];

export const sentimentData: SentimentData[] = [
  { sentiment: 'Positive', value: 65, color: '#10B981' },
  { sentiment: 'Neutral', value: 25, color: '#6B7280' },
  { sentiment: 'Negative', value: 10, color: '#EF4444' }
];

export const frequencyData: ChartDataPoint[] = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 52 },
  { name: 'Wed', value: 48 },
  { name: 'Thu', value: 61 },
  { name: 'Fri', value: 55 },
  { name: 'Sat', value: 40 },
  { name: 'Sun', value: 35 }
];

export const videoEngagementData: VideoEngagementData[] = [
  { time: '0:00', views: 1000, engagement: 95 },
  { time: '0:30', views: 950, engagement: 90 },
  { time: '1:00', views: 900, engagement: 85 },
  { time: '1:30', views: 850, engagement: 80 },
  { time: '2:00', views: 800, engagement: 75 },
  { time: '2:30', views: 750, engagement: 70 },
  { time: '3:00', views: 700, engagement: 65 },
  { time: '3:30', views: 650, engagement: 60 },
  { time: '4:00', views: 600, engagement: 55 },
  { time: '4:30', views: 550, engagement: 50 }
];