import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../../types/dashboard';
import { customTooltipStyle, customTooltipStyleLight } from '../../utils/chartColors';
import { useTheme } from '../../context/ThemeContext';

interface FrequencyChartProps {
  data: ChartDataPoint[];
}

const FrequencyChart: React.FC<FrequencyChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tooltipStyle = theme === 'dark' ? customTooltipStyle : customTooltipStyleLight;
      return (
        <div style={tooltipStyle}>
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: '#10B981' }}></span>
            Posts: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Posting Frequency
        </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Daily posting activity throughout the week
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}
            />
            <YAxis tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#10B981" 
              strokeWidth={4}
              dot={{ 
                fill: '#10B981', 
                strokeWidth: 3, 
                r: 6,
                stroke: '#ffffff',
                strokeOpacity: 0.8
              }}
              activeDot={{ 
                r: 10, 
                fill: '#10B981',
                stroke: '#ffffff',
                strokeWidth: 3,
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FrequencyChart;