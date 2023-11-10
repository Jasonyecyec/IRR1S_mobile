import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QrCode, House, Eye } from "@phosphor-icons/react";

const BottomNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleQRButton = () => {
    navigate("/home/qr-scanner"); // Navigate to QR Scanner page
  };

  return (
    <div className="shadow-2xl h-[10%]  relative w-full  flex px-5 justify-around items-center">
      <button className="">
        <Link to="/home" className="text-center  flex flex-col items-center">
          <House
            size={30}
            color={`${currentPage === "home" ? "#2563eb" : "#9c9c9c"}`}
          />
          Home
        </Link>
      </button>

      <button>
        <Link
          to="/home/report"
          className="text-center  flex flex-col items-center"
        >
          <Eye size={30} color="#9c9c9c" />
          Reports
        </Link>
      </button>

      <div className="absolute flex items-center justify-center top-[-2rem] left-27.5 p-1 bg-mainColor rounded-full ">
        <button
          className="rounded-full p-1  flex justify-center bg-white content-center p-3"
          onClick={handleQRButton}
        >
          <QrCode size={35} color="#2563eb" />
        </button>
      </div>

      <div className="w-8 h-14"></div>

      <button>
        <Link to="/home" className="text-center flex flex-col items-center">
          <Eye
            size={30}
            color="#9c9c9c"
            className="text-center  flex flex-col items-center"
          />
          Menu
        </Link>
      </button>

      <button>
        <Link to="/home" className="text-center  flex flex-col items-center">
          <Eye size={30} color="#9c9c9c" />
          Menu
        </Link>
      </button>
    </div>
  );
};

export default BottomNavigation;
