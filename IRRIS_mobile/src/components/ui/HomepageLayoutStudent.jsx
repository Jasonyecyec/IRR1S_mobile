import React from "react";
import BottomNavigation from "./BottomNavigation";

const HomepageLayoutStudent = ({ children }) => {
  return (
    <div className="h-screen w-screen ">
      <main className="h-[90%]  bg-thirdColor">{children}</main>
      <BottomNavigation />
    </div>
  );
};

export default HomepageLayoutStudent;
