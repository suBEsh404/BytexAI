import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2, Edit, Search, Eye, Shield, AlertTriangle, Clock } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import adminService from '../services/adminService';

const AdminManageProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveProject(id);
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Error approving project:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await adminService.rejectProject(id);
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting project:', error);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this project? This action cannot be undone.')) return;
    try {
      await adminService.removeProject(id);
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Error removing project:', error);
    }
  };

  const handleEditMetadata = (project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title,
      description: project.description,
      category: project.category,
      url: project.url
    });
  };

  const handleSaveMetadata = async () => {
    try {
      await adminService.updateProjectMetadata(editingProject.id, editForm);
      setEditingProject(null);
      setEditForm({});
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Error updating metadata:', error);
    }
  };

  const handleCheckUrlSafety = async (url) => {
    try {
      const result = await adminService.checkUrlSafety(url);
      // Update the project's safety check status
      const updatedProjects = projects.map(p =>
        p.url === url ? { ...p, safety_check_status: result.status } : p
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error checking URL safety:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.developer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status.toLowerCase()]}`}>
        {labels[status.toLowerCase()]}
      </span>
    );
  };

  const getSafetyBadge = (status) => {
    const styles = {
      safe: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      unsafe: 'bg-red-500/20 text-red-400 border-red-500/30',
      'under review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status.toLowerCase()]}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-slate-100 text-xl">Loading projects...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Manage Projects</h2>
          <p className="text-gray-600 dark:text-slate-400">Approve and monitor all uploaded projects</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] mb-6 shadow-sm dark:shadow-lg dark:shadow-black/20 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, developers, or categories..."
                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] overflow-hidden hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(project.status)}
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">{project.title}</h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm mb-2">{project.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500 mb-2">
                        <span>Developer: <span className="text-gray-900 dark:text-slate-300 font-medium">{project.developer_name}</span></span>
                        <span>Category: <span className="text-gray-900 dark:text-slate-300 font-medium">{project.category}</span></span>
                        <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-500 dark:text-slate-500" />
                        <span className="text-xs text-gray-500 dark:text-slate-500">Safety Check:</span>
                        {getSafetyBadge(project.safety_check_status)}
                        <button
                          onClick={() => handleCheckUrlSafety(project.url)}
                          className="ml-2 px-2 py-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded text-xs text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition"
                        >
                          Recheck
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(project.id)}
                            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                            title="Approve Project"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(project.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                            title="Reject Project"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEditMetadata(project)}
                        className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                        title="Edit Metadata"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => window.open(project.url, '_blank')}
                        className="p-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition"
                        title="View Live Project"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRemove(project.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        title="Remove Project"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] p-12 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-slate-300 mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Edit Metadata Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Edit Project Metadata</h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveMetadata(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={editForm.category || ''}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">URL</label>
                    <input
                      type="url"
                      value={editForm.url || ''}
                      onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="flex-1 px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageProjectsPage;
