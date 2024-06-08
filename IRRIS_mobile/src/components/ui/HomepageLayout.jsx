import React, { useEffect, useState } from "react";
import BottomNavigation from "./BottomNavigation";
import ManpowerBottomNavigation from "./ManpowerBottomNavigation";
import StaffBottomNavigation from "./StaffBottomNavigation";
import Cookies from "js-cookie";
import useUserStore from "@/src/services/state/userStore";
import { useNavigate } from "react-router-dom";

const HomepageLayout = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // Check for authToken cookie
    const authToken = Cookies.get("authToken");
    const userRole = Cookies.get("user_role");

    if (userRole) setCurrentUser(userRole);
    console.log("role", userRole);
    console.log("authToken", authToken);
    // If authToken does not exist, redirect to login page
    if (!authToken) {
      navigate("/login"); // Replace '/login' with your login route
    }
  }, [navigate]);

  let bottomNavigationComponent = null;

  switch (currentUser) {
    case "student":
      bottomNavigationComponent = <BottomNavigation />;
      break;
    case "manpower":
      bottomNavigationComponent = <ManpowerBottomNavigation />;
      break;
    case "staff":
      bottomNavigationComponent = <StaffBottomNavigation />;
      break;
    // Add more cases for other user roles if needed
    default:
      // Handle other cases or set bottomNavigationComponent to null
      break;
  }

  return (
    <div className="h-screen w-screen max-w-[414px]">
      <main className="h-[90%]  bg-white">{children}</main>
      {currentUser && bottomNavigationComponent}
    </div>
  );
};

export default HomepageLayout;
