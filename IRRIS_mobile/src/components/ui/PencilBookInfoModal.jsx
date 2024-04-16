import React, { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput, Spinner, ModalBody } from "flowbite-react";


const PencilBookInfoModal =({ onCloseModal })=> {
  // Function to handle the close action
  const handleClose = () => {
    onCloseModal(); // Call the onCloseModal function passed from the parent component
  };

    
  return (
    <>
    <Modal
    show
    popup
    size="lg"
    onClose={handleClose}
    className="pt-[10rem]">
        <Modal.Header className="bg-mainColor ">
          <Label className="text-white font-bold text-md"> Internal and External?</Label> 
        </Modal.Header>
        <Modal.Body className="p-5">
            lorem ipmsum
        </Modal.Body>
    </Modal>

    </>
  )
}

export default PencilBookInfoModal