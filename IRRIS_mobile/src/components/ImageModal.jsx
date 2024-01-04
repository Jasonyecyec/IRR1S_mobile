import React from "react";
import { getImageUrl } from "../utils/utils";
import { X, WarningCircle } from "@phosphor-icons/react";

const ImageModal = ({ onCloseModal, imgSrc }) => {
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="p-5 pt-8 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <button
          onClick={onCloseModal}
          className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
        >
          <X size={18} color="#828282" weight="bold" />
        </button>

        <div className="flex justify-center">
          <img
            src={getImageUrl(imgSrc)}
            alt="report-img"
            className="w-full h-[20rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
