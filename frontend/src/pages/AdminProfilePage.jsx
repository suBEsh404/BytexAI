import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import {
  User,
  Mail,
  Shield,
  Calendar,
  Clock,
  Key,
  Download,
  Edit,
  Save,
  X
} from 'lucide-react'
import {
  getAdminProfile,
  updateAdminProfile,
  changePassword,
  getLoginHistory,
  exportLoginHistory
} from '../services/adminService'

function AdminProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loginHistory, setLoginHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswordChange, setShowPasswordChange] = useState(false)

  useEffect(() => {
    fetchProfileData()
  }, [])

  const fetchProfileData = async () => {
    try {
      const [profileData, historyData] = await Promise.all([
        getAdminProfile(),
        getLoginHistory()
      ])
      setProfile(profileData)
      setLoginHistory(historyData)
      setEditForm({
        name: profileData.name,
        email: profileData.email
      })
    } catch (error) {
      console.error('Error fetching profile data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProfile = async () => {
    try {
      const updatedProfile = await updateAdminProfile(editForm)
      setProfile(updatedProfile)
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword)
      alert('Password changed successfully')
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setShowPasswordChange(false)
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Error changing password')
    }
  }

  const handleExportLogs = async () => {
    try {
      await exportLoginHistory()
      alert('Login history exported successfully')
    } catch (error) {
      console.error('Error exporting logs:', error)
      alert('Error exporting logs')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-900 dark:text-white text-xl">Loading profile...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Admin Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your admin account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Details</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <img
                  src={profile.profile_picture}
                  alt="Admin Profile"
                  className="w-20 h-20 rounded-full border-4 border-primary/20"
                />
                <div>
                  {editing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{profile.email}</span>
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                    <p className="font-medium text-gray-900 dark:text-white">{profile.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                    <p className="font-medium text-gray-900 dark:text-white">{new Date(profile.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Login</p>
                    <p className="font-medium text-gray-900 dark:text-white">{new Date(profile.last_login).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Change Password</h2>
                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition"
                >
                  <Key className="w-4 h-4" />
                  <span>{showPasswordChange ? 'Cancel' : 'Change Password'}</span>
                </button>
              </div>

              {showPasswordChange && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Role Permissions */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Role Permissions</h2>
              <div className="space-y-3">
                {profile.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {permission.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Login History */}
        <div className="mt-8 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Login History</h2>
            <button
              onClick={handleExportLogs}
              className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition"
            >
              <Download className="w-4 h-4" />
              <span>Export Logs</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Time</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Action</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">IP Address</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Device</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 dark:border-slate-800">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{entry.date}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{entry.time}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        entry.action === 'Login'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      }`}>
                        {entry.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{entry.ip}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{entry.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProfilePage
