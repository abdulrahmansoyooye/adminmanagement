import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { api } from "../../../lib/api";
import IdCardDetails from "../IDcardDetails";

const VALID_STATUSES = ["pending", "approved", "revoked"];

export default function StudentProfile() {
  const { id } = useParams();
  const printRef = useRef(null);

  const [idCard, setIdCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canPrint, setCanPrint] = useState(false);

  /* ---------------------------- Fetch ID Card ---------------------------- */
  useEffect(() => {
    let isMounted = true;

    const fetchIdCard = async () => {
      try {
        const res = await api.get(`/idcard/${id}`);
        if (!isMounted) return;

        const card = res?.data;
        setIdCard(card?.status === "none" ? null : card);
      } catch (error) {
        console.error("Failed to fetch ID card:", error);
        setIdCard(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchIdCard();
    return () => {
      isMounted = false;
    };
  }, [id]);

  /* ----------------------- Enable Print When Ready ----------------------- */
  useEffect(() => {
    if (printRef.current && idCard?.status === "approved") {
      setCanPrint(true);
    } else {
      setCanPrint(false);
    }
  }, [idCard]);

  /* ----------------------------- Print Logic ----------------------------- */
  const handlePrint = useReactToPrint({
    content: () => {
      if (!printRef.current) {
        console.error("Print aborted: printRef is null");
        return null;
      }
      return printRef.current;
    },
    documentTitle: `Student_ID_${idCard?.matricNumber || "Card"}`,
    removeAfterPrint: true,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body {
          margin: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  /* --------------------------- Status Update ----------------------------- */
  const updateStatus = useCallback(
    async (action) => {
      if (!idCard?._id) return;

      try {
        const res = await api.patch(`/idcard/${idCard._id}/${action}`);
        setIdCard(res.data);
      } catch (error) {
        console.error("Failed to update ID card status:", error);
      }
    },
    [idCard]
  );

  /* ------------------------------- Guards -------------------------------- */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-600" />
      </div>
    );
  }

  if (!idCard || !VALID_STATUSES.includes(idCard.status)) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        ID Card has not been requested yet.
      </div>
    );
  }

  /* -------------------------------- UI ---------------------------------- */
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <header className="mb-6 border-b pb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Student ID Card
          </h2>
          <p className="text-sm text-gray-500">
            Approval & printing
          </p>
        </header>

        {/* Printable Area (ALWAYS RENDERED) */}
        <div className="flex justify-center rounded-xl bg-gray-100 p-6">
          <div ref={printRef} className="print-area">
            <IdCardDetails data={idCard} />
          </div>
        </div>

        {/* Status Badge */}
        <div className="my-6 flex justify-center">
          <span
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase
              ${
                idCard.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : idCard.status === "revoked"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            Status: {idCard.status}
          </span>
        </div>

        {/* Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          {(idCard.status === "pending" || idCard.status === "revoked") && (
            <button
              onClick={() => updateStatus("approve")}
              className="rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
            >
              Approve Request
            </button>
          )}

          {idCard.status === "approved" && (
            <>
              <button
                onClick={handlePrint}
                disabled={!canPrint}
                className={`rounded-lg py-3 font-medium text-white transition
                  ${
                    canPrint
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Print Card
              </button>

              <button
                onClick={() => updateStatus("revoke")}
                className="rounded-lg border border-red-200 bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100"
              >
                Revoke Approval
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
