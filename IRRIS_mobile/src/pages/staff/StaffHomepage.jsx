import React, { useEffect } from "react";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import useUserStore from "@/src/services/state/userStore";
import Cookies from "js-cookie";
import "../../index.css";

const StaffHomepage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

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
    // navigate("/student/profile");
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
      ssdsd
    </div>
  );
};

export default StaffHomepage;
