import React from 'react';
import { Video } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { VideoEngagementData } from '../../types/dashboard';
import { customTooltipStyle, customTooltipStyleLight } from '../../utils/chartColors';
import { useTheme } from '../../context/ThemeContext';

interface VideoEngagementChartProps {
  data: VideoEngagementData[];
}

const VideoEngagementChart: React.FC<VideoEngagementChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tooltipStyle = theme === 'dark' ? customTooltipStyle : customTooltipStyleLight;
      return (
        <div style={tooltipStyle}>
          <p className="font-semibold mb-2">Time: {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm mb-1">
              <span className="inline-block w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: entry.color }}></span>
              {entry.name}: <span className="font-bold">
                {entry.name === 'Views' ? entry.value.toLocaleString() : `${entry.value}%`}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Video Engagement
        </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Views and engagement over video duration
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}
            />
            <YAxis tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500',
                color: theme === 'dark' ? '#D1D5DB' : '#374151'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="views" 
              stroke="#8B5CF6" 
              fill="url(#viewsGradient)"
              strokeWidth={3}
              name="Views"
            />
            <Area 
              type="monotone" 
              dataKey="engagement" 
              stroke="#F59E0B" 
              fill="url(#engagementGradient)"
              strokeWidth={3}
              name="Engagement Rate"
            />
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VideoEngagementChart;