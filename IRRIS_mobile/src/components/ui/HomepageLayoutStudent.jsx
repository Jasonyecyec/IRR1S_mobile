import React, { useEffect } from "react";
import BottomNavigation from "./BottomNavigation";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HomepageLayoutStudent = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authToken cookie
    const authToken = Cookies.get("authToken");
    console.log("authToken", authToken);
    // If authToken does not exist, redirect to login page
    if (!authToken) {
      navigate("/login"); // Replace '/login' with your login route
    }
  }, [navigate]);
  return (
    <div className="h-screen w-screen ">
      <main className="h-[90%]  bg-thirdColor">{children}</main>
      <BottomNavigation />
    </div>
  );
};

export default HomepageLayoutStudent;
