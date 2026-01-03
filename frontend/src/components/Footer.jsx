import { Link } from 'react-router-dom'
import { Twitter, Github, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className="glass border-t border-dark-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="BYTEXAI" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold gradient-text">BYTEXAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover and showcase AI projects. Built for the AI community.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Home</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Explore Projects</Link></li>
              <li><Link to="/developer/projects/new" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Submit Project</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Help Center</Link></li>
              <li><Link to="/bookmarks" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Bookmarks</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 BYTEXAI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition hover:scale-125 transform">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition hover:scale-125 transform">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition hover:scale-125 transform">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
