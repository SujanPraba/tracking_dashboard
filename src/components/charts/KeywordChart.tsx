import React from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../../types/dashboard';
import { generateColorPalette, customTooltipStyle, customTooltipStyleLight } from '../../utils/chartColors';
import { useTheme } from '../../context/ThemeContext';

interface KeywordChartProps {
  data: ChartDataPoint[];
}

const KeywordChart: React.FC<KeywordChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const colors = generateColorPalette(data.length);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tooltipStyle = theme === 'dark' ? customTooltipStyle : customTooltipStyleLight;
      return (
        <div style={tooltipStyle}>
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: payload[0].color }}></span>
            Mentions: <span className="font-bold">{payload[0].value.toLocaleString()}</span>
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
          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Keyword Analysis
        </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Most mentioned keywords across platforms
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }} />
            <Tooltip content={<CustomTooltip />} />
            {data.map((entry, index) => (
              <Bar 
                key={`bar-${index}`}
                dataKey="value" 
                fill={colors[index]}
                radius={[6, 6, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KeywordChart;