import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Star, MoreVertical, Search, TrendingUp, AlertCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getDeveloperProjects, deleteProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';

const ManageProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openMenu, setOpenMenu] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getDeveloperProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await deleteProject(projectId);
      setProjects(projects.filter(p => p.id !== projectId));
      setOpenMenu(null);
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Failed to delete project. Please try again.');
    }
  };

  const handleEdit = (projectId) => {
    navigate(`/developer/projects/${projectId}/edit`);
  };

  const handleView = (projectId) => {
    window.open(`/projects/${projectId}`, '_blank');
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
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

        {loading && (
          <div className="bg-white rounded-2xl border border-black p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-black">Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-300 rounded-2xl p-6 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl border border-black overflow-hidden">

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto relative overflow-hidden border-r border-black">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(project.status)}
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-black mb-1">{project.title}</h3>
                        <p className="text-black text-sm mb-2">{project.short_description || project.description?.substring(0, 100)}</p>
                        <div className="flex items-center gap-3 text-xs text-black">
                          <span className="bg-white px-2 py-1 rounded border border-black">
                            {project.category || 'Uncategorized'}
                          </span>
                          <span>Updated {getRelativeTime(project.updated_at || project.created_at)}</span>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === project.id ? null : project.id)}
                          className="p-2 border border-black rounded-lg text-black hover:bg-gray-100"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {openMenu === project.id && (
                          <div className="absolute right-0 top-full mt-2 bg-white border border-black rounded-xl w-48 z-10 shadow-lg">
                            <button 
                              onClick={() => handleEdit(project.id)}
                              className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm text-black border-b border-black hover:bg-gray-50"
                            >
                              <Edit className="w-4 h-4" /> Edit Project
                            </button>
                            <button 
                              onClick={() => handleView(project.id)}
                              className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm text-black border-b border-black hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4" /> View Live
                            </button>
                            <button 
                              onClick={() => handleDelete(project.id)}
                              className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm text-red-600 hover:bg-red-50"
                            >
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
                          <span className="text-sm font-medium">{(project.view_count || 0).toLocaleString()}</span>
                          <span className="text-xs">views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-black" />
                          <span className="text-sm font-medium">{project.rating || 0}</span>
                          <span className="text-xs">({project.review_count || 0} reviews)</span>
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
        )}

        {!loading && !error && filteredProjects.length === 0 && (
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
