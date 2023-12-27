import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, IdentificationCard } from "@phosphor-icons/react";
import FacilityInputModal from "../components/FacilityInputModal";
import { findFacility } from "../services/api/sharedService";
import PageTitle from "../components/PageTitle";
import ScanImage from "../assets/images/scan_image.png";
import { Link } from "react-router-dom";
import useUserStore from "../services/state/userStore";

const ScanFacilityPage = () => {
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [openModal, setOpenModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [qrCodeError, setQrCodeError] = useState({
    isError: false,
    message: "",
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setQrCode("");
    setQrCodeError({
      isError: false,
      message: "",
    });
  }

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQrCode(value);
    setQrCodeError({ isError: false, message: "" });
  };

  const handleSubmit = async () => {
    if (qrCode == "") {
      setQrCodeError({ isError: true, message: "Please input qr code." });
      return;
    }

    try {
      setIsLoading(true);
      const response = await findFacility(qrCode);
      const facility = response.facility;
      navigate("/report-issue", { state: { facility } });
      console.log("response", response.facility);
    } catch (error) {
      setQrCodeError({ isError: true, message: "Facility doesn't exist" });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToHome = () => {
    navigate(`/${user.user_role}/home`);
  };

  return (
    <div className="background h-screen w-screen relative ">
      <PageTitle title="ENTER FACILITY ID" closeFunction={navigateToHome} />

      <div className=" h-full flex flex-col space-y-5  items-center w-full mt-32 p-10">
        <div className="bg-white p-3 rounded-lg">
          <Link to="/qr-scanner">
            <img src={ScanImage} alt="scan-image" className="w-60 bg-white" />
          </Link>
        </div>
        <p>OR</p>

        <button
          className="rounded-full w-full bg-white p-3 shadow-md text-xl font-semibold flex justify-center items-center space-x-5"
          onClick={() => setOpenModal(true)}
        >
          <IdentificationCard size={32} color="#828282" />{" "}
          <span>Use Facility ID</span>
        </button>
      </div>

      {openModal && (
        <FacilityInputModal
          isLoading={isLoading}
          qrCodeError={qrCodeError}
          qrCode={qrCode}
          onCloseModal={onCloseModal}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ScanFacilityPage;
