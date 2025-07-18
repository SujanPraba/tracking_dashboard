import React from 'react';
import { motion } from 'framer-motion';
interface MetricCardProps {
  metric: {
    id: string;
    title: string;
    value: number | string;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: any;
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

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const getChangeColor = () => {
    if (metric.changeType === 'increase') return 'text-green-500 dark:text-green-400';
    if (metric.changeType === 'decrease') return 'text-red-500 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-1 rounded-lg shadow-md`}>
            {/* <IconComponent className={`h-5 w-5 `} /> */}
            <img src={metric.icon} alt={metric.title} className='h-7 w-7' />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {metric.title}
          </h3>
        </div>
        <div className='flex items-center space-x-2'>
          {/* {metric.change > 0 ? (
          <TrendingUp
            className={`h-5 w-5 ${getChangeColor()}`}
          />
          ) : (
            <TrendingDown className={`h-5 w-5 text-red-500`}/>
          )} */}
        {metric.change !== 0 && (
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {metric.change > 0 ? '+' : ''}{metric.change}%
          </span>
        )}
        </div>
      </div>
      <div className="mt-2">
        <div title={metric.id === 'top_post' ? metric.value as string : ''} className={`${metric.id === 'top_post' ? 'text-sm font-medium' : 'text-2xl font-semibold'} text-gray-600 dark:text-white`}>
          {metric.id === 'top_post' ? truncateText(metric.value as string) : formatValue(metric.value)}
        </div>

      </div>
    </motion.div>
  );
};

export default MetricCard;