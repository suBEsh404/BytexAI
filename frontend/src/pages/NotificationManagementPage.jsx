import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Send,
  Clock,
  X,
  Calendar,
  Users,
  AlertTriangle,
  Info,
  Zap,
  Archive,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import adminService from '../services/adminService';

const NotificationManagementPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAudience, setFilterAudience] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('created_desc');
  const [showComposer, setShowComposer] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [composerData, setComposerData] = useState({
    title: '',
    message: '',
    audience: 'All',
    priority: 'Info',
    status: 'Draft',
    scheduled_date: '',
    delivery_channels: ['in-app'],
    cta_link: ''
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await adminService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotification = async () => {
    try {
      const newNotification = await adminService.createNotification(composerData);
      setNotifications([newNotification, ...notifications]);
      setShowComposer(false);
      resetComposer();
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const handleUpdateNotification = async () => {
    try {
      const updatedNotification = await adminService.updateNotification(editingNotification.id, composerData);
      setNotifications(notifications.map(n => n.id === editingNotification.id ? updatedNotification : n));
      setEditingNotification(null);
      resetComposer();
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const handleSendNotification = async (id) => {
    try {
      const sentNotification = await adminService.sendNotification(id);
      setNotifications(notifications.map(n => n.id === id ? sentNotification : n));
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleCancelScheduled = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this scheduled notification?')) return;
    try {
      const cancelledNotification = await adminService.cancelScheduledNotification(id);
      setNotifications(notifications.map(n => n.id === id ? cancelledNotification : n));
    } catch (error) {
      console.error('Error cancelling notification:', error);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification? This action cannot be undone.')) return;
    try {
      await adminService.deleteNotification(id);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const resetComposer = () => {
    setComposerData({
      title: '',
      message: '',
      audience: 'All',
      priority: 'Info',
      status: 'Draft',
      scheduled_date: '',
      delivery_channels: ['in-app'],
      cta_link: ''
    });
  };

  const openComposer = (notification = null) => {
    if (notification) {
      setEditingNotification(notification);
      setComposerData({
        title: notification.title,
        message: notification.message,
        audience: notification.audience,
        priority: notification.priority,
        status: notification.status,
        scheduled_date: notification.scheduled_date || '',
        delivery_channels: notification.delivery_channels,
        cta_link: notification.cta_link || ''
      });
    } else {
      resetComposer();
    }
    setShowComposer(true);
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = filterAudience === 'all' || notification.audience.toLowerCase() === filterAudience;
    const matchesStatus = filterStatus === 'all' || notification.status.toLowerCase() === filterStatus;
    const matchesPriority = filterPriority === 'all' || notification.priority.toLowerCase() === filterPriority;

    let matchesDateRange = true;
    if (filterDateRange.start && filterDateRange.end) {
      const notificationDate = new Date(notification.created_at);
      const startDate = new Date(filterDateRange.start);
      const endDate = new Date(filterDateRange.end);
      matchesDateRange = notificationDate >= startDate && notificationDate <= endDate;
    }

    return matchesSearch && matchesAudience && matchesStatus && matchesPriority && matchesDateRange;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    switch (sortBy) {
      case 'created_asc':
        return new Date(a.created_at) - new Date(b.created_at);

      case 'created_desc':
        return new Date(b.created_at) - new Date(a.created_at);

      case 'priority':
        const priorityOrder = { Urgent: 4, Warning: 3, Update: 2, Info: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];

      default:
        return 0;
    }
  });

  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      sent: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status.toLowerCase()]}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      update: 'bg-green-500/20 text-green-400 border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      urgent: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    const icons = {
      info: <Info className="w-3 h-3" />,
      update: <CheckCircle className="w-3 h-3" />,
      warning: <AlertTriangle className="w-3 h-3" />,
      urgent: <Zap className="w-3 h-3" />
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${styles[priority.toLowerCase()]}`}>
        {icons[priority.toLowerCase()]}
        {priority}
      </span>
    );
  };

  const getAudienceBadge = (audience) => {
    const styles = {
      all: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      users: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      developers: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[audience.toLowerCase()]}`}>
        {audience}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
          <div className="text-gray-900 dark:text-slate-100 text-xl">Loading notifications...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Notification Management</h2>
              <p className="text-gray-600 dark:text-slate-400">Send, schedule, and manage platform-wide communications</p>
            </div>
            <button
              onClick={() => openComposer()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Notification
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] mb-6 shadow-sm dark:shadow-lg dark:shadow-black/20 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterAudience}
              onChange={(e) => setFilterAudience(e.target.value)}
              className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="all">All Audiences</option>
              <option value="all">All</option>
              <option value="users">Users</option>
              <option value="developers">Developers</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sent">Sent</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="info">Info</option>
              <option value="update">Update</option>
              <option value="warning">Warning</option>
              <option value="urgent">Urgent</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="created_desc">Newest First</option>
              <option value="created_asc">Oldest First</option>
              <option value="priority">Priority (High → Low)</option>
            </select>

            <div className="flex gap-2">
              <input
                type="date"
                value={filterDateRange.start}
                onChange={(e) => setFilterDateRange({ ...filterDateRange, start: e.target.value })}
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition text-sm"
              />
              <input
                type="date"
                value={filterDateRange.end}
                onChange={(e) => setFilterDateRange({ ...filterDateRange, end: e.target.value })}
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition text-sm"
              />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {sortedNotifications.map(notification => (
            <div key={notification.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] overflow-hidden hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">{notification.title}</h3>
                      {getStatusBadge(notification.status)}
                      {getPriorityBadge(notification.priority)}
                      {getAudienceBadge(notification.audience)}
                    </div>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">{notification.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
                      <span>Created: {new Date(notification.created_at).toLocaleDateString()}</span>
                      {notification.sent_at && <span>Sent: {new Date(notification.sent_at).toLocaleDateString()}</span>}
                      {notification.scheduled_date && <span>Scheduled: {new Date(notification.scheduled_date).toLocaleDateString()}</span>}
                      <span>Channels: {notification.delivery_channels.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {notification.status === 'Draft' && (
                      <>
                        <button
                          onClick={() => handleSendNotification(notification.id)}
                          className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                          title="Send Now"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openComposer(notification)}
                          className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {notification.status === 'Scheduled' && (
                      <button
                        onClick={() => handleCancelScheduled(notification.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        title="Cancel Scheduled"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedNotifications.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] p-12 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-slate-300 mb-2">No notifications found</h3>
            <p className="text-gray-600 dark:text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Notification Composer Modal */}
        {showComposer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                    {editingNotification ? 'Edit Notification' : 'Create New Notification'}
                  </h3>
                  <button
                    onClick={() => { setShowComposer(false); setEditingNotification(null); resetComposer(); }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); editingNotification ? handleUpdateNotification() : handleCreateNotification(); }}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Title</label>
                      <input
                        type="text"
                        value={composerData.title}
                        onChange={(e) => setComposerData({ ...composerData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Message</label>
                      <textarea
                        value={composerData.message}
                        onChange={(e) => setComposerData({ ...composerData, message: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Target Audience</label>
                        <select
                          value={composerData.audience}
                          onChange={(e) => setComposerData({ ...composerData, audience: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="All">All</option>
                          <option value="Users">Users</option>
                          <option value="Developers">Developers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Priority</label>
                        <select
                          value={composerData.priority}
                          onChange={(e) => setComposerData({ ...composerData, priority: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Info">Info</option>
                          <option value="Update">Update</option>
                          <option value="Warning">Warning</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Delivery Channels</label>
                      <div className="flex gap-4">
                        {['in-app', 'email', 'push'].map(channel => (
                          <label key={channel} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={composerData.delivery_channels.includes(channel)}
                              onChange={(e) => {
                                const channels = e.target.checked
                                  ? [...composerData.delivery_channels, channel]
                                  : composerData.delivery_channels.filter(c => c !== channel);
                                setComposerData({ ...composerData, delivery_channels: channels });
                              }}
                              className="rounded border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-gray-700 dark:text-slate-300 capitalize">{channel.replace('-', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Call-to-Action Link (Optional)</label>
                      <input
                        type="url"
                        value={composerData.cta_link}
                        onChange={(e) => setComposerData({ ...composerData, cta_link: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Schedule (Optional)</label>
                      <input
                        type="datetime-local"
                        value={composerData.scheduled_date}
                        onChange={(e) => setComposerData({ ...composerData, scheduled_date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                      <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">Leave empty to send immediately or save as draft</p>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      >
                        {editingNotification ? 'Update Notification' : 'Create Notification'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowComposer(false); setEditingNotification(null); resetComposer(); }}
                        className="flex-1 px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default NotificationManagementPage;
