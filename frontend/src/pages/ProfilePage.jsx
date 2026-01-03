import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Camera, Calendar, Rocket, Star, Plus, Package, Bookmark, Search, Trash2, Clock, CheckCircle, LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'

function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  
  const mockProjects = [
    { id: 1, title: 'AI Chatbot', category: 'NLP', rating: 4.5, reviews: 120 },
    { id: 2, title: 'Image Classifier', category: 'Computer Vision', rating: 4.8, reviews: 85 }
  ]
  
  const mockBookmarks = [
    { id: 3, title: 'Voice Assistant', category: 'NLP', rating: 4.3, reviews: 95 },
    { id: 4, title: 'Object Detection', category: 'Computer Vision', rating: 4.6, reviews: 110 }
  ]
  const [formData, setFormData] = useState({ name: '', currentPassword: '', newPassword: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Mock user for demo
    if (!user) {
      const mockUser = {
        id: 1,
        name: 'Demo User',
        email: 'demo@bytexai.com',
        role: 'developer',
        created_at: new Date().toISOString()
      }
      updateUser(mockUser)
      setFormData({ name: mockUser.name, currentPassword: '', newPassword: '' })
    } else {
      setFormData({ name: user.name, currentPassword: '', newPassword: '' })
    }
  }, [user])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const updated = await authService.updateProfile(
        formData.name,
        formData.currentPassword,
        formData.newPassword
      )
      updateUser(updated)
      setMessage('Profile updated successfully!')
      setFormData({ ...formData, currentPassword: '', newPassword: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#EFF6FF] dark:bg-dark-bg">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-300 dark:border-slate-700 shadow-sm">
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
            <div className="relative group">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-24 h-24 rounded-full object-cover border-2 border-primary/30" />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {user.name[0].toUpperCase()}
                </div>
              )}
              <button 
                onClick={() => document.getElementById('profileImageInput').click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-white text-sm font-medium flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  Change
                </span>
              </button>
              <input 
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      updateUser({...user, profileImage: e.target.result});
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <div className="mt-2">
                <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-sm rounded-full">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="flex mb-8 border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
            {['overview', 'projects', 'bookmarks', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 font-medium transition-all duration-300 ease-out relative border-0"
                style={{ border: 'none', outline: 'none' }}
              >
                <span className={`block ${
                  activeTab === tab
                    ? 'text-blue-600 dark:text-primary font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-primary/80'
                }`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 dark:bg-primary rounded-full" />
                )}
                {activeTab !== tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 dark:bg-primary rounded-full opacity-0 hover:opacity-50 transition-opacity duration-300" />
                )}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-200">
                  <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Member Since</div>
                  <div className="text-gray-900 dark:text-white font-semibold">
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-200">
                  <Rocket className="w-8 h-8 text-orange-500 mb-2" />
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Projects</div>
                  <div className="text-gray-900 dark:text-white font-semibold">0</div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-200">
                  <Star className="w-8 h-8 text-yellow-400 mb-2" />
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Reviews</div>
                  <div className="text-gray-900 dark:text-white font-semibold">0</div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-slate-600">
                    <span className="text-gray-600 dark:text-gray-400">Name</span>
                    <span className="text-gray-900 dark:text-white">{user.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-slate-600">
                    <span className="text-gray-600 dark:text-gray-400">Email</span>
                    <span className="text-gray-900 dark:text-white">{user.email}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600 dark:text-gray-400">Role</span>
                    <span className="text-gray-900 dark:text-white capitalize">{user.role}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h3>
                <Link to="/developer/projects/new" className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition hover:scale-105 transform flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Project
                </Link>
              </div>
              {mockProjects.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-12 border border-gray-300 dark:border-slate-700 shadow-sm text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No projects yet</p>
                  <Link to="/developer/projects/new" className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition hover:scale-105 transform flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Submit Your First Project
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockProjects.map(project => (
                    <div key={project.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h4>
                          <span className="px-3 py-1 bg-indigo-100 dark:bg-primary/20 text-indigo-600 dark:text-primary text-xs rounded-full font-medium">{project.category}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 cursor-pointer">⋮</button>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-gray-900 dark:text-white font-medium">{project.rating}</span>
                          <span className="text-gray-600 dark:text-gray-400">({project.reviews})</span>
                        </div>
                        <Link to={`/projects/${project.id}`} className="text-indigo-600 dark:text-accent hover:text-indigo-700 dark:hover:text-primary transition-colors duration-200">View →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Projects</h3>
              {mockBookmarks.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-12 border border-gray-300 dark:border-slate-700 shadow-sm text-center">
                  <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No bookmarks yet</p>
                  <Link to="/projects" className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition hover:scale-105 transform flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Explore Projects
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockBookmarks.map(project => (
                    <div key={project.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h4>
                          <span className="px-3 py-1 bg-indigo-100 dark:bg-primary/20 text-indigo-600 dark:text-primary text-xs rounded-full font-medium">{project.category}</span>
                        </div>
                        <button className="text-red-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">🔖</button>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-gray-900 dark:text-white font-medium">{project.rating}</span>
                          <span className="text-gray-600 dark:text-gray-400">({project.reviews})</span>
                        </div>
                        <Link to={`/projects/${project.id}`} className="text-indigo-600 dark:text-accent hover:text-indigo-700 dark:hover:text-primary transition-colors duration-200">View →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Update Profile</h3>
                
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {user.profileImage ? (
                        <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-primary/30" />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-xl font-bold text-white">
                          {user.name[0].toUpperCase()}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => document.getElementById('settingsImageInput').click()}
                          className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition text-sm flex items-center gap-1"
                        >
                          <Camera className="w-4 h-4" />
                          Upload
                        </button>
                        {user.profileImage && (
                          <button
                            type="button"
                            onClick={() => updateUser({...user, profileImage: null})}
                            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition text-sm flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        )}
                      </div>
                      <input 
                        id="settingsImageInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              updateUser({...user, profileImage: e.target.result});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="border-t border-gray-200 dark:border-slate-600 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-gray-900 dark:text-white"
                          placeholder="Leave blank to keep current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-gray-900 dark:text-white"
                          placeholder="Leave blank to keep current password"
                        />
                      </div>
                    </div>
                  </div>

                  {message && (
                    <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-xl">
                      <p className="text-sm text-green-400">{message}</p>
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 hover:scale-105 transform cursor-pointer flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Update Profile
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-red-300 dark:border-red-500/30 shadow-sm">
                <h3 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">Danger Zone</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Once you delete your account, there is no going back.
                </p>
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl hover:bg-red-500/30 transition hover:scale-105 transform cursor-pointer flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
