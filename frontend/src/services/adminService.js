const mockProjects = [
  {
    id: 1,
    title: 'AI Content Generator',
    developer_name: 'John Doe',
    category: 'AI Tools',
    status: 'Pending',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    url: 'https://ai-content-gen.com',
    description: 'Generate high-quality content with AI-powered algorithms',
    created_at: '2024-01-15',
    safety_check_status: 'Safe'
  },
  {
    id: 2,
    title: 'Image Enhancer Pro',
    developer_name: 'Jane Smith',
    category: 'Image Processing',
    status: 'Approved',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop',
    url: 'https://img-enhance.pro',
    description: 'Enhance and upscale images using machine learning',
    created_at: '2024-01-10',
    safety_check_status: 'Safe'
  },
  {
    id: 3,
    title: 'Code Optimizer',
    developer_name: 'Bob Wilson',
    category: 'Code Utilities',
    status: 'Rejected',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    url: 'https://code-optimizer.dev',
    description: 'Optimize and refactor your code automatically',
    created_at: '2024-01-08',
    safety_check_status: 'Under Review'
  },
  {
    id: 4,
    title: 'Data Visualizer',
    developer_name: 'Alice Johnson',
    category: 'Data Analysis',
    status: 'Pending',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    url: 'https://dataviz.app',
    description: 'Create stunning data visualizations in seconds',
    created_at: '2024-01-12',
    safety_check_status: 'Safe'
  }
]

export const getAllProjects = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockProjects
}

export const approveProject = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const project = mockProjects.find(p => p.id === parseInt(id))
  if (project) {
    project.status = 'Approved'
  }
  return project
}

export const rejectProject = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const project = mockProjects.find(p => p.id === parseInt(id))
  if (project) {
    project.status = 'Rejected'
  }
  return project
}

export const removeProject = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockProjects.findIndex(p => p.id === parseInt(id))
  if (index !== -1) {
    mockProjects.splice(index, 1)
  }
  return { success: true }
}

export const updateProjectMetadata = async (id, metadata) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const project = mockProjects.find(p => p.id === parseInt(id))
  if (project) {
    Object.assign(project, metadata)
  }
  return project
}

export const checkUrlSafety = async (url) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  // Mock safety check - in real implementation, this would call a security service
  const isSafe = Math.random() > 0.1 // 90% chance of being safe
  return {
    url,
    status: isSafe ? 'Safe' : 'Unsafe',
    checked_at: new Date().toISOString()
  }
}

// Mock admin profile data
const mockAdminProfile = {
  id: 1,
  name: 'Admin User',
  email: 'admin@bytexai.com',
  role: 'Super Admin',
  permissions: ['manage_users', 'manage_projects', 'manage_reports', 'manage_content', 'manage_subscriptions', 'manage_payments', 'manage_notifications', 'platform_settings'],
  created_at: '2023-01-01',
  last_login: '2024-01-15T10:30:00Z',
  profile_picture: '/logo.png' // Using the website logo as profile picture
}

// Mock login history
const mockLoginHistory = [
  { id: 1, date: '2024-01-15', time: '10:30 AM', action: 'Login', ip: '192.168.1.1', device: 'Chrome on Windows' },
  { id: 2, date: '2024-01-14', time: '09:15 AM', action: 'Login', ip: '192.168.1.1', device: 'Chrome on Windows' },
  { id: 3, date: '2024-01-13', time: '08:45 AM', action: 'Login', ip: '192.168.1.1', device: 'Chrome on Windows' },
  { id: 4, date: '2024-01-12', time: '11:00 AM', action: 'Password Change', ip: '192.168.1.1', device: 'Chrome on Windows' },
  { id: 5, date: '2024-01-11', time: '10:20 AM', action: 'Login', ip: '192.168.1.1', device: 'Chrome on Windows' }
]

export const getAdminProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockAdminProfile
}

export const updateAdminProfile = async (profileData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  Object.assign(mockAdminProfile, profileData)
  return mockAdminProfile
}

export const changePassword = async (currentPassword, newPassword) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  // Mock password change - in real implementation, verify current password
  return { success: true, message: 'Password changed successfully' }
}

export const getLoginHistory = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockLoginHistory
}

export const exportLoginHistory = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  // Mock export - in real implementation, generate and return file
  return { success: true, message: 'Login history exported successfully' }
}

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: 'Platform Maintenance Scheduled',
    message: 'We will be performing scheduled maintenance on January 20th from 2:00 AM to 4:00 AM UTC. Services may be temporarily unavailable.',
    audience: 'All',
    priority: 'Warning',
    status: 'Scheduled',
    scheduled_date: '2024-01-20T02:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
    sent_at: null,
    delivery_channels: ['in-app'],
    cta_link: null,
    is_draft: false
  },
  {
    id: 2,
    title: 'New Feature: AI Code Review',
    message: 'Exciting news! We\'ve launched AI-powered code review for all developers. Check it out in your dashboard.',
    audience: 'Developers',
    priority: 'Update',
    status: 'Sent',
    scheduled_date: null,
    created_at: '2024-01-10T14:30:00Z',
    sent_at: '2024-01-10T15:00:00Z',
    delivery_channels: ['in-app', 'email'],
    cta_link: '/developer/dashboard',
    is_draft: false
  },
  {
    id: 3,
    title: 'Welcome to BytexAI!',
    message: 'Thank you for joining our platform. Explore amazing projects and connect with talented developers.',
    audience: 'Users',
    priority: 'Info',
    status: 'Sent',
    scheduled_date: null,
    created_at: '2024-01-05T09:00:00Z',
    sent_at: '2024-01-05T09:15:00Z',
    delivery_channels: ['in-app'],
    cta_link: '/projects',
    is_draft: false
  },
  {
    id: 4,
    title: 'Urgent: Security Update Required',
    message: 'A critical security update is available. Please update your account settings immediately.',
    audience: 'All',
    priority: 'Urgent',
    status: 'Draft',
    scheduled_date: null,
    created_at: '2024-01-16T11:00:00Z',
    sent_at: null,
    delivery_channels: ['in-app', 'email', 'push'],
    cta_link: '/profile',
    is_draft: true
  }
]

export const getNotifications = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockNotifications
}

export const createNotification = async (notificationData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const newNotification = {
    id: Math.max(...mockNotifications.map(n => n.id)) + 1,
    ...notificationData,
    created_at: new Date().toISOString(),
    sent_at: null,
    is_draft: notificationData.status === 'Draft'
  }
  mockNotifications.unshift(newNotification)
  return newNotification
}

export const updateNotification = async (id, notificationData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const notification = mockNotifications.find(n => n.id === parseInt(id))
  if (notification) {
    Object.assign(notification, notificationData)
    notification.is_draft = notificationData.status === 'Draft'
  }
  return notification
}

export const deleteNotification = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockNotifications.findIndex(n => n.id === parseInt(id))
  if (index !== -1) {
    mockNotifications.splice(index, 1)
  }
  return { success: true }
}

export const sendNotification = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const notification = mockNotifications.find(n => n.id === parseInt(id))
  if (notification) {
    notification.status = 'Sent'
    notification.sent_at = new Date().toISOString()
    notification.is_draft = false
  }
  return notification
}

export const cancelScheduledNotification = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const notification = mockNotifications.find(n => n.id === parseInt(id))
  if (notification) {
    notification.status = 'Cancelled'
  }
  return notification
}

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    role: 'Developer',
    created_at: '2023-06-15',
    last_login: '2024-01-15T10:30:00Z',
    profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    reviews_count: 12,
    reports_count: 3,
    projects_uploaded: 8,
    average_rating: 4.2
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'Active',
    role: 'Developer',
    created_at: '2023-07-20',
    last_login: '2024-01-14T09:15:00Z',
    profile_picture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    reviews_count: 8,
    reports_count: 1,
    projects_uploaded: 5,
    average_rating: 4.5
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    status: 'Blocked',
    role: 'Developer',
    created_at: '2023-08-10',
    last_login: '2024-01-10T14:20:00Z',
    profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    reviews_count: 5,
    reports_count: 7,
    projects_uploaded: 3,
    average_rating: 3.8
  },
  {
    id: 4,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    status: 'Active',
    role: 'User',
    created_at: '2023-09-05',
    last_login: '2024-01-13T16:45:00Z',
    profile_picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    reviews_count: 15,
    reports_count: 0
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    status: 'Active',
    role: 'Developer',
    created_at: '2023-10-12',
    last_login: '2024-01-12T11:30:00Z',
    profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    reviews_count: 22,
    reports_count: 2,
    projects_uploaded: 12,
    average_rating: 4.7
  },
  {
    id: 6,
    name: 'David Lee',
    email: 'david.lee@example.com',
    status: 'Pending',
    role: 'Developer',
    created_at: '2024-01-10',
    last_login: null,
    profile_picture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    reviews_count: 0,
    reports_count: 0,
    projects_uploaded: 0,
    average_rating: 0
  },
  {
    id: 7,
    name: 'Eva Martinez',
    email: 'eva.martinez@example.com',
    status: 'Pending',
    role: 'Developer',
    created_at: '2024-01-12',
    last_login: null,
    profile_picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    reviews_count: 0,
    reports_count: 0,
    projects_uploaded: 0,
    average_rating: 0
  }
]

export const getAllUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockUsers
}

export const blockUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const user = mockUsers.find(u => u.id === parseInt(id))
  if (user) {
    user.status = 'Blocked'
  }
  return user
}

export const unblockUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const user = mockUsers.find(u => u.id === parseInt(id))
  if (user) {
    user.status = 'Active'
  }
  return user
}

export const deleteUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockUsers.findIndex(u => u.id === parseInt(id))
  if (index !== -1) {
    mockUsers.splice(index, 1)
  }
  return { success: true }
}

export const getUserProfile = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockUsers.find(u => u.id === parseInt(id))
}

export const getUserActivity = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const user = mockUsers.find(u => u.id === parseInt(id))
  if (!user) return null

  // Mock activity data
  return {
    reviews: Array.from({ length: user.reviews_count }, (_, i) => ({
      id: i + 1,
      project_title: `Project ${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: `This is review ${i + 1} by ${user.name}`,
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    })),
    reports: Array.from({ length: user.reports_count }, (_, i) => ({
      id: i + 1,
      type: ['Spam', 'Inappropriate Content', 'Copyright Violation'][Math.floor(Math.random() * 3)],
      description: `Report ${i + 1} description`,
      status: ['Pending', 'Resolved', 'Dismissed'][Math.floor(Math.random() * 3)],
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }))
  }
}

export const approveDeveloper = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const developer = mockUsers.find(u => u.id === parseInt(id) && u.role === 'Developer')
  if (developer) {
    developer.status = 'Active'
  }
  return developer
}

export const rejectDeveloper = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const developer = mockUsers.find(u => u.id === parseInt(id) && u.role === 'Developer')
  if (developer) {
    developer.status = 'Rejected'
  }
  return developer
}

const adminService = {
  getAllProjects,
  approveProject,
  rejectProject,
  removeProject,
  updateProjectMetadata,
  checkUrlSafety,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
  getLoginHistory,
  exportLoginHistory,
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  sendNotification,
  cancelScheduledNotification,
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  getUserProfile,
  getUserActivity
}

export default adminService
