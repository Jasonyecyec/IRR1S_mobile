import React from "react";
import { CheckCircle, Check } from "@phosphor-icons/react";

const TaskDoneModal = ({ handleDone, content = null }) => {
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="p-5 pt-8 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <div className="flex flex-col items-center justify-center space-y-5">
          <span className="rounded-full bg-green-100 p-3 flex items-center justify-center">
            {" "}
            <Check size={35} className="text-green-500" />
          </span>

          <p className="font-semibold text-lg"> Thanks for submitting!</p>

          {content === null && (
            <p className="text-base text-center text-gray-500  rounded-lg ">
              Thank's for submitting feedback.
            </p>
          )}

          {content && (
            <p className="text-base text-center text-gray-500   rounded-lg ">
              {content}
            </p>
          )}

          <button
            className="text-white w-full bg-mainColor font-semibold text-lg px-8 py-2  rounded-lg"
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
