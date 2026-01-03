import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import {
  Users,
  Code,
  FolderOpen,
  Star,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  UserCheck,
  FileText,
  Settings,
  Eye,
  Flag
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'

// Mock API functions
const fetchSummaryData = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 15420,
        totalDevelopers: 3420,
        totalProjects: 12850,
        totalReviews: 45670,
        activeSubscriptions: 2890,
        pendingReports: 45
      })
    }, 1000)
  })
}

const fetchUserRegistrations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Jan', users: 1200 },
        { month: 'Feb', users: 1350 },
        { month: 'Mar', users: 1180 },
        { month: 'Apr', users: 1420 },
        { month: 'May', users: 1680 },
        { month: 'Jun', users: 1890 }
      ])
    }, 1000)
  })
}

const fetchProjectUploads = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { week: 'Week 1', uploads: 45 },
        { week: 'Week 2', uploads: 52 },
        { week: 'Week 3', uploads: 38 },
        { week: 'Week 4', uploads: 67 }
      ])
    }, 1000)
  })
}

const fetchSubscriptionDistribution = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Free', value: 12000, color: '#4F46E5' },
        { name: 'Pro', value: 2890, color: '#0EA5E9' },
        { name: 'Premium', value: 530, color: '#6366F1' }
      ])
    }, 1000)
  })
}

const fetchRecentActivities = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'project', description: 'New project "AI Chatbot" uploaded', timestamp: '2 minutes ago', icon: FolderOpen },
        { id: 2, type: 'developer', description: 'Developer "John Doe" approved', timestamp: '15 minutes ago', icon: UserCheck },
        { id: 3, type: 'report', description: 'Report submitted for project "Spam Detector"', timestamp: '1 hour ago', icon: Flag },
        { id: 4, type: 'subscription', description: 'New Premium subscription by "Jane Smith"', timestamp: '2 hours ago', icon: CreditCard },
        { id: 5, type: 'project', description: 'Project "Image Classifier" updated', timestamp: '3 hours ago', icon: FolderOpen }
      ])
    }, 1000)
  })
}

// Reusable Components
const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
      </div>
      <div className={`p-3 rounded-lg bg-${color}/20`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>
    </div>
  </div>
)

const ChartCard = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
    {children}
  </div>
)

const ActivityItem = ({ icon: Icon, description, timestamp }) => (
  <div className="flex items-center space-x-4 p-4 bg-[#F8FAFF] dark:bg-slate-700 rounded-lg border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] hover:bg-[#F1F5FF] dark:hover:bg-slate-600 transition-colors duration-200">
    <div className="p-2 bg-primary/20 rounded-lg">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1">
      <p className="text-gray-900 dark:text-white text-sm">{description}</p>
      <p className="text-gray-600 dark:text-gray-400 text-xs">{timestamp}</p>
    </div>
  </div>
)

function AdminDashboard() {
  const [summaryData, setSummaryData] = useState(null)
  const [userRegistrations, setUserRegistrations] = useState([])
  const [projectUploads, setProjectUploads] = useState([])
  const [subscriptionDistribution, setSubscriptionDistribution] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          summary,
          registrations,
          uploads,
          subscriptions,
          activities
        ] = await Promise.all([
          fetchSummaryData(),
          fetchUserRegistrations(),
          fetchProjectUploads(),
          fetchSubscriptionDistribution(),
          fetchRecentActivities()
        ])

        setSummaryData(summary)
        setUserRegistrations(registrations)
        setProjectUploads(uploads)
        setSubscriptionDistribution(subscriptions)
        setRecentActivities(activities)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time overview of BYTEXAI platform activity</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard icon={Users} value={summaryData.totalUsers} label="Total Users" color="primary" />
          <StatCard icon={Code} value={summaryData.totalDevelopers} label="Total Developers" color="secondary" />
          <StatCard icon={FolderOpen} value={summaryData.totalProjects} label="Total Projects" color="accent" />
          <StatCard icon={Star} value={summaryData.totalReviews} label="Total Reviews" color="primary" />
          <StatCard icon={CreditCard} value={summaryData.activeSubscriptions} label="Active Subscriptions" color="secondary" />
          <StatCard icon={AlertTriangle} value={summaryData.pendingReports} label="Pending Reports" color="accent" />
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="New User Registrations">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userRegistrations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Project Uploads per Week">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectUploads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="uploads" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Subscription Plan Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={subscriptionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Recent Activity Feed */}
          <ChartCard title="Recent Activity">
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  icon={activity.icon}
                  description={activity.description}
                  timestamp={activity.timestamp}
                />
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Pending Tasks and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Tasks</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F8FAFF] dark:bg-slate-700 rounded-lg border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] hover:bg-[#F1F5FF] dark:hover:bg-slate-600 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <FolderOpen className="w-5 h-5 text-accent" />
                  <span className="text-gray-900 dark:text-white">Pending Project Approvals</span>
                </div>
                <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-sm">12</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F8FAFF] dark:bg-slate-700 rounded-lg border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] hover:bg-[#F1F5FF] dark:hover:bg-slate-600 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-5 h-5 text-secondary" />
                  <span className="text-gray-900 dark:text-white">Developers Awaiting Approval</span>
                </div>
                <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-sm">8</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F8FAFF] dark:bg-slate-700 rounded-lg border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] hover:bg-[#F1F5FF] dark:hover:bg-slate-600 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Flag className="w-5 h-5 text-primary" />
                  <span className="text-gray-900 dark:text-white">Unresolved Reports</span>
                </div>
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">45</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/admin/users"
                className="flex items-center justify-center space-x-2 p-4 bg-primary/20 hover:bg-primary/30 rounded-lg transition border border-primary/50"
              >
                <Users className="w-5 h-5 text-primary" />
                <span className="text-gray-900 dark:text-white font-medium">Manage Users</span>
              </Link>
              <Link
                to="/admin/projects"
                className="flex items-center justify-center space-x-2 p-4 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition border border-secondary/50"
              >
                <FolderOpen className="w-5 h-5 text-secondary" />
                <span className="text-gray-900 dark:text-white font-medium">Review Projects</span>
              </Link>
              <Link
                to="/admin/reports"
                className="flex items-center justify-center space-x-2 p-4 bg-accent/20 hover:bg-accent/30 rounded-lg transition border border-accent/50"
              >
                <Flag className="w-5 h-5 text-accent" />
                <span className="text-gray-900 dark:text-white font-medium">View Reports</span>
              </Link>
              <Link
                to="/admin/subscriptions"
                className="flex items-center justify-center space-x-2 p-4 bg-primary/20 hover:bg-primary/30 rounded-lg transition border border-primary/50"
              >
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-gray-900 dark:text-white font-medium">Manage Subscriptions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
