import React, { useEffect, useState } from "react";
import NotificationIcon from "../assets/images/bell_icon.png";
import UserSample from "../assets/images/user_sample.jpg";
import PointsIcon from "../assets/images/points_icon.png";
import Echo from "laravel-echo";
import { Link } from "react-router-dom";
import HomeProcessButton from "../components/HomeProcessButton";
import { useNavigate } from "react-router-dom";
import QCULogo from "../assets/images/qcu_logo.png";
import "../index.css";
import Cookies from "js-cookie";
import useUserStore from "../services/state/userStore";
import useNotificationStore from "../services/state/notificationStore";
import { fetchUserData } from "../services/api/sharedService";
import { Bell } from "@phosphor-icons/react";
import { getStudentPoints } from "../services/api/StudentService";
import { Coins } from "@phosphor-icons/react";
import CountUp from "react-countup";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getReportStudent } from "../services/api/StudentService";
import { Spinner } from "flowbite-react";
import { formatDateTime } from "../utils/utils";
import StatusIndicator from "../components/StatusIndicator";
import { CalendarBlank } from "@phosphor-icons/react";
import UkeepLogo from "/qcu_upkeep_logo.png";
import beamsClient from "@/src/pushNotificationConfig";
import StatusBadgeReport from "../components/StatusBadgeReport";

const HomePage = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState(null);
  const navigate = useNavigate();
  const [points, setPoints] = useState(null);

  const fetchStudentPoints = async () => {
    setIsLoading(true);
    try {
      const { points } = await getStudentPoints(user?.id);
      setPoints(points);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const params = {
        status: null,
      };
      const { report } = await getReportStudent(user.id, null);
      //Get only the first 10
      const first10Reports = report.slice(0, 10);
      setReports(first10Reports);
      console.log("report response", report);
    } catch (error) {
      console.error(error);
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
    const userIdCookie = Cookies.get("user_id");
    const first_nameCookie = Cookies.get("first_name");
    const last_nameCookie = Cookies.get("last_name");
    const user_roleCookie = Cookies.get("user_role");
    const emailCookie = Cookies.get("email");
    const referralCode_Cookie = Cookies.get("referral_code");

    setUser({
      id: userIdCookie,
      first_name: first_nameCookie,
      last_name: last_nameCookie,
      email: emailCookie,
      user_role: user_roleCookie,
      referral_code: referralCode_Cookie,
    });

    // initializePusherBeams();
    // listenToNotification();

    fetchReport();
    fetchStudentPoints();
  }, []);

  const handleProfileButton = () => {
    navigate("/student/profile");
  };

  const handleNotificationButton = () => {
    setNotification(false);
    setNotificationDetails(null);
    navigate(`/notification/${user?.id}`);
  };

  return (
    <div className="h-full bg-secondaryColor">
      <div className="flex p-3 justify-between">
        <div className="flex items-center font-semibold text-mainColor space-x-2">
          <img src={UkeepLogo} className="w-12 h-12" />
          <p className="text-xl">
            Hello!{" "}
            <span>
              {" "}
              {user?.first_name} {user?.last_name}
            </span>
          </p>
        </div>
        <button onClick={handleNotificationButton} className="relative">
          {notification && (
            <span className="absolute top-[2px] right-[3px] flex h-3 w-3 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColor opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accentColor text-xs justify-center items-center text-white"></span>
            </span>
          )}

          <Bell size={"2.3rem"} color="#1656ea" weight="fill" />
        </button>
      </div>
      {/* <div className="flex justify-between bg-mainColor p-5 border-b-8 border-accentColor">
        <button onClick={handleProfileButton}>
          <img src={UserSample} className="w-12 h-12 rounded-full " />
        </button>

        <button onClick={handleNotificationButton} className="relative">
          {notification && (
            <span className="absolute top-[2px] right-[3px] flex h-3 w-3 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentColor opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accentColor text-xs justify-center items-center text-white"></span>
            </span>
          )}

          <Bell size={"2.5rem"} color="#caced5" />
        </button>
      </div> */}

      {/* <div className="bg-[#f11408] h-2"></div> */}

      <div className="p-3 bg-secondaryColor h-full space-y-6">
        <div className="flex justify-between items-center bg-[#017afe] text-white rounded-lg p-5 py-6">
          <div className="flex space-x-3  max-w-[15rem]">
            <div className=" font-bold space-y-1.5">
              <p className="text-sm text-[#6fbeff] uppercase">Total Points</p>
              <p className="text-2xl capitalize flex items-center space-x-2">
                <Coins size={32} />
                <div>
                  <CountUp end={points} start={0} />{" "}
                  <span className=" text-sm font-semibold">points </span>
                </div>
              </p>
            </div>
          </div>

          <div className="">
            <Link to={"/student/points-history"}>
              <button className="bg-[#ddeefe] text-sm rounded-full p-2 px-3 font-semibold text-mainColor ">
                View history
              </button>
            </Link>
          </div>

          {/* {isLoading ? (
            <Skeleton
              width={"6rem"}
              height={"2rem"}
              className="p-3 rounded-full"
            />
          ) : (
            points !== null && (
              <div className="bg-[#987700] text-white p-3 rounded-full font-semibold flex space-x-2 items-center">
                <Coins size={25} />
                <p className=" ">{points} points</p>
              </div>
            )
          )} */}
        </div>

        <div className="bg-[#d4e3f9] border-2 border-white flex justify-center rounded-full">
          <button
            onClick={() => navigate("/scan-facility")}
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

        <div className="bg-white rounded-2xl shadow relative">
          <div className="flex justify-between font-semibold px-5 mb-5 rounded-t-xl p-2  bg-gray-50 text-mainColor">
            <p>Reports</p>
            <p>Status</p>
          </div>

          <div className="h-[19.5rem]  overflow-y-auto space-y-2 pb-14 p-2">
            {" "}
            {isLoading ? (
              <div className="w-full flex justify-center pt-5  items-center">
                <Spinner aria-label="Large spinner example" size="lg" />
              </div>
            ) : reports && reports.length > 0 ? (
              reports.map((report) => (
                <div
                  className="shadow rounded-md p-2 px-3 text-sm flex justify-between"
                  key={report.id}
                >
                  <div className="space-y-1">
                    <p className=" text-gray-600 flex items-center space-x-2.5">
                      <span>
                        <CalendarBlank size={"23"} color="#caced5" />{" "}
                      </span>
                      <span> {formatDateTime(report.created_at)}</span>
                    </p>
                    <p>
                      {" "}
                      <span className="font-semibold">
                        Reported Issue:{" "}
                      </span>{" "}
                      {report.issues}
                    </p>
                    <p>
                      {" "}
                      <span className="font-semibold"> Description</span>:
                      {report.description}
                    </p>

                    <p>
                      {" "}
                      <span className="font-semibold">Location: </span>{" "}
                      {report.facility?.facilities_name}
                    </p>
                  </div>
                  <div className="flex    flex-1 items-center justify-end">
                    <StatusBadgeReport status={report.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="font-semibold text-center text-gray-500 mt-10">
                No data available
              </p>
            )}
          </div>

          <Link to={"/report-history"}>
            <button className="absolute bottom-0 left-0 w-full shadow bg-bottomNav rounded-b-2xl hover:bg-gray-100 ease-in-out font-semibold text-iconGrayColor p-2.5">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
