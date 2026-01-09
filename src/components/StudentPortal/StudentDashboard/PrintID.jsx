import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
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
  
  // Generate QR code content
  const qrValue = data.matricNimber 
    ? `Student Verification: ${data.fullName} (${data.matricNimber}) - ${data.department}`
    : "Student Verification - Newgate University Minna";

  return (
    <div
      ref={ref}
      className="idcard-sheet flex flex-wrap gap-12 p-10 bg-gray-50 print:bg-white justify-center"
    >
      {/* FRONT */}
      <div
        className="idcard-front bg-white shadow-2xl overflow-hidden -z-10"
        style={{
          width: 320,
          height: 510,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          position: "relative",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Top header with curved shape */}
        <div style={{ position: "relative", height: 110 }}>
          <div
            style={{
              height: "90%",
              background: "#0b5fa8",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: 20,
              color: "#fff",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: 45, height: 45, objectFit: "contain" }}
            />
            <div style={{ marginLeft: 10 }}>
              <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: 1 }}>NEWGATE</div>
              <div style={{ fontWeight: 700, fontSize: 10, marginTop: -4, opacity: 0.9 }}>
                UNIVERSITY MINNA
              </div>
            </div>
          </div>

          <svg
            viewBox="0 0 400 60"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: 40,
            }}
          >
            <path
              d="M0 60 C 150 0 250 0 400 60 L400 60 L0 60 Z"
              fill="#fff"
            />
          </svg>
        </div>

        <div
          style={{
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            flex: 1,
            marginTop: -15,
            zIndex: 10,
          }}
        >
          {/* Passport area - matching the image's rectangular look */}
          <div
            style={{
              width: 130,
              height: 150,
              background: "#f3f4f6",
              borderRadius: "8px",
              overflow: "hidden",
              border: "3px solid #fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data.passport ? (
              <img
                src={data.passport}
                alt="passport"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", padding: 10 }}>
                passport
              </div>
            )}
          </div>

          <div style={{ width: "100%", textAlign: "center", marginTop: 4 }}>
            <div
              style={{
                background: "#0b5fa8",
                color: "#fff",
                padding: "5px 15px",
                display: "inline-block",
                fontWeight: 800,
                borderRadius: "6px",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              STUDENT IDENTITY CARD
            </div>
          </div>

          {/* Name */}
          <div style={{ marginTop: 4, textAlign: "center" }}>
            <div
              style={{
                fontSize: 19,
                fontWeight: 900,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: "#111827",
              }}
            >
              {data.fullName || "STUDENT NAME"}
            </div>
          </div>

          {/* Matric red strip */}
          <div
            style={{
              marginTop: 6,
              width: "85%",
              background: "#e34b47",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "50px",
              textAlign: "center",
              fontWeight: 800,
              fontSize: 14,
              boxShadow: "0 2px 4px rgba(227, 75, 71, 0.3)",
            }}
          >
            {data.matricNimber || "24A/UE/BCSX/10020"}
          </div>

          {/* details */}
          <div
            style={{
              width: "100%",
              marginTop: 14,
              padding: "0 10px",
              fontSize: 12,
              fontWeight: 700,
              color: "#1f2937",
              lineHeight: 1.4,
            }}
          >
            <div style={{ marginBottom: 6, display: 'flex' }}>
              <span style={{ fontWeight: 900, minWidth: 95 }}>FACULTY:</span>
              <span style={{ fontWeight: 500, textTransform: "uppercase" }}>
                {data.faculty || ""}
              </span>
            </div>

            <div style={{ marginBottom: 6, display: 'flex' }}>
              <span style={{ fontWeight: 900, minWidth: 95 }}>DEPARTMENT:</span>
              <span style={{ fontWeight: 500, textTransform: "uppercase" }}>
                {data.department || ""}
              </span>
            </div>

            <div style={{ marginBottom: 6, display: 'flex' }}>
              <span style={{ fontWeight: 900, minWidth: 95 }}>BLOOD GROUP:</span>
              <span style={{ fontWeight: 600 }}>
                {data.bloodGroup || ""}
              </span>
            </div>

            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 900 }}>SIGNATURE:</div>
              <div style={{ marginTop: 4 }}>
                <img
                  src={data.signature || defaultSignature}
                  alt="signature"
                  style={{ width: 100, height: 40, objectFit: "contain", borderBottom: '1px solid #e5e7eb' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* bottom decorative strip */}
        <div style={{ height: 12, background: "#0b5fa8", borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }} />
      </div>

      {/* BACK */}
      <div
        className="idcard-back bg-white shadow-2xl overflow-hidden"
        style={{
          width: 320,
          height: 510,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ width: 60, height: 60, objectFit: "contain" }} />
          <div style={{ fontWeight: 800, fontSize: 10, marginTop: 4, color: '#0b5fa8' }}>EXPLORE TO EXCEL</div>
        </div>

        <div
          style={{
            marginTop: 14,
            textAlign: "center",
            fontSize: 12,
            lineHeight: 1.6,
            color: "#374151",
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <p>
            This is to certify that the person whose photograph appears
            overleaf is a bonafide student of
          </p>

          <p style={{ marginTop: 8, fontWeight: 900, fontSize: 14, color: '#0b5fa8' }}>
            NEWGATE UNIVERSITY MINNA
          </p>

          <p style={{ marginTop: 4, fontSize: 10, fontWeight: 600 }}>
            KM 8 OFF MINNA–BIDA ROAD, MINNA, NIGER STATE
          </p>

          <div style={{ marginTop: 16, borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
            <p style={{ fontSize: 11, fontStyle: 'italic' }}>
              The loss/Recovery of this card should be reported/returned to the
              University or the nearest police station.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <img
            src={data.registrarSignature || defaultSignature}
            alt="Registrar Sign"
            style={{ width: 130, height: 45, objectFit: "contain", margin: '0 auto' }}
          />
          <div style={{ fontWeight: 900, marginTop: 4, fontSize: 12, color: '#111827' }}>REGISTRAR</div>
        </div>

        {/* QR Code with black frame as per image */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{ 
            padding: 8, 
            background: "#fff", 
            border: "2px solid #000",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <QRCodeCanvas
              value={qrValue}
              size={75}
              level="H"
              includeMargin={false}
            />
          </div>
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
