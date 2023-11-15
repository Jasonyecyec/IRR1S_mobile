import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { XCircle } from "@phosphor-icons/react";

const StudentProfilePage = () => {
  const navigate = useNavigate();
  const handleSignOutButton = () => {
    // To remove a specific cookie
    Cookies.remove("authToken");

    navigate("/login");
  };

  const handleCloseProfile = () => {
    navigate("/student/home");
  };
  return (
    <div>
      StudentProfilePage
      <button onClick={handleCloseProfile}>
        <XCircle size={48} color="#c5b4b4" weight="fill" />
      </button>
      <button onClick={handleSignOutButton} className="bg-red-400 p-3">
        Sign Out
      </button>
    </div>
  );
};

export default StudentProfilePage;
