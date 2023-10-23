import React from "react";
import NotificationIcon from "../assets/images/notification_icon.png";
import RequestIcon from "../assets/images/request_icon.png";
import ReportIcon from "../assets/images/report_icon.png";
import ReserveIcon from "../assets/images/reserve_icon.png";
import MoreIcon from "../assets/images/more_icon.png";
import UserSample from "../assets/images/user_sample.jpg"

const HomePage = () => {
  return (
    <div className="">
      <div className="flex justify-between">
        <button>
          <img src={UserSample} className="w-10 h-10 rounded-full "/>
        </button>

        <button>
          <img src={NotificationIcon} />
        </button>
      </div>

      <div className="border mt-5 flex justify-between ">
        <p className="font-semibold text-lg">
          Welcome <span className="block text-4xl">John Doe</span>
        </p>

        <button className="py-3 px-5 rounded-full bg-mainColor text-white">
          20 pts
        </button>
      </div>

      <div className="w-full h-28 shadow-lg  mt-5 rounded-md bg-white"></div>

      <div className="w-full flex  mt-10  justify-between  ">
        <div className="rounded-lg w-20 h-20 bg-white flex flex-col items-center justify-center">
          <img src={ReportIcon} className="w-8 h-8" />
          <p>Request</p>
        </div>

        <div className="rounded-lg w-20 h-20  bg-white flex flex-col items-center justify-center">
          <img src={RequestIcon} className="w-8 h-8" />
          <p>Report</p>
        </div>

        <div className="rounded-lg w-20 h-20  bg-white flex flex-col items-center justify-center">
          <img src={ReserveIcon} className="w-8 h-8" />
          <p>Reserve</p>
        </div>

        <div className="rounded-lg w-20 h-20  bg-white flex flex-col items-center justify-center">
          <img src={MoreIcon} className="w-8 h-8" />
          <p>More</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md mt-10 p-5">
        <p className="font-semibold">Status</p>
        <hr/>
        <div className="mt-5 flex justify-between">
          <p className="text-left">Oct 21, 2023 <span className="block">SB BLDG. 203</span></p>
          <p className="text-right">Reported<span className="block">In Progress</span></p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md mt-5 p-5">
        <div className="flex justify-between">
        <p className="font-semibold">History</p>
        <p className="font-semibold">View All</p>
        </div>

        <hr/>
        <div className="mt-1 flex justify-between">
          <p className="text-left">Reported <span className="block">Oct 21, 2023</span></p>
          <p className="text-right">SB BLDG. 203<span className="block">E FAN AND DESK</span></p>
        </div>

        
  
      </div>


    </div>
  );
};

export default HomePage;
