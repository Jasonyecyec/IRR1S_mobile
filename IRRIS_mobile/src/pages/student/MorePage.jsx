import React from "react";
import { useNavigate } from "react-router-dom";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import ReportIcon from "../../assets/images/report_icon.png";
import ScanIcon from "../../assets/images/scan_icon.png";
import RateIcon from "../../assets/images/rate_icon.png";
import ViewDetailsIcon from "../../assets/images/view_details_icon.png";
import CalendarIcon from "../../assets/images/calendar_icon.png";

import { Link } from "react-router-dom";
import "../../index.css";
import useUserStore from "@/src/services/state/userStore";

const moreItems = [
  { to: "", label: "Report", icon: ReportIcon },
  { to: "", label: "Scan", icon: ScanIcon },
  { to: "", label: "View Details", icon: ViewDetailsIcon },
  {
    to: "/search-facility",
    label: "Rate & Review ",
    icon: RateIcon,
  },
  { to: "", label: "Calendar", icon: CalendarIcon },
];

const MorePage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const navigate = useNavigate();

  const handleProfileButton = () => {
    navigate("/student/profile");
  };

  return (
    <div className="h-full background">
      {" "}
      <div className="flex justify-between bg-mainColor p-5 border-red-500 border-b-8">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button>
          <img src={NotificationIcon} />
        </button>
      </div>
      <div className="p-5 pt-20  ">
        <div className="flex justify-center flex-wrap gap-8   ">
          {moreItems.map((item, index) => (
            <Link className="" key={index} to={item.to}>
              <div className="bg-white shadow-md rounded-lg w-28 h-28 text-center font-semibold flex flex-col justify-center items-center">
                <img src={item.icon} className="w-14 h-14" />{" "}
                <p className="text-sm">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MorePage;
