import React, { useEffect } from "react";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import useUserStore from "@/src/services/state/userStore";
import Cookies from "js-cookie";
import { Bell } from "@phosphor-icons/react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "@/src/services/state/notificationStore";
import beamsClient from "@/src/pushNotificationConfig";

const StaffHomepage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const { notification, setNotification, setNotificationDetails } =
    useNotificationStore((state) => ({
      notification: state.notification,
      setNotification: state.setNotification,
      setNotificationDetails: state.setNotificationDetails,
    }));

  const navigate = useNavigate();

  const initializePusherBeams = async () => {
    try {
      const client = await beamsClient.start();
      const userIdCookie = Cookies.get("user_id");

      console.log("Pusher Beams initialized successfully", client);

      // Set user ID if needed
      // await client.setUserId("USER_ID");

      // Subscribe to push notifications
      await client.setDeviceInterests([`notification-channel-${userIdCookie}`]);
      console.log("Device interests have been set");

      // Get and log device interests
      const interests = await client.getDeviceInterests();
      console.log("Device interests:", interests);
    } catch (error) {
      console.error("Error initializing Pusher Beams:", error);
    }
  };

  const listenToNotification = () => {
    const userIdCookie = Cookies.get("user_id");

    const notificationChannel = window.Echo.channel(
      `notification-channel-${userIdCookie}`
    );

    notificationChannel.listen("UserNotification", (notification) => {
      console.log(
        "Successfully subscribed to notification-channel:",
        notification
      );

      if (notification) {
        setNotification(true);
        // Check if there is a notification in local storage
        const storedNotification = JSON.parse(
          localStorage.getItem("notification")
        );

        if (!storedNotification) {
          // If there is no stored notification, store the received notification
          setNotificationDetails(notification);

          // Store the notification in local storage
          localStorage.setItem("notification", JSON.stringify(notification));
        }
      } else {
        // Update the state and store the updated notification in local storage
        setNotificationDetails(notification);
        localStorage.setItem("notification", JSON.stringify(notification));
      }
    });
  };

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
    initializePusherBeams();

    listenToNotification();
  }, []);
  const handleProfileButton = () => {
    navigate("/staff/profile");
  };

  const handleNotificationButton = () => {
    setNotification(false);
    setNotificationDetails(null);
    navigate(`/notification/${user?.id}`);
  };

  return (
    <div className="h-full background">
      <div className="flex justify-between bg-mainColor p-5 border-b-8 border-red-500">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button onClick={handleNotificationButton} className="relative">
          {notification && (
            <span className="absolute top-[2px] right-[3px] flex h-3 w-3 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-xs justify-center items-center text-white">
                {/* {jobOrderDetails && <p> {jobOrderDetails.length}</p>} */}
              </span>
            </span>
            // <span className="absolute top-[-3px] right-[-3px] bg-red-600  animate-pulse rounded-full w-4 h-4"></span>
          )}

          <Bell size={"2.5rem"} color="#FFFFFF" />
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
