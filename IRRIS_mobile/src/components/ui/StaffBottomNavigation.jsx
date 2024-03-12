import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  QrCode,
  House,
  Eye,
  Gift,
  Note,
  UserCircle,
} from "@phosphor-icons/react";
import MoreIcon from "../../assets/images/more_icon.png";

const StaffBottomNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isHomepage, setIsHomepage] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      className="h-[10%] bg-bottomNav text-black relative w-full  flex px-5 justify-around items-center"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      {" "}
      <button>
        <Link
          to="/report-history"
          className="text-center  flex flex-col items-center"
        >
          <Eye size={30} color="#9c9c9c" />
          Reports
        </Link>
      </button>
      <button>
        <Link
          to="/staff/request-history"
          className="text-center  flex flex-col items-center"
        >
          <Note size={32} color="#9c9c9c" /> Request
        </Link>
      </button>
      <button>
        <Link
          to="/staff/profile"
          className="text-center  flex flex-col items-center"
        >
          <UserCircle size={32} color="#9c9c9c" /> Profile
        </Link>
      </button>
    </div>
  );
};

export default StaffBottomNavigation;
