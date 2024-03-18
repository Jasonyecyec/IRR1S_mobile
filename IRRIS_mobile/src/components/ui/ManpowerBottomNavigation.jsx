import React from "react";
import { House, Note, ClockClockwise, UserCircle } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const ManpowerBottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div
      className="shadow-2xl h-[10%] bg-bottomNav relative w-full  flex px-5 justify-around items-center"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <button>
        <Link
          to="/manpower/home"
          className="text-center  text-gray-500  flex flex-col items-center"
        >
          <House
            size={32}
            className={
              pathname === "/manpower/home"
                ? "text-mainColor"
                : "text-[#9c9c9c]"
            }
            weight={location.pathname === "/manpower/home" ? "fill" : "thin"}
          />
          <span className={pathname === "/manpower/home" && "text-mainColor"}>
            {" "}
            Home
          </span>
        </Link>
      </button>

      <button>
        <Link
          to="/manpower/tasks"
          className="text-center  text-gray-500  flex flex-col items-center"
        >
          <Note
            size={32}
            className={
              pathname === "/manpower/tasks"
                ? "text-mainColor"
                : "text-[#9c9c9c]"
            }
            weight={location.pathname === "/manpower/tasks" ? "fill" : "thin"}
          />
          <span className={pathname === "/manpower/tasks" && "text-mainColor"}>
            {" "}
            Tasks
          </span>
        </Link>
      </button>

      <button>
        <Link
          to="/manpower/progress"
          className="text-center  flex flex-col text-gray-500 font-semibold items-center"
        >
          <ClockClockwise
            size={32}
            className={
              pathname === "/manpower/progress"
                ? "text-mainColor"
                : "text-[#9c9c9c]"
            }
            weight={
              location.pathname === "/manpower/progress" ? "fill" : "thin"
            }
          />{" "}
          <span
            className={pathname === "/manpower/progress" && "text-mainColor"}
          >
            {" "}
            Current Task
          </span>
        </Link>
      </button>

      <button>
        <Link
          to="/manpower/profile"
          className="text-center  flex flex-col text-gray-500 font-semibold items-center"
        >
          <UserCircle
            size={32}
            className={
              pathname === "/manpower/profile"
                ? "text-mainColor"
                : "text-[#9c9c9c]"
            }
            weight={location.pathname === "/manpower/profile" ? "fill" : "thin"}
          />{" "}
          Profile
        </Link>
      </button>
    </div>
  );
};

export default ManpowerBottomNavigation;
