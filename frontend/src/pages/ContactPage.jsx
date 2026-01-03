import { useState } from 'react'
import { CheckCircle, Mail, MessageCircle, Globe, HelpCircle, Lock, FileText } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF] dark:bg-dark-bg">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none" placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none" placeholder="your@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none" placeholder="How can we help?" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows="5" className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg/50 border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Your message..." required />
              </div>
              {submitted && (
                <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-xl">
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Message sent successfully!
                  </p>
                </div>
              )}
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">support@bytexai.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Live Chat</h3>
                    <Link to="/chat" className="text-indigo-600 dark:text-accent hover:text-indigo-700 dark:hover:text-primary transition-colors duration-200">Start a conversation →</Link>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-6 h-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">Remote-first company</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Links</h2>
              <div className="space-y-3">
                <Link to="/help" className="block text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </Link>
                <Link to="/privacy-policy" className="block text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="block text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
