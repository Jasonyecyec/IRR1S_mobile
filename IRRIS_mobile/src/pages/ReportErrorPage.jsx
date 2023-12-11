import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, XCircle } from "@phosphor-icons/react";
import Cookies from "js-cookie";

import "../index.css";

const ReportErrorPage = () => {
  const [countdown, setCountdown] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();

  const { errorMessage } = location.state || {};

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
    <div className="h-screen w-screen background p-10 pt-32 relative flex flex-col  items-center space-y-16">
      <button className="absolute top-3 right-3" onClick={handleClose}>
        <X size={32} color="#121212" weight="bold" />
      </button>
      <div className="flex flex-col items-center space-y-5">
        {/* <CheckCircle size="7rem" color="#14b334" weight="fill" /> */}
        <XCircle size="7rem" color="#e60f0f" weight="fill" />
        <h1 className="text-3xl font-bold">Submission Error!</h1>
      </div>

      <div className="bg-red-300 p-3 rounded-xl text-lg">
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      <p>Close in {countdown} sec...</p>
    </div>
  );
};

export default ReportErrorPage;
