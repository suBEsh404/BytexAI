import React, { useState } from 'react';
import { Edit, Trash2, Eye, Star, MoreVertical, Search, TrendingUp, AlertCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const ManageProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openMenu, setOpenMenu] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'AI Content Generator',
      description: 'Generate high-quality content with AI-powered algorithms',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      url: 'https://ai-content-gen.com',
      status: 'published',
      views: 4235,
      rating: 4.8,
      reviews: 89,
      category: 'AI Tools',
      updated: '2 days ago'
    },
    {
      id: 2,
      title: 'Image Enhancer Pro',
      description: 'Enhance and upscale images using machine learning',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop',
      url: 'https://img-enhance.pro',
      status: 'published',
      views: 3120,
      rating: 4.5,
      reviews: 67,
      category: 'Image Processing',
      updated: '5 days ago'
    },
    {
      id: 3,
      title: 'Code Optimizer',
      description: 'Optimize and refactor your code automatically',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
      url: 'https://code-optimizer.dev',
      status: 'draft',
      views: 0,
      rating: 0,
      reviews: 0,
      category: 'Code Utilities',
      updated: '1 week ago'
    },
    {
      id: 4,
      title: 'Data Visualizer',
      description: 'Create stunning data visualizations in seconds',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      url: 'https://dataviz.app',
      status: 'published',
      views: 5678,
      rating: 4.9,
      reviews: 142,
      category: 'Data Analysis',
      updated: '3 days ago'
    }
  ];

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const labels = {
      published: 'Published',
      draft: 'Draft',
      under_review: 'Under Review'
    };
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold border border-black bg-white text-black">
        {labels[status]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white text-black">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">Manage Projects</h2>
          <p className="text-black">Edit, update, and monitor your uploaded projects</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-black mb-6">
          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-white border border-black rounded-xl pl-12 pr-4 py-3 text-black placeholder-gray-500 focus:outline-none"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-black rounded-xl px-4 py-3 text-black"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="under_review">Under Review</option>
            </select>

          </div>
        </div>

        <div className="space-y-4">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-2xl border border-black overflow-hidden">

              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto relative overflow-hidden border-r border-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(project.status)}
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-1">{project.title}</h3>
                      <p className="text-black text-sm mb-2">{project.description}</p>
                      <div className="flex items-center gap-3 text-xs text-black">
                        <span className="bg-white px-2 py-1 rounded border border-black">
                          {project.category}
                        </span>
                        <span>Updated {project.updated}</span>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === project.id ? null : project.id)}
                        className="p-2 border border-black rounded-lg text-black"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openMenu === project.id && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-black rounded-xl w-48 z-10">
                          <button className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm text-black border-b border-black">
                            <Edit className="w-4 h-4" /> Edit Project
                          </button>
                          <button className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm text-black border-b border-black">
                            <Eye className="w-4 h-4" /> View Live
                          </button>
                          <button className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm text-black">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {project.status === 'published' && (
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-black">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">{project.views.toLocaleString()}</span>
                        <span className="text-xs">views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-black" />
                        <span className="text-sm font-medium">{project.rating}</span>
                        <span className="text-xs">({project.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+12%</span>
                      </div>
                    </div>
                  )}

                  {project.status === 'draft' && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-black">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">Complete setup and publish to go live</span>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl border border-black p-12 text-center">
            <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default ManageProjects;
