import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import Navbar from '../components/Navbar'

function CommunityPage() {
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('worldChatMessages')
    return saved ? JSON.parse(saved) : [
      { id: 1, user: 'Alex', message: 'Hey everyone! How\'s your project going?', time: '2:30 PM' },
      { id: 2, user: 'Sarah', message: 'Just deployed my AI model. Excited to share!', time: '2:32 PM' },
      { id: 3, user: 'Mike', message: 'Anyone working on machine learning projects?', time: '2:35 PM' }
    ]
  })

  useEffect(() => {
    localStorage.setItem('worldChatMessages', JSON.stringify(chatMessages))
  }, [chatMessages])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: Date.now(),
        user: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setChatMessage('')
    }
  }

  const discussions = []

  const events = []

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-ping"></div>
      </div>
      
      <Navbar />
      
      <div className="flex-1 flex flex-col p-4 relative z-10 pb-20 pt-20">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-2">
            World Chat
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Connect with developers worldwide
          </p>
        </div>

        <div className="flex-1 bg-gray-100/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-300 dark:border-white/10 flex flex-col">
          <div className="p-4 border-b border-gray-300 dark:border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-2xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Global Chat Room</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex flex-col max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.user === 'You' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'
                } transition-all`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-semibold text-sm ${
                      msg.user === 'You' ? 'text-blue-100' : 'text-blue-400'
                    }`}>{msg.user}</span>
                    <span className={`text-xs ${
                      msg.user === 'You' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                    }`}>{msg.time}</span>
                  </div>
                  <p className={`text-sm ${
                    msg.user === 'You' ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                  }`}>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-gradient-to-r dark:from-purple-500/10 dark:to-blue-500/10 border-t border-gray-300 dark:border-white/10 backdrop-blur-xl z-20">
        <div className="flex space-x-2 max-w-6xl mx-auto">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-white dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage