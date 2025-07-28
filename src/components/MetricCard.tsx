import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, MousePointer, TrendingUp, Trophy, Users, Info } from 'lucide-react';
interface MetricCardProps {
  metric: {
    id: string;
    title: string;
    value: number | string;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: any;
    gradient: string;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {

  const formatValue = (value: number | string) => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toString();
    }
    return value;
  };
  const truncateText = (text: string) => {
    if (text.length <= 100) return text;
    return `${text.slice(0, 30)}...`;
  };
  interface MetricCardProps {
    title: string;
    value: string | number;
    change: string | number;
    gradient: string;
    icon: React.ReactNode;
    delay?: number;
    fullValue?: string | number;
    metricId: string;
  }
  const getMetricDescription = (id: string) => {
    switch(id) {
      case 'profile_views':
        return 'Number of times your profile was viewed';
      case 'post_reach':
        return 'Total number of unique users who saw your posts';
      case 'post_likes':
        return 'Total number of likes received on your posts';
      case 'engagement_rate':
        return 'Percentage of engaged users relative to reach';
      case 'ctr':
        return 'Click-through rate on your posts';
      case 'top_post':
        return 'Your best performing post';
      default:
        return '';
    }
  };

  const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, gradient, icon, delay = 0, fullValue, metricId }) => (
    <div
      className={`${gradient} min-h-40 p-5 rounded-2xl cursor-auto shadow-xl text-white transform hover:scale-105 transition-all duration-300 animate-fade-in-up relative`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
        <div className="group relative">
          <Info className="w-5 h-5 text-white/70 hover:text-white" />
          <div className="absolute shadow-xl right-0 top-6 w-48 p-2 bg-white/20 text-[11px] text-white rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            {getMetricDescription(metricId)}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-1" title={fullValue?.toString()}>{title === 'post_reach' ? formatValue(value) : value}</h3>
      <p className="text-white/80 text-sm">{title}</p>
    </div>
  );

  const renderMetricImage = (metric: any)=>{
    switch(metric.id){
      case 'profile_views':
        return <Users className="w-6 h-6" />
      case 'post_reach':
        return <TrendingUp className="w-6 h-6" />
      case 'post_likes':
        return <Heart className="w-6 h-6" />
      case 'engagement_rate':
        return <MessageCircle className="w-6 h-6" />
      case 'ctr':
        return <MousePointer className="w-6 h-6" />
      case 'top_post':
        return <Trophy className="w-6 h-6" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=""
    >
      <MetricCard
        title={metric.title}
        value={metric.id === 'top_post' ? truncateText(metric.value as string) : formatValue(metric.value)}
        change={metric.change}
        gradient={metric.gradient}
        icon={renderMetricImage(metric)}
        delay={0}
        fullValue={metric.value}
        metricId={metric.id}
      />
    </motion.div>
  );
};

export default MetricCard;