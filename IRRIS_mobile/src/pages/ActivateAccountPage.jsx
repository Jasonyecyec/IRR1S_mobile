import React from "react";
import { Link } from "react-router-dom";

const ActivateAccountPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center pt-36">
      <h1 className="w-[80%] text-center text-4xl	font-bold text-mainColor">Activate your account</h1>
      <p className="w-[70%] mt-5 text-center	text-sm">  
        Your account hasn't been activated. To use this app you need to activate
        your account first
      </p>

      <button className="w-[80%] mt-32">
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
