// app/routes/home.tsx
import { Link } from "react-router"; // 링크를 위한 react-router
import { useEffect } from "react";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome to Your Journey!" },
    {
      name: "description",
      content: "A platform to help you achieve your goals.",
    },
  ];
}

export default function Home() {
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to right, #ff7e5f, #feb47b)";
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center text-white">
      <div className="bg-opacity-75 bg-black p-8 rounded-lg shadow-xl max-w-lg mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Welcome to Your Journey!
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Embark on an exciting adventure towards learning and growth. Together,
          we can build something great.
        </p>
        <p className="text-lg mb-6">
          Whether it's about learning new skills, mastering a hobby, or simply
          keeping track of your growth, you're in the right place.
        </p>

        {/* Call to Action Button */}
        <Link
          to="/cards"
          className="inline-block bg-green-500 text-white text-xl font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-green-600 transition-all"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
