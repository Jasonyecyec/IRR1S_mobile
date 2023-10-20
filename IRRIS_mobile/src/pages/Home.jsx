import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Settings from "./Settings";
import HomePage from "./HomePage";

const Home = () => {
  return (
    <div className="h-screen">
      <div className="h-[90%] w-full p-5">
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="history" element={<div>History </div>} />
        <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
  

      <div className="border h-[10%] flex justify-around">
       
        <Link to="history">History</Link>
        <Link to="/home">Home</Link>
        <Link to="settings">Settings</Link>
      </div>
    </div>
  );
};

export default Home;
