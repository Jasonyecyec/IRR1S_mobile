import React from "react";
import { CheckCircle } from "@phosphor-icons/react";

const TaskDoneModal = ({ handleDone }) => {
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="p-5 pt-8 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <div className="flex flex-col items-center justify-center ">
          <CheckCircle size={100} color="#2ead3d" weight="fill" />

          <p className="text-2xl text-center bg-green-100 p-3 rounded-lg mt-5">
            You accomplishment is submitted!
          </p>

          <button
            className="text-white bg-mainColor font-bold text-xl px-8 py-2 mt-12 rounded-lg"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDoneModal;
