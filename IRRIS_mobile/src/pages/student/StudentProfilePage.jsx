import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  XCircle,
  Camera,
  CaretRight,
  User,
  SignOut,
  Copy,
} from "@phosphor-icons/react";
import UserSample from "../../assets/images/user_sample.jpg";
import studentProfile from "./studentProfile.js";
import { Link } from "react-router-dom";
import StudentQR from "../../assets/images/student_qr.png";
import useUserStore from "../../services/state/userStore";
import { Button, Modal } from "flowbite-react";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import toast, { Toaster } from "react-hot-toast";

const StudentProfilePage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log("user", user);
  }, []);
  const handleConfirmButton = () => {
    // To remove a specific cookie
    Cookies.remove("authToken");
    Cookies.remove("user_id");
    Cookies.remove("user_role");
    Cookies.remove("first_name");
    Cookies.remove("last_name");
    Cookies.remove("email");
    Cookies.remove("referral_code");

    //clear user store
    setUser("");

    navigate("/login");
  };
  console.log(user);
  const handleCloseProfile = () => {
    navigate("/student/home");
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleCopyToClipboard = () => {
    // Accessing the referral code from user object
    const referralCode = user.referral_code;

    // Copying to clipboard
    navigator.clipboard
      .writeText(referralCode)
      .then(() => {
        toast.success("Copied to clipboard!", {
          id: "referral-toast", // Assigning an ID to the toast
        });
      })
      .catch((err) => {
        toast.error("Failed to copy referral code", {
          id: "referral-toast", // Assigning the same ID for consistency
        });
      });
  };

  return (
    <div className="h-screen w-screen relative">
      {openModal && (
        <ConfirmationModal
          onCloseModal={onCloseModal}
          handleConfirmButton={handleConfirmButton}
          content=" Are you sure you want to logout?"
        />
      )}
      <Toaster />

      <div className="border border-2 p-6 relative bg-mainColor text-white rounded-b-[2rem]">
        <div className="flex items-center  justify-center mb-10">
          <p className="font-semibold text-xl">My Profile</p>
          <button
            onClick={handleCloseProfile}
            className="absolute top-4 right-2"
          >
            <XCircle size={32} color="#ffffff" />
          </button>
        </div>

        <div className="flex space-x-5">
          {/* User Image */}
          <div className="relative">
            <img
              src={UserSample}
              alt="user-sample"
              className="rounded-full w-24 h-24 "
            />
            <button
              onClick={() => console.log("camera click")}
              className="rounded-full p-1.5 absolute bottom-0 right-1 bg-white  border-[2px] border-gray"
            >
              <Camera size={48} color="#121212" className="w-6 h-6" />
            </button>
          </div>

          {/* User details */}
          <div className="text-base p-3 font-medium">
            <p className="text-2xl font-semibold">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="">{user?.email}</p>
            <p>Student : SBIT4A</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 text-lg space-y-8">
        {studentProfile?.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              to={item.route}
              className="flex items-center justify-between"
            >
              <span className="flex items-center">
                <IconComponent size={24} color="#121212" className="mr-4" />
                {item.title}
              </span>

              <CaretRight size={18} color="#121212" />
            </Link>
          );
        })}

        <div className="flex flex-col items-center w-full space-y-1">
          <p className="font-semibold uppercase text-xl relative">
            {user.referral_code}
            <span
              className="absolute top-0 right-[-18px]"
              onClick={handleCopyToClipboard}
            >
              <Copy size={15} />
            </span>
          </p>
          <span className="text-sm text-gray-500 ">Referral code </span>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-mainColor text-lg flex justify-center items-center text-white absolute left-1/2 transform -translate-x-1/2 bottom-20 w-[90%] rounded-full p-3 font-semibold mx-auto"
        >
          Sign Out
          <SignOut size={24} color="#ffffff" className="ml-4" />
        </button>
      </div>
    </div>
  );
};

export default StudentProfilePage;
