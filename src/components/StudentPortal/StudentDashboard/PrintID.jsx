import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/NewGate_logo_III.png";         // university logo (same used on card)
// impo from "../../assets/default_passport.png"; // fallback passport
import defaultQr from "../../assets/Student_Qr.png";         // fallback qr
import defaultSignature from "../../assets/default_sign.jpg"; // fallback registrar/signature
import { useParams } from "react-router-dom";

/**
 * Full replacement PrintIDCard component.
 * - Designed to match Newgate University Minna PVC card look.
 * - Make sure the image imports point to your assets (logo, default passport, qr, signature).
 */

const IDCard = React.forwardRef(({ idcardData }, ref) => {
  // make data safe (in case fetch not ready)
  const data = idcardData || {};
  return (
    <div
      ref={ref}
      className="idcard-sheet flex gap-8 p-6 bg-gray-100 print:bg-white"
      style={{ alignItems: "flex-start" }}
    >
      {/* FRONT */}
      <div
        className="idcard-front bg-white rounded-2xl shadow-md overflow-hidden"
        style={{
          width: 340,
          height: 540,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top header with curved shape */}
        <div style={{ position: "relative", height: 120 }}>
          <div
            style={{
              height: "100%",
              background: "#0b5fa8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ position: "absolute", left: 14, width: 56, height: 56 }}
            />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>NEWGATE</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginTop: -4 }}>
                UNIVERSITY MINNA
              </div>
            </div>
          </div>

          {/* curved white arc at bottom of header */}
          <svg
            viewBox="0 0 400 40"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -1,
              width: "100%",
              height: 36,
            }}
          >
            <path
              d="M0 40 C 100 0 300 0 400 40 L400 40 L0 40 Z"
              fill="#fff"
            />
          </svg>
        </div>

        {/* Photo (hexagon), name, id strip */}
        <div
          style={{
            padding: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            flex: 1,
          }}
        >
          {/* hexagon wrapper */}
          <div
            className="hexagon-outer"
            style={{
              width: 140,
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div className="hexagon-inner">
              <img
                src={data.passport }
                alt="passport"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div style={{ width: "100%", textAlign: "center", marginTop: 4 }}>
            <div
              style={{
                background: "#0b5fa8",
                color: "#fff",
                padding: "6px 10px",
                display: "inline-block",
                fontWeight: 700,
                borderRadius: 4,
                fontSize: 13,
              }}
            >
              STUDENT IDENTITY CARD
            </div>
          </div>

          {/* Name */}
          <div style={{ marginTop: 6, textAlign: "center" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {data.fullName || "Student Name"}
            </div>
          </div>

          {/* Matric red strip */}
          <div
            style={{
              marginTop: 10,
              width: "90%",
              background: "#e34b47",
              color: "#fff",
              padding: "8px 10px",
              borderRadius: 999,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {data.matricNimber || "24A/UE/BCSX/10020"}
          </div>

          {/* details */}
          <div
            style={{
              width: "100%",
              marginTop: 18,
              padding: "0 10px",
              fontSize: 13,
              fontWeight: 700,
              color: "#0b2b3a",
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 900 }}>FACULTY:</span>{" "}
              <span style={{ fontWeight: 500, textTransform: "uppercase" }}>
                {data.faculty || ""}
              </span>
            </div>

            <div style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 900 }}>DEPARTMENT:</span>{" "}
              <span style={{ fontWeight: 500, textTransform: "uppercase" }}>
                {data.department || ""}
              </span>
            </div>

            <div style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 900 }}>BLOOD GROUP:</span>{" "}
              <span style={{ fontWeight: 600 }}>
                {data.bloodGroup || ""}
              </span>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 900 }}>SIGNATURE:</div>
              <div style={{ marginTop: 6 }}>
                <img
                  src={data.signature || defaultSignature}
                  alt="signature"
                  style={{ width: 120, height: "auto", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* bottom decorative strip */}
        <div style={{ height: 22, background: "#0b5fa8" }} />
      </div>

      {/* BACK */}
      <div
        className="idcard-back bg-white rounded-2xl shadow-md overflow-hidden"
        style={{
          width: 340,
          height: 540,
          display: "flex",
          flexDirection: "column",
          padding: 22,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="logo" style={{ width: 72, height: 72 }} />
        </div>

        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#1f2937",
            flex: 1,
          }}
        >
          <p>
            This is to certify that the person whose photograph appears
            overleaf is a bonafide student of
          </p>

          <p style={{ marginTop: 10, fontWeight: 800, fontSize: 16 }}>
            NEWGATE UNIVERSITY MINNA
          </p>

          <p style={{ marginTop: 8, fontSize: 12 }}>
            KM 8 OFF MINNA–BIDA ROAD, MINNA, NIGER STATE
          </p>

          <p style={{ marginTop: 18 }}>
            The loss/Recovery of this card should be reported/returned to the
            University or the nearest police station.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <img
            src={data.registrarSignature || defaultSignature}
            alt="Registrar Sign"
            style={{ width: 160, height: "auto", objectFit: "contain" }}
          />
          <div style={{ fontWeight: 800, marginTop: 6 }}>REGISTRAR</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
          <img
            src={data.qrcode || defaultQr}
            alt="QR Code"
            style={{ width: 92, height: 92, objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
});

const PrintIDCard = () => {
  const componentRef = useRef();
  const [idcard, setIdcard] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async function fetchUserData() {
      try {
        const res = await fetch(
          `https://studentbackendportal.onrender.com/idcard/${id}/getdata/`
        );
        const data = await res.json();
        setIdcard(data);
      } catch (err) {
        console.error("Failed to fetch id data:", err);
        // optionally set sample data fallback
        setIdcard({
          fullName: "ABUBAKAR YUSUF",
          matricNimber: "24A/UE/BCSX/10020",
          faculty: "Computing & Information Tech.",
          department: "Cyber Security",
          bloodGroup: "O+",
          passport: null,
          signature: null,
          registrarSignature: null,
          qrcode: null,
        });
      }
    })();
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "student-id-card",
  });

  const handleDownload = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("id_card.pdf");
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div style={{ background: "transparent" }}>
        <IDCard ref={componentRef} idcardData={idcard} />
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded bg-blue-900 text-white"
        >
          Print ID Card
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default PrintIDCard;
