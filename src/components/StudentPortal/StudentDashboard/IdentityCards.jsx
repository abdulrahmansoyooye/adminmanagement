import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";

export default function IdCardsList() {
  const [idCards, setIdCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchIdCards = useCallback(async () => {
    try {
      const { data } = await api.get("/idcard");
      setIdCards(data);
    } catch {
      setError("Failed to load ID cards");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdCards();
  }, [fetchIdCards]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {idCards.map((card) => (
          <div
            key={card._id}
            className="bg-white p-5 rounded-lg shadow"
          >
            <h3 className="font-semibold">{card.fullName}</h3>
            <p className="text-sm text-gray-500">
              {card.matricNumber}
            </p>

            <span
              className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                card.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : card.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {card.status.toUpperCase()}
            </span>

            <button
              onClick={() =>
                navigate(`/students/${card.userId}`)
              }
              className="mt-4 w-full border py-2 rounded hover:bg-gray-100"
            >
              View Student
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
