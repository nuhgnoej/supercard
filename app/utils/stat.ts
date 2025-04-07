// utils/stats.ts
import { format, subDays } from "date-fns";
import type { Card } from "./card-repo";

export function getReviewCountByDate(cards: Card[]) {
  const today = new Date();
  const dateMap: Record<string, number> = {};

  for (let i = 6; i >= 0; i--) {
    const dateStr = format(subDays(today, i), "yyyy-MM-dd");
    dateMap[dateStr] = 0;
  }

  cards.forEach((card) => {
    if (card.lastReview) {
      const reviewDate = format(new Date(card.lastReview), "yyyy-MM-dd");
      if (reviewDate in dateMap) {
        dateMap[reviewDate]++;
      }
    }
  });

  return Object.entries(dateMap).map(([date, count]) => ({
    date: date.slice(5), // MM-DD 형식으로
    count,
  }));
}
