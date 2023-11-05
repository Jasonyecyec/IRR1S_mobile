import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import InboxLogo from "../assets/images/inbox_icon.png";
import { Link } from "react-router-dom";
// import "../index.css";

const OTPInputPage = () => {
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="h-screen w-screen dlex flex flex-col items-center bg-thirdColor space-y-10">
      <div className="flex flex-col items-center mt-20 space-y-3">
        <img src={InboxLogo} className="w-32 h-32" alt="inbox logo"/>
        <h1 className="text-2xl font-semibold text-mainColor">
          OTP Verification
        </h1>
        <p className="w-4/5 text-center">
          Enter the OTP sent to ja******yec@gmail.com
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

      <button className="w-4/5">
          <Link
            to="/activate-success"
            className="py-3 bg-mainColor rounded-lg text-white font-semibold text-xl w-full inline-block"
          >
            SUBMIT
          </Link>
        </button>
      {seconds !== 0 && (<p>Resend OTP in {formatTime(seconds)}</p>)}

      {seconds === 0 && (
        <p>
          Didn't recieve the code ?{" "}
          <button onClick={handleResendOTP} className="text-mainColor font-semibold">
            RESEND OTP
          </button>
        </p>
      )}
    </div>
  );
};

export default OTPInputPage;
