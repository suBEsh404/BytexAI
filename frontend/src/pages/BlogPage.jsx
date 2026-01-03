import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function BlogPage() {
  const posts = [
    { id: 1, title: 'Getting Started with AI Project Development', category: 'Tutorial', date: 'Jan 15, 2025', excerpt: 'Learn the fundamentals of building and deploying AI projects on BYTEXAI platform.' },
    { id: 2, title: 'Top 10 AI Projects of 2024', category: 'Showcase', date: 'Jan 10, 2025', excerpt: 'Discover the most innovative AI projects that shaped the year.' },
    { id: 3, title: 'Best Practices for AI Model Deployment', category: 'Guide', date: 'Jan 5, 2025', excerpt: 'Essential tips for deploying your AI models in production environments.' },
    { id: 4, title: 'Community Spotlight: Developer Stories', category: 'Community', date: 'Dec 28, 2024', excerpt: 'Meet the developers behind some of our most popular AI projects.' },
    { id: 5, title: 'AI Ethics and Responsible Development', category: 'Opinion', date: 'Dec 20, 2024', excerpt: 'Exploring the importance of ethical considerations in AI development.' },
    { id: 6, title: 'New Features: Enhanced Project Analytics', category: 'Updates', date: 'Dec 15, 2024', excerpt: 'Introducing powerful analytics tools for tracking your project performance.' }
  ]

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-dark-bg">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            BYTEXAI <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Insights, tutorials, and updates from the AI community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-400 dark:hover:border-primary/50 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-primary/20 text-indigo-600 dark:text-primary text-xs rounded-full font-medium">{post.category}</span>
                <span className="text-gray-500 dark:text-gray-500 text-xs">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-indigo-600 dark:hover:text-primary transition">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
              <button className="text-indigo-600 dark:text-accent hover:text-indigo-700 dark:hover:text-primary transition text-sm font-medium">
                Read More →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-300 dark:border-slate-700 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Subscribe to our newsletter for the latest AI insights and platform updates</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-primary outline-none" />
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 transform">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BlogPage
