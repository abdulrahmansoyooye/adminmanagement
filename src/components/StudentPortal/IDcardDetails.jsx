import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from "../assets/NewGate_logo_III.png";
import defaultSignature from "../assets/default_sign.jpg";

const IdCardDetails = ({ data }) => {
  const { fullName, department, faculty, bloodGroup, registrarSignature } = data || {};
  
  // Handle inconsistent field naming from different backend endpoints
  const matricNumber = data?.matricNumber || data?.matricNimber;
  const photo = data?.photo || data?.passport;
  const signature = data?.signature;

  // Generate QR code content for scannability
  const qrValue = matricNumber 
    ? `Student Verification: ${fullName} (${matricNumber}) - ${department}`
    : "Student Verification - Newgate University Minna";

  return (
    <div className="idcard-container flex flex-col md:flex-row gap-8 p-4 items-center justify-center bg-transparent">
      {/* FRONT SIDE */}
      <div
        className="idcard-front bg-white shadow-xl overflow-hidden"
        style={{
          width: 320,
          height: 510,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          position: "relative",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          backgroundColor: '#fff'
        }}
      >
        {/* Header */}
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
              onError={(e) => {e.target.style.display = 'none'}}
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

        {/* Photo & Main Info */}
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
          {/* Photo */}
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
            <img
              src={photo ? (photo.startsWith('http') ? photo : `https://studentbackendportal.onrender.com/assets/${photo}`) : "https://via.placeholder.com/150"}
              alt="Student"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
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

          <div style={{ marginTop: 4, textAlign: "center" }}>
            <h2
              style={{
                fontSize: 19,
                fontWeight: 900,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: "#111827",
                margin: 0
              }}
            >
              {fullName || "STUDENT NAME"}
            </h2>
          </div>

          {/* Matric Number */}
          <div
            style={{
              marginTop: 6,
              minWidth: "85%",
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
            {matricNumber || "NOT ASSIGNED"}
          </div>

          {/* Detailed Info */}
          <div
            style={{
              width: "100%",
              marginTop: 14,
              padding: "0 10px",
              fontSize: 11,
              fontWeight: 700,
              color: "#1f2937",
              lineHeight: 1.4,
            }}
          >
            <div style={{ marginBottom: 4, display: 'flex' }}>
              <span style={{ fontWeight: 900, minWidth: 85 }}>FACULTY:</span>
              <span style={{ fontWeight: 500, textTransform: "uppercase" }}>
                {faculty || "N/A"}
              </span>
            </div>
            <div style={{ marginBottom: 4, display: 'flex' }}>
              <span style={{ fontWeight: 900, minWidth: 85 }}>DEPT:</span>
              <span style={{ fontWeight: 500, textTransform: "uppercase" }}>
                {department || "N/A"}
              </span>
            </div>
            <div style={{ marginBottom: 4, display: 'flex' }}>
              <span style={{ fontWeight: 900, minWidth: 85 }}>BLOOD GRP:</span>
              <span style={{ fontWeight: 600 }}>{bloodGroup || "N/A"}</span>
            </div>

            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 900, fontSize: 10 }}>SIGNATURE:</div>
              <div style={{ marginTop: 2 }}>
                <img
                  src={signature || defaultSignature}
                  alt="signature"
                  style={{ width: 90, height: 35, objectFit: "contain", borderBottom: '1px solid #e5e7eb' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Strip */}
        <div style={{ height: 12, background: "#0b5fa8", borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }} />
      </div>

      {/* BACK SIDE */}
      <div
        className="idcard-back bg-white shadow-xl overflow-hidden"
        style={{
          width: 320,
          height: 510,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          backgroundColor: '#fff'
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
          <p className="m-0">
            This is to certify that the person whose photograph appears
            overleaf is a bonafide student of
          </p>

          <p style={{ marginTop: 8, fontWeight: 900, fontSize: 14, color: '#0b5fa8', margin: '8px 0' }}>
            NEWGATE UNIVERSITY MINNA
          </p>

          <p style={{ marginTop: 4, fontSize: 10, fontWeight: 600, margin: '4px 0' }}>
            KM 8 OFF MINNA–BIDA ROAD, MINNA, NIGER STATE
          </p>

          <div style={{ marginTop: 16, borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
            <p style={{ fontSize: 11, fontStyle: 'italic', margin: 0 }}>
              The loss/Recovery of this card should be reported/returned to the
              University or the nearest police station.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <img
            src={registrarSignature || defaultSignature}
            alt="Registrar Sign"
            style={{ width: 130, height: 45, objectFit: "contain", margin: '0 auto' }}
          />
          <div style={{ fontWeight: 900, marginTop: 4, fontSize: 12, color: '#111827' }}>REGISTRAR</div>
        </div>

        {/* QR Code with black frame */}
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
};

export default IdCardDetails;
