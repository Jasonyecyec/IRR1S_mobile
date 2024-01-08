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
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import "../../index.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ManpowerProfilePage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

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

  const handleCloseProfile = () => {
    navigate(-1);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="h-screen w-screen background flex flex-col">
      {openModal && (
        <ConfirmationModal
          onCloseModal={onCloseModal}
          handleConfirmButton={handleConfirmButton}
          content=" Are you sure you want to logout?"
        />
      )}

      <div className=" border-2 p-6 relative bg-mainColor text-white rounded-b-[2rem]">
        <div className="flex items-center  justify-center mb-10">
          <p className="font-semibold text-xl">My Profile</p>
          <button
            onClick={handleCloseProfile}
            className="absolute top-4 right-2"
          >
            <XCircle size={32} color="#ffffff" />
          </button>
        </div>

        <div className="flex justify-between">
          {/* User Image */}
          <div className="relative">
            <img
              src={UserSample}
              alt="user-sample"
              className="rounded-full w-36 h-36 "
            />
            <button
              onClick={() => console.log("camera click")}
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
            <p>Student : SBIT4A</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between ">
        <div className="space-y-5">
          <Link
            // key={index}
            // to={item.route}
            className="flex items-center justify-between bg-white px-2 py-4 rounded-3xl"
          >
            <span className="flex items-center">
              <User size={24} color="#000001" weight="fill" />
              Profile
            </span>

            <CaretRight size={18} color="#121212" />
          </Link>

          <Link
            // key={index}
            // to={item.route}
            className="flex items-center justify-between bg-white px-2 py-4 rounded-3xl"
          >
            <span className="flex items-center">
              <User size={24} color="#000001" weight="fill" />
              Terms and Agreement
            </span>

            <CaretRight size={18} color="#121212" />
          </Link>

          <Link
            // key={index}
            // to={item.route}
            className="flex items-center justify-between bg-white px-2 py-4 rounded-3xl"
          >
            <span className="flex items-center">
              <User size={24} color="#000001" weight="fill" />
              Feedback
            </span>

            <CaretRight size={18} color="#121212" />
          </Link>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-mainColor text-white font-bold text-xl p-3 rounded-3xl mb-10"
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default ManpowerProfilePage;
