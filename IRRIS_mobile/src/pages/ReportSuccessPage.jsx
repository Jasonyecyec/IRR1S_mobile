import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { CheckCircle } from "@phosphor-icons/react";
import "../index.css";

const ReportSuccessPage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      handleClose();
      return;
    }

    // Decrease the countdown each second
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleClose = () => {
    // Get the cookie by its name
    const role = Cookies.get("user_role");
    navigate(`/${role}/home`);
  };
  return (
    <div className="h-screen w-screen background relative flex flex-col  items-center space-y-16 p-10 pt-20">
      <button className="absolute top-3 right-3" onClick={handleClose}>
        <X size={32} color="#121212" weight="bold" />
      </button>
      <div className="flex flex-col items-center space-y-5">
        <CheckCircle size="7rem" color="#14b334" weight="fill" />
        <h1 className="text-3xl font-bold">Submission Successful!</h1>
      </div>

      <div className="bg-green-300 p-4   rounded-xl text-lg flex space-x-2">
        <CheckCircle size="5rem" color="#14b334" weight="fill" />
        <p>
          Thank you. Your submission is in progress; the processing time is 24
          hours.
        </p>
      </div>

      <p>Close in {countdown} sec...</p>
    </div>
  );
};

export default ReportSuccessPage;
