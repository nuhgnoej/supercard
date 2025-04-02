import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

// 개발 환경에서는 Prisma 클라이언트를 한 번만 생성하고, global 객체에 저장해서 Hot Reload 시에도 다시 생성되지 않도록 함.
if (process.env.NODE_EN === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient();
  }
  prisma = global.__prisma;
}

export { prisma };
