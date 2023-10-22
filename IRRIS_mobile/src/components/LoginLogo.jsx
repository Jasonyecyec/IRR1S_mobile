import React from "react";
import BackIcon from "../assets/images/back_icon.png";
import { useNavigate } from "react-router-dom";
import "../index.css";



const LoginLogo = ({ icon, text }) => {
    const navigation = useNavigate();

  return (
    <div className="bg-secondaryColor bg-border relative text-center flex flex-col items-center p-12 w-full">
      <button
        onClick={() => navigation(-1)}
        className="absolute top-10 left-10"
      >
        <img src={BackIcon} />
      </button>

      <div className="">
        <img src={icon} className="" />
      </div>

      <p className="text-mainColor text-2xl font-semibold mt-10">
        {text}
      </p>
    </div>
  );
};

export default LoginLogo;
