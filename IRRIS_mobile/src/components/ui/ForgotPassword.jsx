import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { Toaster, toast } from "sonner";
import { getUserDetailsByEmail } from "@/src/services/api/sharedService";
import OtpInput from "react-otp-input";
import { verifyOTP, resendOTP } from "@/src/services/api/StudentService";
import { forgotPassword2 } from "@/src/services/api/sharedService";
import { validatePassword } from "@/src/utils/utils"; // Import the password validation function
import { Eye, EyeSlash } from "@phosphor-icons/react";
import PageTitle from "../PageTitle";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State to store the email value
  const [otp, setOtp] = useState(""); // State to store the OTP value
  const [newPassword, setNewPassword] = useState(""); // State to store the new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State to store the confirm password
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // State to track OTP verification
  const [isChangingPassword, setIsChangingPassword] = useState(false); // State to track password change process
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState(""); // State for password validation message
  const [passwordMatchMessage, setPasswordMatchMessage] = useState(""); // State for password match message
  const [isSendCodeDisabled, setIsSendCodeDisabled] = useState(false); // State to disable the "Send Code" button
  const [countdown, setCountdown] = useState(60); // State for countdown timer
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoadingCheckEmail, setIsLoadingCheckEmail] = useState(false); // State to track loading state for Check Email button

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // const toggleConfirmPasswordVisibility = () => {
  //   setIsConfirmPasswordVisible((prev) => !prev);
  // };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const submitButtonRef = useRef(null);
  const navigate = useNavigate();
  const sendCodeTimer = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state as the user types
  };

  const handleCheckEmail = async () => {
    try {
      setIsLoadingCheckEmail(true); // Set loading state for Check Email button

      // Perform email verification logic here
      const userDetailsResponse = await getUserDetailsByEmail(email);

      if (userDetailsResponse.error) {
        toast.error("User not found");
        setIsEmailVerified(false);
      } else {
        setIsEmailVerified(true);
        setIsOtpVerified(false); // Reset OTP verification status when email changes
        toast.success("User found");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      toast.error("Email not found.");
      setIsEmailVerified(false);
    } finally {
      setIsLoadingCheckEmail(false); // Reset loading state for Check Email button
    }
  };

  const handleSendCode = () => {
    // Perform code sending logic here
    setIsSendCodeDisabled(true); // Disable the "Send Code" button
    setCountdown(60); // Reset countdown timer
    sendCodeTimer.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1); // Update countdown every second
    }, 1000);
    setTimeout(() => {
      clearInterval(sendCodeTimer.current); // Clear the interval after 60 seconds
      setIsSendCodeDisabled(false); // Re-enable the "Send Code" button
    }, 60000);
    return toast.promise(resendOTP(email), {
      loading: "Sending OTP ...",
      success: <b>OTP successfully sent!</b>,
      error: (error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          return <b>{error.response.data.message}</b>;
        } else {
          return <b>Failed to send OTP code</b>;
        }
      },
    });
  };

  useEffect(() => {
    // Clear the timer when the component unmounts
    return () => {
      clearInterval(sendCodeTimer.current);
    };
  }, []);

  const notifyVerifyOTP = (email, otp) => {
    return toast.promise(verifyOTP(email, otp), {
      loading: "Verifying OTP ...",
      id: "verify-otp",
      success: () => {
        setIsOtpVerified(true);
        return <b>OTP verified</b>;
      },
      error: (error) => {
        setIsOtpVerified(false);
        return <b>{error.response.data.message}</b>;
      },
      stack: false,
    });
  };

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if passwo1rds match
    if (newPassword !== confirmPassword) {
      // Show toast for password mismatch
      toast.error("Passwords do not match.");
      return;
    }
    // Navigate to the login page
    // Navigate to the login page after 3 seconds
    setTimeout(() => {
      navigate("/login");
    }, 3000);
    // navigate("/login");
    // Set loading state to true
    setIsChangingPassword(true);

    // Perform password change logic here
    try {
      const response = await forgotPassword2({
        email,
        newPassword,
        confirmPassword,
      });

      // Display success toast
      toast.success("Password successfully changed!");

      // Navigate to the appropriate route
      navigate(response.route);
    } catch (error) {
      console.error("Error changing password:", error);
      setIsError(true); // Set isError state to true
      toast.error(error.response.data.message); // Display error toast
    } finally {
      // Reset loading state after the asynchronous operation
      setIsChangingPassword(false);
    }
  };

  const handleSubmitOTPVerification = async () => {
    // Perform OTP verification logic here
    // Disable the button
    submitButtonRef.current.disabled = true;
    try {
      const response = await notifyVerifyOTP(email, otp);
      setIsPasswordVisible(response.success); // Only show password fields if OTP verification succeeds
      if (response.success) {
        toast.success(response); // Display success toast only if OTP verification succeeds
      }
    } catch (error) {
      setIsOtpVerified(false); // Reset OTP verification status
      setIsPasswordVisible(false); // Hide password fields if OTP verification fails
      console.log(error);
      toast.error(error.response.data.message); // Display error toast for OTP verification failure
    } finally {
      // Re-enable the button after the asynchronous operation
      submitButtonRef.current.disabled = false;
      setIsLoading(false);
    }
  };

  const handleOTPInput = (value) => {
    setOtp(value);
  };

  // Function to handle password change and validate password
  const handlePasswordChange = (value) => {
    setNewPassword(value); // Update new password state
    const { isValid, errors } = validatePassword(value); // Validate password
    setPasswordValidationMessage(
      isValid ? "Password Strength: Strong" : errors
    ); // Set validation message
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value); // Update new password state
  };

  // Function to handle confirm password change and validate if it matches with new password
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value); // Update confirm password state
    // Check if passwords match
    setPasswordMatchMessage(
      value === newPassword ? "Passwords match." : "Passwords don't match."
    );
  };

  return (
    <div>
      <div className=" h-full">
        {/* Header and other JSX remain unchanged */}
        {/* <header className="fixed z-[-1] top-0 left-0 right-0 bg-mainColor2  rounded-b-[2.5rem] h-20 flex items-center justify-between px-5">
          <div className="backbutton  w-[2rem] ml-2 mt-1">
            <Link to="/" className="text-white">
              <ArrowLeft size={32} />
            </Link>
          </div>
        </header>
        <div className="flex justify-center mt-[5rem] z-1">
          <div className="banner w-[17rem] h-[3.2rem] pt-1 rounded-full bg-blue-700 flex justify-center align-center  mt-[-2rem]">
            <p className="text-3xl font-medium  text-white dark:text-white">
              User Verification
            </p>
          </div>
        </div> */}
        <PageTitle title="User Verification" />

        <div className="flex justify-center mt-[8rem]">
          <div className="form-container max-w-sm w-full bg-white rounded-md p-8 shadow-lg">
            {!isEmailVerified && (
              <div className="mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Please enter email"
                    onChange={handleEmailChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-mainColor2"
                    required
                  />
                </div>
                <div>
                  <button
                    onClick={handleCheckEmail}
                    className={`bg-mainColor2 mt-4 text-white w-full py-2 rounded-md hover:bg-opacity-80 transition duration-300 ${
                      isLoadingCheckEmail ? "opacity-50 cursor-not-allowed" : ""
                    }`} // Add conditional classes to disable button when loading
                    disabled={isLoadingCheckEmail} // Disable the button when loading
                  >
                    {isLoadingCheckEmail ? "Checking Email..." : "Check Email"}{" "}
                    {/* Change button text based on loading state */}
                  </button>
                </div>
              </div>
            )}

            {isEmailVerified && !isOtpVerified && (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="otp"
                    className="block text-gray-700 font-bold mb-4"
                  >
                    Verify OTP
                  </label>
                  <div className="w-full">
                    <OtpInput
                      value={otp}
                      onChange={handleOTPInput}
                      numInputs={4}
                      // Add the renderInput prop here
                      renderInput={(inputProps, index) => (
                        <input
                          {...inputProps}
                          key={index}
                          className={`text-xl w-full shadow ${
                            isError ? "border-red-500" : "border-mainColor"
                          } border-2 !w-14 h-14 rounded-md`}
                        />
                      )}
                      containerStyle="w-full justify-between"
                    />

                    {isError && (
                      <p className="text-center mt-5 text-red-500 text-lg font-semibold">
                        Please enter a valid OTP
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleSendCode}
                    className={`${
                      isSendCodeDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-mainColor2"
                    } text-mainColor2 bg-white border shadow w-[80%] mr-2 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
                    disabled={isSendCodeDisabled} // Disable the button if sending code
                  >
                    {isSendCodeDisabled ? `00 : ${countdown}` : "Send Code"}
                  </button>
                  <button
                    ref={submitButtonRef}
                    onClick={handleSubmitOTPVerification}
                    className="bg-mainColor text-white w-[80%] py-2 rounded-md hover:bg-opacity-80 transition duration-300"
                  >
                    Submit Code
                  </button>
                </div>
              </>
            )}

            {isEmailVerified && isOtpVerified && (
              <form className="mt-6">
                {/* New Password Input */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="newPassword"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="New Password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-mainColor2 pr-10" // Add pr-10 for padding on the right to accommodate the button
                    required
                  />

                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 h-full pt-7 px-3 flex items-center"
                  >
                    {isPasswordVisible ? (
                      <EyeSlash size={30} />
                    ) : (
                      <Eye size={30} />
                    )}
                  </button>
                  {/* Display password validation message */}
                </div>
                <div>
                  {" "}
                  <p
                    className={
                      passwordValidationMessage === "Password Strength: Strong"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {passwordValidationMessage}
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-mainColor2 pr-10" // Add pr-10 for padding on the right to accommodate the button
                    required
                  />

                  {/* Display password match message */}
                </div>
                <div>
                  <p
                    className={
                      passwordMatchMessage === "Passwords match."
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {passwordMatchMessage}
                  </p>
                </div>

                {/* Button to submit password change */}
                <button
                  type="submit"
                  onClick={handleSubmitForgotPassword}
                  className="bg-mainColor text-white w-full  py-2 rounded-md hover:bg-opacity-80 transition duration-300"
                  disabled={isChangingPassword} // Disable the button when changing password
                >
                  {isChangingPassword
                    ? "Changing Password..."
                    : "Change Password"}
                </button>
              </form>
            )}
          </div>
        </div>
        <Toaster position="top-center" expand={false} richColors />
      </div>
    </div>
  );
};

export default ForgotPassword;
