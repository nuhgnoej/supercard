import clsx from "clsx";
import { CheckCircle, Edit, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import type { Card } from "~/utils/card-repo";
import type { Route } from "../+types/root";
import NewCardFloatingButton from "~/components/NewCardFloatingButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cards | SuperCard" },
    {
      name: "description",
      content: "지금까지 만든 모든 학습 카드를 확인하고 관리하세요.",
    },
  ];
}

type CardWithId = Card & { id: number };

export default function CardPage() {
  const [cards, setCards] = useState<CardWithId[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [success, setSuccess] = useState<{ [key: number]: boolean }>({});

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDelete = async (cardId: number) => {
    try {
      const confirm = window.confirm("카드를 삭제하겠습니까?");
      if (confirm) {
        const response = await fetch(`/api/card/${cardId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log(`Card with ID ${cardId} deleted`);
        } else {
          console.error("Failed to delete the card");
        }
      }
    } catch (error) {
      console.error("Error occurred while deleting the card:", error);
    }
  };

  // 성공/실패 토글 버튼 클릭 시 호출되는 함수
  const toggleSuccessFailure = (cardId: number) => {
    // console.log('hello This is future ToggleBtn')
    setSuccess((pre) => ({ ...pre, [cardId]: !pre[cardId] }));
    console.log(success);
  };

  // 완료 버튼 클릭 시 호출되는 함수
  const handleComplete = async (cardId: number) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    const today = new Date().toISOString().split("T")[0];

    const updatedReviewCount = card.reviewCount + 1;
    const updatedBox = success[cardId]
      ? card.box + 1
      : Math.max(1, card.box - 1);
    const updatedInterval = success[cardId]
      ? card.reviewInterval + 1
      : Math.max(1, card.reviewInterval - 1);
    const updatedNextReview = new Date();
    updatedNextReview.setDate(updatedNextReview.getDate() + updatedInterval);

    // ✅ FormData 객체 생성
    const formData = new FormData();
    formData.append("box", String(updatedBox));
    formData.append("reviewInterval", String(updatedInterval));
    formData.append(
      "nextReview",
      updatedNextReview.toISOString().split("T")[0]
    );
    formData.append("lastReview", today);
    formData.append("reviewCount", String(updatedReviewCount));

    console.log(`📢 Sending PUT request to /api/card/${cardId}`);
    console.log("📦 FormData:", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch(`/api/card/${cardId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        console.log(`🎉 Card ${cardId} updated successfully!`);

        // ✅ UI 업데이트
        setCards((prevList: typeof cards) =>
          prevList.map((c: Card & { id: number }) =>
            c.id === cardId
              ? { ...card, ...Object.fromEntries(formData.entries()) }
              : c
          )
        );
      } else {
        const errorData = await response.json();
        console.error(`❌ Failed to update card ${cardId}:`, errorData);
      }
    } catch (error) {
      console.error("🚨 Error updating card:", error);
    }
  };

  const fetchCards = async () => {
    const res = await fetch(`/api/cards?page=${page}&limit=3`);
    const newCards = await res.json();
    setCards((prev) => [...prev, ...newCards]);

    if (newCards.length < 3) setHasMore(false);
  };

  useEffect(() => {
    fetchCards();
  }, [page]);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📚 Card Explorer</h2>
        <input
          type="text"
          placeholder="Search cards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <InfiniteScroll
        dataLength={filteredCards.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4 className="text-center mt-4">Loading more cards...</h4>}
      >
        <div className="grid grid-cols-1 gap-4">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              style={{
                ...(card.image
                  ? {
                      backgroundImage: `url(${card.image})`,
                      backgroundBlendMode: "multiply",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }
                  : {
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }),
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                opacity: 0.9,
              }}
            >
              <Link to={`/card/${card.id}`}>
                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>
              </Link>
              <p className="text-white mt-2">{card.content}</p>

              <div className="text-xs mt-4 text-white">
                Tier: {card.tier} / Box: {card.box} / Count: {card.reviewCount}
              </div>
              <div className="text-xs mt-2 text-white">
                Last: {card.lastReview} / Next: {card.nextReview}
              </div>
              {/* 버튼 영역 */}
              <div className="mt-4 flex justify-end space-x-4">
                {/* 수정 버튼 */}
                <button
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                  title="update"
                >
                  <Link to={`/edit/${card.id}`}>
                    <Edit className="w-5 h-5" />
                  </Link>
                </button>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleDelete(card.id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                  title="Delete"
                >
                  <Trash className="w-5 h-5" />
                </button>
                {/* 성공/실패 토글 버튼 */}
                <button
                  onClick={() => toggleSuccessFailure(card.id)}
                  className={clsx("text-white p-2 rounded-md", {
                    "bg-yellow-500 hover:bg-yellow-600 transition":
                      success[card.id],
                    "bg-gray-500 hover:bg-gray-600 transition":
                      !success[card.id],
                  })}
                  title="Toggle Success/Failure"
                >
                  {success[card.id] ? <ThumbsUp /> : <ThumbsDown />}
                </button>
                {/* 완료 버튼 */}
                <button
                  onClick={() => handleComplete(card.id)}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                  title="Complete"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <NewCardFloatingButton />
    </div>
  );
}
