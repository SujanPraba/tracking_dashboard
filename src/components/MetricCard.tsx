import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, MousePointer, TrendingUp, Trophy, Users } from 'lucide-react';
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
  }
  const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, gradient, icon, delay = 0 }) => (
    <div
      className={`${gradient} min-h-40 p-5 rounded-2xl cursor-auto shadow-xl text-white transform hover:scale-105 transition-all duration-300 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
        {/* <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{change}</span> */}
      </div>
      <h3 className="text-xl font-bold mb-1">{title === 'post_reach' ? formatValue(value) : value}</h3>
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
      />
    </motion.div>
  );
};

export default MetricCard;