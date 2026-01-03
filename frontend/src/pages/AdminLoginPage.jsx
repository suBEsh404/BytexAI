import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock, Lock } from 'lucide-react'
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
    <div className="min-h-screen relative overflow-hidden bg-[#EFF6FF] dark:bg-[#0B1220]">

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          <div className="relative bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl shadow-sm dark:shadow-2xl p-8 border border-gray-200 dark:border-slate-700 animate-slide-up">

              {/* header */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  Admin <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Login</span>
                </h2>
                <p className="text-gray-600 dark:text-slate-400 mt-2">
                  Secure access for administrators
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/70 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    required
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/70 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    required
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* 2fa toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enable2FA"
                    checked={enable2FA}
                    onChange={(e) => setEnable2FA(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="enable2FA" className="text-sm text-gray-600 dark:text-slate-400">
                    Enable Two-Factor Authentication
                  </label>
                </div>

                {/* 2fa input */}
                {enable2FA && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                      2FA Code
                    </label>
                    <input
                      type="text"
                      name="twoFactorCode"
                      value={formData.twoFactorCode}
                      onChange={handleChange}
                      placeholder="Enter 2FA code"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/70 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500
                                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                      required
                    />
                    {errors.twoFactorCode && (
                      <p className="text-red-400 text-sm mt-1">{errors.twoFactorCode}</p>
                    )}
                  </div>
                )}

                {/* error */}
                {errors.submit && (
                  <div className="p-3 bg-red-500/10 border border-red-500/40 rounded-xl">
                    <p className="text-sm text-red-400">{errors.submit}</p>
                  </div>
                )}

                {/* button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white
                             bg-gradient-to-r from-primary to-accent
                             hover:from-primary/90 hover:to-accent/90
                             transition-all duration-300 shadow-lg hover:shadow-primary/40
                             disabled:opacity-60 hover:scale-[1.02]"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 inline mr-2 animate-spin" />
                      Logging in…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 inline mr-2" />
                      Admin Login
                    </>
                  )}
                </button>
              </form>

              {/* footer */}
              <p className="mt-8 text-center text-gray-600 dark:text-slate-400">
                Not an admin?{' '}
                <Link
                  to="/login"
                  className="text-accent hover:text-primary transition font-semibold"
                >
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
