import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SentimentData } from '../../types/dashboard';
import { customTooltipStyle, customTooltipStyleLight } from '../../utils/chartColors';
import { useTheme } from '../../context/ThemeContext';

interface SentimentChartProps {
  data: SentimentData[];
}

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  // Enhanced colors for better contrast
  const enhancedData = data.map((item, index) => ({
    ...item,
    color: index === 0 ? '#10B981' : index === 1 ? '#6B7280' : '#EF4444' // Emerald, Gray, Red
  }));
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const tooltipStyle = theme === 'dark' ? customTooltipStyle : customTooltipStyleLight;
      return (
        <div style={tooltipStyle}>
          <p className="font-semibold mb-1">{data.sentiment}</p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: data.color }}></span>
            Percentage: <span className="font-bold">{data.value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="14"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <PieChartIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Sentiment Analysis
        </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Overall sentiment distribution
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={enhancedData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={CustomLabel}
            >
              {enhancedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}
              formatter={(value, entry: any) => (
                <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#374151' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentChart;