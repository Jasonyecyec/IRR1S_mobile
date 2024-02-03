import React from "react";
import { Coins } from "@phosphor-icons/react";
import PrintIcon from "../../assets/images/print_icon.png";
import "../../index.css";

const Rewards = ({ points, rewardImg, rewardTitle }) => {
  return (
    <div className="border bg-gray-100 p-4 rounded-xl relative flex flex-col items-center justify-center font-semibold space-y-3">
      <span className=" bg-mainColor text-white space-x-2   text-black border-2 rounded-full p-2 absolute top-[-1.8rem]  text-center w-[70%] left-1/2  transform -translate-x-1/2 flex items-center justify-center ">
        <Coins size={28} color="#FFB800" />
        <p className="text-sm font-semibold">{points} pts </p>{" "}
      </span>

      <div className="flex  items-center space-x-3">
        <img src={rewardImg} className="w-14 h-14" />
        <p>5/5</p>
      </div>
      <p className="w-full text-center text-lg">{rewardTitle} </p>
    </div>
  );
};

export default Rewards;
