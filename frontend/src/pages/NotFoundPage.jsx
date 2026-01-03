import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-dark-bg flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
