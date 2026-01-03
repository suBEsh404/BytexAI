import React, { useState, useEffect } from 'react';
import { Search, Eye, UserCheck, UserX, Trash2, Users, MessageSquare, Flag } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import adminService from '../services/adminService';
import '../styles/admin-theme.css';

const AdminManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [activityLoading, setActivityLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (id) => {
    try {
      await adminService.blockUser(id);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (id) => {
    try {
      await adminService.unblockUser(id);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      await adminService.deleteUser(id);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleViewProfile = async (user) => {
    setSelectedUser(user);
    setActivityLoading(true);
    try {
      const activity = await adminService.getUserActivity(user.id);
      setUserActivity(activity);
    } catch (error) {
      console.error('Error fetching user activity:', error);
    } finally {
      setActivityLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      blocked: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    const labels = {
      active: 'Active',
      blocked: 'Blocked'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status.toLowerCase()]}`}>
        {labels[status.toLowerCase()]}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const styles = {
      developer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      user: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      admin: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[role.toLowerCase()]}`}>
        {role}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-slate-100 text-xl">Loading users...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold admin-text mb-2">Manage Users</h2>
          <p className="admin-text-muted">Control and monitor normal user accounts</p>
        </div>

        <div className="admin-card rounded-2xl p-6 mb-6 shadow-lg hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 admin-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name, email, or role..."
                className="w-full admin-input rounded-xl pl-12 pr-4 py-3 transition"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white border border-[#E5E7EB] dark:border-[#334155] rounded-xl px-4 py-3 transition cursor-pointer focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] overflow-hidden shadow-sm dark:shadow-lg dark:shadow-black/20 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFF] dark:bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Activity</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] dark:divide-slate-700">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-[#F1F5FF] dark:hover:bg-slate-700/30 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full" src={user.profile_picture} alt={user.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{user.name}</div>
                              <div className="text-sm text-gray-600 dark:text-slate-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1 text-gray-500 dark:text-slate-500" />
                              <span>{user.reviews_count}</span>
                            </div>
                            <div className="flex items-center">
                              <Flag className="w-4 h-4 mr-1 text-gray-500 dark:text-slate-500" />
                              <span>{user.reports_count}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewProfile(user)}
                              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {user.status === 'Active' ? (
                              <button
                                onClick={() => handleBlockUser(user.id)}
                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                                title="Block User"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnblockUser(user.id)}
                                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                                title="Unblock User"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                              title="Delete User"
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

              {filteredUsers.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-300 mb-2">No users found</h3>
                  <p className="text-gray-600 dark:text-slate-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* User Activity Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F8FAFF] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] p-6 shadow-sm dark:shadow-lg dark:shadow-black/20 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">User Activity</h3>

              {selectedUser ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img className="h-12 w-12 rounded-full" src={selectedUser.profile_picture} alt={selectedUser.name} />
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-slate-100">{selectedUser.name}</div>
                      <div className="text-sm text-gray-600 dark:text-slate-400">{selectedUser.email}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 border border-[#E2E8F0] dark:border-transparent">
                      <div className="flex items-center">
                        <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-slate-300">Reviews</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{selectedUser.reviews_count}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 border border-[#E2E8F0] dark:border-transparent">
                      <div className="flex items-center">
                        <Flag className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-slate-300">Reports</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{selectedUser.reports_count}</div>
                    </div>
                  </div>

                  {activityLoading ? (
                    <div className="text-center py-4">
                      <div className="text-gray-600 dark:text-slate-400">Loading activity...</div>
                    </div>
                  ) : userActivity ? (
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Recent Reviews</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {userActivity.reviews.slice(0, 3).map(review => (
                            <div key={review.id} className="text-xs text-gray-700 dark:text-slate-400 bg-white dark:bg-slate-700/30 rounded p-2 border border-[#E2E8F0] dark:border-transparent">
                              <div className="font-medium">{review.project_title}</div>
                              <div>Rating: {review.rating}/5</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Recent Reports</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {userActivity.reports.slice(0, 3).map(report => (
                            <div key={report.id} className="text-xs text-gray-700 dark:text-slate-400 bg-white dark:bg-slate-700/30 rounded p-2 border border-[#E2E8F0] dark:border-transparent">
                              <div className="font-medium">{report.type}</div>
                              <div>Status: {report.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-gray-600 dark:text-slate-500">Select a user to view activity</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 dark:text-slate-600 mx-auto mb-3" />
                  <div className="text-gray-600 dark:text-slate-500">Select a user to view details</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminManageUsersPage;
