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
import UPkeepLogo from "/qcu_upkeep_logo.png";
import {
  Bell,
  WarningCircle,
  NotePencil,
  Notepad,
} from "@phosphor-icons/react";
import StatusBadgeReport from "@/src/components/StatusBadgeReport";

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
    isJobOrderRequestNotif,
    jobOrderDetails,
    jobOrderRequestDetails,
    setjobOrderNotif,
    setjobOrderRequestNotif,
    setJobOrderDetails,
    setJobOrderRequestDetails,
  } = useJobOrderStore((state) => ({
    isJobOrderNotif: state.isJobOrderNotif,
    isJobOrderRequestNotif: state.isJobOrderRequestNotif,
    jobOrderDetails: state.jobOrderDetails,
    jobOrderRequestDetails: state.jobOrderRequestDetails,
    setjobOrderNotif: state.setjobOrderNotif,
    setjobOrderRequestNotif: state.setjobOrderRequestNotif,
    setJobOrderDetails: state.setJobOrderDetails,
    setJobOrderRequestDetails: state.setJobOrderRequestDetails,
  }));

  const fetchRecentJobOrder = async () => {
    setIsLoading(true);
    try {
      const { job_order } = await getJobOrder(user?.id);
      setRecentJobOrder(job_order);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializePusherBeams = async () => {
    try {
      const client = await beamsClient.start();
      const userIdCookie = Cookies.get("user_id");

      console.log("Pusher Beams initialized successfully", client);

      // Set user ID if needed
      // await client.setUserId("USER_ID");

      // Subscribe to push notifications
      await client.setDeviceInterests([`job-order-${userIdCookie}`]);
      console.log("Device interests have been set");

      // Get and log device interests
      const interests = await client.getDeviceInterests();
      console.log("Device interests:", interests);
    } catch (error) {
      console.error("Error initializing Pusher Beams:", error);
    }
  };

  const listenToJobOrder = () => {
    console.log("listening");
    const userIdCookie = Cookies.get("user_id");

    const jobOrderChannel = window.Echo.channel(
      `job-order-channel-${userIdCookie}`
    );

    const jobOrderRequestChannel = window.Echo.channel(
      `job-order-request-channel-${userIdCookie}`
    );

    //   // LISTEN TO REPORT
    jobOrderChannel.listen("JobOrderNotification", (notification) => {
      console.log(
        "Successfully subscribed to job-order-channel:",
        notification
      );
      if (
        notification &&
        notification.jobOrder &&
        Array.isArray(notification.jobOrder)
      ) {
        console.log("job order recieved");

        notification.jobOrder.forEach((job) => {
          if (job.assigned_manpower === parseInt(userIdCookie, 10)) {
            console.log("setting job order");
            setjobOrderNotif(true);

            setJobOrderDetails((prev) => {
              const updatedJobOrderDetails = { ...prev, job };
              console.log("updatedJobOrderDetails", updatedJobOrderDetails);

              // set the job order to local storage
              localStorage.setItem(
                "job_order",
                JSON.stringify(updatedJobOrderDetails)
              );
              return updatedJobOrderDetails;
            });
          }
        });
      }
    });

    // LISTEN TO REQUEST
    jobOrderRequestChannel.listen(
      "JobOrderRequestNotification",
      (notification) => {
        console.log(
          "Successfully subscribed to job-order-request-channel:",
          notification
        );
        setjobOrderRequestNotif(true);

        if (
          notification &&
          notification.jobOrderRequest &&
          Array.isArray(notification.jobOrderRequest)
        ) {
          notification.jobOrderRequest.forEach((job) => {
            setjobOrderRequestNotif(true);

            setJobOrderRequestDetails((prev) => {
              const updatedJobOrderDetails = { ...prev, job };
              console.log("updatedJobOrderDetails", updatedJobOrderDetails);
              // set the job order to local storage
              localStorage.setItem(
                "job_order_request",
                JSON.stringify(updatedJobOrderDetails)
              );
              return updatedJobOrderDetails;
            });
          });
        }
      }
    );
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

    // initializePusherBeams();

    // listenToJobOrder();

    fetchRecentJobOrder();
  }, []);

  const handleReportButton = () => {
    // Clear the value in localStorage for the key "job_order"
    localStorage.removeItem("job_order");
    setjobOrderNotif(false);
    setJobOrderDetails(null);

    //redirect to task page
    navigate("/manpower/tasks");
  };

  const handleRequestButton = () => {
    // Clear the value in localStorage for the key "job_order"
    localStorage.removeItem("job_order_request");
    setjobOrderRequestNotif(false);
    setJobOrderRequestDetails(null);

    //redirect to task page
    navigate("/manpower/tasks");
  };

  const handleProfileButton = () => {
    navigate("/manpower/profile");
  };

  return (
    <div className="h-full flex flex-col bg-secondaryColor">
      <div className="flex p-3 justify-between">
        <div className="flex items-center font-semibold text-mainColor space-x-2">
          <img src={UPkeepLogo} className="w-12 h-12" />
          <p className="text-xl">
            Hello!{" "}
            <span>
              {" "}
              {user?.first_name} {user?.last_name}
            </span>
          </p>
        </div>
        {/* <button onClick={handleNotificationButton} className="relative">
          {notification && (
            <span className="absolute top-[2px] right-[3px] flex h-3 w-3 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColor opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accentColor text-xs justify-center items-center text-white"></span>
            </span>
          )}

          <Bell size={"2.3rem"} color="#1656ea" weight="fill" />
        </button> */}

        <Link to={`/manpower/notification/${user?.id}`}>
          <button>
            <Bell size={"2.3rem"} color="#1656ea" weight="fill" />
          </button>
        </Link>
      </div>

      <div className="p-5 flex-1 flex flex-col space-y-7">
        <div className="p-2 rounded-lg">
          <p className="font-bold text-xl mb-5 text-center text-mainColor2">
            Categories
          </p>
          <div className="flex justify-between">
            <button
              className="bg-white shadow flex flex-col space-y-1 items-center justify-center w-28 h-28 rounded-md relative"
              onClick={handleReportButton}
            >
              <WarningCircle className="text-[#0f59cb] w-10 h-10" />
              <span className="text-[#0f59cb] font-semibold"> Report</span>

              {isJobOrderNotif && (
                <span className="absolute top-[-5px] right-[-5px] flex h-6 w-6 ">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 text-xs justify-center items-center text-white">
                    !
                  </span>
                </span>
                // <span className="absolute top-[-3px] right-[-3px] bg-red-600  animate-pulse rounded-full w-4 h-4"></span>
              )}
            </button>

            <button
              className="bg-white shadow space-y-1  flex flex-col items-center justify-center w-28 h-28 rounded-md relative"
              onClick={handleRequestButton}
            >
              <NotePencil className="text-[#0f59cb] w-10 h-10" />

              <span className="text-[#0f59cb] font-semibold"> Request</span>
              {isJobOrderRequestNotif && (
                <span className="absolute top-[-5px] right-[-5px] flex h-6 w-6 ">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 text-xs justify-center items-center text-white">
                    !
                  </span>
                </span>
                // <span className="absolute top-[-3px] right-[-3px] bg-red-600  animate-pulse rounded-full w-4 h-4"></span>
              )}
              {console.log("job order requesst", isJobOrderRequestNotif)}
            </button>

            <button
              onClick={() => navigate("/manpower/report-form")}
              className="bg-white shadow space-y-1  flex flex-col items-center justify-center w-28 h-28 rounded-md"
            >
              <Notepad className="text-[#0f59cb] w-10 h-10" />
              <span className="text-sm font-semibold text-[#0f59cb]">
                {" "}
                Report Form
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white  rounded-lg  shadow h-[25rem]  flex  flex-col p-5 relative">
          <div className="flex justify-between w-full pb-3 border-b-[1px]">
            <p className="font-semibold text-[#0f59cb]">Job order details</p>

            <p className="font-semibold text-[#0f59cb]">Status</p>
          </div>
          {isLoading ? (
            <div className="flex justify-center pt-10">
              <Spinner aria-label="Large spinner example" size="lg" />
            </div>
          ) : (
            <div className="h-[16.5rem]  overflow-y-scroll">
              {recentJobOrder && recentJobOrder.length > 0 ? (
                recentJobOrder?.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-1 bg-white shadow-md rounded-md p-2 flex justify-between"
                  >
                    <div>
                      {" "}
                      <p className="font-semibold">{item.description}</p>
                      <p className="text-sm flex items-center space-x-2 ">
                        <Clock size={24} color="#121212" />
                        <span className="text-gray-500">
                          {" "}
                          {formatDate(item.created_at)}{" "}
                        </span>
                      </p>
                      <p className="flex text-sm items-center space-x-2">
                        <MapPin size={24} color="#121212" />
                        <span className="text-gray-500">
                          {" "}
                          {item.report?.facility?.facilities_name}
                        </span>
                      </p>
                      <p className="flex text-sm items-center space-x-2">
                        <WarningCircle size={24} color="#121212" />
                        <span className="text-gray-500">
                          {" "}
                          {item.report?.issues}
                        </span>
                      </p>
                    </div>
                    <div className="flex  items-center justify-center">
                      <p>
                        {" "}
                        <StatusBadgeReport status={item.status} />
                      </p>

                      {/* <p className="text-sm flex items-center space-x-2">
                        <Circle size={24} color="#3cd008" weight="fill" />
                        <span>
                          {item.status === "assigned" ? "Pending" : "Ongoing"}
                        </span>
                      </p> */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center font-semibold text-gray-500 mt-10">
                  No data available
                </p>
              )}
            </div>
          )}

          <Link
            to="/manpower/tasks"
            className="text-gray-500 font-bold absolute bottom-0 left-0 bg-bottomNav w-full p-2 text-center rounded-b-lg"
          >
            <button> See more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManpowerHomePage;
