import React from 'react';
import { Zap, Plus, CheckCircle, AlertCircle, ExternalLink, Settings } from 'lucide-react';
import youTube from '../assets/you.svg'
import instagram from '../assets/insta.svg'
import facebook from '../assets/fb.svg'
import twitter from '../assets/x.svg'
import linkedin from '../assets/linkdln.svg'
const Integration: React.FC = () => {
  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <img src={facebook} alt="Facebook" className="h-5 w-5" />,
      status: 'connected',
      description: 'Connect your Facebook pages and analyze engagement metrics',
      lastSync: '2 minutes ago',
      metrics: { posts: 45, engagement: '12.5%' }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <img src={instagram} alt="Instagram" className="h-5 w-5" />,
      status: 'connected',
      description: 'Track Instagram posts, stories, and audience insights',
      lastSync: '5 minutes ago',
      metrics: { posts: 32, engagement: '8.7%' }
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <img src={twitter} alt="Twitter" className="h-5 w-5" />,
      status: 'disconnected',
      description: 'Monitor tweets, mentions, and trending hashtags',
      lastSync: 'Never',
      metrics: { posts: 0, engagement: '0%' }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <img src={linkedin} alt="LinkedIn" className="h-5 w-5" />,
      status: 'error',
      description: 'Professional network analytics and company page insights',
      lastSync: '2 hours ago',
      metrics: { posts: 12, engagement: '15.2%' }
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <img src={youTube} alt="YouTube" className="h-5 w-5" />,
      status: 'disconnected',
      description: 'Video performance metrics and subscriber analytics',
      lastSync: 'Never',
      metrics: { posts: 0, engagement: '0%' }
    },

  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Plus className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      default:
        return 'Connect';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Platform Integration
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect and manage your social media platforms
          </p>
        </div>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Connected
            </h3>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">2</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active integrations</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Issues
            </h3>
          </div>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">1</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Needs attention</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Plus className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available
            </h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ready to connect</p>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{platform.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {platform.name}
                  </h3>
                  <div className={`flex items-center gap-2 ${getStatusColor(platform.status)}`}>
                    {getStatusIcon(platform.status)}
                    <span className="text-sm font-medium">
                      {getStatusText(platform.status)}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {platform.description}
            </p>

            {platform.status === 'connected' && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {platform.metrics.posts}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {platform.metrics.engagement}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last sync: {platform.lastSync}
              </div>
              <div className="flex gap-2">
                {platform.status === 'connected' ? (
                  <>
                    <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View
                    </button>
                    <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integration;