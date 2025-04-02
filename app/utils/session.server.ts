import { createCookieSessionStorage } from "react-router";
import { prisma } from "./db.server";

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

export async function getUserId(request: Request): Promise<string | null> {
  const session = await getSession(request);
  const userId = session.get("userId");
  return typeof userId === "string" ? userId : null;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return null;

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) return null;

  return { id: user.id, name: user.name, email: user.email }; // 필요한 정보만 반환
}
