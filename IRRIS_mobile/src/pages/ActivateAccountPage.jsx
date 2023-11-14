import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../assets/css/activate-account.css";
import BgEye from "../assets/images/bg_eye.png";
import useUserStore from "../services/state/userStore";
import { activateStudent } from "../services/api/StudentService";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";

const ActivateAccountPage = () => {
  const { email } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const activateButtonRef = useRef(null);

  const notify = (email) => {
    return toast.promise(activateStudent(email), {
      loading: "Sending email...",
      success: <b>Email sent!</b>,
      error: <b>Email could not sent.</b>,
    });
  };

  const handleActivateButton = async () => {
    //disable the button
    activateButtonRef.current.disabled = true;

    setIsLoading(!isLoading);
    try {
      if (email) {
        const response = await notify(email);
        console.log("response", response);
        setTimeout(() => {
          navigate(response.route);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Re-enable the button after the asynchronous operation
      activateButtonRef.current.disabled = false;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center pt-36 element background relative space-y-20">
      <img
        src={BgEye}
        alt=""
        className="background-image absolute top-32 w-[50rem]"
      />
      <Toaster />
      <h1 className="w-[80%] text-center text-4xl	font-bold text-mainColor z-10 ">
        Activate your account
      </h1>

      <p className="w-[70%] mt-5 text-center	text-lg font-normal z-10">
        Your account hasn't been activated. To use this app you need to activate
        your account first
      </p>

      <button
        ref={activateButtonRef}
        className="py-4 bg-mainColor rounded-lg text-white font-semibold flex justify-center text-xl inline-block w-[80%] "
        onClick={handleActivateButton}
      >
        {isLoading ? <Spinner /> : "Activate Now"}
      </button>
    </div>
  );
};

export default ActivateAccountPage;
