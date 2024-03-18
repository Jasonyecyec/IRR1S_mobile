import React, { useState } from "react";
import ratingValues from "./ratingConfig";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { rateJobOrder } from "@/src/services/api/manpowerService";
import Loading from "@/src/components/Loading";
import { CheckCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Label } from "flowbite-react";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import { Check } from "@phosphor-icons/react";
import "../../index.css";

const ManpowerRatingPage = () => {
  const { jobOrderId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    checkbox1: null,
    checkbox2: null,
    checkbox3: null,
    checkbox4: null,
    checkbox5: null,
    checkbox6: null,
  });

  const notify = (message) =>
    toast.error(message, {
      style: {
        textAlign: "center",
        backgroundColor: "#fef2f2",
        marginTop: "2rem",
      },
      id: "error",
      duration: 2000,
    });

  const handleCheckboxChange = (e) => {
    setError(false);
    console.log(e.target.value);
    const checkboxId = e.target.id;
    const checkBoxValue = e.target.checked;
    setFormData({
      ...formData,
      [checkboxId]: checkBoxValue,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmButton = async () => {
    setIsLoading(true);
    setIsConfirmModal(false);
    try {
      if (jobOrderId) {
        formData.job_order_id = jobOrderId;
      }

      const response = await rateJobOrder(formData);

      setShowModal(true);
    } catch (error) {
      notify("Can't find Job Order");
    } finally {
      setIsLoading(false);
    }

    console.log("formData", formData);
  };

  const handleSubmit = async () => {
    const isAnyCheckboxChecked = Object.values(formData).some(
      (value) => value === true
    );
    if (!isAnyCheckboxChecked) {
      notify("Please select at least one before submitting");
      return;
    }

    setIsConfirmModal(true);
    console.log("form", formData);

    // if (!formData.rating) {
    //   setError(true);
    //   return;
    // }
  };

  const handleDone = () => {
    navigate("/manpower/tasks");
  };

  console.log("params", jobOrderId);
  return (
    <div className="h-screen w-screen bg-white ">
      <Toaster />
      {isConfirmModal && (
        <ConfirmationModal
          isLoading={isLoading}
          onCloseModal={() => setIsConfirmModal(false)}
          content="Are you sure you want to submit?"
          handleConfirmButton={handleConfirmButton}
        />
      )}
      {isLoading && <Loading />}

      {showModal && (
        <div
          className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
          id="my-modal"
        >
          <div className="p-5 pt-8 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
            <div className="flex flex-col items-center justify-center space-y-5">
              <span className="rounded-full bg-green-100 p-3 flex items-center justify-center">
                {" "}
                <Check size={35} className="text-green-500" />
              </span>
              <p className=" text-lg flex flex-col items-center space-y-1.5">
                <span className="font-semibold">
                  {" "}
                  Thank's for submitting feedback.
                </span>
                <span className="text-sm text-center text-gray-500">
                  We appreciate your input. Your feedback helps us improve our
                  services.
                </span>
              </p>

              <button
                className="text-white w-full bg-mainColor font-semibold text-lg px-8 py-2  rounded-lg"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="p-8 h-full flex flex-col">
        <h1 className="text-xl font-semibold  pb-5 text-center text-mainColor2">
          Give Feedback
        </h1>

        <div className="flex-1 flex flex-col space-y-10">
          <div className=" space-y-5">
            <p className="font-semibold ">Check the appropriate experience</p>

            <div className="space-y-10">
              <div className="flex justify-between gap-2 ">
                <div>
                  <Label htmlFor="checkbox1" className="text-lg">
                    Accurate Description
                  </Label>
                  <p className="text-sm text-gray-500">
                    Ensure job details match expectations.
                  </p>
                </div>

                <Checkbox
                  id="checkbox1"
                  className="h-6 w-6"
                  onChange={handleCheckboxChange}
                />
              </div>

              <div className="flex justify-between gap-2">
                <div>
                  <Label htmlFor="checkbox2" className="text-lg">
                    Detailed Description
                  </Label>
                  <p className="text-sm text-gray-500">
                    Provide thorough job specifications.
                  </p>
                </div>

                <Checkbox
                  id="checkbox2"
                  className="h-6 w-6"
                  onChange={handleCheckboxChange}
                />
              </div>

              <div className="flex justify-between gap-2">
                <div>
                  <Label htmlFor="checkbox3" className="text-lg">
                    Clear Media Attached
                  </Label>
                  <p className="text-sm text-gray-500">
                    Include relevant media for clarity.
                  </p>
                </div>

                <Checkbox
                  id="checkbox3"
                  className="h-6 w-6"
                  onChange={handleCheckboxChange}
                />
              </div>

              <div className="flex justify-between gap-2">
                <div>
                  <Label htmlFor="checkbox4" className="text-lg">
                    Very important
                  </Label>

                  <p className="text-sm text-gray-500">
                    Highlight critical tasks.
                  </p>
                </div>
                <Checkbox
                  id="checkbox4"
                  className="h-6 w-6"
                  onChange={handleCheckboxChange}
                />
              </div>

              <div className="flex justify-between gap-2">
                <div>
                  <Label htmlFor="checkbox5" className="text-lg">
                    Safety Concern
                  </Label>

                  <p className="text-sm text-gray-500">
                    Note any safety issues.
                  </p>
                </div>
                <Checkbox
                  id="checkbox5"
                  className="h-6 w-6"
                  onChange={handleCheckboxChange}
                />
              </div>

              <div className="flex justify-between gap-2">
                <div>
                  <Label htmlFor="checkbox6" className="text-lg">
                    Emergency Situation
                  </Label>
                  <p className="text-sm text-gray-500">
                    Note any safety issues.
                  </p>
                </div>
                <Checkbox
                  id="checkbox6"
                  className="h-6 w-6"
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            {error && (
              <span className="text-red-500 font-bold italic ">
                *Check experience first
              </span>
            )}
          </div>

          <button
            className="bg-mainColor2 text-white font-semibold rounded-md py-2 text-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default ManpowerRatingPage;
