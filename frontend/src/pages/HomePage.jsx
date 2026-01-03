import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Laptop, Star, Rocket } from 'lucide-react'
import Footer from '../components/Footer'
import { HeroWavyBackground } from '../components/HeroWavyBackground'
import TestimonialMarquee from '../components/TestimonialMarquee'
import { getAllProjects } from '../services/projectService'
import browseImg from "../assets/icons/OIG2.webp";
import testImg from "../assets/icons/Integration_Testing.avif";
import reviewImg from "../assets/icons/reviewimg.png";

function HomePage() {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [trendingProjects, setTrendingProjects] = useState([])

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await getAllProjects()
        setTrendingProjects(projects)
      } catch (error) {
        console.error('Failed to load projects:', error)
      }
    }
    loadProjects()
  }, [])

  const allProjects = [
    { id: 1, title: 'AI Chatbot Assistant', description: 'Smart conversational AI for customer support', category: 'NLP', rating: 4.5 },
    { id: 2, title: 'Image Recognition System', description: 'Advanced computer vision for object detection', category: 'Computer Vision', rating: 4.8 },
    { id: 3, title: 'Text Generator Pro', description: 'GPT-powered content generation tool', category: 'Generative AI', rating: 4.3 },
    { id: 4, title: 'Voice Assistant', description: 'Natural language voice commands', category: 'NLP', rating: 4.6 },
    { id: 5, title: 'Face Detection API', description: 'Real-time face recognition and analysis', category: 'Computer Vision', rating: 4.7 },
    { id: 6, title: 'Code Completion AI', description: 'AI-powered code suggestions', category: 'ML Tools', rating: 4.4 }
  ]

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim()) {
      setIsSearching(true)
      const results = allProjects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.category.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-dark-bg">
      <section className="relative overflow-hidden py-32">
        <HeroWavyBackground>
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-[1.15] pb-2">
              <span className="inline-block pb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-500 transition-all duration-500 hover:drop-shadow-[0_0_45px_rgba(34,211,238,0.9)] hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 cursor-pointer">
                Discover & Test AI Projects
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse community-built AI tools, run them instantly, and share feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/projects" className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl">
                <Rocket className="inline w-5 h-5 mr-2" />
                Browse Projects
              </Link>
              <Link to="/signup" className="px-10 py-4 glass text-white font-semibold rounded-2xl">
                <Laptop className="inline w-5 h-5 mr-2" />
                I'm a Developer
              </Link>
            </div>
            <div className="mt-16 max-w-2xl mx-auto relative">
              <div className="glass rounded-2xl p-6">
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search AI projects..." className="w-full px-6 py-4 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-gray-500 outline-none" />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>
              {isSearching && (
                <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-dark-border max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <div className="p-4 space-y-3">
                      {searchResults.map(project => (
                        <Link key={project.id} to={`/projects/${project.id}`} className="block p-4 rounded-xl">
                          <h4 className="text-white font-semibold">{project.title}</h4>
                          <p className="text-gray-400 text-sm">{project.description}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-400">No projects found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </HeroWavyBackground>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Trending <span className="gradient-text">AI Tools</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProjects.map(project => (
            <Link key={project.id} to={`/projects/${project.id}`} className="glass rounded-2xl p-6 block">
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.short_description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">{project.average_rating}</span>
                </div>
                <span className="text-accent">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Launch Your <span className="gradient-text">AI Project</span>?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Join thousands of developers showcasing their AI innovations</p>
          <Link to="/signup" className="inline-block px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl">
            <Rocket className="inline w-5 h-5 mr-2" /> Get Started Free
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>How It Works</h2>
          <p className="text-blue-400 text-lg md:text-xl font-medium leading-relaxed">Explore AI projects, test instantly, and share insights effortlessly</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-24 h-24 bg-blue-300 text-white flex items-center justify-center mx-auto mb-4 rounded-full">
              <img src={browseImg} alt="Browse Projects" className="w-20 h-20 object-cover rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-blue-500 mb-3">Browse Projects</h3>
            <p className="text-blue-400">Discover a wide range of AI projects created by developers from different domains. Explore real-world use cases, understand project objectives, and get inspired by innovative ideas—all in one place.</p>
          </div>
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-24 h-24 bg-blue-300 text-white flex items-center justify-center mx-auto mb-4 rounded-full">
              <img src={testImg} alt="Test Instantly" className="w-20 h-20 object-cover rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-blue-500 mb-3">Test Instantly</h3>
            <p className="text-blue-400">Run and test AI tools directly on the platform without any complex setup. Experience how each project works in real time, evaluate its functionality, and see results instantly showing its practical impact.</p>
          </div>
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-24 h-24 bg-blue-300 text-white flex items-center justify-center mx-auto mb-4 rounded-full">
              <img src={reviewImg} alt="Submit Reviews" className="w-20 h-20 object-cover rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-blue-500 mb-3">Submit Reviews</h3>
            <p className="text-blue-400">Share your experience by submitting reviews and ratings for the projects you explore. Your feedback helps developers improve their work and guides other users in choosing the best projects.</p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-500 mb-4">What Users Say</h2>
          <p className="text-lg md:text-xl text-blue-500/70 font-medium leading-[1.7] max-w-2xl mx-auto">Real experiences shared by developers and users building with our platform.</p>
        </div>
        <TestimonialMarquee />
      </section>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold gradient-text mb-2">1000+</div>
            <p className="text-gray-400">AI Projects</p>
          </div>
          <div>
            <div className="text-5xl font-bold gradient-text mb-2">500+</div>
            <p className="text-gray-400">Developers</p>
          </div>
          <div>
            <div className="text-5xl font-bold gradient-text mb-2">5000+</div>
            <p className="text-gray-400">Reviews</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default HomePage
