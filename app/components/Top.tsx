import { Link } from "react-router";
import {
  Home,
  Grid,
  Plus,
  Book,
  Calendar,
  LogIn,
  UserPlus,
  BookOpen,
} from "lucide-react"; // Lucide Icons 사용

export default function Top() {
  return (
    <div
      className="bg-gray-900 p-4 shadow-md sticky top-0 z-10"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <nav className="flex flex-wrap justify-between items-center space-x-4">
        {/* 왼쪽 메뉴 그룹 */}
        <div className="flex space-x-4">
          {/* Home Button */}
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            <Home className="w-7 h-7 text-white" />
            <span className="text-white text-2xl font-extrabold leading-tight">
              SuperCard
            </span>
          </Link>

          <Link
            to="/about"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            <BookOpen className="w-5 h-5 text-white" />
            <span className="text-white text-lg">About</span>
          </Link>

          {/* Dashboard Button */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            <Grid className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Dashboard</span>
          </Link>

          {/* New Card Button */}
          <Link
            to="/new"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            <Plus className="w-5 h-5 text-white" />
            <span className="text-white text-lg">New Card</span>
          </Link>

          {/* Cards Button */}
          <Link
            to="/cards"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            <Book className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Cards</span>
          </Link>

          {/* Today Button */}
          <Link
            to="/today"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Today</span>
          </Link>
        </div>

        {/* 우측 메뉴 그룹 (Login, Sign In) */}
        <div className="flex space-x-4 ml-auto">
          {/* Login Button */}
          <Link
            to="/login"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all"
          >
            <LogIn className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Login</span>
          </Link>

          {/* Sign In Button */}
          <Link
            to="/signup"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all"
          >
            <UserPlus className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Sign Up</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
