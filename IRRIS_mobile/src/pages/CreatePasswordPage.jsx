import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EyeIcon from "../assets/svg/eye.svg";
import EyeDisabledIcon from "../assets/svg/eye_disabled.svg";
import { Eye } from "@phosphor-icons/react";
import { EyeSlash } from "@phosphor-icons/react";

const CreatePasswordPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordRepeatVisibility = () => {
    setIsPasswordRepeatVisible(!isPasswordRepeatVisible);
  };

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

  return (
    <div className="h-screen w-screen flex flex-col items-center space-y-10">
      <h1 className="text-3xl text-mainColor font-bold">Create Password</h1>

      <div className="flex flex-col space-y-2 relative w-4/5 ">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={isPasswordVisible ? "text" : "password"}
          className="px-3 py-1.5 border  border-2 focus:outline-none focus:border-mainColor text-sm rounded-md"
          placeholder="Password "
        />

        <button
          className="absolute right-2 bottom-1 "
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeSlash size="24" color="#969696" weight="light"/>
          ) : (
            <Eye size="24" color="#969696" weight="light"/>
          )}
        </button>
      </div>

      <div className="flex flex-col space-y-2 relative w-4/5">
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          type={isPasswordRepeatVisible ? "text" : "password"}
          className="px-3 py-1.5 border  border-2 focus:outline-none focus:border-mainColor text-sm rounded-md"
          placeholder="Repeat password "
        />

        <button
          className="absolute right-2 bottom-1 "
          onClick={togglePasswordRepeatVisibility}
        >
          {isPasswordRepeatVisible ? (
            <EyeSlash size="24" color="#969696" weight="light"/>
          ) : (
            <Eye size="24" color="#969696" weight="light"/>
          )}
        </button>
      </div>

      <button className="w-4/5">
        <Link
          to="/home"
          className="py-3 bg-mainColor rounded-lg text-white font-semibold text-lg w-full inline-block"
        >
          Confirm
        </Link>
      </button>
    </div>
  );
};

export default CreatePasswordPage;
