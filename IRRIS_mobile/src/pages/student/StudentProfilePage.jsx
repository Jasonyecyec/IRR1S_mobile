import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  XCircle,
  Camera,
  CaretRight,
  User,
  SignOut,
} from "@phosphor-icons/react";
import UserSample from "../../assets/images/user_sample.jpg";
import studentProfile from "./studentProfile.js";
import { Link } from "react-router-dom";
import StudentQR from "../../assets/images/student_qr.png";
import useUserStore from "../../services/state/userStore";

const StudentProfilePage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const handleSignOutButton = () => {
    // To remove a specific cookie
    Cookies.remove("authToken");

    navigate("/login");
  };
  console.log(user);
  const handleCloseProfile = () => {
    navigate("/student/home");
  };
  return (
    <div>
      <div className="border border-2 p-6 relative ">
        <div className="flex items-center justify-center mb-10">
          <p className="font-semibold text-xl">My Profile</p>
          <button
            onClick={handleCloseProfile}
            className="absolute top-4 right-2"
          >
            <XCircle size={32} color="#2563eb" />
          </button>
        </div>

        <div className="flex justify-between">
          {/* User Image */}
          <div className="relative">
            <img
              src={UserSample}
              alt="user-sample"
              className="rounded-full w-36 h-36 "
            />
            <button
              onClick={() => console.log("camera click")}
              className="rounded-full p-1.5 absolute bottom-0 right-1 bg-white border border-[2px] border-gray"
            >
              <Camera size={48} color="#121212" className="w-6 h-6" />
            </button>
          </div>

          {/* User details */}
          <div className="text-base p-3 font-medium">
            <p className="text-2xl font-semibold">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="">johndoesmith@gmail.com</p>
            <p>Student : SBIT4A</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 text-lg space-y-5">
        {studentProfile?.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              to={item.route}
              className="flex items-center justify-between"
            >
              <span className="flex items-center">
                <IconComponent size={24} color="#121212" className="mr-4" />
                {item.title}
              </span>

              <CaretRight size={18} color="#121212" />
            </Link>
          );
        })}

        <button
          onClick={handleSignOutButton}
          className="bg-red-200  p-3 rounded-lg  flex justify-center items-center"
        >
          Sign Out
          <SignOut size={24} color="#121212" className="ml-4" />
        </button>

        <div className="flex justify-center">
          <div className=" shadow-lg w-52 bg-white p-2">
            <img src={StudentQR} alt="student-qr" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
