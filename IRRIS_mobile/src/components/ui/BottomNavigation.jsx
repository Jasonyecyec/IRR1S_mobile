import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { QrCode, House, Eye, Gift } from "@phosphor-icons/react";
import MoreIcon from "../../assets/images/more_icon.png";

const BottomNavigation = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isHomepage, setIsHomepage] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const pathname = location.pathname;

  const handleQRButton = () => {
    navigate("/home/qr-scanner"); // Navigate to QR Scanner page
  };

  // const handleHomeAndMoreButton = () => {
  //   setIsHomepage((prevIsHomepage) => {
  //     const newIsHomepage = !prevIsHomepage;
  //     console.log("click", newIsHomepage);

  //     if (newIsHomepage) {
  //       navigate("/student/more");
  //     } else {
  //       navigate("/student/home");
  //     }

  //     return newIsHomepage;
  //   });
  // };
  console.log("pathname", pathname);
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
        {pathname === "/student/home" ? (
          <Link
            className="rounded-full flex flex-col justify-center bg-mainColor content-center  w-20 h-20 items-center p-3"
            to={"/student/more"}
          >
            <img src={MoreIcon} className="w-9 h-9" />
            <p className="text-white">More</p>
          </Link>
        ) : (
          <Link
            className="rounded-full flex flex-col justify-center bg-mainColor content-center  w-20 h-20 items-center p-3"
            to={"/student/home"}
          >
            <House size={40} color="#ffffff" weight="fill" />
            <p className="text-white">Home</p>
          </Link>
        )}
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
