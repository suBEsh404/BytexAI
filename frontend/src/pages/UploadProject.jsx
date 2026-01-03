import React, { useState } from 'react';
import { Upload, Link2, Image, Sparkles, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const UploadProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
    tags: []
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const categories = [
    'AI Tools', 'Productivity', 'Content Creation', 'Data Analysis', 
    'Image Processing', 'Code Utilities', 'Design Tools', 'Marketing',
    'Education', 'Finance', 'Health & Fitness', 'Entertainment'
  ];

  const suggestedTags = ['AI', 'Machine Learning', 'Automation', 'Analytics', 'Generator', 'Editor', 'Optimizer'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 8) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('Project submitted:', formData);
    navigate('/developer/dashboard');
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 text-slate-200">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8 animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Upload Your Project</h2>
              <p className="text-gray-600 dark:text-slate-400">Share your AI tool or website with the community</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-800 dark:border-slate-800 shadow-sm dark:shadow-md dark:shadow-black/10">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., AI Image Generator Pro"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition focus:ring-1 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">Choose a clear, descriptive name for your project</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-800 dark:border-slate-800 shadow-sm dark:shadow-md dark:shadow-black/10">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what your project does, its key features, and what makes it unique..."
              rows={6}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none focus:ring-1 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">Min. 100 characters · {formData.description.length}/1000</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-800 dark:border-slate-800 shadow-sm dark:shadow-md dark:shadow-black/10">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Project URL *</label>
            <div className="relative">
              <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://your-project.com"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">The live URL where users can access your project</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-800 dark:border-slate-800 shadow-sm dark:shadow-md dark:shadow-black/10">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Project Thumbnail *</label>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="relative block cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                  <div className="bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl p-8 group-hover:border-indigo-500 transition text-center group-hover:bg-gray-100 dark:group-hover:bg-slate-800/50">
                    <Image className="w-12 h-12 text-gray-400 dark:text-slate-600 mx-auto mb-3 group-hover:text-indigo-400 transition" />
                    <p className="text-gray-600 dark:text-slate-400 mb-1 group-hover:text-gray-700 dark:group-hover:text-slate-300">Click to upload thumbnail</p>
                    <p className="text-xs text-gray-500 dark:text-slate-500">PNG, JPG up to 5MB · Recommended: 1200x630px</p>
                  </div>
                </label>
              </div>
              {thumbnail && (
                <div className="w-full md:w-64 relative">
                  <img src={thumbnail} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-gray-300 dark:border-slate-700 shadow-lg" />
                  <button
                    type="button"
                    onClick={() => setThumbnail(null)}
                    className="absolute top-2 right-2 bg-slate-900/80 hover:bg-red-500 w-7 h-7 rounded-full flex items-center justify-center transition backdrop-blur-sm"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-800 dark:border-slate-800 shadow-sm dark:shadow-md dark:shadow-black/10">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-800 dark:border-slate-800 shadow-sm dark:shadow-md dark:shadow-black/10">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Tags</label>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(currentTag);
                  }
                }}
                placeholder="Add a tag..."
                className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-2 text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => addTag(currentTag)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium transition shadow-lg shadow-indigo-500/20"
              >
                Add
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map(tag => (
                  <span key={tag} className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2 animate-in zoom-in duration-200">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-sky-300 transition">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div>
              <p className="text-xs text-gray-500 dark:text-slate-500 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={formData.tags.includes(tag)}
                    className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-400 px-3 py-1 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-slate-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-3">Add up to 8 tags · {formData.tags.length}/8</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 py-4 rounded-xl font-semibold transition border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Upload className="w-5 h-5" />
              Publish Project
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadProject;
