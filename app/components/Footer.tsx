import { Github, Twitter, Linkedin } from "lucide-react"; // 아이콘 이름 수정

export default function Footer() {
  return (
    <footer
      className="text-white py-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 사이트 정보 */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>
              &copy; {new Date().getFullYear()} SuperCard. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              A project to help you organize and study with cards.
            </p>
          </div>

          {/* 소셜 미디어 링크 */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
