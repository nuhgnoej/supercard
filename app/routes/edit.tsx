import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router";
import type { Route } from "../+types/root";
import { getCardById } from "~/utils/db";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.cardId;
  const card = await getCardById(Number(id));
  return card;
}

export default function Edit() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadedCard = useLoaderData();
  const [card, setCard] = useState({
    id: "",
    title: "",
    content: "",
    tier: 1,
    answer: "",
    superCard: "",
    image: null,
  });

  useEffect(() => setCard(loadedCard), []);

  const [isShow, setShow] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (
      type === "file" &&
      event.target instanceof HTMLInputElement &&
      event.target.files
    ) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCard((prevCard) => ({
            ...prevCard,
            [name]: reader.result, // 이미지 미리보기 URL 저장
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCard((prevCard) => ({
        ...prevCard,
        [name]: value,
      }));
    }
    console.log(name, ":", value);
  };

  const handleOkBtn = (e: React.FormEvent) => {
    e.preventDefault();
    setShow(!isShow);
  };

  const handleRemoveImage = () => {
    setCard((prevCard) => ({
      ...prevCard,
      image: null, // 이미지 삭제
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg min-w-xl min-h-[calc(100vh-300px)]">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Modify Card: {JSON.stringify(loadedCard.id)}
      </h2>
      <Form
        action={`/api/card/${card.id}`}
        method="put"
        encType="multipart/form-data"
      >
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
            <input
              type="text"
              name="answer"
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

          <div className="flex flex-col">
            <label htmlFor="image" className="font-medium text-gray-700">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="file:border file:border-gray-300 file:rounded-lg file:px-4 file:py-2 file:text-sm file:text-gray-700 file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 focus:file:ring-2 focus:file:ring-blue-500"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </div>

          {card.image && (
            <div className="mt-4 relative">
              <img
                src={card.image}
                alt="Uploaded Preview"
                className="w-full h-auto rounded-lg shadow"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          )}

          <div className="flex flex-col">
            <button
              onClick={handleOkBtn}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isShow ? "Hide" : "Preview"}
            </button>

            <div
              className={clsx("mt-4 mb-4 p-2 border rounded-md bg-gray-100", {
                hidden: !isShow,
              })}
            >
              {isShow ? (
                <div>
                  <div>{card.title && `Title: ${card.title}`}</div>
                  <div>{card.content && `Content: ${card.content}`}</div>
                  <div>{card.tier && `Tier: ${card.tier}`}</div>
                  <div>{card.answer && `Answer: ${card.answer}`}</div>
                  <div>{card.image && `Image: attached!`}</div>
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className={clsx(
                "px-4 py-2 border-gray-300 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
                { hidden: !isShow }
              )}
            >
              Save
            </button>
          </div>
        </div>
      </Form>
      {/* <div className="flex flex-col">
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
      </div> */}
    </div>
  );
}
