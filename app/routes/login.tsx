import { useState } from "react";
import { Form } from "react-router";
import type { Route } from "../+types/root";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Login Attempt:", email, '"', password);

  // Example of handling login and redirecting
  if (email === "user@example.com" && password === "password123") {
    return new Response("Login successful!", {
      status: 200,
      headers: { Location: "/dashboard" }, // Redirect to the dashboard
    });
  } else {
    return new Response("Invalid credentials", { status: 401 });
  }
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center">
      <div
        className="p-8 rounded-lg shadow-lg w-96"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          로그인
        </h2>

        <Form action="/login" method="post" className="space-y-4">
          {/* 이메일 입력 */}
          <div>
            <label className="block text-white">이메일</label>
            <input
              type="email"
              name="email"
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
              name="password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            로그인
          </button>
        </Form>

        {/* 추가 링크 */}
        <div className="text-center mt-4 text-sm text-white">
          <a href="/register" className="hover:underline">
            회원가입
          </a>{" "}
          |
          <a href="/forgot-password" className="hover:underline">
            {" "}
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}
