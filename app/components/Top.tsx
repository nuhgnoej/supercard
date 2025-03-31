import { Link } from "react-router";
import {
  BarChart,
  FilePlus,
  List,
  Calendar,
  LogIn,
  UserPlus,
  Wallet,
} from "lucide-react"; // lucide-react에서 아이콘 임포트

export default function Top() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* 왼쪽 로고 또는 사이트 이름 */}
        <Link
          to="/"
          className="text-3xl font-semibold hover:text-yellow-400 transition flex items-center"
        >
          <Wallet className="mr-2" /> {/* 홈 아이콘 */}
          SuperCard
        </Link>

        {/* 왼쪽 네비게이션 링크들 */}
        <div className="space-x-6 hidden md:flex">
          <Link
            to="/dashboard"
            className="text-lg hover:text-yellow-400 transition flex items-center"
          >
            <BarChart className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/new"
            className="text-lg hover:text-yellow-400 transition flex items-center"
          >
            <FilePlus className="mr-2" />
            New Card
          </Link>
          <Link
            to="/cards"
            className="text-lg hover:text-yellow-400 transition flex items-center"
          >
            <List className="mr-2" />
            Cards
          </Link>
          <Link
            to="/today"
            className="text-lg hover:text-yellow-400 transition flex items-center"
          >
            <Calendar className="mr-2" />
            Today Cards
          </Link>
        </div>

        {/* 우측 로그인, 회원가입 버튼 */}
        <div className="space-x-4 hidden md:flex">
          <Link
            to="/login"
            className="text-lg hover:text-yellow-400 transition flex items-center"
          >
            <LogIn className="mr-2" />
            Login
          </Link>
          <Link
            to="/signup"
            className="text-lg hover:text-yellow-400 transition flex items-center"
          >
            <UserPlus className="mr-2" />
            Sign Up
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 (Hamburger 메뉴) */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-2xl">☰</button>
        </div>
      </nav>
    </header>
  );
}
