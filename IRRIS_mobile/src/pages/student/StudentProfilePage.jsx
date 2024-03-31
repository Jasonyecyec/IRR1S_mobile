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
import UploadProfileModal from "@/src/components/UploadProfileModal";
import { getUserDetails } from "@/src/services/api/sharedService";
import { getImageUrl } from "@/src/utils/utils";
import Skeleton from "react-loading-skeleton";
import Loading from "@/src/components/Loading";

import "react-loading-skeleton/dist/skeleton.css";

const StudentProfilePage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openUploadProfile, setOpenUploadProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const { user_details } = await getUserDetails(user?.id);
      console.log("user details", user_details);
      setUserDetails(user_details);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(user?.id);
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

  const notifySuccess = (message) => {
    toast.success(message, {
      id: "success", // Assigning an ID to the toast
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      id: "error", // Assigning an ID to the toast
    });
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

      {openUploadProfile && (
        <UploadProfileModal
          onCloseModal={() => setOpenUploadProfile(false)}
          userId={user?.id}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          fetchUserDetails={fetchUserDetails}
        />
      )}

      <Toaster />

      <div className="p-6 relative bg-mainColor2 text-white rounded-b-[2rem]">
        <div className="flex items-center  justify-center mb-10">
          <p className="font-semibold text-xl">My Profile</p>
          <button
            onClick={handleCloseProfile}
            className="absolute top-4 right-2"
          >
            <XCircle size={32} color="#ffffff" />
          </button>
        </div>

        <div className="flex space-x-3">
          {/* User Image */}
          <div className="relative ">
            {isLoading ? (
              <div className="rounded-full w-24 h-24">
                {" "}
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  className="rounded-full"
                  style={{ borderRadius: "100%" }}
                />
              </div>
            ) : userDetails?.profile_image ? (
              <img
                src={getImageUrl(userDetails?.profile_image)}
                alt="user-sample"
                className="rounded-full w-24 h-24 "
              />
            ) : (
              <img
                src={UserSample}
                alt="user-sample"
                className="rounded-full w-24 h-24 "
              />
            )}

            <button
              onClick={() => setOpenUploadProfile(true)}
              className="rounded-full p-1.5 absolute bottom-0 right-1 bg-white  border-[2px] border-gray"
            >
              <Camera size={48} color="#121212" className="w-6 h-6" />
            </button>
          </div>

          {/* User details */}
          <div className="text-base p-3 space-y-1">
            <p className="text-2xl font-semibold">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-base">{user?.email}</p>
            <p className="text-base">QCU student</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 text-lg space-y-6">
        {studentProfile?.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              to={item.route}
              className="flex items-center justify-between"
            >
              <span className="flex items-center text-gray-500 ">
                <IconComponent size={24} className="mr-4 text-gray-500" />
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
          className="bg-gray-100 text-lg space-x-2 border hover:bg-gray-100 ease-in-out duration-150 flex justify-center items-center text-mainColor2 absolute left-1/2 transform -translate-x-1/2 bottom-20 w-[90%] rounded-full p-3 font-semibold mx-auto"
        >
          <span> Sign Out </span>

          <span>
            {" "}
            <SignOut size={24} className=" " />
          </span>
        </button>
      </div>
    </div>
  );
};

export default StudentProfilePage;
