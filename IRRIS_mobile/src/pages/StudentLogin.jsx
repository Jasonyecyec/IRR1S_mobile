import React from "react";
import StudentIcon from "../assets/images/student_login_icon.png";
import LoginLogo from "../components/LoginLogo";
import { Link } from "react-router-dom";

const StudentLogin = () => {


  return (
    <div className="flex flex-col items-center">
      <LoginLogo icon={StudentIcon} text="Login as a Student"/>

      <div className="flex flex-col w-8/12 mt-28 space-y-8">
        <input
          placeholder="Email"
          className="border border-mainColor rounded-md p-3"
        />
        <input
          placeholder="Password"
          type="password"
          className="border border-mainColor rounded-md p-3"
        />
        <button className="bg-mainColor text py-4 rounded-md font-semibold text-secondaryColor">
          <Link to='/home'>LOGIN</Link>
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
