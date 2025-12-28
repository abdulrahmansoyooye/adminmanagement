// src/student-dashboard/Header.jsx
import React from "react";
import { MoreVertical } from "lucide-react";
import logo2 from "../../assets/NewGate_logo_III.png"; // Import the new log
const Header = () => {
  return (
    <header className="fixed w-full   bg-white flex justify-between items-center p-4  ">
      <div className="flex items-center">
        <img src={logo2} alt="New gate logo" className="w-[30px]" />
        {/* <img src={newLogo} alt="Logo" className="w-20 h-auto" />{" "} */}
        {/* Adjust size as needed */}
        <h1 className="ml-16 text-xl font-[500]">Dashboard</h1>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col mr-4">
          {/* <span className="font-semibold">Hawkins Maru</span>
          <span className="text-sm text-gray-600">Company Manager</span> */}
        </div>
        <MoreVertical size={24} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
