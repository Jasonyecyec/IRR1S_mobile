import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { QrCode, House, Eye, Gift, Note } from "@phosphor-icons/react";
import MoreIcon from "../../assets/images/more_icon.png";

const StaffBottomNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isHomepage, setIsHomepage] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const pathname = location.pathname;

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
        {pathname === "/staff/home" ? (
          <Link
            className="rounded-full flex flex-col justify-center bg-mainColor content-center  w-20 h-20 items-center p-3"
            to="/staff/more"
          >
            <img src={MoreIcon} className="w-7 h-7" />
            <p className="text-white">More</p>
          </Link>
        ) : (
          <Link
            className="rounded-full flex flex-col justify-center bg-mainColor content-center  w-20 h-20 items-center p-3"
            to={"/staff/home"}
          >
            <House size={40} color="#ffffff" weight="fill" />
            <p className="text-white">Home</p>
          </Link>
        )}
      </div>

      <div className="w-8 h-14"></div>

      <button>
        <Link to="" className="text-center  flex flex-col items-center">
          <Note size={32} color="#9c9c9c" /> Request
        </Link>
      </button>
    </div>
  );
};

export default StaffBottomNavigation;
