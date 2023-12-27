import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QrCode, House, Eye, Gift } from "@phosphor-icons/react";

const BottomNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleQRButton = () => {
    navigate("/home/qr-scanner"); // Navigate to QR Scanner page
  };

  return (
    <div className="shadow-2xl h-[10%] bg-mainColor text-white relative w-full  flex px-5 justify-around items-center">
      <button>
        <Link
          to="/report-history"
          className="text-center  flex flex-col items-center"
        >
          <Eye size={30} color="#9c9c9c" />
          Reports
        </Link>
      </button>

      <div className="absolute flex  items-center justify-center top-[-2rem] left-27.5 p-1 bg-white rounded-full ">
        <button
          className="rounded-full flex flex-col justify-center bg-mainColor content-center  w-20 h-20 items-center p-3"
          // onClick={handleQRButton}
        >
          <QrCode size={40} color="#ffffff" weight="fill" />
          <p className="text-white">More</p>
        </button>
      </div>

      <div className="w-8 h-14"></div>

      <button>
        <Link
          to="/student/redeem"
          className="text-center  flex flex-col items-center"
        >
          <Gift size={32} color="#9c9c9c" /> Redeem
        </Link>
      </button>
    </div>
  );
};

export default BottomNavigation;
