import React from 'react';
import { delay, motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock, FileType, Star, Hash } from 'lucide-react';

interface InsightData {
    topKeywords: Array<{
        keyword: string;
        avgEngagement: number;
        sentiment: string;
    }>;
    bestTimeToPost: string;
    bestPostType: string;
    mostRelevantPosts: Array<{
        postTitle: string;
        engagementRate: number;
        relevanceScore: number;
    }>;
}

interface InsightChartsProps {
    data: InsightData;
}

const InsightCharts: React.FC<InsightChartsProps> = ({ data }) => {
    // Generate random color with good saturation and lightness
    const generateRandomColor = () => {
        const hue = Math.floor(Math.random() * 360); // Random hue (0-360)
        const saturation = Math.floor(Math.random() * 20) + 60; // 60-80% saturation
        const lightness = Math.floor(Math.random() * 20) + 45; // 45-65% lightness
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    // Generate unique colors for each data point
    const getUniqueColors = (count: number) => {
        const colors: string[] = [];
        const hueStep = 360 / count;

        for (let i = 0; i < count; i++) {
            const hue = Math.floor(i * hueStep + Math.random() * (hueStep * 0.8));
            const saturation = Math.floor(Math.random() * 20) + 60; // 60-80%
            const lightness = Math.floor(Math.random() * 20) + 45; // 45-65%
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }

        return colors;
    };

    // Format data for donut chart and assign colors
    const donutData = data.topKeywords.map((item, index) => ({
        name: item.keyword,
        value: item.avgEngagement,
        percentage: `${(item.avgEngagement * 100).toFixed(0)}%`,
        color: getUniqueColors(data.topKeywords.length)[index]
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{payload[0].payload.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                        Engagement: {(payload[0].value * 100).toFixed(2)}%
                    </p>
                </div>
            );
        }
        return null;
    };

    const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 1.1; // Increased distance
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const engagement = `${(value * 100).toFixed(2)}%`;

        return (
            <g>
                <text
                    x={x}
                    y={y}
                    fill="#374151"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    className="text-xs font-medium"
                >
                    {name} ({engagement})
                </text>
            </g>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Most Relevant Posts */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-alice-blue dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 lg:col-span-2"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    <h3 className="text-[14px] font-[400] text-gray-800 dark:text-white">
                        Top Performing Posts
                    </h3>
                </div>
                <div className="space-y-3">
                    {data.mostRelevantPosts.slice(0, 5).map((post, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
                        >
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                                {index + 1}
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-sm text-gray-800 dark:text-gray-200 truncate" title={post.postTitle}>
                                    {post.postTitle}
                                </p>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Engagement: {(post.engagementRate * 100).toFixed(1)}%
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Relevance: {(post.relevanceScore * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
            {/* Top Keywords Donut Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Hash className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Top Keywords by Engagement</h3>
                </div>
                <div className="h-[400px] relative pie-chart">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner" />
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                <filter id="shadow">
                                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodOpacity="0.2" />
                                </filter>
                                <filter id="inner-shadow">
                                    <feOffset dx="0" dy="2" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite operator="out" in="SourceGraphic" />
                                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" />
                                    <feBlend in2="SourceGraphic" mode="normal" />
                                </filter>
                            </defs>
                            <Pie
                                data={donutData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={3}
                                dataKey="value"
                                label={CustomLabel}
                                labelLine={true}
                                filter="url(#shadow)"
                            >
                                {donutData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        className="hover:opacity-80 transition-opacity duration-200"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Best Time & Type Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
                <div className="space-y-6 flex flex-col gap-4">
                    <div
                        className={`bg-gradient-to-br from-blue-500 to-blue-300 min-h-40 p-5 rounded-2xl cursor-auto shadow-xl text-white transform hover:scale-105 transition-all duration-300 animate-fade-in-up`}
                        style={{ animationDelay: `${delay}ms` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Clock className="w-6 h-6 text-blue-500" />
                            </div>
                            {/* <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{change}</span> */}
                        </div>
                        <h3 className="text-xl font-bold mb-1">{data.bestTimeToPost}</h3>
                        <p className="text-white/80 text-sm">Best Time to Post</p>
                    </div>
                    <div
                        className={`bg-gradient-to-br from-green-500 to-green-300 min-h-40 p-5 rounded-2xl cursor-auto shadow-xl text-white transform hover:scale-105 transition-all duration-300 animate-fade-in-up`}
                        style={{ animationDelay: `${delay}ms` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <FileType className="w-5 h-5 text-green-500" />

                            </div>
                            {/* <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{change}</span> */}
                        </div>
                        <h3 className="text-xl font-bold mb-1">{data.bestPostType}</h3>
                        <p className="text-white/80 text-sm">Best Performing Post Type</p>
                    </div>


                </div>
            </motion.div>


        </div>
    );
};

export default InsightCharts;