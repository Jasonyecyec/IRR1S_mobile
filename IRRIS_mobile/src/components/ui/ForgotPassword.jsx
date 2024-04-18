import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { Toaster, toast } from "sonner";
import { getUserDetailsByEmail } from "@/src/services/api/sharedService";
import OtpInput from "react-otp-input";
import { verifyOTP, resendOTP } from "@/src/services/api/StudentService";
import { forgotPassword2 } from "@/src/services/api/sharedService";
import { validatePassword } from "@/src/utils/utils";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import PageTitle from "../PageTitle";
import emailVerification from "../../assets/images/VectorForgotPassword/otp-send.jpg";
import emailOTP from "../../assets/images/VectorForgotPassword/otp.jpg";
import passwordInput from "../../assets/images/VectorForgotPassword/put-password.jpg";
import verifyPassword from "../../assets/images/VectorForgotPassword/password-verify.jpg";
import changeVerify from "../../assets/images/VectorForgotPassword/password-change.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isSendCodeDisabled, setIsSendCodeDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoadingCheckEmail, setIsLoadingCheckEmail] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const submitButtonRef = useRef(null);
  const navigate = useNavigate();
  const sendCodeTimer = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCheckEmail = async () => {
    try {
      setIsLoadingCheckEmail(true);

      const userDetailsResponse = await getUserDetailsByEmail(email);

      if (userDetailsResponse.error) {
        toast.error("User not found");
        setIsEmailVerified(false);
      } else {
        setIsEmailVerified(true);
        setIsOtpVerified(false);
        toast.success("User found");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      toast.error("Email not found.");
      setIsEmailVerified(false);
    } finally {
      setIsLoadingCheckEmail(false);
    }
  };

  const handleSendCode = () => {
    setIsSendCodeDisabled(true);
    setCountdown(60);
    sendCodeTimer.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(sendCodeTimer.current);
      setIsSendCodeDisabled(false);
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
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setTimeout(() => {
      navigate("/login");
    }, 3000);

    setIsChangingPassword(true);

    try {
      const response = await forgotPassword2({
        email,
        newPassword,
        confirmPassword,
      });

      toast.success("Password successfully changed!");

      navigate(response.route);
    } catch (error) {
      console.error("Error changing password:", error);
      setIsError(true);
      toast.error(error.response.data.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSubmitOTPVerification = async () => {
    submitButtonRef.current.disabled = true;
    try {
      const response = await notifyVerifyOTP(email, otp);
      setIsPasswordVisible(response.success);
      if (response.success) {
        toast.success(response);
      }
    } catch (error) {
      setIsOtpVerified(false);
      setIsPasswordVisible(false);
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      submitButtonRef.current.disabled = false;
      setIsLoading(false);
    }
  };

  const handleOTPInput = (value) => {
    setOtp(value);
  };

  const handlePasswordChange = (value) => {
    setNewPassword(value);
    const { isValid, errors } = validatePassword(value);
    setPasswordValidationMessage(
      isValid ? "Password Strength: Strong" : errors
    );
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordMatchMessage(
      value === newPassword ? "Passwords match." : "Passwords don't match."
    );

    
  };

  return (
    <div>
      <div className="h-full">
        <PageTitle title="User Verification" />

        <div className="flex justify-center mt-[1rem]">
          <div className="form-container max-w-sm w-full bg-white rounded-md p-8 shadow-lg">
            {!isEmailVerified && (
              <div className="mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    {" "}
                    <img
                      src={emailVerification}
                      className="bg-red p-3  "
                      alt="email"
                    />
                  </div>

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
                </div>
                <div>
                  <button
                    onClick={handleCheckEmail}
                    className={`bg-mainColor2 mt-4 text-white w-full py-2 rounded-md hover:bg-opacity-80 transition duration-300 ${
                      isLoadingCheckEmail ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoadingCheckEmail}
                  >
                    {isLoadingCheckEmail ? "Checking Email..." : "Check Email"}
                  </button>
                </div>
              </div>
            )}

            {isEmailVerified && !isOtpVerified && (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-center">
                    {" "}
                    <img src={emailOTP} className="bg-red p-3  " alt="email" />
                  </div>
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
                    disabled={isSendCodeDisabled}
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
              <form className="">
                <div className="flex items-center justify-center">
                  {passwordMatchMessage === "Passwords match." ? (
                    <img
                      src={verifyPassword}
                      className="bg-red p-3"
                      alt="verify-password"
                    />
                  ) : (
                    <img
                      src={passwordInput}
                      className="bg-red p-3"
                      alt="new-password"
                    />
                  )}
                </div>

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
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-mainColor2 pr-10"
                    required
                  />

                  {/* <button
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 h-full pt-7 px-3 flex items-center"
                  >
                    {isPasswordVisible ? (
                      <EyeSlash size={30} />
                    ) : (
                      <Eye size={30} />
                    )}
                  </button> */}
                </div>
                <div>
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

                <div className="mb-6 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-mainColor2 pr-10"
                    required
                  />
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

                <button
                  type="submit"
                  onClick={handleSubmitForgotPassword}
                  className="bg-mainColor text-white w-full  py-2 rounded-md hover:bg-opacity-80 transition duration-300"
                  disabled={isChangingPassword}
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
