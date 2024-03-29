import React from "react";
import { Link } from "react-router-dom"; // If you're using React
import { LockKeyOpen, Trash, CaretRight, SkipBack, ArrowLeft } from "@phosphor-icons/react";

function StudentAccountSettingPage() {
  return (
    <div>
      <header className="  bg-mainColor2 rounded-b-[2.5rem] h-20 flex items-center justify-between px-5">
        <div className="backbutton  w-[2rem] ml-2 mt-1">
          <Link to="/student/profile" className="text-white  ">
            <ArrowLeft size={32} />
          </Link>
        </div>
      </header>

      <div className="AccountSettingCard w-full flex justify-center items-center mt-10">
        <div class=" w-full pt-10 h-[50vh] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pb-10 ">
            <h5 class="mb-10 text-3xl font-bold ml-10 mr-10 text-gray-900 dark:text-white">
              Account Setting
            </h5>

            <div class="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300">
                EM
              </span>
            </div>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Eugine M. Manliclic
            </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              QCU student
            </span>
            <div class="flex mt-4 md:mt-6"></div>
          </div>

          <div>
            <div class="w-full p-4 text-center bg-white   rounded-lg  sm:p-8 dark:bg-gray-800 ">
              <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <a
                  href="#"
                  class="flex items-center justify-between w-full sm:w-auto bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <div class="flex items-center">
                    <LockKeyOpen className="me-3 w-7 h-7" />
                    <div>
                      <div class="mb-1 text-xs pr-7">Do you want to</div>
                      <div class="-mt-1 font-sans text-sm font-semibold">
                        Change Password
                      </div>
                    </div>
                  </div>
                  <CaretRight size={32} />
                </a>

                <a
                  href="#"
                  class="flex items-center justify-between w-full sm:w-auto bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <div class="flex items-center">
                    <Trash className="me-3 w-7 h-7" />
                    <div>
                      <div class="mb-1 text-xs">See yah fella!</div>
                      <div class="-mt-1 font-sans text-sm font-semibold">
                        Deactivate
                      </div>
                    </div>
                  </div>
                  <CaretRight size={32} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
    </div>
  );
}

export default StudentAccountSettingPage;
