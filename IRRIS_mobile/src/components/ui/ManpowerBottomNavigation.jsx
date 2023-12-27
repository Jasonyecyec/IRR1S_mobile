import React from "react";
import { House, Note, ClockClockwise } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const ManpowerBottomNavigation = () => {
  return (
    <div className="shadow-2xl h-[10%] bg-mainColor text-white relative w-full  flex px-5 justify-around items-center">
      <button>
        <Link
          to="/manpower/tasks"
          className="text-center  flex flex-col items-center"
        >
          <Note size={32} color="#f2f2f2" /> Tasks
        </Link>
      </button>

      <button>
        <Link
          to="/manpower/home"
          className="text-center  flex flex-col items-center"
        >
          <House size={32} weight="fill" color="#ffffff" />
          Home
        </Link>
      </button>

      <button>
        <Link
          to="/report-history"
          className="text-center  flex flex-col items-center"
        >
          <ClockClockwise size={32} color="#f2f2f2" /> Progress
        </Link>
      </button>
    </div>
  );
};

export default ManpowerBottomNavigation;
