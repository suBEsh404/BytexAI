import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAdminTheme } from '../context/AdminThemeContext'
import {
  User,
  LogIn,
  LayoutDashboard,
  Users,
  Code,
  FolderOpen,
  Star,
  FileText,
  CreditCard,
  DollarSign,
  Tag,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Sun,
  Moon
} from 'lucide-react'

const menuItems = [
  { path: '/admin/profile', label: 'Admin Profile', icon: User },
  { path: '/admin/login', label: 'Admin Login Page', icon: LogIn },
  { path: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
  { path: '/admin/manage-users', label: 'Manage Users', icon: Users },
  { path: '/admin/manage-developers', label: 'Manage Developers', icon: Code },
  { path: '/admin/manage-projects', label: 'Manage Projects', icon: FolderOpen },
  { path: '/admin/review-moderation', label: 'Review & Rating Moderation', icon: Star },
  { path: '/admin/reports', label: 'Reports Management', icon: FileText },
  { path: '/admin/subscriptions', label: 'Subscription & Plan Management', icon: CreditCard },
  { path: '/admin/payments', label: 'Payments & Transactions', icon: DollarSign },
  { path: '/admin/content', label: 'Content & Category Management', icon: Tag },
  { path: '/admin/notifications', label: 'Notification Management', icon: Bell },
  { path: '/admin/settings', label: 'Platform Settings', icon: Settings }
]

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const { adminTheme, toggleAdminTheme } = useAdminTheme()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64'

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full ${sidebarWidth} bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-slate-700 transition-all duration-300 ease-in-out z-50 flex flex-col ${
          isMobile && isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Admin Panel
              </h2>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleAdminTheme}
            className={`flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? `Switch to ${adminTheme === 'dark' ? 'Light' : 'Dark'} Theme` : ''}
          >
            {adminTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
            {!isCollapsed && (
              <span className="ml-3 font-medium text-gray-900 dark:text-white">
                {adminTheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </span>
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>



        {/* Mobile toggle button */}
        {isMobile && isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  )
}

export default AdminSidebar