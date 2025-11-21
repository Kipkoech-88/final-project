import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

// Enhanced Icons with more personality
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const categories = {
  general: { name: 'General', emoji: '📝', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200' },
  work: { name: 'Work', emoji: '💼', color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50', border: 'border-purple-200' },
  personal: { name: 'Personal', emoji: '🎯', color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50', border: 'border-green-200' },
  shopping: { name: 'Shopping', emoji: '🛒', color: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50', border: 'border-orange-200' },
  ideas: { name: 'Ideas', emoji: '💡', color: 'from-yellow-500 to-amber-500', bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-200' }
};

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Celebration effect when all tasks are completed
  useEffect(() => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount > 0 && completedCount === todos.length && todos.length > 0) {
      setCelebrating(true);
      const timer = setTimeout(() => setCelebrating(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [todos]);

  const loadTodos = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError('');
        const response = await axios.get(`${API_BASE}?category=${selectedCategory}&completed=${filter === 'completed'}`);
      setTodos(response.data);
    } catch (error) {
      console.error('❌ Error loading todos:', error);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTodos();
    window.addEventListener("todo-updated", () => loadTodos(false));
    return () => window.removeEventListener("todo-updated", () => loadTodos(false));
  }, []);

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_BASE}/${todo._id}`, {
        completed: !todo.completed,
        title: todo.title,
        category: todo.category
      }, { timeout: 10000 });
      
      // Celebration for individual task completion
      if (!todo.completed) {
        const taskElement = document.getElementById(`todo-${todo._id}`);
        taskElement?.classList.add('animate-complete-celebration');
        setTimeout(() => taskElement?.classList.remove('animate-complete-celebration'), 2000);
      }
      
      loadTodos(false);
    } catch (error) {
      console.error('❌ Error updating todo:', error);
      alert('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await axios.delete(`${API_BASE}/${id}`, { timeout: 10000 });
        loadTodos(false);
      } catch (error) {
        console.error('❌ Error deleting todo:', error);
        alert('Failed to delete todo. Please try again.');
      }
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) {
      alert('Todo title cannot be empty');
      return;
    }
    try {
      await axios.put(`${API_BASE}/${id}`, { title: editTitle.trim() }, { timeout: 10000 });
      setEditingId(null);
      setEditTitle('');
      loadTodos(false);
    } catch (error) {
      console.error('❌ Error updating todo:', error);
      alert('Failed to update todo. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadTodos(false);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const isRecentlyUpdated = (todo) => {
    if (!todo.updatedAt || !todo.createdAt) return false;
    return new Date(todo.updatedAt).getTime() - new Date(todo.createdAt).getTime() > 1000;
  };

  // Enhanced filtering with categories
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = todo.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || todo.category === selectedCategory;
    
    return matchesFilter && matchesSearch && matchesCategory;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
    completionRate: todos.length > 0 ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0
  };

  // Category statistics
  const categoryStats = Object.keys(categories).map(catId => ({
    ...categories[catId],
    count: todos.filter(todo => todo.category === catId).length,
    completed: todos.filter(todo => todo.category === catId && todo.completed).length
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animate-reverse"></div>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-lg font-medium mb-2">Loading your tasks</p>
          <p className="text-gray-400 text-sm">Getting everything organized...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 px-4">
      {/* Celebration Confetti */}
      {celebrating && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                background: `hsl(${Math.random() * 360}, 100%, 60%)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px'
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Stats Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="relative z-10">
              <div className="text-4xl font-bold mb-2">{stats.total}</div>
              <div className="text-blue-100 opacity-90 font-medium">Total Tasks</div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="relative z-10">
              <div className="text-4xl font-bold mb-2">{stats.active}</div>
              <div className="text-green-100 opacity-90 font-medium">Active</div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="relative z-10">
              <div className="text-4xl font-bold mb-2">{stats.completed}</div>
              <div className="text-purple-100 opacity-90 font-medium">Completed</div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300">
          <div className="text-center">
            <div className="relative inline-block mb-3">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200"/>
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-green-500 transition-all duration-1000 ease-out" strokeDasharray={264} strokeDashoffset={264 - (stats.completionRate / 100) * 264} strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">
                  {Math.round(stats.completionRate)}%
                </span>
              </div>
            </div>
            <div className="text-gray-600 font-semibold">Progress</div>
            {stats.completed === stats.total && stats.total > 0 && (
              <div className="mt-2 text-green-500 text-sm font-medium animate-pulse">🎉 All done!</div>
            )}
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <CategoryIcon />
          Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoryStats.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
              className={`p-4 rounded-2xl transition-all duration-300 text-left group ${
                selectedCategory === cat.id 
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105` 
                  : 'bg-white/50 hover:bg-white/80 hover:scale-105'
              }`}
            >
              <div className="text-2xl mb-2">{cat.emoji}</div>
              <div className={`text-sm font-semibold ${selectedCategory === cat.id ? 'text-white' : 'text-gray-700'}`}>
                {cat.name}
              </div>
              <div className={`text-xs ${selectedCategory === cat.id ? 'text-white/90' : 'text-gray-500'}`}>
                {cat.count} tasks
              </div>
              {cat.count > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                    style={{ width: `${(cat.completed / cat.count) * 100}%` }}
                  ></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search with icon */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search your tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all duration-300 backdrop-blur-sm text-lg font-medium"
            />
          </div>
          
          {/* Status filter pills */}
          <div className="flex gap-2 bg-white/50 rounded-2xl p-2 backdrop-blur-sm">
            {[
              { key: 'all', label: 'All Tasks', emoji: '📋' },
              { key: 'active', label: 'Active', emoji: '⏳' },
              { key: 'completed', label: 'Completed', emoji: '✅' }
            ].map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  filter === key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/80'
                }`}
              >
                <span className="text-sm">{emoji}</span>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-4 bg-white/50 hover:bg-white/80 rounded-2xl transition-all duration-300 disabled:opacity-50 backdrop-blur-sm"
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Enhanced Todo Cards with Staggered Animation */}
      <div className="grid gap-4">
        {filteredTodos.map((todo, index) => {
          const todoCategory = categories[todo.category] || categories.general;
          
          return (
            <div
              key={todo._id}
              id={`todo-${todo._id}`}
              className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl animate-slide-in ${
                todo.completed 
                  ? `border-green-200 bg-gradient-to-r ${todoCategory.bg}` 
                  : `border-white hover:${todoCategory.border}`
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Enhanced checkbox with category color */}
                <button
                  onClick={() => toggleComplete(todo)}
                  className={`flex-shrink-0 w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg mt-1 ${
                    todo.completed
                      ? `bg-gradient-to-r ${todoCategory.color} text-white shadow-green-200 scale-110`
                      : 'bg-white border-2 border-gray-300 hover:border-green-500 hover:shadow-green-200 text-transparent hover:scale-110'
                  }`}
                >
                  {todo.completed && <CheckIcon />}
                </button>

                {/* Content area */}
                <div className="flex-1 min-w-0">
                  {editingId === todo._id ? (
                    <div className="flex gap-3 items-start">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(todo._id);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        className="flex-1 border-b-2 border-blue-500 bg-transparent focus:outline-none text-lg font-semibold py-1"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => saveEdit(todo._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
                        >
                          Save
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="px-4 py-2 bg-gray-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="cursor-pointer" onClick={() => toggleComplete(todo)}>
                      <div className={`font-semibold text-xl break-words leading-relaxed mb-3 ${
                        todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                      }`}>
                        {todo.title}
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {/* Category badge */}
                        <div className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full font-medium ${
                          todo.completed 
                            ? 'bg-gray-100 text-gray-500' 
                            : `bg-gradient-to-r ${todoCategory.color} text-white`
                        }`}>
                          <span>{todoCategory.emoji}</span>
                          <span>{todoCategory.name}</span>
                        </div>
                        
                        {/* Date badge */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                          <CalendarIcon />
                          {formatDate(todo.createdAt)}
                        </div>
                        
                        {/* Updated badge */}
                        {isRecentlyUpdated(todo) && (
                          <div className="flex items-center gap-2 text-sm text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                            <ClockIcon />
                            Updated
                          </div>
                        )}
                        
                        {/* Completion badge */}
                        {todo.completed && (
                          <div className="flex items-center gap-2 text-sm text-green-500 bg-green-50 px-3 py-1 rounded-full">
                            <SparkleIcon />
                            Completed!
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced action buttons */}
                {editingId !== todo._id && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => startEditing(todo)}
                      className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id, todo.title)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced empty state */}
      {filteredTodos.length === 0 && (
        <div className="text-center py-20">
          <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-float">
            <span className="text-8xl">🎯</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-700 mb-4">
            {searchTerm || selectedCategory !== 'all' ? 'No tasks found' : 'Your mission begins now!'}
          </h3>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            {searchTerm 
              ? "No tasks match your search. Try different keywords or clear your filters."
              : "Add your first task above and start your productivity journey. Every great accomplishment starts with a single step."
            }
          </p>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setFilter('all');
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-semibold text-lg"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Enhanced footer stats */}
      {todos.length > 0 && (
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-6 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/40">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{filteredTodos.length}</div>
              <div className="text-sm text-gray-500">Showing</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{todos.length}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            
            {stats.completed === stats.total && stats.total > 0 && (
              <>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2 text-green-500 font-semibold animate-pulse">
                  <SparkleIcon />
                  <span>All tasks completed! 🎉</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes confetti {
          0% { 
            transform: translateY(-100vh) rotate(0deg) scale(0); 
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh) rotate(360deg) scale(1); 
            opacity: 0;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes complete-celebration {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-confetti {
          animation: confetti 4s linear forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-complete-celebration {
          animation: complete-celebration 0.6s ease-in-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}