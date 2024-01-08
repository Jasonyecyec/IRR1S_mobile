import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import useUserStore from "@/src/services/state/userStore";
import useJobOrderStore from "@/src/services/state/jobOrderStore";
import beamsClient from "@/src/pushNotificationConfig";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ReportIcon from "../../assets/images/report_icon.png";
import RequestIcon from "../../assets/images/request_icon.png";
import DailyTaskIcon from "../../assets/images/dailyTask_icon.png";
import { Clock, MapPin, Circle } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";
import { formatDate } from "@/src/utils/utils";
import { useNavigate } from "react-router-dom";
import { getJobOrder } from "@/src/services/api/manpowerService";
import "../../index.css";

const ManpowerHomePage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const [recentJobOrder, setRecentJobOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchRecentJobOrder = async () => {
    setIsLoading(true);
    try {
      const { job_order } = await getJobOrder(user?.id);
      console.log("fetch recent job order response", job_order);
      setRecentJobOrder(job_order.slice(0, 7));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

    fetchRecentJobOrder();
  }, []);

  const handleReportButton = () => {
    // Clear the value in localStorage for the key "job_order"
    localStorage.removeItem("job_order");
    setjobOrderNotif(false);
    console.log("jobOrderDetails", jobOrderDetails);
  };

  const handleProfileButton = () => {
    navigate("/manpower/profile");
  };

  return (
    <div className="h-full flex flex-col background">
      <div className="flex justify-between items-center bg-mainColor p-5">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button>
          <Link to={`/manpower/notification/${user?.id}`}>
            <img src={NotificationIcon} className="w-10 h-10 " />
          </Link>
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col space-y-7">
        <h1 className="capitalize text-2xl">
          Welcome{" "}
          <span className="text-3xl font-bold block">
            {user?.first_name} {user?.last_name}
          </span>
        </h1>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <p className="font-bold text-xl mb-5">Categories</p>
          <div className="flex justify-between">
            <button
              className="bg-[#D9D9D9]  flex flex-col items-center justify-center w-24 h-24 rounded-md relative"
              onClick={handleReportButton}
            >
              <img src={ReportIcon} className="w-10 h-10 " />
              Report
              {isJobOrderNotif && (
                <span className="absolute top-[-3px] right-[-3px] bg-red-600  animate-pulse rounded-full w-4 h-4"></span>
              )}
            </button>

            <button className="bg-[#D9D9D9]  flex flex-col items-center justify-center w-24 h-24 rounded-md">
              <img src={RequestIcon} className="w-10 h-10 " />
              Request
            </button>

            <button className="bg-[#D9D9D9] flex flex-col items-center justify-center w-24 h-24 rounded-md">
              <img src={DailyTaskIcon} className="w-10 h-10 " />
              Daily Task
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg  shadow-lg flex-1 flex  flex-col p-5">
          <div className="flex justify-between w-full pb-5 ">
            <p className="font-bold text-xl">Status</p>
            <Link to="/manpower/tasks" className="text-mainColor font-bold">
              See more
            </Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner aria-label="Large spinner example" size="lg" />
            </div>
          ) : (
            <div className="h-[16.5rem]  overflow-y-scroll">
              {recentJobOrder?.map((item, index) => (
                <div key={index} className="space-y-3 bg-white py-2 border-t-2">
                  <div className="flex justify-between">
                    <p className="font-bold text-lg">
                      {item.report.description}
                    </p>
                    <p className="text-md flex items-center space-x-2">
                      <Circle size={24} color="#3cd008" weight="fill" />
                      <span>
                        {item.status === "assigned" ? "Pending" : "Ongoing"}
                      </span>
                    </p>
                  </div>
                  <p className="flex items-center space-x-2">
                    <Clock size={24} color="#121212" />
                    <span> {formatDate(item.created_at)} </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <MapPin size={24} color="#121212" />
                    <span> {item.report.facility.facilities_name}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManpowerHomePage;
