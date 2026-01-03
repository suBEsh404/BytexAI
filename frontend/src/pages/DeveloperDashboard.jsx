import React, { useState } from 'react';
import { Upload, TrendingUp, Star, Eye, MessageSquare, Hand, Wrench } from 'lucide-react';
import Navbar from '../components/Navbar';

const DeveloperDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { label: 'Total Uploads', value: '24', change: '+3', icon: Upload, color: 'bg-indigo-500' },
    { label: 'Total Views', value: '12.4K', change: '+18%', icon: Eye, color: 'bg-sky-500' },
    { label: 'Avg Rating', value: '4.7', change: '+0.3', icon: Star, color: 'bg-purple-500' },
    { label: 'Reviews', value: '186', change: '+24', icon: MessageSquare, color: 'bg-indigo-600' }
  ];

  const recentReviews = [
    { project: 'AI Content Generator', user: 'Sarah M.', rating: 5, comment: 'Incredible tool! Saves me hours of work.', time: '2h ago' },
    { project: 'Image Enhancer Pro', user: 'Mike R.', rating: 4, comment: 'Great quality, but could use more formats.', time: '5h ago' },
    { project: 'Code Optimizer', user: 'Alex K.', rating: 5, comment: 'Must-have for every developer!', time: '1d ago' },
    { project: 'Data Visualizer', user: 'Emma L.', rating: 4, comment: 'Clean UI and fast performance.', time: '2d ago' }
  ];

  const chartData = [
    { day: 'Mon', views: 420 },
    { day: 'Tue', views: 580 },
    { day: 'Wed', views: 720 },
    { day: 'Thu', views: 650 },
    { day: 'Fri', views: 890 },
    { day: 'Sat', views: 1100 },
    { day: 'Sun', views: 950 }
  ];

  const maxViews = Math.max(...chartData.map(d => d.views));

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 text-slate-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                Welcome back, Developer!
                <Hand className="w-8 h-8 text-yellow-400" />
              </h2>
              <p className="text-slate-400">Here's what's happening with your projects today.</p>
            </div>
            <button onClick={() => window.location.href = '/developer/projects/1/edit'} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl font-semibold transition border border-slate-700 hover:scale-105 transform hover:border-indigo-500 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Manage Projects
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 transition duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-black/20`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-emerald-400 text-sm font-medium flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">Views Analytics</h3>
                <p className="text-slate-400 text-sm">Last 7 days performance</p>
              </div>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
                <option value="90d">90 Days</option>
              </select>
            </div>
            
            <div className="flex items-end justify-between h-64 gap-4">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full bg-slate-800/50 rounded-t-lg relative overflow-hidden transition-all duration-300 group-hover:bg-slate-800" 
                       style={{ height: `${(data.views / maxViews) * 100}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 to-sky-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-slate-400">Views</span>
                </div>
              </div>
              <div className="text-sm text-slate-400">
                Total: <span className="text-indigo-400 font-semibold">5,310 views</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-100">Recent Reviews</h3>
              <button className="text-sky-400 text-sm hover:text-sky-300 transition hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentReviews.map((review, idx) => (
                <div key={idx} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:bg-slate-800/50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-200 text-sm mb-1">{review.user}</div>
                      <div className="text-xs text-slate-500">{review.project}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-slate-200">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-2 leading-relaxed">{review.comment}</p>
                  <div className="text-xs text-slate-500">{review.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-indigo-500/10 to-sky-500/10 rounded-2xl p-8 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Ready to upload something new?</h3>
              <p className="text-slate-400">Share your latest AI project or website with the community.</p>
            </div>
            <button onClick={() => window.location.href = '/developer/projects/new'} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 transform hover:scale-110 active:scale-95 hover:shadow-2xl hover:shadow-indigo-500/50">
              <Upload className="w-5 h-5" />
              Upload Project
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;
