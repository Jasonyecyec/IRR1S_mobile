import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Label, Modal, TextInput, Spinner } from "flowbite-react";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
import useUserStore from "@/src/services/state/userStore";
import { getUserDetails } from "@/src/services/api/sharedService";

const EditProfile = () => {
  return (
    <>
      <Modal show size="lg" popup>
        <Modal.Header>popopop</Modal.Header>
        <Modal.Body>edit edit</Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;
