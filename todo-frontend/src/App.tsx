import { TodoPage } from "./pages/TodoPage";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        {/* App Header */}
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            Todo Application
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks, boost your productivity
          </p>
        </header>

        {/* Main Content - No container wrapper */}
        <TodoPage />
      </div>
    </>
  );
}
