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
import clsx from "clsx";

import { useState } from "react"; // ✅ useTransition 추가
import { Loader2 } from "lucide-react"; // ✅ Lucide 아이콘에서 로딩 스피너 추가

export default function Top(user: any) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 막기
    setIsLoggingOut(true);

    setTimeout(() => {
      (e.target as HTMLFormElement).submit(); // ✅ form 직접 제출 (진짜 작동함)
    }, 1500);
  };

  return (
    <div
      className="bg-gray-900 p-4 shadow-md sticky top-0 z-10"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
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
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all font-extrabold"
          >
            <BookOpen className="w-5 h-5 text-white" />
            <span className="text-white text-lg">About</span>
          </Link>

          {/* Dashboard Button */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all font-extrabold"
          >
            <Grid className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Dashboard</span>
          </Link>

          {/* New Card Button */}
          <Link
            to="/new"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all font-extrabold"
          >
            <Plus className="w-5 h-5 text-white" />
            <span className="text-white text-lg">New Card</span>
          </Link>

          {/* Cards Button */}
          <Link
            to="/cards"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-green-600 transition-all font-extrabold"
          >
            <Book className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Cards</span>
          </Link>

          {/* Today Button */}
          <Link
            to="/today"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-600 transition-all font-extrabold"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Today</span>
          </Link>
          <Link
            to="/cardPage"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-600 transition-all font-extrabold"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Card Page</span>
          </Link>
        </div>

        <div className="flex space-x-4 ml-auto">
          {/* Login Button */}
          <Link
            to="/login"
            className={clsx(
              "flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all",
              { hidden: user.user !== null }
            )}
          >
            <LogIn className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Login</span>
          </Link>

          {/* Sign In Button */}
          <Link
            to="/register"
            className={clsx(
              "flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all",
              { hidden: user.user !== null }
            )}
          >
            <UserPlus className="w-5 h-5 text-white" />
            <span className="text-white text-lg">Sign Up</span>
          </Link>
        </div>

        {/* 로그아웃 버튼 */}
        <div
          className={clsx(
            "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-white font-semibold font-pretendard tracking-tight",
            { hidden: user.user === null }
          )}
        >
          <Link
            to="/settings"
            className="hover:underline text-white font-semibold transition-all"
          >
            <div>환영합니다! {user.user?.name}님! 👋</div>
          </Link>
        </div>

        <div
          className={clsx(
            "flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all",
            { hidden: user.user === null }
          )}
        >
          <form method="post" action="/logout" onSubmit={handleLogout}>
            <button
              className="relative flex items-center justify-center h-10 w-32 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all disabled:opacity-50"
              type="submit"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Logout
                </>
              )}
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
