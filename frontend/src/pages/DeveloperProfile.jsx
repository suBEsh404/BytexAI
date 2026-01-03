import React, { useState } from 'react';
import { MapPin, Calendar, Globe, Github, Twitter, Linkedin, Star, Eye, Award, TrendingUp, Edit } from 'lucide-react';
import Navbar from '../components/Navbar';

const DeveloperProfile = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const profile = {
    name: 'Alex Thompson',
    username: '@alexdev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    bio: 'Full-stack developer and AI enthusiast. Building tools that make developers\' lives easier. Open source contributor and tech educator.',
    location: 'San Francisco, CA',
    joinedDate: 'January 2023',
    stats: {
      projects: 24,
      totalViews: 45600,
      avgRating: 4.7,
      followers: 1234
    }
  };

  const projects = [
    {
      id: 1,
      title: 'AI Content Generator',
      description: 'Generate high-quality content with AI-powered algorithms',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      category: 'AI Tools',
      rating: 4.8,
      reviews: 234,
      views: 12400,
      tags: ['AI', 'Generator'],
      featured: true
    },
    {
      id: 2,
      title: 'Code Optimizer AI',
      description: 'Optimize and refactor your code automatically',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
      category: 'Productivity',
      rating: 4.7,
      reviews: 156,
      views: 7200,
      tags: ['AI', 'Code'],
      featured: false
    },
    {
      id: 3,
      title: 'Data Visualizer Pro',
      description: 'Create stunning data visualizations in seconds',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      category: 'Data Analysis',
      rating: 4.9,
      reviews: 412,
      views: 15600,
      tags: ['Analytics', 'Data'],
      featured: true
    },
    {
      id: 4,
      title: 'Image Enhancer',
      description: 'Enhance and upscale images using ML',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop',
      category: 'Image Processing',
      rating: 4.6,
      reviews: 189,
      views: 8900,
      tags: ['AI', 'Image'],
      featured: false
    },
    {
      id: 5,
      title: 'Smart Scheduler',
      description: 'AI-powered scheduling and calendar management',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop',
      category: 'Productivity',
      rating: 4.5,
      reviews: 98,
      views: 5400,
      tags: ['AI', 'Productivity'],
      featured: false
    },
    {
      id: 6,
      title: 'Voice Synthesizer',
      description: 'Convert text to natural-sounding speech',
      thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=250&fit=crop',
      category: 'AI Tools',
      rating: 4.8,
      reviews: 267,
      views: 11200,
      tags: ['AI', 'Audio'],
      featured: true
    }
  ];

  const achievements = [
    { icon: Award, title: 'Top Developer', description: 'Ranked in top 5% of developers' },
    { icon: TrendingUp, title: 'Rising Star', description: '10K+ views this month' },
    { icon: Star, title: 'Quality Creator', description: 'Avg rating above 4.5' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-8 shadow-xl shadow-black/20">
          <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-600 to-sky-500 relative">
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 mb-6">
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-32 h-32 rounded-2xl border-4 border-slate-900 object-cover shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-slate-900 rounded-full"></div>
              </div>

              <div className="flex-1 md:mb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-100 mb-1">{profile.name}</h2>
                    <p className="text-slate-400 mb-3">{profile.username}</p>
                  </div>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium border border-slate-700">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                <p className="text-slate-300 mb-4 max-w-2xl leading-relaxed">{profile.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Joined {profile.joinedDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 hover:text-white text-slate-400 rounded-lg flex items-center justify-center transition border border-slate-700 hover:border-indigo-500">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 hover:text-white text-slate-400 rounded-lg flex items-center justify-center transition border border-slate-700 hover:border-indigo-500">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 hover:text-white text-slate-400 rounded-lg flex items-center justify-center transition border border-slate-700 hover:border-indigo-500">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 hover:text-white text-slate-400 rounded-lg flex items-center justify-center transition border border-slate-700 hover:border-indigo-500">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
              <div className="text-center p-3 rounded-xl hover:bg-slate-800/50 transition">
                <div className="text-2xl font-bold text-slate-100 mb-1">{profile.stats.projects}</div>
                <div className="text-sm text-slate-400">Projects</div>
              </div>
              <div className="text-center p-3 rounded-xl hover:bg-slate-800/50 transition">
                <div className="text-2xl font-bold text-slate-100 mb-1">{(profile.stats.totalViews / 1000).toFixed(1)}k</div>
                <div className="text-sm text-slate-400">Total Views</div>
              </div>
              <div className="text-center p-3 rounded-xl hover:bg-slate-800/50 transition">
                <div className="text-2xl font-bold text-slate-100 mb-1">{profile.stats.avgRating}</div>
                <div className="text-sm text-slate-400">Avg Rating</div>
              </div>
              <div className="text-center p-3 rounded-xl hover:bg-slate-800/50 transition">
                <div className="text-2xl font-bold text-slate-100 mb-1">{profile.stats.followers}</div>
                <div className="text-sm text-slate-400">Followers</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-indigo-500/50 transition hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                <achievement.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">{achievement.title}</h3>
              <p className="text-sm text-slate-400">{achievement.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-t-2xl border-t border-x border-slate-800 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-2 border-b-2 transition font-medium ${
                activeTab === 'projects'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`py-4 px-2 border-b-2 transition font-medium ${
                activeTab === 'featured'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Featured ({projects.filter(p => p.featured).length})
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-b-2xl border-b border-x border-slate-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(p => activeTab === 'projects' || p.featured)
              .map(project => (
              <div key={project.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-indigo-500/50 transition group cursor-pointer hover:shadow-xl hover:shadow-black/20">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition"></div>
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-100 mb-1 group-hover:text-indigo-400 transition">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-slate-700">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-slate-300">{project.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-sm text-slate-400">{(project.views / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperProfile;
