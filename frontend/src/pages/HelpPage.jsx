import { useState } from 'react'
import { Rocket, Laptop, User, Settings, Search, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = {
    'getting-started': [
      {
        q: 'What is BYTEXAI?',
        a: 'BYTEXAI is a platform where developers can showcase their AI projects and users can discover, test, and review AI-powered applications.'
      },
      {
        q: 'How do I create an account?',
        a: 'Click the "Sign Up" button in the navigation bar, fill in your details, and choose whether you\'re a User or Developer.'
      },
      {
        q: 'Is BYTEXAI free to use?',
        a: 'Yes! BYTEXAI is free for both users and developers. Premium features will be available in the future.'
      }
    ],
    'for-developers': [
      {
        q: 'How do I submit my AI project?',
        a: 'After signing up as a developer, go to your dashboard and click "Add New Project". Fill in the project details and submit.'
      },
      {
        q: 'What information do I need to provide?',
        a: 'You need to provide: project title, description, category, tech stack, project URL, and optionally a logo.'
      },
      {
        q: 'Can I edit my project after submission?',
        a: 'Yes! You can edit or delete your projects anytime from your developer dashboard.'
      }
    ],
    'for-users': [
      {
        q: 'How do I find AI projects?',
        a: 'Browse the home page for trending projects, or use the Explore page to search and filter projects by category.'
      },
      {
        q: 'How do I review a project?',
        a: 'Open any project detail page and scroll to the reviews section. You can rate (1-5 stars) and leave a comment.'
      },
      {
        q: 'Can I bookmark projects?',
        a: 'Yes! Click the bookmark icon on any project to save it to your bookmarks for easy access later.'
      }
    ],
    'account': [
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page, enter your email, and follow the reset link sent to your inbox.'
      },
      {
        q: 'How do I update my profile?',
        a: 'Go to your Profile page and click the Settings tab to update your name and password.'
      },
      {
        q: 'Can I switch from User to Developer?',
        a: 'Currently, role changes require contacting support. This feature will be available soon.'
      }
    ]
  }

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Rocket },
    { id: 'for-developers', name: 'For Developers', icon: Laptop },
    { id: 'for-users', name: 'For Users', icon: User },
    { id: 'account', name: 'Account & Settings', icon: Settings }
  ]

  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How can we <span className="gradient-text">help</span> you?
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Find answers to common questions about BYTEXAI
          </p>
          
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-6 border border-black dark:border-slate-700 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition ${
                      activeCategory === cat.id
                        ? 'bg-primary/20 text-gray-900 dark:text-white border border-primary/30'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="mr-2">
                      <cat.icon className="w-4 h-4 inline" />
                    </span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-12 text-center border border-black dark:border-slate-700">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No results found. Try a different search term.</p>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-6 border border-black dark:border-slate-700 hover:border-primary/30 transition animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-start">
                      <span className="text-primary mr-3">Q:</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 pl-8">
                      <span className="text-accent font-semibold mr-2">A:</span>
                      {faq.a}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-12 text-center border border-black dark:border-slate-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still need <span className="gradient-text">help</span>?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@bytexai.com"
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Mail className="w-4 h-4" />
              Email Support
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HelpPage
