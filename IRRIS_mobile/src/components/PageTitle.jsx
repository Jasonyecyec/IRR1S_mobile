import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const PageTitle = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-mainColor p-3 relative h-24 rounded-b-[2.5rem]">
      <button onClick={() => navigate(-1)}>
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
