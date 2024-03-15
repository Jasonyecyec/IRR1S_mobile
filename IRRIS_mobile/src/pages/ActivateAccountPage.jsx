import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import "../assets/css/activate-account.css";
import BgEye from "../assets/images/bg_eye.png";
import useUserStore from "../services/state/userStore";
import { activateStudent } from "../services/api/StudentService";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import QCULogo from "../assets/images/qcu_logo.png";
import QCUImage from "../assets/images/qcu_image.jpg";
import { validatePassword } from "../utils/utils";
import { registerStudent } from "../services/api/authService";
import { containsGmail } from "../utils/utils";
import Loading from "../components/Loading";
import "../index.css";

const ActivateAccountPage = () => {
  const { email, setEmail } = useUserStore();
  const navigate = useNavigate();
  // const [emailError, setEmailError] = useState({ isError: false, message: "" });
  // const [userEmail, setUserEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    user_role: "student",
    referral_code: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const activateButtonRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const notify = (message) => {
    toast.error(message, {
      duration: 1500,
      id: "error", // Set the duration for how long the error message should be displayed
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserEmail(value);
    setEmailError({ ...emailError, isError: false });
  };

  const handleActivateButton = async () => {
    let isError = false;

    if (userEmail === "") {
      setEmailError({ isError: true, message: "Please input email." });
      console.log("Error");
      isError = true;
    } else if (!containsGmail(userEmail)) {
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
        if (userEmail) {
          const response = await notify(userEmail);
          console.log("response", response);
          setEmail(userEmail);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if password the same
    if (form.password !== form.confirm_password) {
      notify("Password not the same.");
      return;
    }

    try {
      setIsLoading(true);
      // if (form.referral_code === "") {
      //   form.referral_code = null;
      // }
      const response = await registerStudent(form);
      console.log("response", response);
      setEmail(form.email);

      navigate(response.route);
    } catch (error) {
      if (error.response.data.message) {
        notify(error.response.data.message);
      }

      if (error.response.data.message && error.response.data.message.password) {
        notify(error.response.data.message.password[0]);
      }

      console.log("error", error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-screen w-screen bg-secondaryColor 2  flex flex-col p-8 pt-16 relative">
      {isLoading && <Loading />}
      <div>
        <h1 className="text-black font-bold text-3xl text-center text-mainColor2">
          Create Account
        </h1>
        <Toaster />
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col w-full space-y-7 mt-10">
            <div className="flex space-x-5">
              <div className="space-y-2">
                <label htmlFor="first_name" className="font-semibold">
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleInputChange}
                  className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                  focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="last_name" className="font-semibold">
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleInputChange}
                  className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                  focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                required
              />
            </div>

            <div className="relative space-y-2">
              <label htmlFor="password">Password</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                onChange={handleInputChange}
                required
              />

              <button
                className="absolute right-2 top-8 "
                onClick={(e) => {
                  e.preventDefault();
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                {isPasswordVisible ? (
                  <EyeSlash size="25" color="#969696" weight="light" />
                ) : (
                  <Eye size="25" color="#969696" weight="light" />
                )}
              </button>
            </div>

            <div className="relative space-y-2">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                value={form.confirm_password}
                className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                onChange={handleInputChange}
                required
              />

              <button
                className="absolute right-2 top-8 "
                onClick={(e) => {
                  e.preventDefault();
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                }}
              >
                {isConfirmPasswordVisible ? (
                  <EyeSlash size="25" color="#969696" weight="light" />
                ) : (
                  <Eye size="25" color="#969696" weight="light" />
                )}
              </button>
            </div>

            <div className="relative space-y-2">
              <label htmlFor="confirm_password">Referral Code</label>
              <input
                type="text"
                id="referral_code"
                name="referral_code"
                value={form.referral_code}
                className="border-gray uppercase-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary"
                onChange={handleInputChange}
                placeholder="(Optional)"
                min={8}
              />
            </div>

            <button className=" w-full bg-mainColor2 text-white font-bold rounded-lg py-3">
              Submit
            </button>
          </div>
        </form>

        <p className="mt-8 text-center">
          Account have an account?{" "}
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
  );
};

export default ActivateAccountPage;
