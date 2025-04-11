import path from "path";
import fs from "fs";
import { prisma } from "./db.server";

export type Card = {
  title: string;
  content: string;
  tier: number;
  superCard?: number | null;
  box: number;
  answer?: string;
  startDate: string;
  lastReview: string;
  nextReview: string;
  reviewCount: number;
  reviewInterval: number;
  class?: string;
  image?: string;
  user: string;
  type?: string;
};

export type CardProp = {
  title: string;
  content: string;
  tier: number;
  answer?: string;
  superCard?: number | null;
  image?: string;
  user: string;
  type: string;
};

export const makeCard = (card: CardProp) => {
  const startDate = new Date().toISOString().split("T")[0];
  const lastReview = startDate;
  const reviewInterval = 1;
  const nextReview = lastReview; // test
  const reviewCount = 0;
  const box = 1;

  console.log("makeCard 함수내 콘솔메세지: ", card.user);

  return {
    ...card,
    startDate,
    lastReview,
    reviewInterval,
    nextReview,
    reviewCount,
    box,
  };
};

export const saveImage = async (file: File): Promise<string> => {
  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));

  return `/uploads/${filename}`;
};

export async function getCardsPaginated(
  user: string,
  limit: number,
  offset: number
) {
  const data = await prisma.cards.findMany({
    where: { user },
    orderBy: { startDate: "asc" },
    skip: offset,
    take: limit,
  });
  console.log("점검용 콘솔메세지(card-repo.ts):", data);
  return prisma.cards.findMany({
    where: { user },
    orderBy: { startDate: "asc" },
    skip: offset,
    take: limit,
  });
}

export async function getTodayCardsPaginated(
  user: string,
  limit: number,
  offset: number
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 자정 기준

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return prisma.cards.findMany({
    where: {
      user,
      nextReview: {
        lt: tomorrow.toISOString(),
      },
    },
    orderBy: { startDate: "asc" },
    skip: offset,
    take: limit,
  });
}
