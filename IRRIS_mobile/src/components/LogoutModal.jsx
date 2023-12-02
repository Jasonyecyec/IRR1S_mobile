import React from "react";
import { X, WarningCircle } from "@phosphor-icons/react";

const LogoutModal = ({ onCloseModal, handleSignOutButton }) => {
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="p-5 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <button
          onClick={onCloseModal}
          className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
        >
          <X size={18} color="#828282" weight="bold" />
        </button>

        <div className="flex justify-center items-center">
          <WarningCircle size="5rem" color="#828282" />
        </div>

        <div className="">
          <p className="text-center text-xl font-semibold">
            Are you sure you want to logout?
          </p>
        </div>
        <div className="flex font-semibold space-x-5">
          <button
            onClick={handleSignOutButton}
            className="px-4 bg-red-700 text-white w-full rounded-md text-lg py-3 mr-2"
          >
            Yes
          </button>

          <button
            onClick={onCloseModal}
            className="px-4 bg-mainColor text-white w-full rounded-md text-lg py-3 mr-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
