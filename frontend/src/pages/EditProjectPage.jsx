import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, CheckCircle, Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function EditProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    projectUrl: '',
    thumbnailUrl: '',
    status: 'published'
  })

  useEffect(() => {
    // Load project data (mock)
    const mockProject = {
      title: 'AI Content Generator',
      description: 'Generate high-quality content with AI-powered algorithms. Perfect for marketers and writers.',
      category: 'AI Tools',
      tags: 'AI, Generator, Content',
      projectUrl: 'https://example.com',
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      status: 'published'
    }
    setFormData(mockProject)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      alert('Project updated successfully!')
      navigate('/developer/dashboard')
    }, 1500)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      alert('Project deleted successfully!')
      navigate('/developer/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="glass rounded-2xl p-8 border border-dark-border animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Edit <span className="gradient-text">Project</span>
              </h1>
              <p className="text-gray-400">Update your project details</p>
            </div>
            <button
              onClick={() => navigate('/developer/dashboard')}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
            >
              ← Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  required
                >
                  <option value="">Select category</option>
                  <option value="AI Tools">AI Tools</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="NLP">Natural Language Processing</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="Automation">Automation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none"
                placeholder="Describe your project..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project URL *
                </label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({...formData, projectUrl: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="https://your-project.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="https://image-url.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="AI, Machine Learning, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 hover:scale-105 transform cursor-pointer"
              >
                {loading ? (
                  <>
                    <Clock className="w-4 h-4 inline mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Update Project
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/developer/dashboard')}
                className="px-8 py-3 glass text-white font-semibold rounded-xl hover:border-primary transition-all duration-300 hover:scale-105 transform"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleDelete}
                className="px-8 py-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl hover:bg-red-500/30 transition hover:scale-105 transform cursor-pointer flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EditProjectPage