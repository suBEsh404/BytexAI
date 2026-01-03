import { createContext, useContext, useState, useEffect } from 'react'

const AdminThemeContext = createContext()

export const useAdminTheme = () => {
  const context = useContext(AdminThemeContext)
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider')
  }
  return context
}

export const AdminThemeProvider = ({ children }) => {
  const [adminTheme, setAdminTheme] = useState(() => {
    const saved = localStorage.getItem('admin-theme')
    return saved || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('admin-theme', adminTheme)
    // Apply dark class to html element for Tailwind dark mode
    if (adminTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [adminTheme])

  const toggleAdminTheme = () => {
    setAdminTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <AdminThemeContext.Provider value={{ adminTheme, toggleAdminTheme }}>
      {children}
    </AdminThemeContext.Provider>
  )
}