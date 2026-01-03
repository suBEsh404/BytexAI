import React, { useState } from 'react';
import { Search, Filter, Star, Eye, TrendingUp, Grid, List, X } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Footer from '../components/Footer';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);

  const categories = [
    { id: 'all', name: 'All Projects', count: 245 },
    { id: 'ai-tools', name: 'AI Tools', count: 89 },
    { id: 'productivity', name: 'Productivity', count: 56 },
    { id: 'content', name: 'Content Creation', count: 43 },
    { id: 'data', name: 'Data Analysis', count: 32 },
    { id: 'image', name: 'Image Processing', count: 25 }
  ];

  const tags = ['AI', 'Machine Learning', 'Automation', 'Generator', 'Editor', 'Analytics', 'Optimizer', 'Design'];

  const projects = [
    {
      id: 1,
      title: 'AI Content Generator',
      description: 'Generate high-quality content with AI-powered algorithms. Perfect for marketers and writers.',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      category: 'AI Tools',
      rating: 4.8,
      reviews: 234,
      views: 12400,
      tags: ['AI', 'Generator'],
      trending: true
    },
    {
      id: 2,
      title: 'Image Enhancer Pro',
      description: 'Enhance and upscale images using machine learning. Restore old photos in seconds.',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
      category: 'Image Processing',
      rating: 4.6,
      reviews: 189,
      views: 8900,
      tags: ['AI', 'Editor'],
      trending: false
    },
    {
      id: 3,
      title: 'Data Visualizer',
      description: 'Create stunning data visualizations in seconds. Export to PNG, SVG, and more.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      category: 'Data Analysis',
      rating: 4.9,
      reviews: 412,
      views: 15600,
      tags: ['Analytics'],
      trending: true
    },
    {
      id: 4,
      title: 'Code Optimizer AI',
      description: 'Optimize and refactor your code automatically. Supports JS, Python, and Rust.',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      category: 'Productivity',
      rating: 4.7,
      reviews: 156,
      views: 7200,
      tags: ['AI', 'Optimizer'],
      trending: false
    },
    {
      id: 5,
      title: 'Smart Scheduler',
      description: 'AI-powered scheduling and calendar management. Never miss a meeting again.',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
      category: 'Productivity',
      rating: 4.5,
      reviews: 98,
      views: 5400,
      tags: ['AI', 'Automation'],
      trending: false
    },
    {
      id: 6,
      title: 'Voice Synthesizer',
      description: 'Convert text to natural-sounding speech. Multiple languages and accents supported.',
      thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop',
      category: 'AI Tools',
      rating: 4.8,
      reviews: 267,
      views: 11200,
      tags: ['AI', 'Generator'],
      trending: true
    }
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <PageLayout className="min-h-screen bg-blue-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-black/70 dark:border-slate-600 p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6">
          {showFilters && (
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 p-6 lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-indigo-400" />
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-500 mb-3 uppercase tracking-wider">Categories</h4>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center justify-between group ${
                          selectedCategory === cat.id
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        <span className="text-sm font-medium">{cat.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedCategory === cat.id ? 'bg-indigo-400/30' : 'bg-gray-200 dark:bg-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                        }`}>{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-500 mb-3 uppercase tracking-wider">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                          selectedTags.includes(tag)
                            ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20'
                            : 'bg-white dark:bg-slate-800 border-black dark:border-slate-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {(selectedCategory !== 'all' || selectedTags.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTags([]);
                    }}
                    className="w-full mt-6 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition border border-black dark:border-slate-600 hover:border-gray-400 dark:hover:border-gray-500"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>
          )}

          <main className="flex-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {!showFilters && (
                  <button
                    onClick={() => setShowFilters(true)}
                    className="px-4 py-2 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition flex items-center gap-2 border border-blue-200 dark:border-slate-600"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                )}
                <div className="relative flex-1 sm:w-64">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-500" />
                   <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-full bg-white dark:bg-slate-800 border border-black dark:border-slate-600 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-indigo-500 transition"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-blue-50 dark:bg-slate-700 border border-blue-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="trending">Trending</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="views">Most Viewed</option>
                </select>

                <div className="flex bg-blue-50 dark:bg-slate-700 rounded-lg p-1 border border-blue-200 dark:border-slate-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm">
              Showing {projects.length} projects
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {projects.map(project => (
                <div key={project.id} onClick={() => window.location.href = `/projects/${project.id}`} className={`bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 overflow-hidden hover:border-indigo-500/50 transition duration-300 group cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-black/30 ${viewMode === 'list' ? 'flex flex-row h-48' : ''}`}>
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 h-full' : 'h-48'}`}>
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
                    {project.trending && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-orange-500/20">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>

                  <div className={`p-5 flex flex-col ${viewMode === 'list' ? 'flex-1 justify-between' : ''}`}>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 group-hover:text-indigo-400 transition">{project.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-1 rounded text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
          </div>
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
};

export default ExplorePage;
