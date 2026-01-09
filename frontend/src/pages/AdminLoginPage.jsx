import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminLoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '', twoFactorCode: '' })
  const [enable2FA, setEnable2FA] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await login(formData.email, formData.password)
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        setErrors({ submit: 'Access denied. Admin privileges required.' })
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Login failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl shadow-2xl p-8 border border-dark-border animate-slide-up">
            <h2 className="text-3xl font-bold text-white mb-2">
              Admin <span className="gradient-text">Login</span>
            </h2>
            <p className="text-gray-400 mb-8">Secure access for administrators</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-white placeholder-gray-500"
                placeholder="admin@example.com"
                required
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-white placeholder-gray-500"
                placeholder="••••••••"
                required
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enable2FA"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
                className="w-4 h-4 rounded border-dark-border"
              />
              <label htmlFor="enable2FA" className="ml-2 text-sm text-gray-400">
                Enable Two-Factor Authentication
              </label>
            </div>

            {enable2FA && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  2FA Code
                </label>
                <input
                  type="text"
                  name="twoFactorCode"
                  value={formData.twoFactorCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-white placeholder-gray-500"
                  placeholder="Enter 2FA code"
                  required={enable2FA}
                />
                {errors.twoFactorCode && <p className="text-red-400 text-sm mt-1">{errors.twoFactorCode}</p>}
              </div>
            )}

            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl">
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 hover:scale-105 transform cursor-pointer"
            >
              {loading ? '⏳ Logging in...' : '🔑 Admin Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Not an admin?{' '}
            <Link to="/login" className="text-accent hover:text-primary transition font-medium">
              User Login
            </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage