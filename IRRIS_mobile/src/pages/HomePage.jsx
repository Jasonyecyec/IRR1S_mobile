import React from "react";
import NotificationIcon from "../assets/images/notification_icon.png";
import RequestIcon from "../assets/images/request_icon.png";
import ReportIcon from "../assets/images/report_icon.png";
import ReserveIcon from "../assets/images/reserve_icon.png";
import MoreIcon from "../assets/images/more_icon.png";
import UserSample from "../assets/images/user_sample.jpg";
import PointsIcon from "../assets/images/points_icon.png";
import { Link } from "react-router-dom";
import HomeProcessButton from "../components/HomeProcessButton";

const HomePage = () => {
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <button>
          <img src={UserSample} className="w-10 h-10 rounded-full " />
        </button>

        <button>
          <img src={NotificationIcon} />
        </button>
      </div>

      <div className=" mt-5 flex justify-between items-end">
        <p className="font-semibold text-lg">
          Welcome <span className="block text-4xl">John Doe</span>
        </p>

        <button className="py-3  px-5 rounded-3xl bg-mainColor text-white bg-[#353535] flex justify-center items-center space-x-3">
          <img src={PointsIcon} className="w-8 h-8" />
          <p>20 pts</p>
        </button>
      </div>

      <div className="w-full h-28 shadow-lg  mt-5 rounded-md bg-white"></div>

      <div className="w-full flex  mt-10  justify-between  ">
        <HomeProcessButton link={"request"} icon={RequestIcon} name="Request" />
        <HomeProcessButton link={"report"} icon={ReportIcon} name="Report" />
        <HomeProcessButton link={"reserve"} icon={ReserveIcon} name="Reserve" />
        <HomeProcessButton link={"more"} icon={MoreIcon} name="More" />
      </div>

      <div className="bg-white rounded-lg shadow-md mt-10 p-5">
        <p className="font-semibold">Status</p>
        <hr />
        <div className="mt-5 flex justify-between">
          <p className="text-left">
            Oct 21, 2023 <span className="block">SB BLDG. 203</span>
          </p>
          <p className="text-right">
            Reported<span className="block">In Progress</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md mt-5 p-5">
        <div className="flex justify-between">
          <p className="font-semibold">History</p>
          <p className="font-semibold">View All</p>
        </div>

        <hr />
        <div className="mt-1 flex justify-between">
          <p className="text-left">
            Reported <span className="block">Oct 21, 2023</span>
          </p>
          <p className="text-right">
            SB BLDG. 203<span className="block">E FAN AND DESK</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
