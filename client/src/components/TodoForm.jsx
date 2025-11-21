import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

export default function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [category, setCategory] = useState('general');
  const inputRef = useRef(null);

  const categories = [
    { id: 'general', name: 'General', emoji: '📝', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'work', name: 'Work', emoji: '💼', color: 'from-purple-500 to-pink-500', bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'personal', name: 'Personal', emoji: '🎯', color: 'from-green-500 to-emerald-500', bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'shopping', name: 'Shopping', emoji: '🛒', color: 'from-orange-500 to-red-500', bgColor: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'ideas', name: 'Ideas', emoji: '💡', color: 'from-yellow-500 to-amber-500', bgColor: 'bg-gradient-to-r from-yellow-500 to-amber-500' }
  ];

  const selectedCategory = categories.find(cat => cat.id === category) || categories[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!title.trim()) {
      inputRef.current.classList.add('animate-shake');
      setTimeout(() => inputRef.current.classList.remove('animate-shake'), 500);
      return;
    }

    setLoading(true);
    try {
      console.log('🔄 Creating todo with category:', category);
      
      const response = await axios.post(`${API_BASE}/new`, { 
        title: title.trim(),
        completed: false,
        category: category,
        priority: 'medium',
        tags: [],
        estimatedTime: 0
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });

      console.log('✅ Todo created successfully:', response.data);
      
      // Success animation
      const button = document.querySelector('#submit-btn');
      button.classList.add('animate-pulse');
      
      setTimeout(() => {
        setTitle('');
        setCategory('general');
        button.classList.remove('animate-pulse');
        window.dispatchEvent(new CustomEvent('todo-updated', { 
          detail: { action: 'created', todo: response.data }
        }));
        if (onTodoAdded) onTodoAdded();
      }, 600);
      
    } catch (error) {
      console.error('❌ Error adding todo:', error);
      if (error.response) {
        console.error('📡 Server response:', error.response.data);
        alert(`Failed to add todo: ${error.response.data.error || error.response.data.message || 'Server error'}`);
      }
      inputRef.current.classList.add('animate-wiggle');
      setTimeout(() => inputRef.current.classList.remove('animate-wiggle'), 600);
    } finally {
      setLoading(false);
    }
  };

  const shouldFloat = isFocused || title.length > 0;

  const quickTemplates = [
    { text: 'Plan my day 🗓️', category: 'personal' },
    { text: 'Finish project report 📊', category: 'work' },
    { text: 'Brainstorm new ideas 💭', category: 'ideas' },
    { text: 'Buy groceries 🍎', category: 'shopping' },
    { text: 'Schedule meeting 📅', category: 'work' },
    { text: 'Workout session 💪', category: 'personal' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 px-4">
      {/* Animated background elements */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl -z-10 animate-float"></div>
      <div className="absolute right-0 top-10 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl -z-10 animate-float-slow"></div>
      
      <div className="relative group">
        {/* Main form container - Wider to match TodoList */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
          {/* Dynamic gradient border based on category */}
          <div className={`absolute inset-0 bg-gradient-to-r ${selectedCategory.color} rounded-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="p-8">
              {/* Enhanced Category Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span>📁</span>
                  Choose Category
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        console.log('🎯 Category selected:', cat.id);
                        setCategory(cat.id);
                      }}
                      className={`p-4 rounded-2xl transition-all duration-300 text-left group cursor-pointer border-2 ${
                        category === cat.id
                          ? `${cat.bgColor} text-white shadow-lg scale-105 border-transparent`
                          : 'bg-white/60 text-gray-600 hover:bg-white/80 border-white/40 hover:scale-105'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cat.emoji}</span>
                        <div className="text-left">
                          <div className="font-semibold text-sm">{cat.name}</div>
                          <div className={`text-xs opacity-75 ${category === cat.id ? 'text-white/90' : 'text-gray-500'}`}>
                            {cat.id === 'general' && 'Daily tasks'}
                            {cat.id === 'work' && 'Professional'}
                            {cat.id === 'personal' && 'Life goals'}
                            {cat.id === 'shopping' && 'Purchases'}
                            {cat.id === 'ideas' && 'Creative thoughts'}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Input Area */}
              <div className="relative mb-6">
                <label 
                  className={`absolute left-6 transition-all duration-300 pointer-events-none font-semibold ${
                    shouldFloat 
                      ? 'top-3 text-sm bg-white/90 px-3 py-1 rounded-xl text-gray-700 shadow-sm'
                      : 'top-6 text-xl text-gray-400'
                  }`}
                >
                  {selectedCategory.emoji} What needs to be done?
                </label>
                
                <input
                  ref={inputRef}
                  className="w-full bg-white/50 backdrop-blur-sm pt-12 pb-8 px-6 text-2xl font-bold outline-none placeholder-transparent rounded-2xl border-2 border-white/60 focus:border-blue-300/50 transition-all duration-300 resize-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && handleSubmit(e)}
                  disabled={loading}
                  maxLength={120}
                  aria-label="Add a new todo"
                />
                
                {/* Enhanced Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${selectedCategory.color} transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${Math.min((title.length / 120) * 100, 100)}%` }}
                  ></div>
                </div>

                {/* Character Counter */}
                <div className={`absolute bottom-3 right-6 text-sm font-medium transition-all duration-300 ${
                  title.length > 100 ? 'text-orange-500 animate-pulse' : 
                  title.length > 80 ? 'text-yellow-500' : 'text-gray-400'
                }`}>
                  {title.length}/120
                </div>
              </div>
            </div>
            
            {/* Action Section */}
            <div className="px-8 pb-8">
              <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
                {/* Quick Templates */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <span>⚡</span>
                    Quick Start Templates
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {quickTemplates.map((template, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setTitle(template.text);
                          setCategory(template.category);
                          inputRef.current.focus();
                        }}
                        className="px-4 py-2 text-sm bg-white/70 hover:bg-white/95 rounded-xl transition-all duration-300 text-gray-700 hover:text-gray-900 hover:scale-105 border border-white/60 backdrop-blur-sm shadow-sm hover:shadow-md flex items-center gap-2"
                      >
                        <span>{template.text.split(' ')[0]}</span>
                        <span className="text-xs opacity-75">
                          {categories.find(c => c.id === template.category)?.emoji}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500 hidden xl:block">
                    Selected: <span className="font-semibold text-gray-700">{selectedCategory.name} {selectedCategory.emoji}</span>
                  </div>
                  
                  <button 
                    id="submit-btn"
                    type="submit"
                    disabled={loading || !title.trim()}
                    className={`relative ${selectedCategory.bgColor} text-white px-10 py-5 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn min-w-[160px]`}
                  >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-semibold text-lg">Adding...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl font-bold">+</span>
                          <span className="font-semibold text-lg">Add Task</span>
                          <span className="text-base opacity-90">{selectedCategory.emoji}</span>
                        </>
                      )}
                    </div>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Current Selection Indicator */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/40">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedCategory.emoji}</span>
            <span className="text-sm text-gray-600">Current category:</span>
            <span className="font-semibold text-gray-800">{selectedCategory.name}</span>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="text-sm text-gray-500">
            {title ? `${title.length} characters` : 'Start typing...'}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0) scale(1); }
          25% { transform: rotate(-2deg) scale(1.02); }
          75% { transform: rotate(2deg) scale(1.02); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-wiggle { animation: wiggle 0.6s ease-in-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}