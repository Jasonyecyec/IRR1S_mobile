import React, { useEffect, useState } from "react";
import UserSample from "../../assets/images/user_sample.jpg";
import NotificationIcon from "../../assets/images/bell_icon.png";
import useUserStore from "@/src/services/state/userStore";
import Cookies from "js-cookie";
import { Bell } from "@phosphor-icons/react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "@/src/services/state/notificationStore";
import beamsClient from "@/src/pushNotificationConfig";
import UpKeepLogo from "/qcu_logo.png";
import { formatDateTime } from "@/src/utils/utils";
import StatusIndicator from "@/src/components/StatusIndicator";
import {
  NotePencil,
  Note,
  Calendar,
  MagnifyingGlass,
  Notepad,
  CalendarBlank,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { getReportStudent } from "@/src/services/api/StudentService";
import { Spinner } from "flowbite-react";

const servicesItems = [
  // { to: "", label: "Report", icon: ReportIcon },
  // { to: "", label: "Scan", icon: ScanIcon },
  // { to: "", label: "View Details", icon: ViewDetailsIcon },
  {
    to: "/search-facility",
    label: "Rate & Review ",
    icon: MagnifyingGlass,
  },
  { to: "/staff/calendar", label: "Calendar", icon: Calendar },
  {
    to: "/staff/pencil-book-facility",
    label: "Pencil Book",
    icon: NotePencil,
  },

  {
    to: "/staff/request",
    label: "Request",
    icon: Note,
  },
  {
    to: "/staff/pencil-book-history",
    label: "Pencil Book",
    label2: "History",
    icon: Notepad,
  },
];

const StaffHomepage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState(null);

  const { notification, setNotification, setNotificationDetails } =
    useNotificationStore((state) => ({
      notification: state.notification,
      setNotification: state.setNotification,
      setNotificationDetails: state.setNotificationDetails,
    }));

  const navigate = useNavigate();

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

  // const initializePusherBeams = async () => {
  //   try {
  //     const client = await beamsClient.start();
  //     const userIdCookie = Cookies.get("user_id");

  //     console.log("Pusher Beams initialized successfully", client);

  //     // Set user ID if needed
  //     // await client.setUserId("USER_ID");

  //     // Subscribe to push notifications
  //     await client.setDeviceInterests([`notification-channel-${userIdCookie}`]);
  //     console.log("Device interests have been set");

  //     // Get and log device interests
  //     const interests = await client.getDeviceInterests();
  //     console.log("Device interests:", interests);
  //   } catch (error) {
  //     console.error("Error initializing Pusher Beams:", error);
  //   }
  // };

  // const listenToNotification = () => {
  //   const userIdCookie = Cookies.get("user_id");

  //   const notificationChannel = window.Echo.channel(
  //     `notification-channel-${userIdCookie}`
  //   );

  //   notificationChannel.listen("UserNotification", (notification) => {
  //     console.log(
  //       "Successfully subscribed to notification-channel:",
  //       notification
  //     );

  //     if (notification) {
  //       setNotification(true);
  //       // Check if there is a notification in local storage
  //       const storedNotification = JSON.parse(
  //         localStorage.getItem("notification")
  //       );

  //       if (!storedNotification) {
  //         // If there is no stored notification, store the received notification
  //         setNotificationDetails(notification);

  //         // Store the notification in local storage
  //         localStorage.setItem("notification", JSON.stringify(notification));
  //       }
  //     } else {
  //       // Update the state and store the updated notification in local storage
  //       setNotificationDetails(notification);
  //       localStorage.setItem("notification", JSON.stringify(notification));
  //     }
  //   });
  // };

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
    // initializePusherBeams();

    // listenToNotification();

    fetchReport();
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
    <div className="h-full bg-secondaryColor">
      <div className="flex p-3 justify-between">
        <div className="flex items-center font-semibold text-mainColor space-x-2">
          <img src={UpKeepLogo} className="w-9 h-7" />
          <div className="flex flex-col">
            <p className="text-xl">
              Hello,{" "}
              <span>
                {" "}
                {user?.first_name} {user?.last_name}!
              </span>
            </p>
            <p className="text-xs uppercase font-semibold">
              {" "}
              {user?.user_role === "staff" ? "Employee" : user?.user_role}
            </p>
          </div>
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

      <div className="p-3  h-full flex flex-col space-y-7">
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

        {/* MORE SERVICES */}
        <div className=" flex justify-center items-center flex-wrap gap-5  ">
          {servicesItems.map((item, index) => (
            <Link
              className="bg-blue-100 hover:bg-blue-200 ease-in-out duration-150   w-[26%] h-[50%]  rounded-lg flex justify-center items-center"
              key={index}
              to={item.to}
            >
              <div
                key={index}
                className="flex p-1  flex-col space-y-2 items-center justify-center"
              >
                {/* <span className="bg-black h-12 w-12">s</span>
                 */}
                <span>
                  {" "}
                  {item.icon &&
                    React.createElement(item.icon, {
                      size: "2rem",
                      // color: "#",
                      className: "text-[#0f59cb]",
                    })}
                </span>
                <p className="font-semibold text-xs text-[#0f59cb]">
                  {item.label}
                </p>{" "}
                <div>
                  <p className="font-semibold mt-[-0.5rem] text-xs text-[#0f59cb]">
                    {item.label2}
                  </p>{" "}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow relative">
          <div className="flex justify-between font-semibold px-5 mb-5 rounded-t-xl p-2  bg-gray-50 text-mainColor">
            <p>Reports</p>
            <p>Status</p>
          </div>

          <div className="h-[17rem]  overflow-y-auto space-y-3 pb-14 p-2">
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
                    <p className="flex items-center space-x-2">
                      {/* <span class="relative flex h-3 w-3 items-center justify-center">
                        <span class=" absolute inline-flex h-5 w-5 rounded-full bg-sky-300 opacity-30"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>{" "} */}
                      <StatusIndicator status={report.status} />
                      <span className="capitalize font-semibold">
                        {report.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center font-semibold text-iconGrayColor">
                No data available
              </p>
            )}
          </div>

          <Link to={"/report-history"}>
            <button className="absolute bottom-0 left-0 w-full shadow bg-bottomNav rounded-b-2xl hover:bg-gray-100 ease-in-out font-semibold text-gray-500  p-2.5">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StaffHomepage;
