import React from "react";
import ArrowLeft2 from "../assets/images/arrow-left.png";
import NotificationIcon from "../assets/images/bell_icon.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CaretLeft, Bell } from "@phosphor-icons/react";

const ManpowerHeaderNavigation = ({
  navigateTo,
  showBell = true,
  title = null,
}) => {
  const navigate = useNavigate();
  const goBack = () => {
    if (navigateTo === "home") {
      navigate("/manpower/home");
    } else if (navigateTo === "previous") {
      navigate(-1);
    }
  };

  return (
    <div className="bg-mainColor2 p-3 px-4 flex justify-between items-center ">
      <button onClick={goBack}>
        <ArrowLeft size={28} color="#FFFFFF" />
      </button>

      {title && <p className=" text-white text-lg">{title}</p>}

      {showBell && (
        <button>
          <Bell size={30} color="#FFFFFF" />
        </button>
      )}
    </div>
  );
};

export default ManpowerHeaderNavigation;
