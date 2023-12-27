import React from "react";
import ArrowLeft from "../assets/images/arrow-left.png";
import NotificationIcon from "../assets/images/bell_icon.png";
import { useNavigate } from "react-router-dom";

const ManpowerHeaderNavigation = ({ navigateTo, showBell = true }) => {
  const navigate = useNavigate();
  const goBack = () => {
    if (navigateTo === "home") {
      navigate("/manpower/home");
    } else if (navigateTo === "previous") {
      navigate(-1);
    }
  };

  return (
    <div className="bg-mainColor py-3 px-5 flex justify-between rounded-b-[2rem]">
      <button onClick={goBack}>
        <img src={ArrowLeft} className="w-12" />
      </button>

      {showBell && (
        <button>
          <img src={NotificationIcon} className="w-10" />
        </button>
      )}
    </div>
  );
};

export default ManpowerHeaderNavigation;
