import React from "react";
import { Coins } from "@phosphor-icons/react";
import PrintIcon from "../../assets/images/print_icon.png";
import "../../index.css";

const Rewards = ({ points, rewardImg, rewardTitle }) => {
  return (
    <div className="border bg-gray-100 p-4 rounded-xl relative flex flex-col items-center justify-center font-semibold space-y-3">
      <p className="w-full text-center text-lg">{rewardTitle} </p>
      <div className="flex  items-center space-x-3">
        <img src={rewardImg} className="w-14 h-14" />
      </div>
      <span className="  text-black  space-x-2 font-semibold p-2 w-full flex items-center justify-center text-lg">
        <Coins size={28} color="#FFB800" />
        <p className="">{points} pts </p>{" "}
      </span>
    </div>
  );
};

export default Rewards;
