import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AdminThemeProvider } from './context/AdminThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'

// Public Pages
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import HelpPage from './pages/HelpPage'
import CommunityPage from './pages/communitypages'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import ApplyFormPage from './pages/ApplyFormPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import CookiePolicyPage from './pages/CookiePolicyPage'
import NotFoundPage from './pages/NotFoundPage'

// User Pages
import ProfilePage from './pages/ProfilePage'
import BookmarksPage from './pages/BookmarksPage'
import DeveloperProfile from './pages/DeveloperProfile'

// Developer Pages
import DeveloperDashboard from './pages/DeveloperDashboard'
import UploadProject from './pages/UploadProject'
import EditProjectPage from './pages/EditProjectPage'
import ProjectAnalysis from './pages/ProjectAnalysis'
import AISuggestion from './pages/AISuggestion'
import DeveloperPage from './pages/DeveloperPage'

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminProfilePage from './pages/AdminProfilePage'
import AdminManageProjectsPage from './pages/AdminManageProjectsPage'
import AdminManageUsersPage from './pages/AdminManageUsersPage'
import AdminManageDevelopersPage from './pages/AdminManageDevelopersPage'
import ReviewModerationPage from './pages/ReviewModerationPage'
import ReportsManagementPage from './pages/ReportsManagementPage'
import ContentManagementPage from './pages/ContentManagementPage'
import PlatformSettingsPage from './pages/PlatformSettingsPage'
import NotificationManagementPage from './pages/NotificationManagementPage'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className={!isAdminRoute ? 'pt-16' : ''}>
        <Routes>

            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ExplorePage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/apply/:positionId" element={<ApplyFormPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />

            {/* ================= USER ROUTES ================= */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarksPage />
                </ProtectedRoute>
              }
            />
            <Route path="/developer/profile/:id" element={<DeveloperProfile />} />

            {/* ================= DEVELOPER ROUTES ================= */}
            <Route
              path="/developer"
              element={<DeveloperPage />}
            />
            <Route
              path="/developer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['developer']}>
                  <DeveloperDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/developer/projects/new"
              element={
                <ProtectedRoute allowedRoles={['developer']}>
                  <UploadProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/developer/projects/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['developer']}>
                  <EditProjectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:id/analysis"
              element={
                <ProtectedRoute allowedRoles={['developer']}>
                  <ProjectAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:id/suggestions"
              element={
                <ProtectedRoute allowedRoles={['developer']}>
                  <AISuggestion />
                </ProtectedRoute>
              }
            />

            {/* ================= ADMIN ROUTES ================= */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-projects"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminManageProjectsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminManageUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-developers"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminManageDevelopersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/review-moderation"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ReviewModerationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ReportsManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/content"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ContentManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PlatformSettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <NotificationManagementPage />
                </ProtectedRoute>
              }
            />

            {/* ================= 404 ================= */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </div>
      </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AdminThemeProvider>
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </AdminThemeProvider>
    </AuthProvider>
  )
}

export default App
