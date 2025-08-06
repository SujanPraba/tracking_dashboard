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
      id: 'impressions',
      title: 'Impressions',
      value: tileData?.impressions?.value || 0,
      change: tileData?.impressions?.change || 0,
      changeType: 'neutral',
      icon: growth,
      gradient: 'bg-gradient-to-br from-orange-400 to-orange-800' // unique
    },
    {
      id: 'reactions',
      title: 'Reactions',
      value: tileData?.reactions?.value || 0,
      change: tileData?.reactions?.change || 0,
      changeType: 'neutral',
      icon: click,
      gradient: 'bg-gradient-to-br from-indigo-500 to-violet-700' // unique
    },
    {
      id: 'comments',
      title: 'Comments',
      value: tileData?.comments?.value || 0,
      change: tileData?.comments?.change || 0,
      changeType: 'neutral',
      icon: click,
      gradient: 'bg-gradient-to-br from-yellow-400 to-amber-700' // unique
    },
    {
      id: 'repost',
      title: 'Repost',
      value: `${(tileData?.clickThroughRate?.value || 0).toFixed(2)}%`,
      change: tileData?.clickThroughRate?.change || 0,
      changeType: (tileData?.clickThroughRate?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: click,
      gradient: 'bg-gradient-to-br from-lime-500 to-green-600' // unique
    },
    {
      id: 'profile_views',
      title: 'Profile Views',
      value: tileData?.profileViews?.value || 0,
      change: tileData?.profileViews?.change || 0,
      changeType: (tileData?.profileViews?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: view,
      gradient: 'bg-gradient-to-br from-sky-500 to-purple-700' // unique
    },
    {
      id: 'post_reach',
      title: 'Post Reach',
      value: tileData?.postReach?.value || 0,
      change: tileData?.postReach?.change || 0,
      changeType: (tileData?.postReach?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: shareIcon,
      gradient: 'bg-gradient-to-br from-teal-500 to-cyan-700' // unique
    },
    {
      id: 'post_likes',
      title: 'Post Likes',
      value: tileData?.postLikes?.value || 0,
      change: tileData?.postLikes?.change || 0,
      changeType: (tileData?.postLikes?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: likeIcon,
      gradient: 'bg-gradient-to-br from-fuchsia-500 to-pink-600' // unique
    },
    {
      id: 'engagement_rate',
      title: 'Engagement Rate',
      value: `${(tileData?.engagementRate?.value || 0).toFixed(2)}%`,
      change: tileData?.engagementRate?.change || 0,
      changeType: (tileData?.engagementRate?.change || 0) >= 0 ? 'increase' : 'decrease',
      icon: engagement,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-800'
    },

  ];
};
