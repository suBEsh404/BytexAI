import API from "../api/api"

// Real auth service wired to backend API
export const authService = {
  signup: async (name, email, password, role) => {
    const res = await API.post("/auth/signup", {
      fullName: name,
      email,
      password,
      role
    })
    const { token, user } = res.data
    const normalizedUser = { ...user, name: user.fullName || user.full_name || user.name }
    localStorage.setItem("user", JSON.stringify(normalizedUser))
    return { token, user: normalizedUser }
  },

  login: async (email, password, rememberMe) => {
    const res = await API.post("/auth/login", { email, password, rememberMe })
    const { token, user } = res.data
    const normalizedUser = { ...user, name: user.fullName || user.full_name || user.name }
    localStorage.setItem("user", JSON.stringify(normalizedUser))
    return { token, user: normalizedUser }
  },

  getMe: async () => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Not authenticated")
    const res = await API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    const user = res.data?.user || res.data
    const normalizedUser = { ...user, name: user.fullName || user.full_name || user.name }
    return normalizedUser
  },

  forgotPassword: async (email) => {
    // Placeholder: wire to backend endpoint when available
    return { message: "Password reset email sent" }
  },

  resetPassword: async (token, newPassword) => {
    // Placeholder: wire to backend endpoint when available
    return { message: "Password reset successful" }
  },

  updateProfile: async (name, currentPassword, newPassword) => {
    // Placeholder: wire to backend endpoint when available
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    user.name = name
    localStorage.setItem("user", JSON.stringify(user))
    return user
  }
}
