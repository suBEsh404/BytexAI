import React, { useState, useEffect } from 'react';
import { Plus, Tag, Star, Search, XCircle, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import contentService from '../services/contentService';

const CategoryCard = ({ category, onEdit, onDelete, onToggleStatus }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
        <span className="text-sm text-gray-600 dark:text-gray-400">{category.description}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleStatus(category.id)}
          className={`p-2 rounded-lg transition-colors ${
            category.isActive
              ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {category.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
        </button>
        <button
          onClick={() => onEdit(category)}
          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <span className={`px-2 py-1 text-xs rounded-full ${
        category.isActive
          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      }`}>
        {category.isActive ? 'Active' : 'Inactive'}
      </span>
    </div>
  </div>
)

const TagCard = ({ tag, onEdit, onDelete, onToggleStatus }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{tag.name}</h4>
        <span className="text-sm text-gray-600 dark:text-gray-400">{tag.category}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleStatus(tag.id)}
          className={`p-2 rounded-lg transition-colors ${
            tag.isActive
              ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {tag.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
        </button>
        <button
          onClick={() => onEdit(tag)}
          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(tag.id)}
          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <span className={`px-2 py-1 text-xs rounded-full ${
        tag.isActive
          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      }`}>
        {tag.isActive ? 'Active' : 'Inactive'}
      </span>
    </div>
  </div>
)

const FeaturedProjectCard = ({ project, onToggleFeatured }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={project.thumbnail || '/placeholder-project.jpg'}
          alt={project.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
          <span className="text-sm text-gray-600 dark:text-gray-400">{project.category}</span>
        </div>
      </div>
      {project.isFeatured && (
        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
          Featured
        </span>
      )}
    </div>
    <div className="mt-4 flex justify-end">
      <button
        onClick={() => onToggleFeatured(project.id)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          project.isFeatured
            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-900/30'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {project.isFeatured ? 'Unfeature' : 'Feature'}
      </button>
    </div>
  </div>
)

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XCircle className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState('categories')
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [categoriesData, tagsData, featuredData] = await Promise.all([
        contentService.getCategories(),
        contentService.getTags(),
        contentService.getFeaturedProjects()
      ])
      setCategories(categoriesData)
      setTags(tagsData)
      setFeaturedProjects(featuredData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async () => {
    try {
      const newCategory = await contentService.createCategory(formData)
      setCategories([...categories, newCategory])
      setIsCategoryModalOpen(false)
      setFormData({})
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  const handleUpdateCategory = async () => {
    try {
      const updatedCategory = await contentService.updateCategory(editingItem.id, formData)
      setCategories(categories.map(cat => cat.id === editingItem.id ? updatedCategory : cat))
      setIsCategoryModalOpen(false)
      setEditingItem(null)
      setFormData({})
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return
    try {
      await contentService.deleteCategory(id)
      setCategories(categories.filter(cat => cat.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const handleToggleCategoryStatus = async (id) => {
    try {
      const category = categories.find(cat => cat.id === id)
      const updatedCategory = await contentService.updateCategory(id, { isActive: !category.isActive })
      setCategories(categories.map(cat => cat.id === id ? updatedCategory : cat))
    } catch (error) {
      console.error('Error toggling category status:', error)
    }
  }

  const handleCreateTag = async () => {
    try {
      const newTag = await contentService.createTag(formData)
      setTags([...tags, newTag])
      setIsTagModalOpen(false)
      setFormData({})
    } catch (error) {
      console.error('Error creating tag:', error)
    }
  }

  const handleUpdateTag = async () => {
    try {
      const updatedTag = await contentService.updateTag(editingItem.id, formData)
      setTags(tags.map(tag => tag.id === editingItem.id ? updatedTag : tag))
      setIsTagModalOpen(false)
      setEditingItem(null)
      setFormData({})
    } catch (error) {
      console.error('Error updating tag:', error)
    }
  }

  const handleDeleteTag = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return
    try {
      await contentService.deleteTag(id)
      setTags(tags.filter(tag => tag.id !== id))
    } catch (error) {
      console.error('Error deleting tag:', error)
    }
  }

  const handleToggleTagStatus = async (id) => {
    try {
      const tag = tags.find(t => t.id === id)
      const updatedTag = await contentService.updateTag(id, { isActive: !tag.isActive })
      setTags(tags.map(t => t.id === id ? updatedTag : t))
    } catch (error) {
      console.error('Error toggling tag status:', error)
    }
  }

  const handleToggleFeatured = async (id) => {
    try {
      const updatedProject = await contentService.toggleFeaturedProject(id)
      setFeaturedProjects(featuredProjects.map(p => p.id === id ? updatedProject : p))
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  const openCategoryModal = (category = null) => {
    setEditingItem(category)
    setFormData(category ? { name: category.name, description: category.description } : {})
    setIsCategoryModalOpen(true)
  }

  const openTagModal = (tag = null) => {
    setEditingItem(tag)
    setFormData(tag ? { name: tag.name, category: tag.category } : {})
    setIsTagModalOpen(true)
  }

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filterCategory || tag.category === filterCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
          <div className="text-gray-900 dark:text-white text-xl">Loading content management...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Content & Category Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage categories, tags, and featured projects for structured browsing</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'categories', label: 'Categories', icon: Tag },
            { id: 'tags', label: 'Tags', icon: Tag },
            { id: 'featured', label: 'Featured Projects', icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Categories</h2>
              <button
                onClick={() => openCategoryModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={openCategoryModal}
                  onDelete={handleDeleteCategory}
                  onToggleStatus={handleToggleCategoryStatus}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tags Tab */}
        {activeTab === 'tags' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tags</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => openTagModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tag</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTags.map((tag) => (
                <TagCard
                  key={tag.id}
                  tag={tag}
                  onEdit={openTagModal}
                  onDelete={handleDeleteTag}
                  onToggleStatus={handleToggleTagStatus}
                />
              ))}
            </div>
          </div>
        )}

        {/* Featured Projects Tab */}
        {activeTab === 'featured' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
              <p className="text-gray-600 dark:text-gray-400">Select projects to feature on the homepage and explore page</p>
            </div>
            <div className="space-y-4">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  onToggleFeatured={handleToggleFeatured}
                />
              ))}
            </div>
          </div>
        )}

        {/* Category Modal */}
        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => {
            setIsCategoryModalOpen(false)
            setEditingItem(null)
            setFormData({})
          }}
          title={editingItem ? 'Edit Category' : 'Add Category'}
        >
          <form onSubmit={(e) => {
            e.preventDefault()
            editingItem ? handleUpdateCategory() : handleCreateCategory()
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCategoryModalOpen(false)
                  setEditingItem(null)
                  setFormData({})
                }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {/* Tag Modal */}
        <Modal
          isOpen={isTagModalOpen}
          onClose={() => {
            setIsTagModalOpen(false)
            setEditingItem(null)
            setFormData({})
          }}
          title={editingItem ? 'Edit Tag' : 'Add Tag'}
        >
          <form onSubmit={(e) => {
            e.preventDefault()
            editingItem ? handleUpdateTag() : handleCreateTag()
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTagModalOpen(false)
                  setEditingItem(null)
                  setFormData({})
                }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  )
}

export default ContentManagementPage
