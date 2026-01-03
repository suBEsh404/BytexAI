import React, { useState, useEffect } from 'react';
import { Search, Eye, UserCheck, UserX, Trash2, Users, MessageSquare, Flag, CheckCircle, XCircle, Star } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import adminService from '../services/adminService';

const AdminManageDevelopersPage = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [developerActivity, setDeveloperActivity] = useState(null);
  const [activityLoading, setActivityLoading] = useState(false);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      const developerData = data.filter(user => user.role === 'Developer');
      setDevelopers(developerData);
    } catch (error) {
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDeveloper = async (id) => {
    try {
      await adminService.approveDeveloper(id);
      fetchDevelopers(); // Refresh the list
    } catch (error) {
      console.error('Error approving developer:', error);
    }
  };

  const handleRejectDeveloper = async (id) => {
    try {
      await adminService.rejectDeveloper(id);
      fetchDevelopers(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting developer:', error);
    }
  };

  const handleBlockDeveloper = async (id) => {
    try {
      await adminService.blockUser(id);
      fetchDevelopers(); // Refresh the list
    } catch (error) {
      console.error('Error blocking developer:', error);
    }
  };

  const handleUnblockDeveloper = async (id) => {
    try {
      await adminService.unblockUser(id);
      fetchDevelopers(); // Refresh the list
    } catch (error) {
      console.error('Error unblocking developer:', error);
    }
  };

  const handleDeleteDeveloper = async (id) => {
    if (!window.confirm('Are you sure you want to delete this developer? This action cannot be undone.')) return;
    try {
      await adminService.deleteUser(id);
      fetchDevelopers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting developer:', error);
    }
  };

  const handleViewProfile = async (developer) => {
    setSelectedDeveloper(developer);
    setActivityLoading(true);
    try {
      const activity = await adminService.getUserActivity(developer.id);
      setDeveloperActivity(activity);
    } catch (error) {
      console.error('Error fetching developer activity:', error);
    } finally {
      setActivityLoading(false);
    }
  };

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          developer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || developer.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      blocked: 'bg-red-500/20 text-red-400 border-red-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      rejected: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    const labels = {
      active: 'Active',
      blocked: 'Blocked',
      pending: 'Pending',
      rejected: 'Rejected'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status.toLowerCase()]}`}>
        {labels[status.toLowerCase()]}
      </span>
    );
  };

  const pendingDevelopers = filteredDevelopers.filter(dev => dev.status === 'Pending');

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-slate-100 text-xl">Loading developers...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Manage Developers</h2>
          <p className="text-gray-600 dark:text-slate-400">Control and approve developer accounts</p>
        </div>

        {/* Pending Approval Section */}
        {pendingDevelopers.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#E5E7EB] dark:border-slate-700 mb-6 shadow-sm dark:shadow-lg dark:shadow-black/20 hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)] dark:hover:shadow-lg transition-all duration-300 ease-out">
            <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4 flex items-center">
              <UserCheck className="w-6 h-6 mr-2 text-yellow-400" />
              Pending Approval ({pendingDevelopers.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingDevelopers.map(developer => (
                <div key={developer.id} className="bg-[#F8FAFF] dark:bg-slate-700/50 rounded-lg p-4 border border-[#E5E7EB] dark:border-slate-600">
                  <div className="flex items-center space-x-3 mb-3">
                    <img className="h-12 w-12 rounded-full" src={developer.profile_picture} alt={developer.name} />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{developer.name}</div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">{developer.email}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApproveDeveloper(developer.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectDeveloper(developer.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition flex items-center justify-center"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#E5E7EB] dark:border-slate-700 mb-6 shadow-sm dark:shadow-lg dark:shadow-black/20 hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)] dark:hover:shadow-lg transition-all duration-300 ease-out">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search developers by name or email..."
                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Developers Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[#E5E7EB] dark:border-slate-700 overflow-hidden shadow-sm dark:shadow-lg dark:shadow-black/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFF] dark:bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Developer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] dark:divide-slate-700">
                    {filteredDevelopers.map(developer => (
                      <tr key={developer.id} className="hover:bg-[#F1F5FF] dark:hover:bg-slate-700/30 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full" src={developer.profile_picture} alt={developer.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{developer.name}</div>
                              <div className="text-sm text-gray-600 dark:text-slate-400">{developer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(developer.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-300">
                          {developer.projects_uploaded}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-300">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            {developer.average_rating.toFixed(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewProfile(developer)}
                              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {developer.status === 'Pending' ? (
                              <>
                                <button
                                  onClick={() => handleApproveDeveloper(developer.id)}
                                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                                  title="Approve Developer"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectDeveloper(developer.id)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                                  title="Reject Developer"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            ) : developer.status === 'Active' ? (
                              <button
                                onClick={() => handleBlockDeveloper(developer.id)}
                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                                title="Block Developer"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            ) : developer.status === 'Blocked' ? (
                              <button
                                onClick={() => handleUnblockDeveloper(developer.id)}
                                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                                title="Unblock Developer"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            ) : null}
                            <button
                              onClick={() => handleDeleteDeveloper(developer.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                              title="Delete Developer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredDevelopers.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-300 mb-2">No developers found</h3>
                  <p className="text-gray-600 dark:text-slate-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* Developer Activity Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F8FAFF] dark:bg-slate-800 rounded-2xl border border-[#E5E7EB] dark:border-slate-700 p-6 shadow-sm dark:shadow-lg dark:shadow-black/20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Developer Activity</h3>

              {selectedDeveloper ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img className="h-12 w-12 rounded-full" src={selectedDeveloper.profile_picture} alt={selectedDeveloper.name} />
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-slate-100">{selectedDeveloper.name}</div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">{selectedDeveloper.email}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 border border-[#E5E7EB] dark:border-transparent">
                      <div className="flex items-center">
                        <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-slate-300">Reviews</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{selectedDeveloper.reviews_count}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 border border-[#E5E7EB] dark:border-transparent">
                      <div className="flex items-center">
                        <Flag className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-slate-300">Reports</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{selectedDeveloper.reports_count}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 border border-[#E5E7EB] dark:border-transparent">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-slate-300">Projects</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{selectedDeveloper.projects_uploaded}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 border border-[#E5E7EB] dark:border-transparent">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-slate-300">Rating</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{selectedDeveloper.average_rating.toFixed(1)}</div>
                    </div>
                  </div>

                  {activityLoading ? (
                    <div className="text-center py-4">
                      <div className="text-gray-600 dark:text-slate-400">Loading activity...</div>
                    </div>
                  ) : developerActivity ? (
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Recent Reviews</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {developerActivity.reviews.slice(0, 3).map(review => (
                            <div key={review.id} className="text-xs text-gray-700 dark:text-slate-400 bg-white dark:bg-slate-700/30 rounded p-2 border border-[#E5E7EB] dark:border-transparent">
                              <div className="font-medium">{review.project_title}</div>
                              <div>Rating: {review.rating}/5</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Recent Reports</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {developerActivity.reports.slice(0, 3).map(report => (
                            <div key={report.id} className="text-xs text-gray-700 dark:text-slate-400 bg-white dark:bg-slate-700/30 rounded p-2 border border-[#E5E7EB] dark:border-transparent">
                              <div className="font-medium">{report.type}</div>
                              <div>Status: {report.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-gray-600 dark:text-slate-500">Select a developer to view activity</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 dark:text-slate-600 mx-auto mb-3" />
                  <div className="text-gray-600 dark:text-slate-500">Select a developer to view details</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminManageDevelopersPage;
