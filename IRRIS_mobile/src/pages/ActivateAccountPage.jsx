import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../assets/css/activate-account.css";
import BgEye from "../assets/images/bg_eye.png";
import useUserStore from "../services/state/userStore";
import { activateStudent } from "../services/api/StudentService";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import QCULogo from "../assets/images/qcu_logo.png";
import QCUImage from "../assets/images/qcu_image.jpg";
import { containsGmail } from "../utils/utils";
import "../index.css";

const ActivateAccountPage = () => {
  // const { email } = useUserStore();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState({ isError: false, message: "" });
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const activateButtonRef = useRef(null);

  const notify = (email) => {
    return toast.promise(activateStudent(email), {
      loading: "Sending email...",
      success: <b>Email sent!</b>,
      error: (error) => <b>{error.response.data.message}</b>,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEmail(value);
    setEmailError({ ...emailError, isError: false });
  };

  const handleActivateButton = async () => {
    let isError = false;

    if (email === "") {
      setEmailError({ isError: true, message: "Please input email." });
      console.log("Error");
      isError = true;
    } else if (!containsGmail(email)) {
      setEmailError({
        isError: true,
        message: "Please input a valid email address",
      });
      isError = true;
    }

    if (!isError) {
      //disable the button
      activateButtonRef.current.disabled = true;
      setIsLoading(true);
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
        setIsLoading(false);
      }
    }
  };

  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center   relative">
      <Toaster />

      <div className="bg-white rounded-md w-[80%] flex flex-col items-center justify-center space-y-5  px-5 py-10 z-10 shadow-lg relative mb-20">
        <div className="absolute top-[-3rem] rounded-full bg-white shadow-md">
          <img src={QCULogo} alt="qcu-logo" className="w-24 h-24" />
        </div>

        <div className="relative w-full items-center space-y-8">
          <div>
            {" "}
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className={`${
                emailError.isError ? "border-rose-500" : ""
              } rounded-md p-3 w-full focus:outline-none focus:border-mainColor border-mainColor  border-2`}
            />
            <p className={`text-red-400 italic `}>
              <span className={`${emailError.isError ? "hidden" : "none"}`}>
                .
              </span>
              {emailError.isError && `*${emailError.message}`}
            </p>
          </div>
        </div>

        <div className="w-full text-center">
          <button
            ref={activateButtonRef}
            className="py-4 bg-mainColor rounded-lg text-white font-semibold flex justify-center  text-xl inline-block  w-full "
            onClick={handleActivateButton}
          >
            {isLoading ? (
              <p className="flex items-center">
                {" "}
                <Spinner /> <span className="ml-2">Activating ...</span>
              </p>
            ) : (
              "Activate Now"
            )}
          </button>
          <p className="mt-5">
            Account already activated?{" "}
            <span
              onClick={() => navigate(-1)}
              className="text-mainColor font-bold"
            >
              {" "}
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Background design input */}
      <div className="bg-qcu-image w-full h-[70%] absolute top-0">
        <img src={QCUImage} className="w-full h-full opacity-50 bg-blue-100" />
      </div>
      <div className="bg-input-login w-full h-[30rem] absolute bottom-0"></div>
    </div>
  );
};

export default ActivateAccountPage;
