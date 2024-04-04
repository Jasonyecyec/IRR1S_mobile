import React, {useState, useEffect} from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Dropdown,
  FileInput,
  Spinner,
} from "flowbite-react";
import StudentAboutUs from "./StudentAboutUs";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
import { Link } from "react-router-dom"; // Import useHistory

import { getUserDetails } from "@/src/services/api/sharedService";
import useUserStore from "../../services/state/userStore";


const ConfirmationFeedbackModal = ({
  modalPropsFeedback,
  isLoading,
  handleConfirmation,
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
    // Other ratings values if needed
  } = modalPropsFeedback;

 //get the user details ()
 const { user, setUser } = useUserStore((state) => ({
  user: state.user,
  setUser: state.setUser,
}));
const [isLoadingUser, setIsLoadingUser] = useState(false);
const [userDetails, setUserDetails] = useState(null);

const fetchUserDetails = async () => {
  setIsLoadingUser(true);
  try {
    const { user_details } = await getUserDetails(user?.id);
    console.log("user details", user_details);
    setUserDetails(user_details);

    // Set the ratingName and ratingEmail states with user details
    setRatingName(user_details.first_name + " " + user_details.last_name);
    setRatingEmail(user_details.email);
  } catch (error) {
    console.log("error", error);
  } finally {
    setIsLoadingUser(false);
  }
};

useEffect(() => {
  fetchUserDetails(user?.id);
}, []);

  const handleConfirmAndClose = () => {
    handleConfirmation();
    onCloseModalFeedback();
    showSuccessToast("Feedback submitted successfully!"); // Call the custom toast function
  };

  // Custom toast function with options
  const showSuccessToast = (message) => {
    toast.success(message, {
      duration: 6000, // Duration of the toast in milliseconds
      position: "top-center", // Position of the toast on the screen
      style: {
        background: "#4CAF50", // Background color of the toast
        color: "#FFFFFF", // Text color of the toast
      },
    });
  };
  return (
    <Modal
      show={modalPropsFeedback.openModalFeedback}
      onClose={modalPropsFeedback.onCloseModalFeedback}
      size="lg"
      popup
      className="pt-[10rem]"
    >
      <Modal.Header className="bg-mainColor text-white p-3 rounded-t-lg">
        <Label
          value="Thank You for the Evaluation!"
          className="text-white text-lg"
        />
      </Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <div className="mb-5 mt-[1rem]">
          {" "}
          <Label className="text-lg text-gray-600 ">
            Are you sure you want to confirm?
          </Label>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col mb-5">
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
          <div className="flex flex-col ">
            <div className="flex flex-row">
              <Label className="text-md text-gray-800 w-[40%]">
                Functionality :
              </Label>
              <Label className="text-md text-gray-800 w-[60%]">
                {functionalityRating}
              </Label>
            </div>
            <div className="flex flex-row">
              <Label className="text-md text-gray-800 w-[40%]">
                Maintainability :
              </Label>
              <Label className="text-md text-gray-800 w-[60%]">
                {maintainabilityRating}
              </Label>
            </div>
            <div className="flex flex-row">
              <Label className="text-md text-gray-800 w-[40%]">
                Portability :
              </Label>
              <Label className="text-md text-gray-800 w-[60%]">
                {portabilityRating}
              </Label>
            </div>
            <div className="flex flex-row">
              <Label className="text-md text-gray-800 w-[40%]">
                Efficiency :
              </Label>
              <Label className="text-md text-gray-800 w-[60%]">
                {efficiencyRating}
              </Label>
            </div>
            <div className="flex flex-row">
              <Label className="text-md text-gray-800 w-[40%]">
                Opinion :
              </Label>
              <Label className="text-md text-gray-800 w-[60%]">
                {opinionRating}
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-center align-items-center mt-6">
          <button
            type="submit"
            onClick={handleConfirmAndClose} // Call handleConfirmAndClose on button click
            className="bg-mainColor h-[3rem] w-[50%] m-2 shadow-lg flex justify-center items-center text-white text-lg font-bold rounded-md p-1 px-3"
          >
            <Link to={`/${user?.user_role}/profile`} className="text-white">
              Confirm
            </Link>
          </button>
          <button
            className="bg-white  h-[3rem] w-[50%] m-2 shadow-lg flex justify-center items-center border border-gray-300  rounded-md p-1 px-3"
            onClick={modalPropsFeedback.onCloseModalFeedback}
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationFeedbackModal;
