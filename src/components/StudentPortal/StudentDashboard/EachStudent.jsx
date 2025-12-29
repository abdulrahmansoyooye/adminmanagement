import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";
import IdCardDetails from "../IDcardDetails";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function StudentProfile() {
  const { id } = useParams();
  const [idCard, setIdCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchIdCard = async () => {
      try {
        const res = await api.get(`/idcard/${id}`);
        setIdCard(res.data.status === "none" ? null : res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchIdCard();
  }, [id]);

  const updateStatus = async (action) => {
    const res = await api.patch(`/idcard/${idCard._id}/${action}`);
    setIdCard(res.data);
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        {!idCard && (
          <p className="text-center text-gray-500">
            ID Card not requested yet
          </p>
        )}

      { idCard && (
  <>
    {/* Printable ID Card */}
    <div ref={printRef}>
      <IdCardDetails data={idCard} />
    </div>

    {/* Print button only when approved */}
    {idCard.status === "approved" && (
      <button
        onClick={handlePrint}
        className="w-full border py-2 rounded"
      >
        Print ID Card
      </button>
    )}

    {/* Status Actions */}
    <div className="flex gap-3">
      {idCard.status === "pending" || "revoked" && (
        <button
          onClick={() => updateStatus("approved")}
          className="flex-1 bg-green-600 text-white py-2 rounded"
        >
          Approve
        </button>
      )}

      {idCard.status === "approved" && (
        <button
          onClick={() => updateStatus("revoked")}
          className="flex-1 bg-red-600 text-white py-2 rounded"
        >
          Revoke
        </button>
      )}

    
    </div>
  </>
)}

      </section>
    </main>
  );
}
