import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Todo Master
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize your life, one task at a time. Stay productive and focused with our beautiful todo app.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <TodoForm />
          <TodoList />
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500">
          <p>Built with React, Tailwind CSS, and ❤️</p>
        </footer>
      </div>
    </div>
  );
}