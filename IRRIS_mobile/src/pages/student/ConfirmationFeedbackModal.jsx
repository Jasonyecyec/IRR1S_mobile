import React, { useState, useEffect } from "react";
import { Button, Label, Modal } from "flowbite-react";

import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { getUserDetails } from "@/src/services/api/sharedService";
import useUserStore from "../../services/state/userStore";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const ConfirmationFeedbackModal = ({
  modalPropsFeedback,
  handleConfirmation,
  onClose,
}) => {
  const {
    openModalFeedback,
    onCloseModalFeedback,
    functionalityRating,
    maintainabilityRating,
    portabilityRating,
    efficiencyRating,
    overallRating,
    opinionRating,
    nameRating,
    emailRating,
  } = modalPropsFeedback;

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "You already Evaluated our system, please try again after 60 days"
  );
  const [isError, setIsError] = useState(false); // Define isError state
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state

  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    setIsLoadingUser(true);
    try {
      const { user_details } = await getUserDetails(user?.id);
      const hasSubmittedFeedbackWithinLast3Months = false;
      if (hasSubmittedFeedbackWithinLast3Months) {
        setIsError(true);
        setErrorMessage(
          "You have already submitted feedback within the last 3 months."
        );
      }
      // setUserDetails(user_details); // You might want to set userDetails here if needed
    } catch (error) {
      setIsError(true); // Set isError to true if there's an error
      setErrorMessage("Error fetching user details"); // Set error message
      console.log("Error fetching user details:", error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(user?.id);
  }, []);


  const handleConfirmAndClose = async () => {
    setIsLoading(true);
    try {
      const response = await handleConfirmation(); // Wait for handleConfirmation function to complete and return response
      if (response.message) {
        showSuccessToast("Feedback submitted successfully!");
        setIsSuccess(true);

        // You may want to close the modal here
        // onClose(); // Close the modal
      } else {
        setIsSuccess(false);
        // Set error state
        setIsError({
          error: true,
          message: "You already evaluated . Please try again after 60 days.",
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // If the error contains a custom message from the server
        setIsError({ error: true, message: error.response.data.error });
      } else {
        // If the error doesn't contain a custom message, use a generic error message
        setIsError({
          error: true,
          message:
            "You already evaluated our system. Please try again after 60 days.",
        });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      duration: 6000,
      position: "top-center",
      style: {
        background: "#4CAF50",
        color: "#FFFFFF",
      },
    });
  };

  const handleOpenModal = (isSuccess) => {
    setIsSuccess(isSuccess);
  };

  const handleCloseErrorModal = () => {
    setIsError(false);
    setErrorMessage("");
    onClose();
    navigate(`/${user?.user_role}/profile`);
  };

  return (
    <Modal
      show={modalPropsFeedback.openModalFeedback}
      onClose={onCloseModalFeedback}
      size="lg"
      popup
      className="pt-[6rem]"
    >
      {isSuccess && (
        <SuccessModal
          message="Feedback submitted successfully!"
          handleCloseButton={() => {
            setIsSuccess(false);
            onClose(onCloseModalFeedback);
            navigate(`/${user?.user_role}/profile`);
          }}
        />
      )}
      {isError && (
        <div>
          {console.log("Error modal shown: ", isError)}
          <ErrorModal
            message={errorMessage}
            handleCloseButton={handleCloseErrorModal}
          />
        </div>
      )}
      <Modal.Header className="bg-mainColor text-white p-3 rounded-t-lg">
        <Label
          value="Thank You for the Evaluation!"
          className="text-white text-lg"
        />
      </Modal.Header>
      <Modal.Body>
        <div className="mb-5 mt-[1rem]">
          <Label className="text-lg text-gray-600 ">
            Are you sure you want to confirm?
          </Label>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col mb-5 p-4">
            <div className="flex">
              <Label className="text-md text-gray-800 w-[20%]">Name :</Label>
              <Label className="text-md text-gray-800 w-[80%]">
                {" "}
                {nameRating}
              </Label>
            </div>
            <div className="flex">
              <Label className="text-md text-gray-800 w-[20%]">Email :</Label>
              <Label className="text-md text-gray-800 w-[80%]">
                {" "}
                {emailRating}
              </Label>
            </div>
          </div>
          <div className="flex flex-col p-4 ">
            <div className="flex flex-row p-2 justify-between">
              <Label className="text-md text-gray-800 ">
                Functionality :
              </Label>
              <Label className="text-md text-gray-800">
                {functionalityRating}
              </Label>
            </div>
            <div className="flex flex-row p-2 justify-between">
              <Label className="text-md text-gray-800 ">
                Maintainability :
              </Label>
              <Label className="text-md text-gray-800 ">
                {maintainabilityRating}
              </Label>
            </div>
            <div className="flex flex-row p-2 justify-between">
              <Label className="text-md text-gray-800 ">
                Portability :
              </Label>
              <Label className="text-md text-gray-800">
                {portabilityRating}
              </Label>
            </div>
            <div className="flex flex-row p-2 justify-between">
              <Label className="text-md text-gray-800 ">
                Efficiency :
              </Label>
              <Label className="text-md text-gray-800 ">
                {efficiencyRating}
              </Label>
            </div>
            <div className="flex flex-row p-2 justify-between">
              <Label className="text-md text-gray-800 w-[40%]">Opinion :</Label>
              <Label className="text-md text-gray-800 w-[60%]">
                {opinionRating}
              </Label>
            </div>
          </div>
        </div>
        <div className="flex justify-center align-items-center p-2 mt-6">
          <button
            type="submit"
            onClick={handleConfirmAndClose}
            className="bg-mainColor h-[3rem] w-[50%] m-2 shadow-lg flex justify-center items-center text-white text-lg font-bold rounded-md p-1 px-3"
          >
            Confirm
          </button>
          <button
            className="bg-white  h-[3rem] w-[50%] m-2 shadow-lg flex justify-center items-center border border-gray-300  rounded-md p-1 px-3"
            onClick={modalPropsFeedback.onCloseModalFeedback}
          >
            <Link
              to={`/${user?.user_role}/profile`}
              className="text-black font-bold"
            >
              Cancel
            </Link>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationFeedbackModal;
