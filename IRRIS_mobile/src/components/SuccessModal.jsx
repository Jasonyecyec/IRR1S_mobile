import React from "react";
import { X, CheckCircle, Check } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";

const SuccessModal = ({ title = null, message, handleCloseButton }) => {
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="p-5 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <div className="flex justify-center items-center">
          {/* <WarningOctagon size="5rem" color="#ff0000" weight="fill" /> */}

          <div className="bg-green-100 p-3 rounded-full">
            {/* <WarningOctagon size="5rem" color="#ff0000" weight="fill" /> */}
            <Check size={40} className="text-green-500" />
          </div>
        </div>

        <div className="space-y-2">
          {title && (
            <p className="font-semibold text-center text-lg">{title}</p>
          )}
          <p className="text-center text-sm text-gray-500 ">{message}</p>
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
