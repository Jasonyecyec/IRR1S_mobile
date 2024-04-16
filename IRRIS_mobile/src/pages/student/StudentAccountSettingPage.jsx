import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CaretRight,
  LockKeyOpen,
  Trash,
  UserSquare,
} from "@phosphor-icons/react";

import UserSample from "../../assets/images/user_sample.jpg";
import useUserStore from "../../services/state/userStore";
import { getUserDetails } from "@/src/services/api/sharedService";
import { getImageUrl } from "@/src/utils/utils";
import Skeleton from "react-loading-skeleton";
import ChangePassword from "../../components/ui/ChangePasswordModal"; // Assuming this is the correct path to your modal component

import "react-loading-skeleton/dist/skeleton.css";

const StudentAccountSettingPage = () => {
  //change password modal states
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  //get user details
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
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

  return (
    <div
      className={
        isChangePasswordModalOpen ? "backdrop-filter backdrop-blur-lg" : ""
      }
    >
      <header className="bg-mainColor2 rounded-b-[2.5rem] h-20 flex items-center justify-between px-5">
        <div className="backbutton w-[2rem] ml-2 mt-1">
          <Link to={`/${user?.user_role}/profile`} className="text-white">
            <ArrowLeft size={32} />
          </Link>
        </div>
      </header>

      <div className="AccountSettingCard w-full flex justify-center items-center mt-10">
        <div className="w-full pt-10 h-[50vh] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <h5 className="mb-10 text-3xl font-bold ml-10 mr-10 text-gray-900 dark:text-white">
              Account Setting
            </h5>

            <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
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
              </div>
            </div>
            <p className="text-2xl font-semibold mb-1">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-base">{user?.email}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              QCU {user?.user_role}
            </span>
            {userDetails && (
              <p className="capitalize  text-sm">
                <span>{userDetails?.user_details?.department}</span>
                <span>{userDetails?.user_details?.specialty}</span>
              </p>
            )}
            <div className="flex mt-4 md:mt-6"></div>
          </div>

          <div>
            <div className="w-full p-4 text-center bg-white rounded-lg sm:p-8 dark:bg-gray-800 ">
              <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <button disabled className="flex items-center justify-between w-full sm:w-auto bg-blue-400    text-white rounded-lg px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className="flex items-center">
                    <UserSquare className="me-3 w-7 h-7" />
                    <div>
                      <div className="mt-1 font-sans text-sm font-semibold">
                        Personal Information
                      </div>
                    </div>
                  </div>
                  <CaretRight size={32} />
                </button>
                <button
                  onClick={handleOpenChangePasswordModal}
                  className="flex items-center justify-between w-full sm:w-auto bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <div className="flex items-center">
                    <LockKeyOpen className="me-3 w-7 h-7" />
                    <div>
                      <div className="mt-1 font-sans text-sm font-semibold">
                        Change Password
                      </div>
                    </div>
                  </div>
                  <CaretRight size={32} />
                </button>

                <button disabled className="flex items-center justify-between w-full sm:w-auto bg-blue-400    text-white rounded-lg px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <div className="flex items-center">
                    <Trash className="me-3 w-7 h-7" />
                    <div>
                      <div className="mt-1 font-sans text-sm font-semibold">
                        Deactivate Account
                      </div>
                    </div>
                  </div>
                  <CaretRight size={32} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the ChangePasswordModal component conditionally based on isChangePasswordModalOpen state */}
      {isChangePasswordModalOpen && (
        <ChangePassword onClose={() => setIsChangePasswordModalOpen(false)} />
      )}
    </div>
  );
};

export default StudentAccountSettingPage;
