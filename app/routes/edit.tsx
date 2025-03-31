import clsx from "clsx";
import { useEffect, useState } from "react";
import { Form, useLoaderData, useParams } from "react-router";
import type { Route } from "../+types/root";
import { getCardById } from "~/utils/db";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.cardId;
  const card = await getCardById(Number(id));
  return card;
}

export default function Edit() {
  const loadedCard = useLoaderData();
  const [card, setCard] = useState({
    title: "",
    content: "",
    tier: 1,
    answer: "",
    superCard: "",
  });

  useEffect(() => setCard(loadedCard), []);

  const [isShow, setShow] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: type === "number" ? Number(value) : value, // 숫자 타입 처리
    }));
  };

  const handleOkBtn = (e: React.FormEvent) => {
    e.preventDefault();
    setShow(!isShow);
  };

  const handleSubmit = async (cardId: number) => {
    console.log("변경할 내용", card);
    const updatedCard = card;

    try {
      const response = await fetch(`/api/card/${cardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCard),
      });
      console.log(response);
      if (response.ok) {
        console.log(`Card ${cardId} updated successfully!`);
        // // ✅ UI 업데이트
        // setCard(updatedCard);
      } else {
        console.error(`Failed to update card ${cardId}`);
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg min-w-xl min-h-[calc(100vh-300px)]">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Modify Card: {loadedCard.title}
      </h2>
      <form>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={card.title}
              required
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              rows={4}
              value={card.content}
              required
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tier
            </label>
            <input
              type="number"
              name="tier"
              value={card.tier}
              onChange={handleChange}
              min="1"
              step="1"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Answer
            </label>
            <textarea
              name="answer"
              rows={4}
              value={card.answer}
              onChange={handleChange}
              placeholder="(optional...)"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className={clsx("", { hidden: card.tier === 1 })}>
            <label className="block text-sm font-medium text-gray-700">
              SuperCard
            </label>
            <input
              type="text"
              name="superCard"
              value={card.superCard}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </form>
      <div className="flex flex-col">
        <button
          onClick={handleOkBtn}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          OK
        </button>

        <div className="mt-4 mb-4">
          {isShow ? (
            <pre className="text-sm">{JSON.stringify(card, null, 2)}</pre>
          ) : null}
        </div>

        <button
          className={clsx(
            "px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
            { hidden: !isShow }
          )}
          onClick={() => handleSubmit(loadedCard.id)}
        >
          Modify
        </button>
      </div>
    </div>
  );
}
