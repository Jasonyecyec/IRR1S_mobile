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
          <h4 className="text-2xl font-bold text-center mt-8 w-full">
            ENTER FACILITY ID
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
            placeholder="Facility ID"
            className=" w-full rounded-md"
            onChange={handleOnChange}
          />
          <p
            className={`text-red-500 italic text-center text-xl font-semibold mt-2`}
          >
            <span className={`${qrCodeError.isError ? "hidden" : "none"}`}>
              .
            </span>
            {qrCodeError.isError && `*${qrCodeError.message}`}
          </p>
        </div>
        <div className="">
          <button
            onClick={handleSubmit}
            className="px-4 bg-mainColor text-white w-full rounded-md text-lg py-3 mr-2"
          >
            {isLoading ? (
              <Spinner aria-label="Medium sized spinner example" size="md" />
            ) : (
              "SUBMIT"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityInputModal;
