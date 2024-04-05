import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button, Label, Modal, TextInput, Spinner } from "flowbite-react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";

import useUserStore from "../../services/state/userStore";
import {
  getUserDetails,
  changePasswordUser,
} from "../../services/api/sharedService";

const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useUserStore();

  
  const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] =useState(true);
  // State for password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, [user?.id]);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const { user_details } = await getUserDetails(user?.id);
      setUserDetails(user_details);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!userDetails) {
        console.error("User details not found");
        return;
      }

      const { user_id } = userDetails;
      console.log("Password Change Data:", {
        userId: user_id,
        currentPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
      }); // Log input data

      const response = await changePasswordUser({
        userId: user_id,
        currentPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
      }); 
      console.log(response); // Handle success response
      // alert("Password changed successfully");
      // After successful password change, open the success modal
      handleOpenSuccessModal();
    } catch (error) {
      console.error("incorrect password:", error);
      const errMessage = error.response.data.error;

      setIsError({
        error: true,
        message: errMessage,
      });
      // alert("Failed to change password. Please try again.");
    }
  };

  const handleNewPasswordChange = (value) => {
    // Check if password meets requirements
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /[0-9]/.test(value);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      value
    );
    const meetsRequirements =
      hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
    setPasswordRequirementsMet(meetsRequirements);
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setPasswordsMatch(value === newPassword);
    setConfirmNewPassword(value);
  };

  // Function to toggle password visibility with timeout
  const togglePasswordVisibility = (setState) => {
    setState((prevState) => !prevState);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  //success modal 
  const [isSuccess, setIsSuccess] = useState(false); // State variable to manage the visibility of the success modal
  const navigate = useNavigate();

  // Function to handle opening the success modal
  const handleOpenSuccessModal = () => {
    setIsSuccess(true);
  };

  //errror modal

  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  const handleCloseButton = () => {
    
  
    setIsError({
      error: false,
      message: "",
    });
  };


  return (
    <Modal show onClose={onClose} size="lg" popup className="pt-[10rem]">
      {isSuccess && (
        <SuccessModal
          message="Password changed successfully!"
          handleCloseButton={() => {
            setIsSuccess(false);
            onClose(); // Close the password change modal after success
            navigate("/login"); // Navigate to the login page
          }}
        />
      )}
      {isError.error && (
        <ErrorModal
          message={isError.message}
          handleCloseButton={handleCloseButton}
        />
      )}
      <Modal.Header className="bg-mainColor text-white p-3 rounded-t-lg">
        <Label value="Change Password" className="text-1xl text-white" />
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4 mt-5">
          <Label className="text-md text-gray-600">Current Password</Label>
          <div className="relative">
            <TextInput
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setIsCurrentPasswordCorrect(true); // Reset the state when typing
              }}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => togglePasswordVisibility(setShowOldPassword)}
            >
              {showOldPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          {!isCurrentPasswordCorrect && (
            <p className="text-red-500 text-sm">Incorrect current password</p>
          )}
        </div>
        <div className="mb-4">
          <Label className="text-md text-gray-600">New Password</Label>
          <div className="relative">
            <TextInput
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => handleNewPasswordChange(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => togglePasswordVisibility(setShowNewPassword)}
            >
              {showNewPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          {newPassword && !passwordRequirementsMet && (
            <p className="text-red-500 text-sm">
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, and one special character
            </p>
          )}
        </div>
        <div className="mb-6">
          <Label className="text-md text-gray-600">Confirm New Password</Label>
          <div className="relative">
            <TextInput
              type={showConfirmNewPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() =>
                togglePasswordVisibility(setShowConfirmNewPassword)
              }
            >
              {showConfirmNewPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          {!passwordsMatch && confirmNewPassword && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
          {passwordsMatch && confirmNewPassword && (
            <p className="text-green-500 text-sm">Password match</p>
          )}
        </div>

        <div className="flex justify-center items-center">
          <Button
            onClick={handleChangePassword}
            className="bg-mainColor text-white mr-2"
            disabled={!passwordRequirementsMet || !passwordsMatch || isLoading}
          >
            {isLoading ? <Spinner /> : "Change Password"}
          </Button>
          <Button onClick={onClose} className="bg-gray-300 text-gray-700">
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
