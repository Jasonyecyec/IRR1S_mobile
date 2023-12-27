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
    <div className="bg-mainColor p-3 relative h-24 rounded-b-[2.5rem]">
      <button onClick={goBack}>
        {" "}
        <ArrowLeft size={32} color="#FFFFFF" />
      </button>

      <div className="bg-white rounded-full text-gray-500 font-bold p-5 text-xl absolute bottom-[-2rem] w-[80%] text-center  left-1/2  transform -translate-x-1/2">
        {title}
      </div>
    </div>
  );
};

export default PageTitle;
