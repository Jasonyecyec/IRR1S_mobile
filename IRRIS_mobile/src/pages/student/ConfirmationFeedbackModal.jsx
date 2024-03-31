import React from "react";
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
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast


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
    emailRating
    // Other ratings values if needed
  } = modalPropsFeedback;

  const handleConfirmAndClose = () => {
    handleConfirmation(); // Call the handleConfirmation function
    onCloseModalFeedback(); // Close the modal
    // Show a success toast notification
    toast.success('Feedback submitted successfully!');
  };


  return (
    <Modal
      show={modalPropsFeedback.openModalFeedback}
      onClose={modalPropsFeedback.onCloseModalFeedback}
      size="lg"
      popup
    >
      <Modal.Header className="bg-mainColor text-white p-3 rounded-t-lg">
        <Label
          value="Thank You for the Evaluation!"
          className="text-white text-lg"
        />
      </Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <Label>Are you sure you want to confirm</Label>

        <Label>Name: {nameRating}</Label>
        <Label>Email: {emailRating}</Label>
        <Label>Functionality: {functionalityRating}</Label>
        <Label>Maintainability: {maintainabilityRating}</Label>
        <Label>Portability: {portabilityRating}</Label>
        <Label>efficiency: {efficiencyRating}</Label>
        <Label>overall: {overallRating}</Label>
        <Label>opinion: {opinionRating}</Label>

        <div className="flex justify-center align-items-center mt-6">
          <button
            type="submit"
            onClick={handleConfirmAndClose} // Call handleConfirmAndClose on button click

            className="bg-mainColor m-2 shadow-lg flex justify-center items-center text-white rounded-md p-1 px-3"
          >
            confirm
          </button>
          <button
            className="bg-white   m-2 shadow-lg flex justify-center items-center border border-gray-300  rounded-md p-1 px-3"
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
