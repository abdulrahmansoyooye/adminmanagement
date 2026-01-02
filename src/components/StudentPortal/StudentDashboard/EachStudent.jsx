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

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <section className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-8 border border-gray-100">
        <header className="text-center border-b pb-4 mb-4">
           <h2 className="text-2xl font-bold text-gray-800">Student ID Card Status</h2>
           <p className="text-gray-500 text-sm mt-1">Manage card approvals and printing</p>
        </header>

        {loading ? (
             <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
             </div>
        ) : !idCard || (idCard.status !== 'pending' && idCard.status !== 'revoked' && idCard.status !== 'approved') ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">ID Card has not been requested yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Printable Area - Centered ID Card */}
            <div className="flex justify-center bg-gray-100 p-6 rounded-xl border border-gray-200">
                <div ref={printRef} className="print:m-0 print:p-0">
                  <IdCardDetails data={idCard} />
                </div>
            </div>
            
            <div className="space-y-4">
                 {/* Status Badge */}
                 <div className="flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        idCard.status === 'approved' ? 'bg-green-100 text-green-700' :
                        idCard.status === 'revoked' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                    }`}>
                        Status: {idCard.status}
                    </span>
                 </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Approve Action */}
                  {(idCard.status === "pending" || idCard.status === "revoked") && (
                    <button
                      onClick={() => updateStatus("approved")}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all transform active:scale-95"
                    >
                      Approve Request
                    </button>
                  )}

                  {/* Approved Actions: Revoke & Print */}
                  {idCard.status === "approved" && (
                    <>
                      <button
                        onClick={handlePrint}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2-4h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2zm9-2a1 1 0 11-2 0 1 1 0 012 0z" />
                       </svg>
                        Print Card
                      </button>

                      <button
                        onClick={() => updateStatus("revoked")}
                        className="w-full bg-red-50 text-red-600 border border-red-200 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors active:bg-red-200"
                      >
                        Revoke Approval
                      </button>
                    </>
                  )}
                </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
