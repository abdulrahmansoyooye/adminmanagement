import React from "react";
import logo from "../assets/NewGate_logo_III.png"; // Corrected logo path

const IdCardDetails = ({ data }) => {
  const { fullName, matricNumber, department, level, email, photo } = data;

  return (
    <div className="w-[350px] h-[220px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative font-sans mx-auto print:shadow-none print:border-black print:mx-0">
      {/* Background Pattern/Design - optional decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 z-0"></div>

      {/* Header */}
      <div className="bg-blue-800 h-16 flex items-center px-4 relative z-10">
        <div className="bg-white p-1 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <img 
                src={logo} 
                alt="Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => {e.target.style.display = 'none'}} // Hide if not found
            />
        </div>
        <div className="text-white leading-tight">
          <h1 className="text-xs font-bold uppercase tracking-wide">Newgate University</h1>
          <p className="text-[0.6rem] font-light opacity-90">Student Identity Card</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex p-4 gap-4 relative z-10 h-[calc(100%-4rem)] items-center">
        {/* Photo Section */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <div className="w-20 h-24 border-2 border-green-600 rounded-md overflow-hidden bg-gray-100 shadow-sm">
            <img
              src={
                photo 
                  ? `https://studentbackendportal.onrender.com/assets/${photo}`
                  : "https://via.placeholder.com/150"
              }
              alt="Student"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[0.6rem] font-bold text-green-700 uppercase">Student</span>
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-1.5 min-w-0">
          <div>
            <h2 className="text-sm font-bold text-gray-900 truncate uppercase">{fullName}</h2>
            <p className="text-[0.6rem] text-gray-500 truncate">{email}</p>
          </div>

          <div className="pt-1 space-y-0.5">
            <div className="flex text-[0.6rem]">
              <span className="font-semibold w-16 text-gray-600">Matric No:</span>
              <span className="text-gray-900 font-medium">{matricNumber}</span>
            </div>
            <div className="flex text-[0.6rem]">
              <span className="font-semibold w-16 text-gray-600">Dept:</span>
              <span className="text-gray-900 font-medium truncate">{department}</span>
            </div>
            <div className="flex text-[0.6rem]">
              <span className="font-semibold w-16 text-gray-600">Level:</span>
              <span className="text-gray-900 font-medium">{level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer/Barcode Strip (Decorative) */}
      <div className="absolute bottom-2 right-4 z-10">
         {/* Simple Barcode representation */}
         <div className="flex gap-[1px] opacity-70 h-6">
            {[...Array(20)].map((_, i) => (
                <div key={i} className={`w-[1px] bg-black ${Math.random() > 0.5 ? 'h-full' : 'h-3/4 self-end'}`}></div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default IdCardDetails;
