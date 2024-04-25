import React from "react";
import { X } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";
const FacilityInputModal = ({
  onCloseModal,
  handleOnChange,
  handleSubmit,
  qrCode,
  qrCodeError,
  isLoading,
}) => {
  return (
    <div
      className="fixed inset-0 bg-gray-700 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="p-5 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-center mt-8 w-full uppercase">
            room id/name
          </h4>
          <button
            onClick={onCloseModal}
            className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
          >
            <X size={18} color="#828282" weight="bold" />
          </button>
        </div>
        <div className="mt-2">
          {/* Modal content */}
          <input
            type="text"
            name="qrCode"
            value={qrCode}
            placeholder="Enter the Room Name"
            className=" w-full rounded-md"
            onChange={handleOnChange}
          />
          <p
            className={`text-red-500  text-center text-base font-semibold mt-2`}
          >
            <span className={`${qrCodeError.isError ? "hidden" : "none"}`}>
              .
            </span>
            {qrCodeError.isError && `${qrCodeError.message}`}
          </p>
        </div>
        <div className="">
          <button
            onClick={handleSubmit}
            className="px-4 bg-mainColor2 text-white w-full rounded-md font-semibold py-3 mr-2"
          >
            {isLoading ? (
              <Spinner aria-label="Medium sized spinner example" size="md" />
            ) : (
              "Report Issue Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityInputModal;
