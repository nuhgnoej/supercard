import path from "path";
import fs from "fs";

export type Card = {
  title: string;
  content: string;
  tier: number;
  superCard?: string;
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
};

export type CardProp = {
  title: string;
  content: string;
  tier: number;
  answer?: string;
  superCard?: string;
  image?: string;
  user: string;
};

export const makeCard = (card: CardProp) => {
  const startDate = new Date().toISOString().split("T")[0];
  const lastReview = startDate;
  const reviewInterval = 1;
  // const nextReview = new Date(new Date().getTime()+reviewInterval*24*3600*1000).toISOString().split("T")[0];
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
