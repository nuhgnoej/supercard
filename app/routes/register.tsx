import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📢 Login Attempt:", { email, password });
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="p-8 rounded-lg shadow-lg w-96"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))", // 반투명 그라데이션 배경
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // 부드러운 그림자
        }}
      >
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          계정 만들기
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 입력 */}
          <div>
            <label className="block text-white">이메일</label>
            <input
              type="email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white"
              placeholder="your-email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block text-white">비밀번호</label>
            <input
              type="password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            계정 생성
          </button>
        </form>

        {/* 추가 링크 */}
        <div className="text-center mt-4 text-sm text-white">
          <a href="/login" className="hover:underline">
            로그인
          </a>{" "}
          |
          <a href="/forgot" className="hover:underline">
            {" "}
            계정/비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}
