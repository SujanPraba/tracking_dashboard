import { MetricData, LinkedInMetrics } from '../types/dashboard';
import likeIcon from '../assets/heart.png'
import shareIcon from '../assets/share.png'
import click from '../assets/clickRate.png'
import view from "../assets/eye.png"
import engagement from "../assets/eng.png"
import growth from "../assets/growth.png"

export const transformLinkedInMetrics = (tileData: LinkedInMetrics): MetricData[] => {
  return [
    {
      id: 'profile_views',
      title: 'Profile Views',
      value: tileData?.profileViews?.value || 0,
      change: tileData?.profileViews?.change || 0,
      changeType: (tileData?.profileViews?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: view,
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-600'
    },
    {
      id: 'post_reach',
      title: 'Post Reach',
      value: tileData?.postReach?.value || 0,
      change: tileData?.postReach?.change || 0,
      changeType: (tileData?.postReach?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: shareIcon,
      gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    },
    {
      id: 'post_likes',
      title: 'Post Likes',
      value: tileData?.postLikes?.value || 0,
      change: tileData?.postLikes?.change || 0,
      changeType: (tileData?.postLikes?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: likeIcon,
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600'
    },
    {
      id: 'engagement_rate',
      title: 'Engagement Rate',
      value: `${(tileData?.engagementRate?.value || 0).toFixed(2)}%`,
      change: tileData?.engagementRate?.change || 0,
      changeType: (tileData?.engagementRate?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: engagement,
      gradient: 'bg-gradient-to-br from-orange-500 to-amber-600'
    },
    {
      id: 'ctr',
      title: 'Click-Through Rate',
      value: `${(tileData?.clickThroughRate?.value || 0).toFixed(2)}%`,
      change: tileData?.clickThroughRate?.change || 0,
      changeType: (tileData?.clickThroughRate?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: click,
      gradient: 'bg-gradient-to-br from-green-500 to-lime-600'
    },
    {
      id: 'top_post',
      title: 'Top Performing Post',
      value: tileData?.topPerformingPost?.title || 'No posts yet',
      change: tileData?.topPerformingPost?.change || 0,
      changeType: 'neutral',
      icon: growth,
      gradient: 'bg-gradient-to-br from-red-500 to-pink-600'
    }
  ];
};