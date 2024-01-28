import React from "react";
import { X, CheckCircle } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";

const SuccessModal = ({ message, handleCloseButton }) => {
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="p-5 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <div className="flex justify-center items-center">
          {/* <WarningOctagon size="5rem" color="#ff0000" weight="fill" /> */}
          <CheckCircle size="5rem" color="#00ff00" weight="fill" />
        </div>

        <div className="">
          <p className="text-center text-xl font-semibold">{message}</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            onClick={handleCloseButton}
            className="px-4 bg-mainColor text-white w-full font-semibold rounded-md text-lg py-3 mr-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
