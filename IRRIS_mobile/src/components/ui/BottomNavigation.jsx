import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  QrCode,
  House,
  Eye,
  Gift,
  DotsThreeCircle,
  UserCircle,
} from "@phosphor-icons/react";
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
    <div
      className="h-[10%] bg-bottomNav text-black relative w-full  flex px-5 justify-around items-center"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <button>
        <Link
          to="/student/home"
          className="text-center text-gray-500  flex flex-col items-center"
        >
          <House
            size={32}
            className={pathname === "/student/home" && "text-mainColor"}
          />
          <span className={pathname === "/student/home" && "text-mainColor"}>
            {" "}
            Home
          </span>
        </Link>
      </button>

      <button className="text-gray-500">
        <Link
          className="rounded-full flex flex-col justify-center  content-center  w-20 h-20 items-center p-3"
          to={"/student/more"}
        >
          <DotsThreeCircle
            size={32}
            className={
              pathname === "/student/more"
                ? "text-mainColor"
                : "text-iconGrayColor "
            }
          />

          <p className={pathname === "/student/more" && "text-mainColor"}>
            More
          </p>
        </Link>
      </button>

      <button className="text-gray-500">
        <Link
          to="/report-history"
          className="text-center  flex flex-col items-center"
        >
          <Eye size={32} className="text-iconGrayColor" />{" "}
          <span className="">Reports</span>
        </Link>
      </button>

      <button className="text-gray-500">
        <Link
          to="/student/profile"
          className="text-center  flex flex-col items-center"
        >
          <UserCircle size={32} className="text-iconGrayColor" />{" "}
          <span className="">Profile</span>
        </Link>
      </button>
    </div>
  );
};

export default BottomNavigation;
