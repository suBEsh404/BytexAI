// Mock auth service - no backend needed
export const authService = {
  signup: async (name, email, password, role) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const user = { id: Date.now(), name, email, role, created_at: new Date() }
    const token = 'mock_token_' + Date.now()
    localStorage.setItem('user', JSON.stringify(user))
    return { token, user }
  },

  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // For now, allow any email for admin login; later restrict to specific admin emails
    const user = {
      id: 1,
      name: 'Admin User',
      email,
      role: 'admin',
      created_at: new Date()
    }
    const token = 'mock_token_' + Date.now()
    localStorage.setItem('user', JSON.stringify(user))
    return { token, user }
  },

  getMe: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.id) throw new Error('Not authenticated')
    return user
  },

  forgotPassword: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { message: 'Password reset email sent' }
  },

  resetPassword: async (token, newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { message: 'Password reset successful' }
  },

  updateProfile: async (name, currentPassword, newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    user.name = name
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }
}
