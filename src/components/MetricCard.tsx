import React from 'react';
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { MetricData } from '../types/dashboard';

interface MetricCardProps {
  metric: MetricData;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const IconComponent = (LucideIcons as any)[metric.icon] || LucideIcons.BarChart3;

  const getChangeIcon = () => {
    switch (metric.changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getChangeColor = () => {
    switch (metric.changeType) {
      case 'increase':
        return 'text-green-600 dark:text-green-400';
      case 'decrease':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatValue = (value: number) => {
    if (metric.id === 'performance') {
      return `${value}%`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200 group"
    style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
          <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          {getChangeIcon()}
          <span className="text-sm font-medium">
            {Math.abs(metric.change)}%
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {metric.title}
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatValue(metric.value)}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;