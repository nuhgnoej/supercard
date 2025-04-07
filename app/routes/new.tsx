import clsx from "clsx";
import React, { useRef, useState } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "../+types/root";
import { makeCard, saveImage } from "~/utils/card-repo";
import { setCard } from "~/utils/db";
import { getSession } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Card+ | SuperCard" },
    {
      name: "description",
      content:
        "학습할 내용을 카드로 만들어보세요. 쉽게 등록하고 효율적으로 복습할 수 있습니다.",
    },
  ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    return redirect("/login");
  }

  return { id: user.id, name: user.name, email: user.email };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tier = Number(formData.get("tier"));
  const answer = formData.get("answer") as string;
  const superCardRaw = formData.get("superCard") as string;
  const superCard = superCardRaw ? Number(superCardRaw) : null;
  const file = formData.get("image");
  const user = formData.get("user") as string;

  console.log("action user:", user);

  let imageUrl = null;

  if (file && file instanceof File && file.size > 0) {
    imageUrl = await saveImage(file);
  }

  const card = makeCard({
    title,
    content,
    tier,
    answer,
    superCard,
    image: imageUrl ?? undefined,
    user: user,
  });

  await setCard(card);

  return redirect("/cards");
};

export default function New() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = useLoaderData<typeof loader>();
  console.log("loaderData:", user);

  const [card, setCard] = useState({
    title: "",
    content: "",
    tier: 1,
    answer: "",
    superCard: null,
    image: "",
    user: user.id,
  });

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
      image: "", // 이미지 삭제
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto p-8 rounded-xl shadow-xl min-w-xl min-h-[calc(100vh-300px)]"
      style={{
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))", // 반투명 그라데이션 배경
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // 부드러운 그림자
      }}
    >
      <h2 className="text-3xl font-semibold text-center text-white mb-6">
        Create New Card
      </h2>
      <Form action="/new" method="post" encType="multipart/form-data">
        <input type="hidden" name="user" value={user.id} />
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={card.title}
              required
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Content
            </label>
            <textarea
              name="content"
              rows={4}
              value={card.content}
              required
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Tier</label>
            <input
              type="number"
              name="tier"
              value={card.tier}
              onChange={handleChange}
              min="1"
              step="1"
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Answer
            </label>
            <input
              type="text"
              name="answer"
              value={card.answer}
              onChange={handleChange}
              placeholder="(optional...)"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white"
            />
          </div>

          <div className={clsx("", { hidden: card.tier === 1 })}>
            <label className="block text-sm font-medium text-white">
              SuperCard
            </label>
            <input
              name="superCard"
              value={card.superCard ?? ""}
              onChange={handleChange}
              placeholder="Parent card ID (optional)"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out text-white"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="font-medium text-white">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="file:border file:border-gray-300 file:rounded-lg file:px-4 file:py-2 file:text-sm file:text-white file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 focus:file:ring-2 focus:file:ring-blue-500 transition duration-300 ease-in-out text-white"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </div>

          {card.image && (
            <div className="mt-6 relative">
              <img
                src={card.image}
                alt="Uploaded Preview"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Remove
              </button>
            </div>
          )}

          <div className="flex flex-col mt-6">
            <button
              onClick={handleOkBtn}
              className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              {isShow ? "Hide" : "Preview"}
            </button>

            <div
              className={clsx(
                "mt-4 mb-4 p-4 border rounded-md bg-gray-700 text-white",
                {
                  hidden: !isShow,
                }
              )}
            >
              {isShow && (
                <div>
                  <div>{card.title && `Title: ${card.title}`}</div>
                  <div>{card.content && `Content: ${card.content}`}</div>
                  <div>{card.tier && `Tier: ${card.tier}`}</div>
                  <div>{card.answer && `Answer: ${card.answer}`}</div>
                  <div>{card.image && `Image: Attached!`}</div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={clsx(
                "px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out",
                { hidden: !isShow }
              )}
            >
              Save Card
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
