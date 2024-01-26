import React from "react";
import { useNavigate } from "react-router-dom";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import { Link } from "react-router-dom";

const moreItems = [
  { to: "", label: "Report", icon: "" },
  { to: "", label: "Reserve", icon: "" },
  { to: "", label: "Scan", icon: "" },
  { to: "", label: "View Details", icon: "" },
  { to: "", label: "Rate & Review Facilities", icon: "" },
  { to: "", label: "Calendar", icon: "" },
];

const MorePage = () => {
  const navigate = useNavigate();

  const handleProfileButton = () => {
    navigate("/student/profile");
  };

  return (
    <div className="h-full bg-red-300">
      {" "}
      <div className="flex justify-between bg-mainColor p-5 border-red-500 border-b-8">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button>
          <img src={NotificationIcon} />
        </button>
      </div>
      <div className="p-5 ">
        <div className="flex justify-around space-x-5 overflow-auto bg-blue-300">
          {moreItems.map((item, index) => (
            <div className="" key={index}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MorePage;
