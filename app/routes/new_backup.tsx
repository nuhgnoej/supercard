import React, { useRef, useState } from "react";
import { Form } from "react-router";

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [card, setCard] = useState({
    title: "",
    content: "",
    tier: 1,
    superCard: 0,
    image: "",
  });
  const [isShow, setIsShow] = useState(false);

  const handleOkBtn = () => {
    window.alert("Card Created!");
  };

  const handleSubmitBtn = () => {
    window.alert("Card Created!");
  };

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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create New Card
      </h2>
      <Form className="space-y-4" onSubmit={handleSubmitBtn}>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={card.title}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={card.content}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tier" className="font-medium text-gray-700">
            Tier
          </label>
          <input
            id="tier"
            name="tier"
            type="number"
            min="1"
            step="1"
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={card.tier}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="supercard" className="font-medium text-gray-700">
            Super Card
          </label>
          <input
            id="superCard"
            name="superCard"
            type="number"
            placeholder="Optional"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={card.superCard}
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

        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={handleOkBtn}
            className="w-full py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            OK
          </button>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            생성하기
          </button>
        </div>
      </Form>

      {isShow && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Created Card:</h3>
          <pre className="bg-white p-3 rounded-lg shadow-inner">
            {JSON.stringify(card, null, 2)}
          </pre>
          <button
            onClick={() => setIsShow(false)}
            className="mt-2 py-1 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Hide
          </button>
        </div>
      )}
    </div>
  );
}
