import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import OTPLogo from "../assets/images/activate_account/otp_image.png";
import { Link } from "react-router-dom";
import useUserStore from "../services/state/userStore";
import { maskEmail, formatTime } from "../utils/utils";

const OTPInputPage = () => {
  const { email } = useUserStore();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendOTP = () => {
    // Implement resend OTP logic here
    setSeconds(59); // Reset timer to 59 seconds
  };

  return (
    <div className="h-screen w-screen dlex flex flex-col items-center bg-thirdColor space-y-10">
      <div className="flex flex-col items-center mt-20 space-y-5">
        <img src={OTPLogo} className="w-32 h-32" alt="otp logo" />
        <h1 className="text-3xl font-bold text-mainColor">OTP Verification</h1>
        <p className="w-4/5 text-center text-xl font-semibold ">
          Enter the OTP sent to
          <span className="text-mainColor font-bold">
            {email && maskEmail(email)}
          </span>
        </p>
      </div>

      <div className="w-4/5	">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          //   renderSeparator={}
          renderInput={(props) => <input {...props} />}
          inputStyle="text-xl w-full border-mainColor border-2  !w-14 h-14 rounded-md"
          //   style={{width:"5em"}}
          containerStyle="w-full justify-between"
        />
      </div>

      <button className="w-4/5 py-3 bg-mainColor rounded-lg text-white font-semibold text-xl  inline-block">
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
