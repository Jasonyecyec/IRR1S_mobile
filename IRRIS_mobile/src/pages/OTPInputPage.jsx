import React, { useState, useEffect, useRef } from "react";
import OtpInput from "react-otp-input";
import OTPLogo from "../assets/images/activate_account/otp_image.png";
import useUserStore from "../services/state/userStore";
import { maskEmail, formatTime } from "../utils/utils";
import { verifyOTP, resendOTP } from "../services/api/StudentService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const OTPInputPage = () => {
  const { email } = useUserStore();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const submitButtonRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const notifyVerifyOTP = (email, otp) => {
    return toast.promise(verifyOTP(email, otp), {
      loading: "Verifying OTP ...",
      success: <b>OTP verified</b>,
      error: (error) => <b>{error.response.data.message}</b>,
    });
  };

  const notifyResendOTP = (email) => {
    return toast.promise(resendOTP(email), {
      loading: "Sending OTP ...",
      success: <b>OTP successfully sent!</b>,
      error: (error) => <b>{error.response.data.message}</b>,
    });
  };

  const handleSubmit = async () => {
    //check of otp input is complete
    if (otp.length !== 4) {
      setIsError(true);
      return;
    }
    setIsLoading(true);
    //disable the button
    submitButtonRef.current.disabled = true;
    try {
      console.log("email", email);
      const response = await notifyVerifyOTP(email, otp);
      setTimeout(() => {
        navigate(response.route);
      }, 1500);
      console.log("Response", response);
    } catch (error) {
      console.log(error);
    } finally {
      // Re-enable the button after the asynchronous operation
      submitButtonRef.current.disabled = false;
      setIsLoading(false);
    }
  };

  const handleOTPInput = (e) => {
    if (isError) {
      setIsError(!isError);
    }
    setOtp(e);
  };

  const handleResendOTP = async () => {
    try {
      const response = await notifyResendOTP(email);
      setSeconds(59); // Reset timer to 59 seconds
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen dlex flex flex-col items-center bg-thirdColor space-y-10">
      <Toaster />
      <div className="flex flex-col items-center mt-20 space-y-5">
        <img src={OTPLogo} className="w-32 h-32" alt="otp logo" />
        <h1 className="text-3xl font-bold text-mainColor">OTP Verification</h1>
        <p className="w-[85%] text-center text-xl font-semibold ">
          Enter the OTP sent to
          <span className="text-mainColor font-bold block">
            {email && maskEmail(email)}
          </span>
        </p>
      </div>

      <div className="w-4/5	">
        <OtpInput
          value={otp}
          onChange={handleOTPInput}
          numInputs={4}
          //   renderSeparator={}
          renderInput={(props) => <input {...props} />}
          inputStyle={`text-xl w-full  ${
            isError ? "border-red-500" : "border-mainColor"
          } border-2  !w-14 h-14 rounded-md`}
          //   style={{width:"5em"}}
          containerStyle="w-full justify-between"
        />

        {isError && (
          <p className="text-center mt-5 text-red-500 text-lg font-semibold">
            Please put all the otp
          </p>
        )}
      </div>

      <button
        ref={submitButtonRef}
        onClick={handleSubmit}
        className="w-4/5 py-3 bg-mainColor rounded-lg text-white font-semibold text-xl  inline-block"
      >
        SUBMIT
      </button>
      {seconds !== 0 && (
        <p className="text-mainColor font-semibold text-xl">
          Resend OTP in {formatTime(seconds)}
        </p>
      )}

      {seconds === 0 && (
        <p>
          Didn't recieve the code ?{" "}
          <button
            onClick={handleResendOTP}
            className="text-mainColor font-semibold"
          >
            RESEND OTP
          </button>
        </p>
      )}
    </div>
  );
};

export default OTPInputPage;
