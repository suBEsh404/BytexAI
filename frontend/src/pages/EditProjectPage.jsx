import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, CheckCircle, Trash2, Upload, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import API from '../api/api'

function EditProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    projectUrl: '',
    status: 'draft'
  })

  useEffect(() => {
    if (id) {
      // Load project data for edit mode
      loadProject()
    }
  }, [id])

  const loadProject = async () => {
    try {
      const res = await API.get(`/projects/${id}`)
      const project = res.data
      setFormData({
        title: project.title,
        description: project.description,
        category: project.difficulty_level || '',
        projectUrl: project.live_url || '',
        status: project.status
      })
      if (project.image_url) {
        setThumbnailPreview(project.image_url)
      }
      if (project.technologies) {
        setTags(Array.isArray(project.technologies) ? project.technologies : [])
      }
    } catch (err) {
      console.error('Load project error:', err)
      setError('Failed to load project')
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        return
      }
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const removeThumbnail = () => {
    setThumbnailFile(null)
    setThumbnailPreview(null)
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      if (!user) {
        setError('You must be logged in')
        return
      }

      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('category', formData.category)
      submitData.append('projectUrl', formData.projectUrl || '')
      submitData.append('status', formData.status)
      submitData.append('tags', tags.join(','))
      
      if (thumbnailFile) {
        submitData.append('thumbnail', thumbnailFile)
      }

      const endpoint = id ? `/projects/${id}` : '/projects'
      const method = id ? 'put' : 'post'
      
      const res = await API[method](endpoint, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert(id ? 'Project updated successfully!' : 'Project created successfully!')
      navigate('/developer/dashboard')
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.response?.data?.error || err.response?.data?.details || 'Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      await API.delete(`/projects/${id}`)
      alert('Project deleted successfully!')
      navigate('/developer/dashboard')
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete project')
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
                {id ? 'Edit' : 'Create New'} <span className="gradient-text">Project</span>
              </h1>
              <p className="text-gray-400">{id ? 'Update your project details' : 'Submit your AI project'}</p>
            </div>
            <button
              onClick={() => navigate('/developer/dashboard')}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
            >
              ← Back
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none"
                placeholder="Describe your project..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Thumbnail *
              </label>
              <div className="flex flex-col gap-4">
                {thumbnailPreview ? (
                  <div className="relative w-full h-48 bg-dark-bg/50 border border-dark-border rounded-xl overflow-hidden">
                    <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-dark-border rounded-xl cursor-pointer hover:border-primary transition">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-400">Click to upload image</span>
                    <span className="text-gray-500 text-sm">(Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="Add tags (press Enter)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-6 py-3 bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="https://your-project.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
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
                    {id ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    {id ? 'Update Project' : 'Create Project'}
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
              
              {id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-8 py-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl hover:bg-red-500/30 transition hover:scale-105 transform cursor-pointer flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EditProjectPage