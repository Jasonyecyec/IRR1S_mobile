import React, { useState, useEffect } from "react";
import { Eye } from "@phosphor-icons/react";
import { EyeSlash } from "@phosphor-icons/react";
import "../index.css";
import useUserStore from "../services/state/userStore";
import { validatePassword } from "../utils/utils";
import toast, { Toaster } from "react-hot-toast";
import { createPassword } from "../services/api/StudentService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CreatePasswordPage = () => {
  const { email } = useUserStore();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(false);
  const [formFields, setFormFields] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    isError: false,
    message: "",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordRepeatVisibility = () => {
    setIsPasswordRepeatVisible(!isPasswordRepeatVisible);
  };

  const notifyPasswordError = (message) =>
    toast.error(message, {
      duration: 1500,
      style: {
        fontSize: "1rem",
      },
    });

  const notifyCreatePassword = (email, password, confirmPassword) => {
    return toast.promise(createPassword(email, password, confirmPassword), {
      loading: "Creating password ...",
      success: <b>Password successfully created!</b>,
      error: (error) => <b>{error.response.data.message}</b>,
    });
  };

  useEffect(() => {
    console.log("formFields", formFields);
  }, [formFields]);

  useEffect(() => {
    let timeoutId = null;
    let timeouId2 = null;

    if (isPasswordVisible) {
      timeoutId = setTimeout(() => {
        setIsPasswordVisible(!isPasswordVisible);
      }, 2000);
    }

    if (isPasswordRepeatVisible) {
      timeouId2 = setTimeout(() => {
        setIsPasswordRepeatVisible(!isPasswordRepeatVisible);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (timeouId2) {
        clearTimeout(timeouId2);
      }
    };
  }, [isPasswordVisible, isPasswordRepeatVisible]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    name === "password"
      ? setPasswordError({ ...passwordError, isError: false })
      : setConfirmPasswordError({ ...confirmPasswordError, isError: false });
  };

  const handleConfirmButton = async () => {
    const { password, confirmPassword } = formFields;
    const passwordValidation = validatePassword(password);
    let isError = false;

    //check if input is empty
    if (password === "") {
      setPasswordError({ isError: true, message: "Please input password." });
      isError = true;
    }

    if (confirmPassword === "") {
      setConfirmPasswordError({
        isError: true,
        message: "Please input confirm password.",
      });
      isError = true;
    }

    //if not empty validate the password input
    if (!passwordValidation.isValid) {
      setPasswordError({ isError: true, message: passwordValidation.errors });
      isError = true;
    }

    //check if password and confirmPassword is the same
    if (passwordValidation.isValid) {
      if (
        password !== "" &&
        confirmPassword !== "" &&
        password !== confirmPassword
      ) {
        isError = true;
        notifyPasswordError("Password not the same.");
      }
    }

    if (!isError) {
      try {
        const response = await notifyCreatePassword(
          email,
          formFields.password,
          formFields.confirmPassword
        );

        //set token in cookies
        Cookies.set("authToken", response.token);

        setTimeout(() => {
          navigate(response.route);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center space-y-10 background">
      <Toaster />
      <h1 className="text-3xl text-mainColor font-bold mt-24">
        Create Password
      </h1>

      <div className="flex flex-col space-y-2 relative w-4/5 ">
        <label
          htmlFor="password"
          className=" text-mainColor font-semibold text-xl"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          onChange={handlePasswordChange}
          className={`${
            passwordError.isError
              ? "border-errorColor"
              : "border-mainColor focus:border-mainColor"
          }  border-2 rounded-md p-3 w-full focus:outline-none `}
          placeholder="Password "
        />

        <button
          className="absolute right-2 top-10 "
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeSlash size="30" color="#969696" weight="light" />
          ) : (
            <Eye size="30" color="#969696" weight="light" />
          )}
        </button>
        {passwordError.isError && (
          <span className="text-errorColor text-base">
            {passwordError.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2 relative w-4/5">
        <label
          htmlFor="confirmPassword"
          className=" text-mainColor font-semibold text-xl"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          onChange={handlePasswordChange}
          name="confirmPassword"
          type={isPasswordRepeatVisible ? "text" : "password"}
          className={`${
            confirmPasswordError.isError
              ? "border-errorColor"
              : "border-mainColor"
          }  border-2 rounded-md p-3 w-full`}
          placeholder="Confirm password "
        />

        <button
          className="absolute right-2 top-10 "
          onClick={togglePasswordRepeatVisibility}
        >
          {isPasswordRepeatVisible ? (
            <EyeSlash size="30" color="#969696" weight="light" />
          ) : (
            <Eye size="30" color="#969696" weight="light" />
          )}
        </button>

        {confirmPasswordError.isError && (
          <span className="text-errorColor text-base">
            {confirmPasswordError.message}
          </span>
        )}
      </div>

      <button
        onClick={handleConfirmButton}
        className="w-4/5 py-3 bg-mainColor rounded-lg text-white font-semibold text-lg  inline-block"
      >
        Confirm
      </button>
    </div>
  );
};

export default CreatePasswordPage;
