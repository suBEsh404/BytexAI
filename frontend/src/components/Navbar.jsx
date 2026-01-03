import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

function Navbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setMobileMenuOpen(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white text-gray-900 dark:bg-slate-900 dark:text-white border-b border-gray-200 dark:border-slate-700 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="BYTEXAI Logo"
              className="w-10 h-10 rounded-xl shadow-md"
            />
            <span className="text-2xl font-bold">BYTEXAI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition">Home</Link>

            <Link to="/about" className="hover:text-primary transition">
              About Us
            </Link>

            <Link to="/projects" className="hover:text-primary transition">
              Explore
            </Link>

            {user?.role === 'developer' && (
              <Link
                to="/developer/dashboard"
                className="hover:text-primary transition"
              >
                Dashboard
              </Link>
            )}

            <Link to="/help" className="hover:text-primary transition">
              Help
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <>
                <Link to="/bookmarks" className="hover:text-primary transition">
                  Bookmarks
                </Link>

                <Link
                  to="/community"
                  className="flex items-center space-x-1 hover:text-primary transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Community</span>
                </Link>

                <Link to="/profile">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                </Link>

                <button
                  onClick={logout}
                  className="px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary transition">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col space-y-3">

              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>

              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>

              <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>
                Explore
              </Link>

              {user?.role === 'developer' && (
                <Link
                  to="/developer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              <Link to="/help" onClick={() => setMobileMenuOpen(false)}>
                Help
              </Link>

              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>

                  <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)}>
                    Bookmarks
                  </Link>

                  <Link to="/community" onClick={() => setMobileMenuOpen(false)}>
                    Community
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>

                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
