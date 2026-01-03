import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import RatingStars from '../components/RatingStars'
import { reviewService } from '../services/reviewService'
import { projectService } from '../services/projectService'
import {
  Star,
  Flag,
  Trash2,
  AlertTriangle,
  Eye,
  EyeOff,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react'

const ReviewModerationPage = () => {
  const [reviews, setReviews] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFlags, setFilterFlags] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsData, projectsData] = await Promise.all([
          reviewService.getAllReviews(),
          // Mock getting all projects - in real app, add getAllProjects to projectService
          Promise.resolve([
            { id: 1, title: 'AI Content Generator' },
            { id: 2, title: 'Image Enhancer Pro' }
          ])
        ])
        setReviews(reviewsData)
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    return project ? project.title : 'Unknown Project'
  }

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(reviewId)
        setReviews(reviews.filter(r => r.id !== reviewId))
      } catch (error) {
        console.error('Error deleting review:', error)
      }
    }
  }

  const handleWarnUser = async (userId, userName) => {
    if (window.confirm(`Send a warning to ${userName}?`)) {
      try {
        await reviewService.warnUser(userId)
        alert(`Warning sent to ${userName}`)
      } catch (error) {
        console.error('Error warning user:', error)
      }
    }
  }

  const handleHideReview = async (reviewId) => {
    try {
      await reviewService.hideReview(reviewId)
      setReviews(reviews.map(r =>
        r.id === reviewId ? { ...r, isHidden: true } : r
      ))
    } catch (error) {
      console.error('Error hiding review:', error)
    }
  }

  const handleRestoreReview = async (reviewId) => {
    try {
      await reviewService.restoreReview(reviewId)
      setReviews(reviews.map(r =>
        r.id === reviewId ? { ...r, isHidden: false } : r
      ))
    } catch (error) {
      console.error('Error restoring review:', error)
    }
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getProjectName(review.projectId).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFlags = filterFlags === 'all' ||
                        (filterFlags === 'flagged' && (review.flags.reported || review.flags.spam || review.flags.abusive)) ||
                        (filterFlags === 'reported' && review.flags.reported) ||
                        (filterFlags === 'spam' && review.flags.spam) ||
                        (filterFlags === 'abusive' && review.flags.abusive)

    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'visible' && !review.isHidden) ||
                         (filterStatus === 'hidden' && review.isHidden)

    return matchesSearch && matchesFlags && matchesStatus
  })

  const getFlagBadges = (flags) => {
    const badges = []
    if (flags.reported) badges.push({ label: 'Reported', color: 'bg-red-500' })
    if (flags.spam) badges.push({ label: 'Spam', color: 'bg-yellow-500' })
    if (flags.abusive) badges.push({ label: 'Abusive', color: 'bg-purple-500' })
    return badges
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
          <div className="text-gray-900 dark:text-white text-xl">Loading reviews...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Review & Rating Moderation</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and moderate user reviews and ratings</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-6 mb-6 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reviews, users, or projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterFlags}
                onChange={(e) => setFilterFlags(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Reviews</option>
                <option value="flagged">Flagged</option>
                <option value="reported">Reported</option>
                <option value="spam">Spam</option>
                <option value="abusive">Abusive</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-8 text-center">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No reviews found matching your criteria.</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out ${
                  review.isHidden ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.userName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{getProjectName(review.projectId)}</p>
                      </div>
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>

                    {/* Flags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getFlagBadges(review.flags).map((badge, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs text-white rounded-full ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      ))}
                      {review.isHidden && (
                        <span className="px-2 py-1 text-xs text-white bg-gray-500 rounded-full">
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleWarnUser(review.userId, review.userName)}
                      className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded-lg transition"
                      title="Warn User"
                    >
                      <AlertTriangle className="w-5 h-5" />
                    </button>
                    {review.isHidden ? (
                      <button
                        onClick={() => handleRestoreReview(review.id)}
                        className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition"
                        title="Restore Review"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleHideReview(review.id)}
                        className="p-2 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition"
                        title="Hide Review"
                      >
                        <EyeOff className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition"
                      title="Delete Review"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-4 text-center hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</div>
          </div>
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-4 text-center hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
            <div className="text-2xl font-bold text-red-600">{reviews.filter(r => r.flags.reported).length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Reported</div>
          </div>
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-4 text-center hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
            <div className="text-2xl font-bold text-yellow-600">{reviews.filter(r => r.flags.spam).length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Spam</div>
          </div>
          <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm border border-[#E2E8F0] dark:border-[rgba(148,163,184,0.15)] rounded-xl p-4 text-center hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 ease-in-out">
            <div className="text-2xl font-bold text-purple-600">{reviews.filter(r => r.flags.abusive).length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Abusive</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ReviewModerationPage
