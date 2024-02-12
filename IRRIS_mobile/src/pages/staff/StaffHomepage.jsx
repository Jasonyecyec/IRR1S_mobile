import React, { useEffect } from "react";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import useUserStore from "@/src/services/state/userStore";
import Cookies from "js-cookie";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const StaffHomepage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      console.log("user data is null");
      const userIdCookie = Cookies.get("user_id");
      const first_nameCookie = Cookies.get("first_name");
      const last_nameCookie = Cookies.get("last_name");
      const user_roleCookie = Cookies.get("user_role");
      const emailCookie = Cookies.get("email");

      setUser({
        id: userIdCookie,
        first_name: first_nameCookie,
        last_name: last_nameCookie,
        email: emailCookie,
        user_role: user_roleCookie,
      });
    }
  }, []);
  const handleProfileButton = () => {
    navigate("/staff/profile");
  };
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

      <div className="p-3  h-full flex flex-col space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <div>
              {/* <img src={QCULogo} alt="qcu-logo" className="w-16 h-16" /> */}
            </div>
            <div className="text-[#987700] font-bold">
              <p>Welcome</p>
              <p className="text-2xl capitalize">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#d4e3f9] border-2 border-white flex justify-center rounded-full ">
          <button
            onClick={() => navigate("/scan-facility")}
            className="bg-[#def7fe]  rounded-full p-4 border-[8px] border-[#87a2b1] flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
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
    </div>
  );
};

export default StaffHomepage;
