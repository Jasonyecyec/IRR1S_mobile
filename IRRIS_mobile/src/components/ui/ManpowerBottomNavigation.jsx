import React from "react";
import { House, Note, ClockClockwise } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const ManpowerBottomNavigation = () => {
  const location = useLocation();
  return (
    <div className="shadow-2xl h-[10%] bg-mainColor text-white relative w-full  flex px-5 justify-around items-center">
      <button>
        <Link
          to="/manpower/tasks"
          className="text-center  flex flex-col items-center"
        >
          <Note
            size={32}
            color="#f2f2f2"
            weight={location.pathname === "/manpower/tasks" ? "fill" : "thin"}
          />
          Tasks
        </Link>
      </button>

      <button>
        <Link
          to="/manpower/home"
          className="text-center  flex flex-col items-center"
        >
          <House
            size={32}
            color="#ffffff"
            weight={location.pathname === "/manpower/home" ? "fill" : "thin"}
          />
          Home
        </Link>
      </button>

      <button>
        <Link
          to="/manpower/progress"
          className="text-center  flex flex-col items-center"
        >
          <ClockClockwise
            size={32}
            color="#f2f2f2"
            weight={
              location.pathname === "/manpower/progress" ? "fill" : "thin"
            }
          />{" "}
          Progress
        </Link>
      </button>
    </div>
  );
};

export default ManpowerBottomNavigation;
