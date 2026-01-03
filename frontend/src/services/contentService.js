// Mock data for categories
const mockCategories = [
  {
    id: 1,
    name: 'AI Tools',
    description: 'Artificial Intelligence and Machine Learning tools',
    projectCount: 45,
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: 2,
    name: 'Web Utilities',
    description: 'Web development and utility tools',
    projectCount: 32,
    createdAt: '2024-01-02',
    isActive: true
  },
  {
    id: 3,
    name: 'Productivity',
    description: 'Tools to boost productivity and efficiency',
    projectCount: 28,
    createdAt: '2024-01-03',
    isActive: true
  }
]

// Mock data for tags
const mockTags = [
  { id: 1, name: 'React', usageCount: 120, category: 'Web Utilities', isActive: true },
  { id: 2, name: 'Python', usageCount: 95, category: 'AI Tools', isActive: true },
  { id: 3, name: 'JavaScript', usageCount: 150, category: 'Web Utilities', isActive: true },
  { id: 4, name: 'Machine Learning', usageCount: 80, category: 'AI Tools', isActive: true },
  { id: 5, name: 'Task Management', usageCount: 60, category: 'Productivity', isActive: true }
]

// Mock featured projects
const mockFeaturedProjects = [
  { id: 1, title: 'AI Content Generator', category: 'AI Tools', isFeatured: true },
  { id: 2, title: 'Image Enhancer Pro', category: 'AI Tools', isFeatured: false }
]

export const getCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockCategories
}

export const createCategory = async (categoryData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const newCategory = {
    id: mockCategories.length + 1,
    ...categoryData,
    projectCount: 0,
    createdAt: new Date().toISOString().split('T')[0],
    isActive: true
  }
  mockCategories.push(newCategory)
  return newCategory
}

export const updateCategory = async (id, categoryData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockCategories.findIndex(cat => cat.id === parseInt(id))
  if (index === -1) throw new Error('Category not found')
  mockCategories[index] = { ...mockCategories[index], ...categoryData }
  return mockCategories[index]
}

export const deleteCategory = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockCategories.findIndex(cat => cat.id === parseInt(id))
  if (index === -1) throw new Error('Category not found')
  mockCategories.splice(index, 1)
  return { success: true }
}

export const getTags = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockTags
}

export const createTag = async (tagData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const newTag = {
    id: mockTags.length + 1,
    ...tagData,
    usageCount: 0,
    isActive: true
  }
  mockTags.push(newTag)
  return newTag
}

export const updateTag = async (id, tagData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockTags.findIndex(tag => tag.id === parseInt(id))
  if (index === -1) throw new Error('Tag not found')
  mockTags[index] = { ...mockTags[index], ...tagData }
  return mockTags[index]
}

export const deleteTag = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockTags.findIndex(tag => tag.id === parseInt(id))
  if (index === -1) throw new Error('Tag not found')
  mockTags.splice(index, 1)
  return { success: true }
}

export const getFeaturedProjects = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockFeaturedProjects
}

export const toggleFeaturedProject = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const project = mockFeaturedProjects.find(p => p.id === parseInt(id))
  if (!project) throw new Error('Project not found')
  project.isFeatured = !project.isFeatured
  return project
}

export const contentService = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getTags,
  createTag,
  updateTag,
  deleteTag,
  getFeaturedProjects,
  toggleFeaturedProject
}

export default contentService
