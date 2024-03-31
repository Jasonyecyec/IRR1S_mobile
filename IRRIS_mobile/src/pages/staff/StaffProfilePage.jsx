import React, { useEffect, useState } from "react";
import useUserStore from "@/src/services/state/userStore";
import {
  XCircle,
  Camera,
  CaretRight,
  User,
  SignOut,
} from "@phosphor-icons/react";
import UserSample from "../../assets/images/user_sample.jpg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../index.css";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Loading from "@/src/components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { getUserDetails } from "@/src/services/api/sharedService";
import UploadProfileModal from "@/src/components/UploadProfileModal";
import { getImageUrl } from "@/src/utils/utils";
import staffProfile from "./staffProfile";

const StaffProfilePage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openUploadProfile, setOpenUploadProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleCloseProfile = () => {
    navigate(-1);
  };

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

  const handleConfirmButton = () => {
    // To remove a specific cookie
    Cookies.remove("authToken");
    Cookies.remove("user_id");
    Cookies.remove("user_role");
    Cookies.remove("first_name");
    Cookies.remove("last_name");
    Cookies.remove("email");

    //clear user store
    setUser("");

    navigate("/login");
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

  useEffect(() => {
    fetchUserDetails(user?.id);
  }, []);

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
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

      <div className=" border-2 p-6 relative bg-mainColor2 text-white rounded-b-[2rem]">
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
          <div className="relative">
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
            ) : userDetails ? (
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
              className="rounded-full p-1.5 absolute bottom-0 right-1 bg-white border border-[2px] border-gray"
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
            {userDetails && (
              <p className="capitalize  text-sm">
                Staff : <span>{userDetails?.user_details?.department}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 text-lg space-y-6">
        {staffProfile?.map((item, index) => {
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

        <button
          onClick={() => setOpenModal(true)}
          className="bg-gray-100 text-lg border space-x-2 hover:bg-gray-100 ease-in-out duration-150 flex justify-center items-center text-mainColor2 absolute left-1/2 transform -translate-x-1/2 bottom-20 w-[90%] rounded-full p-3 font-semibold mx-auto"
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

export default StaffProfilePage;
