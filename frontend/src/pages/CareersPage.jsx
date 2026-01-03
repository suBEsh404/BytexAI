import { useNavigate } from 'react-router-dom'
import { Globe, DollarSign, BookOpen, Calendar, MapPin, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CareersPage() {
  const navigate = useNavigate();

  const positions = [
    { id: 1, title: 'Senior Full Stack Developer', type: 'Full-time', location: 'Remote', department: 'Engineering' },
    { id: 2, title: 'AI/ML Engineer', type: 'Full-time', location: 'Remote', department: 'Engineering' },
    { id: 3, title: 'Product Designer', type: 'Full-time', location: 'Remote', department: 'Design' },
    { id: 4, title: 'DevOps Engineer', type: 'Full-time', location: 'Remote', department: 'Engineering' },
    { id: 5, title: 'Community Manager', type: 'Part-time', location: 'Remote', department: 'Marketing' },
    { id: 6, title: 'Technical Writer', type: 'Contract', location: 'Remote', department: 'Content' }
  ]

  return (
    <div className="min-h-screen bg-[#EFF6FF] dark:bg-dark-bg">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Help us build the future of AI project discovery</p>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Why Work With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    Remote First
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Work from anywhere in the world</p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    Competitive Pay
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Industry-leading compensation packages</p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                    Learning Budget
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Annual budget for courses and conferences</p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 border border-gray-200 dark:border-slate-600 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    Flexible Time Off
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Unlimited PTO and flexible working hours</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
          <div className="space-y-4">
            {positions.map(position => (
              <div key={position.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-primary/20 text-indigo-600 dark:text-primary text-xs rounded-full font-medium">{position.department}</span>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-accent/20 text-sky-600 dark:text-accent text-xs rounded-full font-medium">{position.type}</span>
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/apply/${position.id}`)}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 transform whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Don't See Your Role?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">We're always looking for talented individuals. Send us your resume!</p>
          <button
            onClick={() => navigate('/apply/general')}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 transform flex items-center gap-2 mx-auto"
          >
            <Mail className="w-4 h-4" />
            Send Resume
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CareersPage
