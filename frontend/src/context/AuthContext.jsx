import { createContext, useState, useEffect, useContext } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('token')
      const cachedUser = localStorage.getItem('user')
      
      if (!token) {
        setLoading(false)
        return
      }
      
      // Use cached user data if available
      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser))
        } catch (e) {
          console.error('Failed to parse cached user:', e)
        }
      }
      
      try {
        const user = await authService.getMe()
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
      } catch (err) {
        console.error('Bootstrap error:', err)
        // Only clear token if it's actually invalid (401)
        if (err?.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setUser(null)
        }
        // Otherwise keep the cached user data
      } finally {
        setLoading(false)
      }
    }
    bootstrap()
  }, [])

  const login = async (email, password, rememberMe) => {
    const data = await authService.login(email, password, rememberMe)
    localStorage.setItem('token', data.token)
    // Refresh from backend to ensure latest fields (e.g., created_at)
    const freshUser = await authService.getMe().catch(() => data.user)
    localStorage.setItem('user', JSON.stringify(freshUser))
    setUser(freshUser)
    return { token: data.token, user: freshUser }
  }

  const signup = async (name, email, password, role) => {
    const data = await authService.signup(name, email, password, role)
    localStorage.setItem('token', data.token)
    // Refresh from backend to ensure latest fields (e.g., created_at)
    const freshUser = await authService.getMe().catch(() => data.user)
    localStorage.setItem('user', JSON.stringify(freshUser))
    setUser(freshUser)
    return { token: data.token, user: freshUser }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser(userData)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
