import React from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import ScanImage from "../assets/images/scan_image.png";

const ScanFacilityPage = () => {
  const navigate = useNavigate();
  return (
    <div className="background h-screen w-screen">
      <div className="bg-mainColor p-3 relative h-24 rounded-b-[2.5rem]">
        <button onClick={() => navigate(-1)}>
          {" "}
          <ArrowLeft size={32} color="#FFFFFF" />
        </button>

        <div className="bg-white rounded-full p-5 text-xl absolute bottom-[-2rem] w-[80%] text-center  left-1/2  transform -translate-x-1/2">
          SCAN A FACILITY
        </div>
      </div>

      <div className=" h-full  justify-center items-center">
        <div className="bg-white">
          sds
          {/* <img src={ScanImage} alt="scan-image" className="w-20" /> */}
        </div>
      </div>
    </div>
  );
};

export default ScanFacilityPage;
