const mockProjects = [
  {
    id: 1,
    title: 'AI Content Generator',
    short_description: 'Generate high-quality content with AI',
    full_description: 'AI-powered content generation tool that helps you create blog posts, articles, and marketing copy in seconds.\n\n- Generate SEO-optimized content\n- Multiple writing styles\n- Plagiarism-free output\n- Export to multiple formats',
    logo_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    project_url: 'https://example.com/ai-content',
    category: 'AI Tools',
    tech_stack: 'React, Python, GPT-4',
    created_by: 1,
    created_by_name: 'John Doe',
    average_rating: 4.8,
    created_at: '2024-01-15',
    status: 'Published'
  },
  {
    id: 2,
    title: 'Image Enhancer Pro',
    short_description: 'Enhance images using ML',
    full_description: 'Professional image enhancement tool powered by machine learning.\n\n- Upscale images up to 4x\n- Remove noise and artifacts\n- Batch processing\n- API access available',
    logo_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    project_url: 'https://example.com/image-enhancer',
    category: 'Image Processing',
    tech_stack: 'Python, TensorFlow, React',
    created_by: 2,
    created_by_name: 'Jane Smith',
    average_rating: 4.6,
    created_at: '2024-01-10',
    status: 'Published'
  },
  {
    id: 3,
    title: 'Voice Assistant AI',
    short_description: 'Natural language voice commands',
    full_description: 'Advanced voice assistant with natural language processing.\n\n- Multi-language support\n- Custom wake words\n- Smart home integration\n- Offline mode available',
    logo_url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=200',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800',
    project_url: 'https://example.com/voice-assistant',
    category: 'NLP',
    tech_stack: 'Python, PyTorch, Node.js',
    created_by: 3,
    created_by_name: 'Mike Chen',
    average_rating: 4.7,
    created_at: '2024-01-12',
    status: 'Published'
  },
  {
    id: 4,
    title: 'Code Optimizer AI',
    short_description: 'AI-powered code optimization',
    full_description: 'Automatically optimize and refactor your code.\n\n- Supports JS, Python, Rust\n- Performance improvements\n- Code quality analysis\n- Real-time suggestions',
    logo_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    project_url: 'https://example.com/code-optimizer',
    category: 'Developer Tools',
    tech_stack: 'TypeScript, Python, GPT-4',
    created_by: 4,
    created_by_name: 'Sarah Lee',
    average_rating: 4.5,
    created_at: '2024-01-08',
    status: 'Published'
  },
  {
    id: 5,
    title: 'Data Visualizer Pro',
    short_description: 'Create stunning data visualizations',
    full_description: 'Transform your data into beautiful, interactive visualizations.\n\n- 50+ chart types\n- Real-time updates\n- Export to PNG, SVG\n- Collaborative editing',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    project_url: 'https://example.com/data-viz',
    category: 'Data Analysis',
    tech_stack: 'React, D3.js, Python',
    created_by: 5,
    created_by_name: 'Alex Kumar',
    average_rating: 4.9,
    created_at: '2024-01-05',
    status: 'Published'
  },
  {
    id: 6,
    title: 'Smart Scheduler AI',
    short_description: 'AI-powered scheduling assistant',
    full_description: 'Intelligent scheduling and calendar management.\n\n- Auto-schedule meetings\n- Time zone handling\n- Calendar integration\n- Smart reminders',
    logo_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
    project_url: 'https://example.com/scheduler',
    category: 'Productivity',
    tech_stack: 'React, Node.js, MongoDB',
    created_by: 6,
    created_by_name: 'Emma Davis',
    average_rating: 4.4,
    created_at: '2024-01-03',
    status: 'Published'
  }
]

const mockReviews = [
  {
    id: 1,
    project_id: 1,
    user_id: 3,
    user_name: 'Alice Johnson',
    user_role: 'user',
    rating: 5,
    comment: 'Amazing tool! Saved me hours of work.',
    created_at: '2024-01-20'
  },
  {
    id: 2,
    project_id: 1,
    user_id: 4,
    user_name: 'Bob Wilson',
    user_role: 'developer',
    rating: 4,
    comment: 'Great project, could use more customization options.',
    created_at: '2024-01-18'
  }
]

export const getAllProjects = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockProjects
}

export const getProject = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const project = mockProjects.find(p => p.id === parseInt(id))
  if (!project) throw new Error('Project not found')
  return project
}

export const getProjectReviews = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockReviews.filter(r => r.project_id === parseInt(id))
}

export const toggleBookmark = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return { ok: true }
}

export const projectService = {
  getAllProjects,
  getProject,
  getProjectReviews,
  toggleBookmark
}
