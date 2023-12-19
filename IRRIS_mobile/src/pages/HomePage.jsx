import React, { useEffect } from "react";
import NotificationIcon from "../assets/images/notification_icon.png";
import UserSample from "../assets/images/user_sample.jpg";
import PointsIcon from "../assets/images/points_icon.png";
import { Link } from "react-router-dom";
import HomeProcessButton from "../components/HomeProcessButton";
import { useNavigate } from "react-router-dom";
import QCULogo from "../assets/images/qcu_logo.png";
import "../index.css";
import Cookies from "js-cookie";
import useUserStore from "../services/state/userStore";

const HomePage = () => {
  const { user, setUser } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    const userIdCookie = Cookies.get("user_id");
    const first_nameCookie = Cookies.get("first_name");
    const last_nameCookie = Cookies.get("last_name");
    const emailCookie = Cookies.get("email");

    setUser({id:userIdCookie, first_name: first_nameCookie, last_name: last_nameCookie,email:emailCookie })
  }, [])

  const handleProfileButton = () => {
    navigate("/student/profile");
  };
  return (
    <div className="h-full ">
      <div className="flex justify-between bg-mainColor p-5">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button>
          <img src={NotificationIcon} />
        </button>
      </div>
      <div className="bg-[#f11408] h-2"></div>

      <div className="p-3 bg-background h-full space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <div>
              <img src={QCULogo} alt="qcu-logo" className="w-16 h-16" />
            </div>
            <div className="text-[#987700] font-bold">
              <p>Welcome</p>
              <p className="text-2xl">{user?.first_name} {user?.last_name}</p>
            </div>
          </div>

          <div className="bg-[#987700] text-white p-3 rounded-full">
            20 points
          </div>
        </div>

        <div className="bg-[#d4e3f9] border-2 border-white flex justify-center rounded-full">
          <button
            onClick={() => navigate("/student/scan-facility")}
            className="bg-[#def7fe] rounded-full p-4 border-[8px] border-[#87a2b1] flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#2e39ac"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-16h2a2 2 0 0 1 2 2v2m-4 12h2a2 2 0 0 0 2-2v-2M7 12h10"
              />
            </svg>
          </button>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md">
          <p>Status</p>
        </div>
      </div>

      {/* <div className=" mt-5 flex justify-between items-end">
        <p className="font-semibold text-lg">
          Welcome <span className="block text-4xl">John Doe</span>
        </p>

        <button className="py-3  px-5 rounded-3xl bg-mainColor text-white bg-[#353535] flex justify-center items-center space-x-3">
          <img src={PointsIcon} className="w-8 h-8" />
          <p>20 pts</p>
        </button>
      </div> */}

      {/* <div className="w-full h-28 shadow-lg  mt-5 rounded-md bg-white"></div> */}

      {/* <div className="w-full flex  mt-10  justify-between  ">
        <HomeProcessButton link={"request"} icon={RequestIcon} name="Request" />
        <HomeProcessButton link={"report"} icon={ReportIcon} name="Report" />
        <HomeProcessButton link={"reserve"} icon={ReserveIcon} name="Reserve" />
        <HomeProcessButton link={"more"} icon={MoreIcon} name="More" />
      </div> */}

      {/* <div className="bg-white rounded-lg shadow-md mt-10 p-5">
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
      </div> */}

      {/* <div className="bg-white rounded-lg shadow-md mt-5 p-5">
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
      </div> */}
    </div>
  );
};

export default HomePage;
