import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const PageTitle = ({ title, closeFunction }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (typeof closeFunction === "function") {
      closeFunction();
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="bg-mainColor p-4 relative  rounded-b-[2.5rem]">
      <button onClick={goBack}>
        {" "}
        <ArrowLeft size={32} color="#FFFFFF" />
      </button>

      <div className="bg-white shadow-md rounded-full text-gray-500 font-bold p-4 text-lg absolute bottom-[-2rem] w-[70%] text-center  left-1/2  transform -translate-x-1/2">
        {title}
      </div>
    </div>
  );
};

export default PageTitle;
