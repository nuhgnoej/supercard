import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { Card } from "./card-repo";

const dbPath = path.join(process.cwd(), "/data", "/cards.db");

// console.log(dbPath);

const openDb = async () => {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};

export const setCard = async (card: Card) => {
  const db = await openDb();

  await db.run(
    `CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            answer TEXT,
            tier INTEGER,
            box INTEGER,
            startDate TEXT,
            lastReview TEXT,
            nextReview TEXT,
            reviewCount INTEGER,
            reviewInterval INTEGER,
            superCard INTEGER,
            image TEXT
     )`
  );

  await db.run(
    `INSERT INTO cards (title, content, answer, tier, box, startDate, lastReview, nextReview, reviewCount, reviewInterval, image) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
    [
      card.title,
      card.content,
      card.answer,
      card.tier,
      card.box,
      card.startDate,
      card.lastReview,
      card.nextReview,
      card.reviewCount,
      card.reviewInterval,
      card.image,
    ]
  );

  console.log(`Card created: ${JSON.stringify(card)}`);
};

// 모든 카드 조회 함수
export const getCardsAll = async () => {
  try {
    const db = await openDb();
    const cards = await db.all(`SELECT * FROM cards`);
    return cards || []; // 조회된 카드가 없으면 빈 배열 반환
  } catch (error) {
    // 에러가 Error 객체인지 확인 후 처리
    if (error instanceof Error) {
      if (error.message.includes("no such table")) {
        console.warn("Table 'cards' does not exist. Returning an empty list.");
        return [];
      }
      console.error("Database error:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  }
};

// 오늘의 카드 조회 함수 (예시: 오늘의 리뷰 예정인 카드들 조회)
export const getCardToday = async () => {
  try {
    const db = await openDb();
    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD)

    const cards = await db.all(`SELECT * FROM cards WHERE nextReview <= ?`, [
      today,
    ]);

    return cards || []; // 카드가 없으면 빈 배열 반환
  } catch (error) {
    // 에러가 Error 객체인지 확인 후 처리
    if (error instanceof Error) {
      if (error.message.includes("no such table")) {
        console.warn("Table 'cards' does not exist. Returning an empty list.");
        return [];
      }
      console.error("Database error:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }

    throw error; // 다른 에러는 그대로 던짐
  }
};

export const getCardById = async (id: number) => {
  const db = await openDb();
  const card = await db.get(`SELECT * FROM cards WHERE id = ?`, [id]);
  console.log(card);
  return card;
};

export const removeCard = async (id: number) => {
  const db = await openDb();
  await db.run(`DELETE FROM cards WHERE id = ?`, [id]);

  console.log(`Card with ID ${id} has been deleted.`);
};

export const updateCard = async (cardId: number, data: any) => {
  const db = await openDb();
  const {
    box,
    reviewInterval,
    nextReview,
    lastReview,
    reviewCount,
    title,
    content,
    tier,
    superCard,
    answer,
  } = data;

  const query = `
      UPDATE cards
      SET
        box = ?,
        reviewInterval = ?,
        nextReview = ?,
        lastReview = ?,
        reviewCount = ?,
        title =?,
        content=?,
        tier=?,
        superCard=?,
        answer=?        
      WHERE id = ?
    `;

  await db.run(query, [
    box,
    reviewInterval,
    nextReview, // nextReview는 Date로 변환된 값이 필요함
    lastReview, // lastReview도 마찬가지로 Date로 변환된 값
    reviewCount,
    title,
    content,
    tier,
    superCard,
    answer,
    cardId,
  ]);

  return {
    cardId,
    box,
    reviewInterval,
    nextReview,
    lastReview,
    reviewCount,
    title,
    content,
    tier,
    superCard,
    answer,
  };
};
