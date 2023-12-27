import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, XCircle } from "@phosphor-icons/react";

import "../index.css";

const FacilityNotFoundPage = () => {
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
    navigate(`/scan-facility`);
  };

  return (
    <div className="h-screen w-screen background p-10 pt-32 relative flex flex-col  items-center space-y-16">
      <button className="absolute top-3 right-3" onClick={handleClose}>
        <X size={32} color="#121212" weight="bold" />
      </button>
      <h1 className="font-bold text-3xl">Facility not found</h1>
      <p>
        <p>Close in {countdown} sec...</p>
      </p>
    </div>
  );
};

export default FacilityNotFoundPage;
