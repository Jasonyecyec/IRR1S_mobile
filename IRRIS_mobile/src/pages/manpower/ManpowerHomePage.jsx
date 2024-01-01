import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import useUserStore from "@/src/services/state/userStore";
import useJobOrderStore from "@/src/services/state/jobOrderStore";
import beamsClient from "@/src/pushNotificationConfig";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchUserData } from "@/src/services/api/sharedService";

const ManpowerHomePage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const {
    isJobOrderNotif,
    jobOrderDetails,
    setjobOrderNotif,
    setJobOrderDetails,
  } = useJobOrderStore((state) => ({
    isJobOrderNotif: state.isJobOrderNotif,
    jobOrderDetails: state.jobOrderDetails,
    setjobOrderNotif: state.setjobOrderNotif,
    setJobOrderDetails: state.setJobOrderDetails,
  }));

  // const fetchData = async () => {
  //   try {
  //     const response = await fetchUserData();
  //     console.log("fetch data response", response);
  //     setUser(response);
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const initializePusherBeams = async () => {
    try {
      const client = await beamsClient.start();
      console.log("Pusher Beams initialized successfully", client);

      // Set user ID if needed
      // await client.setUserId("USER_ID");

      // Subscribe to push notifications
      await client.setDeviceInterests(["job-order"]);
      console.log("Device interests have been set");

      // Get and log device interests
      const interests = await client.getDeviceInterests();
      console.log("Device interests:", interests);

      // Set up notification received event listener
      client.onNotificationReceived = (data) => {
        console.log("Push notification received:", data);
        // Handle the received push notification data, update UI, etc.
        // ...
      };
    } catch (error) {
      console.error("Error initializing Pusher Beams:", error);
    }
  };

  const listenToJobOrder = () => {
    const jobOrderChannel = window.Echo.channel("job-order-channel");
    const userIdCookie = Cookies.get("user_id");
    console.log("listen order user cookie", userIdCookie);
    console.log("Subscribed", jobOrderChannel);
    console.log("Echo instance:", window.Echo);

    jobOrderChannel.listen("JobOrderNotification", (notification) => {
      console.log(
        "Successfully subscribed to job-order-channel:",
        notification.jobOrder
      );

      notification.jobOrder.map((job) => {
        console.log("job data", job);
        if (job.assigned_manpower == userIdCookie) {
          console.log("setting job order");
          setjobOrderNotif(true);
          setJobOrderDetails(job);

          //set the job order to local storage
          localStorage.setItem("job_order", JSON.stringify(job));
        }
      });
    });
  };

  useEffect(() => {
    // Check if there's an existing job order in localStorage
    const jobOrderLocalStorage = localStorage.getItem("job_order");

    if (jobOrderLocalStorage) {
      setjobOrderNotif(true);
      setJobOrderDetails(JSON.parse(jobOrderLocalStorage));
    }

    //if user is null
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

    listenToJobOrder();
  }, []);

  const handleReportButton = () => {
    // Clear the value in localStorage for the key "job_order"
    localStorage.removeItem("job_order");
    setjobOrderNotif(false);
    console.log("jobOrderDetails", jobOrderDetails);
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
            <button
              className="bg-gray-400 p-2 flex flex-col items-center justify-center w-20 h-20 rounded-md relative"
              onClick={handleReportButton}
            >
              <img src={NotificationIcon} className="w-10 h-10 " />
              Report
              {isJobOrderNotif && (
                <span className="absolute top-[-3px] right-[-3px] bg-red-600  animate-pulse rounded-full w-4 h-4"></span>
              )}
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
