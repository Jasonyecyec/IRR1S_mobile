import React, { useEffect } from "react";
import Echo from "laravel-echo";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import useUserStore from "@/src/services/state/userStore";
import { Link } from "react-router-dom";

const ManpowerHomePage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const jobOrderChannel = window.Echo.channel("job-order-channel");

  useEffect(() => {
    console.log("Subscribed", jobOrderChannel);
    console.log("Echo instance:", window.Echo);
    jobOrderChannel.listen("JobOrderNotification", (notification) => {
      console.log(
        "Successfully subscribed to job-order-channel:",
        notification
      );
    });
  }, []);

  const listenEven = () => {
    console.log("click");
    jobOrderChannel.listen("JobOrderNotification", (members) => {
      console.log("Successfully subscribed to job-order-channel:", members);
    });
  };

  const handleProfileButton = () => {
    navigate("/student/profile");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center bg-mainColor p-5">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button>
          <img src={NotificationIcon} className="w-10 h-10 " />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col space-y-7">
        <h1 className="capitalize text-2xl">
          Welcome{" "}
          <span className="text-3xl font-bold block">
            {user?.first_name} {user?.last_name}
          </span>
        </h1>

        <div className="bg-white shadow-md p-8 rounded-lg">
          <p className="font-bold text-xl mb-5">Categories</p>
          <div className="flex justify-between">
            <button className="bg-gray-400 p-2 flex flex-col items-center justify-center w-20 h-20 rounded-md">
              <img src={NotificationIcon} className="w-10 h-10 " />
              Report
            </button>

            <button className="bg-gray-400 p-2 flex flex-col items-center justify-center w-20 h-20 rounded-md">
              <img src={NotificationIcon} className="w-10 h-10 " />
              Report
            </button>

            <button className="bg-gray-400 p-2 flex flex-col items-center justify-center w-20 h-20 rounded-md">
              <img src={NotificationIcon} className="w-10 h-10 " />
              Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg  shadow-lg flex-1 flex flex-col p-5">
          <div className="flex justify-between w-full pb-5 ">
            <p className="font-bold text-xl">Status</p>
            <Link to="#" className="text-mainColor font-bold">
              See more
            </Link>
          </div>

          <div className="h-[16.5rem]  overflow-y-scroll">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="space-y-4 bg-white py-2 border-t-2">
                <div className="flex justify-between">
                  <p className="font-bold text-lg">Broken Ceiling</p>
                  <p className="text-sm">Ongoing</p>
                </div>
                <p>Broken Ceiling</p>
                <p>Broken Ceiling</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManpowerHomePage;
