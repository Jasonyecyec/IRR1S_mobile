import React from "react";
import { useNavigate } from "react-router-dom";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import ReportIcon from "../../assets/images/report_icon.png";
import ScanIcon from "../../assets/images/scan_icon.png";
import RateIcon from "../../assets/images/rate_icon.png";
import ViewDetailsIcon from "../../assets/images/view_details_icon.png";
import CalendarIcon from "../../assets/images/calendar_icon.png";
import {
  Bell,
  Calendar,
  MagnifyingGlass,
  Trophy,
  Gift,
  Certificate,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import "../../index.css";
import useUserStore from "@/src/services/state/userStore";
import CalendarPage from "../staff/CalendarPage";
import useNotificationStore from "@/src/services/state/notificationStore";
import UkeepLogo from "/qcu_upkeep_logo.png";

const moreItems = [
  // { to: "", label: "Report", icon: ReportIcon },
  // { to: "", label: "Scan", icon: ScanIcon },
  // { to: "", label: "View Details", icon: ViewDetailsIcon },
  {
    to: "/search-facility",
    label: "Rate & Review ",
    icon: MagnifyingGlass,
  },
  { to: "/staff/calendar", label: "Calendar", icon: Calendar },
  { to: "/leaderboards", label: "Leaderboards", icon: Trophy },
  { to: "/student/rewards", label: "Rewards ", icon: Gift },
  { to: "/achievements", label: "Achievements ", icon: Certificate },
];

const MorePage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const navigate = useNavigate();

  const { notification, setNotification, setNotificationDetails } =
    useNotificationStore((state) => ({
      notification: state.notification,
      setNotification: state.setNotification,
      setNotificationDetails: state.setNotificationDetails,
    }));

  const handleProfileButton = () => {
    navigate("/student/profile");
  };

  const handleNotificationButton = () => {
    setNotification(false);
    setNotificationDetails(null);
    navigate(`/notification/${user?.id}`);
  };

  return (
    <div className="h-full bg-secondaryColor">
      {" "}
      <div className="flex p-3 justify-between">
        <div className="flex items-center font-semibold text-mainColor space-x-2">
          <img src={UkeepLogo} className="w-12 h-12" />
          <p className="text-xl">
            Hello!{" "}
            <span>
              {" "}
              {user?.first_name} {user?.last_name}
            </span>
          </p>
        </div>
        <button onClick={handleNotificationButton} className="relative">
          {notification && (
            <span className="absolute top-[2px] right-[3px] flex h-3 w-3 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColor opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accentColor text-xs justify-center items-center text-white"></span>
            </span>
          )}

          <Bell size={"2.3rem"} color="#1656ea" weight="fill" />
        </button>
      </div>
      <div className="p-5 pt-20  ">
        <div className="flex justify-center flex-wrap gap-x-2 gap-y-5   ">
          {moreItems.map((item, index) => (
            <Link className="" key={index} to={item.to}>
              <div className="bg-white shadow rounded-lg w-28 h-28 text-center font-semibold space-y-3 flex flex-col justify-center items-center">
                {item.icon &&
                  React.createElement(item.icon, {
                    size: "2.3rem",
                    // color: "#",
                    className: "text-mainColor",
                  })}

                <p className="text-sm text-mainColor">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MorePage;
