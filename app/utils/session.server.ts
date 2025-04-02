import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: process.env.NODE_EN === "production",
    sameSite: "lax",
    path: "/",
    secrets: ["your-secret-key"], // 보안 키 (환경 변수로 관리 권장)
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}
