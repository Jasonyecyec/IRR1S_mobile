import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/activate-account.css";
import BgEye from "../assets/images/bg_eye.png";

const ActivateAccountPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center pt-36 element background relative space-y-10">
      <img
        src={BgEye}
        alt=""
        className="background-image absolute top-32 w-[50rem]"
      />

      <h1 className="w-[80%] text-center text-4xl	font-bold text-mainColor z-10 ">
        Activate your account
      </h1>
      <p className="w-[70%] mt-5 text-center	text-lg font-normal z-10">
        Your account hasn't been activated. To use this app you need to activate
        your account first
      </p>
      <button className="w-[80%] z-10">
        <Link
          to="/otp-input"
          className="py-4 bg-mainColor rounded-lg text-white font-semibold text-xl w-full inline-block"
        >
          Activate Now
        </Link>
      </button>
    </div>
  );
};

export default ActivateAccountPage;
