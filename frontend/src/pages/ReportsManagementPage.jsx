import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { reportsService } from '../services/reportsService'
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  User,
  MessageSquare,
  FolderOpen
} from 'lucide-react'

const ReportsManagementPage = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsData = await reportsService.getAllReports()
        setReports(reportsData)
      } catch (error) {
        console.error('Error fetching reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const handleResolveReport = async (reportId) => {
    if (window.confirm('Are you sure you want to resolve this report?')) {
      try {
        await reportsService.resolveReport(reportId)
        setReports(reports.map(r =>
          r.id === reportId ? { ...r, status: 'Resolved' } : r
        ))
      } catch (error) {
        console.error('Error resolving report:', error)
      }
    }
  }

  const handleDismissReport = async (reportId) => {
    if (window.confirm('Are you sure you want to dismiss this report?')) {
      try {
        await reportsService.dismissReport(reportId)
        setReports(reports.map(r =>
          r.id === reportId ? { ...r, status: 'Dismissed' } : r
        ))
      } catch (error) {
        console.error('Error dismissing report:', error)
      }
    }
  }

  const handleTakeAction = async (reportId, action) => {
    const actionText = action === 'block' ? 'block the user' :
                      action === 'delete' ? 'delete the content' : 'take this action'
    if (window.confirm(`Are you sure you want to ${actionText}?`)) {
      try {
        await reportsService.takeAction(reportId, action)
        setReports(reports.map(r =>
          r.id === reportId ? { ...r, status: 'Action Taken' } : r
        ))
      } catch (error) {
        console.error('Error taking action:', error)
      }
    }
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedItemTitle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === 'all' || report.type.toLowerCase() === filterType
    const matchesStatus = filterStatus === 'all' || report.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500'
      case 'resolved': return 'bg-green-500'
      case 'dismissed': return 'bg-gray-500'
      case 'action taken': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'User': return <User className="w-4 h-4" />
      case 'Review': return <MessageSquare className="w-4 h-4" />
      case 'Project': return <FolderOpen className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
          <div className="text-gray-900 dark:text-white text-xl">Loading reports...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Reports Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Handle user-reported issues and take appropriate actions</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports, reporters, or reported items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="user">User</option>
                <option value="review">Review</option>
                <option value="project">Project</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
                <option value="action taken">Action Taken</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reports Table */}
          <div className="lg:col-span-2">
            <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                    {filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className={`hover:bg-gray-50 dark:hover:bg-dark-bg/30 cursor-pointer ${
                          selectedReport?.id === report.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => setSelectedReport(report)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          #{report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 text-gray-400">
                              {getTypeIcon(report.type)}
                            </div>
                            <div className="ml-2 text-sm text-gray-900 dark:text-white">{report.type}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {report.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {report.status === 'Pending' && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleResolveReport(report.id)
                                  }}
                                  className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                                  title="Resolve"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDismissReport(report.id)
                                  }}
                                  className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
                                  title="Dismiss"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const action = report.type === 'User' ? 'block' : 'delete'
                                    handleTakeAction(report.id, action)
                                  }}
                                  className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                  title="Take Action"
                                >
                                  <AlertTriangle className="w-5 h-5" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedReport(report)
                              }}
                              className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredReports.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No reports found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Report Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-6 sticky top-6">
              {selectedReport ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Report ID</label>
                      <p className="text-sm text-gray-900 dark:text-white">#{selectedReport.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                      <div className="flex items-center mt-1">
                        {getTypeIcon(selectedReport.type)}
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">{selectedReport.type}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedReport.reason}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedReport.description}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reported Item</label>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedReport.reportedItemTitle}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reported By</label>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedReport.reporterName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedReport.priority)}`}>
                        {selectedReport.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                      <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Created At</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(selectedReport.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Select a report to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{reports.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Reports</div>
          </div>
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{reports.filter(r => r.status === 'Pending').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{reports.filter(r => r.status === 'Resolved').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Resolved</div>
          </div>
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{reports.filter(r => r.priority === 'High' && r.status === 'Pending').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ReportsManagementPage
