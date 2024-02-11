import React, { useState } from "react";
import ratingValues from "./ratingConfig";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { rateJobOrder } from "@/src/services/api/manpowerService";
import Loading from "@/src/components/Loading";
import { CheckCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const ManpowerRatingPage = () => {
  const { jobOrderId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    rating: null,
    comment: null,
  });

  const notify = (message) =>
    toast.error(message, {
      style: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "2rem",
      },
      id: "error",
      duration: 2000,
    });

  const handleRatingChange = (ratingValue) => {
    setError(false);
    setFormData({
      ...formData,
      rating: ratingValue, // Store the numeric value of the rating
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.rating) {
      setError(true);
      return;
    }
    setIsLoading(true);
    try {
      if (jobOrderId) {
        formData.job_order_id = jobOrderId;
      }
      const response = await rateJobOrder(formData);
      console.log("rate response", response);
      setShowModal(true);
    } catch (error) {
      notify("Can't find Job Order");
    } finally {
      setIsLoading(false);
    }

    console.log("formData", formData);
  };

  const handleDone = () => {
    navigate("/manpower/tasks");
  };

  console.log("params", jobOrderId);
  return (
    <div className="h-screen w-screen background ">
      <Toaster />
      {isLoading && <Loading />}

      {showModal && (
        <div
          className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center"
          id="my-modal"
        >
          <div className="p-5 pt-8 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
            <div className="flex flex-col items-center justify-center ">
              <CheckCircle size={100} color="#2ead3d" weight="fill" />

              <p className="text-2xl text-center bg-green-100 p-3 rounded-lg mt-5">
                You accomplishment is submitted!
              </p>

              <button
                className="text-white bg-mainColor font-bold text-xl px-8 py-2 mt-12 rounded-lg"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="p-8 h-full flex flex-col">
        <h1 className="text-3xl font-bold border-b-2 pb-5">Give Feedback</h1>

        <div className="flex-1 flex flex-col space-y-10">
          <div className=" space-y-5">
            <p className="font-bold">Rate your experience</p>

            <div className="flex justify-between items-center">
              {ratingValues.map((rating) => (
                <button
                  key={rating.value}
                  onClick={() => handleRatingChange(rating.value)}
                  className="flex flex-col items-center"
                >
                  <img
                    src={rating.imgSrc}
                    alt={rating.alt}
                    className={
                      formData.rating === rating.value
                        ? "w-12 h-12"
                        : "w-10 h-10"
                    }
                  />
                  <p
                    className={
                      formData.rating === rating.value
                        ? "font-bold text-mainColor"
                        : ""
                    }
                  >
                    {rating.label}
                  </p>
                </button>
              ))}
            </div>
            {error && (
              <span className="text-red-500 font-bold italic ">
                *Rate experience first
              </span>
            )}
          </div>

          <div>
            <p className="font-bold text-xl mb-3">Comment</p>
            <textarea
              name="comment"
              className="form-textarea mt-1 block w-full border rounded-lg border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="8"
              placeholder="Write comments about your task"
              value={formData?.comment || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            className="bg-mainColor text-white font-bold rounded-md py-2 text-2xl"
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
