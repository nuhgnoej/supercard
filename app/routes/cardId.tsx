import { Link, useLoaderData, useParams } from "react-router";
import { getCardById } from "~/utils/db";
import type { Route } from "../+types/root";
import { Edit } from "lucide-react";

// loader 함수
export async function loader({ params }: Route.LoaderArgs) {
  const id = params.cardId;
  const card = await getCardById(Number(id));
  return card;
}

export default function CardId() {
  const params = useParams();
  const loaderData = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Card Details: {params.cardId}
        </h3>

        {/* 카드 정보 */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold text-gray-800">Title</h4>
            <p className="text-lg text-gray-600">{loaderData.title}</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800">Content</h4>
            <p className="text-lg text-gray-600">{loaderData.content}</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800">Answer</h4>
            <p className="text-lg text-gray-600">{loaderData.answer}</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800">Tier</h4>
            <p className="text-lg text-gray-600">{loaderData.tier}</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800">SuperCard</h4>
            <p className="text-lg text-gray-600">
              {loaderData.superCard || "N/A"}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800">Next Review</h4>
            <p className="text-lg text-gray-600">
              {loaderData.nextReview || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Link to={`/edit/${params.cardId}`}>
            <button className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <Edit className="w-5 h-5 mr-2" /> 수정하기
            </button>
          </Link>
        </div>

        {/* 카드 JSON 정보 출력 (디버깅용) */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-800">
            Card Data (JSON)
          </h4>
          <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-600 overflow-x-auto">
            {JSON.stringify(loaderData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
