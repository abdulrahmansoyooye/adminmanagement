import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";

const USERS_PER_PAGE = 6;

export default function StudentsList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users", {
        params: { search, page, limit: USERS_PER_PAGE },
      });
      setUsers(res.data.data);
      setMeta(res.data.meta);
    } catch {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Students
          </h1>

          <input
            type="search"
            placeholder="Search student..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </header>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading &&
            Array.from({ length: USERS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white p-4 rounded-lg shadow"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}

          {!loading &&
            users.map((user) => (
              <article
                key={user._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h2 className="font-medium text-gray-800">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  {user.matricNumber}
                </p>

                <button
                  onClick={() =>
                    navigate(`/students/${user._id}`)
                  }
                  className="mt-4 w-full border py-2 rounded hover:bg-gray-100"
                >
                  View Student
                </button>
              </article>
            ))}
        </section>

        {/* Pagination */}
        <nav className="flex justify-between items-center pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm">
            Page {page} of {meta.pages || 1}
          </span>

          <button
            disabled={page === meta.pages}
            onClick={() => setPage((p) => p + 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </section>
    </main>
  );
}
