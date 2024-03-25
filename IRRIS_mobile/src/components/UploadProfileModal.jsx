import React, { useState } from "react";
import { X, XCircle } from "@phosphor-icons/react";
import ConfirmationModal from "./ConfirmationModal";
import { uploadProfileImage } from "../services/api/sharedService";
import { Spinner } from "flowbite-react";

const UploadProfileModal = ({
  onCloseModal,
  userId,
  notifySuccess,
  notifyError,
  fetchUserDetails,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleConfirmButton = () => {
    setSelectedFile(null);
    setOpenConfirmation(false);
  };

  const handleUploadButton = async () => {
    console.log("upload");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("user_id", userId);
      formData.append("profile_image", selectedFile);
      const response = await uploadProfileImage(formData);

      console.log("response upload image", response);
      notifySuccess("Profile updated successfully!");
    } catch (error) {
      console.log("update profile image error", error);
      notifyError("Error updating profile image!");
    } finally {
      setIsLoading(false);
      fetchUserDetails();
      onCloseModal();
    }
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center">
      {openConfirmation && (
        <ConfirmationModal
          onCloseModal={() => setOpenConfirmation(false)}
          content={"Are you sure you want to remove image?"}
          handleConfirmButton={handleConfirmButton}
        />
      )}
      <div className="p-5 pt-0 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
        <button
          onClick={onCloseModal}
          className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
        >
          <X size={18} color="#828282" weight="bold" />
        </button>
        <div className="space-y-8">
          <p className="text-center text-lg text-mainColor2 font-semibold ">
            {" "}
            Upload Profile Picture
          </p>
          {selectedFile && (
            <div className="w-full flex justify-center items-center space-y-2 flex-col">
              {/* Display selected image */}
              <div className="relative">
                {" "}
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Profile"
                  className="w-24 h-24  rounded-full"
                />
                <button
                  className="absolute top-0 right-0 bg-white rounded-full "
                  onClick={() => setOpenConfirmation(true)}
                >
                  {" "}
                  <XCircle size={25} className="text-red-500" weight="fill" />
                </button>
              </div>

              {selectedFile && (
                <p className="font-semibold italic text-center text-clip overflow-hidden">
                  {selectedFile.name}
                </p>
              )}
            </div>
          )}
          <div className="space-y-10">
            {selectedFile === null && (
              <label
                for="avatar"
                className="w-full p-5 text-center block bg-gray-100 border-2 font-semibold text-gray-600 rounded-md"
              >
                Choose a profile picture
              </label>
            )}

            <input
              type="file"
              id="avatar"
              name="avatar"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onCloseModal}
              className="flex-1 border bg-gray-50 rounded-md font-semibold p-3"
            >
              Cancel
            </button>
            <button
              disabled={!selectedFile}
              onClick={handleUploadButton}
              className={`flex-1  rounded-md font-semibold ${
                selectedFile ? "bg-mainColor2 text-white" : "bg-gray-200"
              }  p-3`}
            >
              {isLoading ? (
                <Spinner aria-label="Default status example" />
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProfileModal;
