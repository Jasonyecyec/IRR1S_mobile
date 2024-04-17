import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  Modal,
  TextInput,
  Spinner,
  ModalBody,
} from "flowbite-react";

const PencilBookInfoModal = ({ onCloseModal }) => {
  // Function to handle the close action
  const handleClose = () => {
    onCloseModal(); // Call the onCloseModal function passed from the parent component
  };

  return (
    <>
      <Modal show popup size="lg" onClose={handleClose} className="pt-[10rem]">
        <Modal.Header className="bg-mainColor ">
          <Label className="text-white font-bold text-md">
            {" "}
            Internal and External?
          </Label>
        </Modal.Header>
        <Modal.Body className="p-5 flex flex-col">
          <div className="flex flex-col  bg-gray-200 p-2 rounded-lg">
            <Label className="text-lg">Internal Events :</Label>
            <Label>Events organized by groups within the Campus.</Label>
          </div>
          <div className="flex flex-col bg-gray-200 p-2 rounded-lg mt-2">
            <Label className="text-lg">External Events :</Label>
            <Label>Events organized by outside groups or individuals.</Label>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PencilBookInfoModal;
