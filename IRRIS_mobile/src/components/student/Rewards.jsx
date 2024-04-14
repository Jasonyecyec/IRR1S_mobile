import React from "react";
import { Coins } from "@phosphor-icons/react";
import PrintIcon from "../../assets/images/print_icon.png";
import "../../index.css";
import { Link } from "react-router-dom";
const Rewards = ({
  id,
  points,
  rewardImg,
  criteria,
  frequency,
  rewardTitle,
}) => {
  return (
    <div className="border text-sm shadow w-[11rem] h-[12rem]  p-2.5  rounded-xl relative flex flex-col items-center justify-center font-semibold space-y-2">
      <p className="w-full text-center text-sm trunc ">{rewardTitle} </p>
      <div className="flex  items-center space-x-3">
        <img src={rewardImg} className="w-14 h-14" />
      </div>

      {criteria === "points" && (
        <span className=" text-sm text-black  space-x-2 font-semibold  w-full flex items-center justify-center text-lg">
          <Coins size={24} color="#FFB800" />
          <p className="">{points} pts </p>{" "}
        </span>
      )}

      {criteria === "best" && (
        <p className="text-sm ">Top students {frequency}</p>
      )}

      <Link to={`/student/rewards-qualified/${id}`} className="w-full">
        <button className="bg-secondaryColor w-full text-mainColor p-2 rounded-md">
          View Certificate
        </button>
      </Link>
    </div>
  );
};

export default Rewards;
