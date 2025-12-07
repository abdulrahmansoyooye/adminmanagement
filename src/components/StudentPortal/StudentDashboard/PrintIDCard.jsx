import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/NewGate_logo_III.png";
import passport from "../assets/password.png";
import Qr from "../assets/Student_Qr.png";
import { useParams } from "react-router-dom";
const IDCard = React.forwardRef(({ idcardData }, ref) => (
  <div
    ref={ref}
    className="flex border max-lg:flex-col justify-center items-start space-x-8 p-4  "
  >
    {/* Front Side of the ID Card */}
    <div className="sm:w-[70%] h-full mt-0 border px-6 py-2 font-sans bg-white  flex flex-col justify-between rounded-3xl">
      <div className="flex flex-wrap justify-center items-center mb-4">
        <img
          src={logo}
          alt="University Logo"
          className="w-20 h-20 object-cover"
        />

        <div className="ml-4">
          <h2 className="text-3xl text-blue-900 font-bold whitespace-nowrap">
            UNIVERSITY OF ILORIN
          </h2>
          <p className="text-sm text-center">P.M.B. 1515, ILORIN, NIGERIA</p>
        </div>
      </div>
      <div className="text-center mb-2">
        <h3 className="text-red-500 my-3 text-lg font-semibold mt-6">
          STUDENT IDENTITY CARD
        </h3>
      </div>
      <div className="text-right mb-2 border-b-2 border-black">
        <p className="text-sm">
          Expiry Date:{" "}
          <span className="bg-green-200 px-2 rounded">31/12/2025</span>
        </p>
      </div>
      <div className="flex max-lg:flex-col-reverse items-center justify-between mb-4">
        <div className="flex flex-col space-y-2 w-3/5">
          <p className="text-md text-blue-900 my-3">
            Name:{" "}
            <input
              type="text"
              value={idcardData.fullName}
              className=" outline-none w-full font-bold rounded-md"
            />
          </p>
          <p className="text-md text-blue-900 my-3">
            Matric No:{" "}
            <input
              type="text"
              value={idcardData.matricNimber}
              className="outline-none w-full font-bold rounded-md"
            />
          </p>
          <p className="text-md  text-blue-900 my-3">
            Email:{" "}
            <input
              type="text"
              value={idcardData.email}
              className=" outline-none w-full font-bold  rounded-md"
            />
          </p>
          <p className="text-md text-blue-900 my-3">
            Department:{" "}
            <input
              type="text"
              value={idcardData.department}
              className="outline-none w-full font-bold rounded-md "
            />
          </p>
        </div>
        <div className="w-24 h-28 border mt-10">
          <img
            // src={passport}
            alt="Student-Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* Back Side of the ID Card */}
    <div className="sm:w-[70%]  h-full mt-0 border px-6 py-8 font-sans bg-white  flex flex-col justify-between rounded-3xl">
      <div>
        <p className="text-sm mb-4">
          This identity card is not transferable. It must be produced at any
          time if requested by any office of the University or authorized
          person(s).
        </p>
        <p className="text-sm mb-4">
          Loss of this card must be reported immediately to the Registrar,
          University of Ilorin, P.M.B. 1515, Ilorin, Nigeria.
        </p>
        <div className="mt-4 text-center">
          <p className="text-sm mb-2">Registrar's Signature</p>
          <div className="mx-auto w-32 my-2"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-24 h-24 border">
          <img
            src={idcardData.qrcode}
            alt="QR Code"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
));

const PrintIDCard = () => {
  const componentRef = useRef();
  const [idcard, setIdcard] = useState("");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input, {
      scale: 2, // Increase the scale for better quality
      useCORS: true, // Allow cross-origin images
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("id_card.pdf");
  };
  const { id } = useParams();
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://studentbackendportal.onrender.com/idcard/${id}/getdata/`
        );
        const data = await response.json();
        setIdcard(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  return (
    <div className="flex">
      <div className="flex flex-col items-center  w-full p-4">
        <IDCard ref={componentRef} idcardData={idcard} />
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handlePrint}
            className="bg-blue-900 text-white px-4 py-2 rounded"
          >
            Print ID Card
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintIDCard;