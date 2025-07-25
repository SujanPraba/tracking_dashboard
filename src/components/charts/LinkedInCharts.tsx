import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import ReactWordcloud from 'react-wordcloud';
import loadergif from "../../assets/loader.svg"

const LoadingState = () => (
  <div className="h-[300px] w-full flex items-center justify-center">
    <img src={loadergif} alt="loader" className="w-18 h-18" />
  </div>
);

// Engagement Over Time Chart
export const EngagementTimeChart = ({ data }: { data: { engagementOverTime: Array<{ date: string; engagementRate: string }> } }) => {
  const formattedData = data?.engagementOverTime?.map(item => ({
    date: item.date,
    engagement: parseFloat(item.engagementRate) * 100
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-alice-blue dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}
    >
      <h3 className="text-[14px] font-[400] text-gray-800 dark:text-white mb-4">
        Engagement Over Time
      </h3>
      {!data?.engagementOverTime ? <LoadingState /> : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="date"
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              angle={-90}
              textAnchor="end"
              // height={50}
              // interval={30}
            />
            <YAxis
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toFixed(2)}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 'normal'
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Engagement Rate']}
            />
            <Legend
              fontSize={6}
              verticalAlign="top"
              height={36}
              formatter={(value) => <span style={{ color: '#8BA3FB', fontSize: '10px', fontWeight: '300' }}>{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#8BA3FB"
              strokeWidth={2}
              dot={{ fill: '#8BA3FB', r: 1 }}
              name="Engagement Rate"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

// Followers Growth Chart
export const FollowersGrowthChart = ({ data }: { data: any[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="bg-alice-blue dark:bg-periwinkle-100 p-6 rounded-xl shadow-lg"
  >
    <h3 className="text-[14px] font-[400] text-periwinkle-200 dark:text-lavender-400 mb-4">
      Followers Growth
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="date" stroke="#718096" fontSize={10} />
        <YAxis stroke="#718096" fontSize={10} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px'
          }}
        />
        <Area
          type="monotone"
          dataKey="followers"
          stroke="#B6CCFE"
          fill="#B6CCFE"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </motion.div>
);

// Post Type Engagement Chart
export const PostTypeEngagementChart = ({ data }: { data: { engagementByPostTypes: Array<{ postType: string; engagementRate: string }> } }) => {
  const formattedData = data?.engagementByPostTypes?.map(item => ({
    type: item.postType,
    engagement: parseFloat(item.engagementRate) * 100
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-alice-blue dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}
    >
      <h3 className="text-[14px] font-[400] text-gray-800 dark:text-white mb-4">
        Engagement by Post Type
      </h3>
      {!data?.engagementByPostTypes ? <LoadingState /> : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="type"
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toFixed(2)}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 'normal'
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Engagement Rate']}
            />
            <Legend
              fontSize={6}
              verticalAlign="top"
              height={36}
              formatter={(value) => <span style={{ color: '#8BA3FB', fontSize: '10px', fontWeight: '300' }}>{value}</span>}
            />
            <Bar
              dataKey="engagement"
              fill="#8BA3FB"
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="Engagement Rate"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

// Demographics Chart
export const DemographicsChart = ({ data }: { data: any[] }) => {
  const COLORS = ['#EDF2FB', '#E2EAFC', '#D7E3FC', '#CCDBFD', '#C1D3FE', '#B6CCFE'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-alice-blue dark:bg-periwinkle-100 p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-[14px] font-[400] text-periwinkle-200 dark:text-lavender-400 mb-4">
        Viewer Demographics
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label

          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// Clicks per Post Type Chart
export const ClicksPerPostTypeChart = ({ data }: { data: { clicksPerPostTypes: Array<{ postType: string; clicks: string | number; ctr: string }> } }) => {
  const formattedData = data?.clicksPerPostTypes?.map(item => ({
    postType: item.postType,
    clicks: Number(item.clicks),
    ctr: parseFloat(item.ctr) * 100
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-alice-blue dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}
    >
      <h3 className="text-[14px] font-[400] text-gray-800 dark:text-white mb-4">
        Clicks per Post Type
      </h3>
      {!data?.clicksPerPostTypes ? <LoadingState /> : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="postType"
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toFixed(2)}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 'normal'
              }}
              formatter={(value: number, name: string) => [
                name === 'clicks' ? value.toLocaleString() : `${value.toFixed(2)}%`,
                name === 'clicks' ? 'Clicks' : 'CTR'
              ]}
            />
            <Legend
              fontSize={6}
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span style={{
                  color: value === 'clicks' ? '#8BA3FB' : '#B6CCFE',
                  fontSize: '10px',
                  fontWeight: '300'
                }}>
                  {value === 'clicks' ? 'Clicks' : 'CTR'}
                </span>
              )}
            />
            <Bar
              yAxisId="left"
              dataKey="clicks"
              fill="#8BA3FB"
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="clicks"
            />
            <Bar
              yAxisId="right"
              dataKey="ctr"
              fill="#B6CCFE"
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="ctr"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

// Sentiment Chart
export const SentimentChart = ({ data }: { data: Array<{ date: string; positive: number; negative: number; neutral: number }> }) => {
  const formattedData = data ? [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-alice-blue dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}
    >
      <h3 className="text-[14px] font-[400] text-gray-800 dark:text-white mb-4">
        Sentiment Analysis Over Time
      </h3>
      {!data || data.length === 0 ? <LoadingState /> : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="date"
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 'normal'
              }}
              formatter={(value: number, name: string) => [
                value,
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Legend
              fontSize={6}
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span style={{
                  color: value === 'positive' ? '#4CAF50' :
                         value === 'negative' ? '#EF5350' : '#FFC107',
                  fontSize: '10px',
                  fontWeight: '300'
                }}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="positive"
              stackId="1"
              stroke="#4CAF50"
              fill="#4CAF50"
              fillOpacity={0.3}
              name="positive"
            />
            <Area
              type="monotone"
              dataKey="negative"
              stackId="1"
              stroke="#EF5350"
              fill="#EF5350"
              fillOpacity={0.3}
              name="negative"
            />
            <Area
              type="monotone"
              dataKey="neutral"
              stackId="1"
              stroke="#FFC107"
              fill="#FFC107"
              fillOpacity={0.3}
              name="neutral"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

// Time of Day Engagement Chart
export const TimeOfDayEngagementChart = ({ data }: { data: any[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-alice-blue dark:bg-periwinkle-100 p-6 rounded-xl shadow-lg"
  >
    <h3 className="text-[14px] font-[400] text-periwinkle-200 dark:text-lavender-400 mb-4">
      Time of Day Engagement
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis
          dataKey="hour"
          stroke="#718096"
          tickFormatter={(hour) => `${hour}:00`}
          fontSize={10}
        />
        <YAxis stroke="#718096" fontSize={10} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            fontSize: '12px'
          }}
          labelFormatter={(hour) => `${hour}:00`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="engagement"
          stroke="#B6CCFE"
          strokeWidth={2}
          dot={{ fill: '#B6CCFE' }}
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);

// Hashtag Performance Chart
export const HashtagPerformanceChart = ({ data }: {
  data: {
    hashtagPerformance: Array<{
      hashtag: string;
      count: number;
      totalEngagement: number;
      avgEngagement: number;
      positiveSentiment: number;
      negativeSentiment: number;
      neutralSentiment: number;
    }>
  }
}) => {
  const formattedData = data?.hashtagPerformance ?
    [...data.hashtagPerformance]
      .sort((a, b) => b.count - a.count)
      .map(item => ({
        hashtag: `#${item.hashtag}`,
        count: item.count
      })) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-alice-blue dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}
    >
      <h3 className="text-[14px] font-[400] text-gray-800 dark:text-white mb-4">
        Top Performed Hashtags
      </h3>
      {!data?.hashtagPerformance ? <LoadingState /> : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              type="number"
              stroke="#718096"
              fontSize={8}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="hashtag"
              type="category"
              stroke="#718096"
              width={100}
              fontSize={8}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: 'normal'
              }}
              formatter={(value: number) => [`${value} times`, 'Used']}
            />
            <Legend
              fontSize={6}
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span style={{
                  color: '#8BA3FB',
                  fontSize: '10px',
                  fontWeight: '300'
                }}>
                  Usage Count
                </span>
              )}
            />
            <Bar
              dataKey="count"
              fill="#8BA3FB"
              radius={[0, 4, 4, 0]}
              name="count"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};
export const KeywordTrendsCharts = ({ words }: { words: any[] | null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-alice-blue dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}
    >
      <h3 className="text-[14px] font-[400] text-gray-800 dark:text-white mb-4">
        Keyword Trends
      </h3>
      {!words || words.length === 0 ? <LoadingState /> : (
        <ResponsiveContainer width="100%" height={300}>
          <ReactWordcloud
            words={words}
            size={[490, 300]}
            options={{
              enableTooltip: true,
              deterministic: false,
              fontFamily: 'Poppins',
              fontSizes: [20, 50],
              fontStyle: 'normal',
              fontWeight: 'normal',
              padding: 1,
              rotations: 3,
              rotationAngles: [0, 90],
              scale: 'sqrt',
              spiral: 'archimedean',
              transitionDuration: 1000,
            }}
          />
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};