import React from "react";
import "../../index.css";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import CalendarIcon from "../../assets/images/calendar_icon.png";
import RateIcon from "../../assets/images/rate_icon.png";
import { Link } from "react-router-dom";
import { NotePencil, Note } from "@phosphor-icons/react";

const moreItems = [
  // { to: "", label: "Report", icon: ReportIcon },
  // { to: "", label: "Scan", icon: ScanIcon },
  // { to: "", label: "View Details", icon: ViewDetailsIcon },
  {
    to: "",
    label: "Rate & Review ",
    icon: RateIcon,
  },
  { to: "/staff/calendar", label: "Calendar", icon: CalendarIcon },
  {
    to: "/staff/pencil-book-facility",
    label: "Pencil Book",
    icon: NotePencil,
  },

  {
    to: "/staff/request",
    label: "Request",
    icon: Note,
  },
  {
    to: "/staff/pencil-book-history",
    label: "Pencil Book History",
    icon: Note,
  },
];

const StaffMorePage = () => {
  const handleProfileButton = () => {};
  return (
    <div className="h-full background">
      <div className="flex justify-between bg-mainColor p-5 border-b-8 border-red-500">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button>
          <img src={NotificationIcon} />
        </button>
      </div>

      <div className="p-10">
        <div className="grid grid-rows-2 grid-cols-2 place-content-center  w-full  gap-x-14 gap-y-10 ">
          {" "}
          {moreItems.map((item, index) => (
            <Link className="" key={index} to={item.to}>
              <div className="bg-white shadow-md space-y-2 rounded-lg  h-32 text-center font-semibold flex flex-col justify-center items-center">
                {item.label === "Pencil Book" ||
                item.label === "Request" ||
                item.label === "Pencil Book History" ? (
                  <item.icon size="3.5rem" color="#2e39ac" />
                ) : (
                  <img src={item.icon} className="w-14 h-14" />
                )}
                <p className="text-sm max-w-[80%] font-semibold">
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffMorePage;
