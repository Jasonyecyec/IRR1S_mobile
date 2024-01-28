import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import "../index.css";
import { Rating } from "@smastrom/react-rating";
import ConfirmationModal from "../components/ConfirmationModal";
import toast, { Toaster } from "react-hot-toast";
import { rateFacility } from "../services/api/sharedService";
import useUserStore from "../services/state/userStore";
import "@smastrom/react-rating/style.css";
import { useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";

const RateFacilityPage = () => {
  const { facilityId } = useParams();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [studentComments, setStudentComments] = useState(null);
  const [isShowConfirmation, setIsShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    console.log(rating);
  }, [rating]);
  const notify = (message) =>
    toast.error(message, {
      style: {
        fontSize: "1.3rem",
        marginTop: "0.5rem",
      },
      id: "rate-error",
      duration: 1000,
    });

  const ratingLabels = {
    0: "Not rated",
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Amazing",
  };

  const handleConfirmButton = async () => {
    if (rating === 0) {
      notify("Rate facility first");
      setIsShowConfirmation(false);
      return;
    }

    try {
      setIsLoading(true);
      const form = {
        user_id: user?.id,
        rating: rating,
        comment: studentComments === "" ? null : studentComments,
      };

      console.log("form", form);
      const response = await rateFacility(facilityId, form);
      setIsShowConfirmation(false);
      setIsSuccess(true);
    } catch (error) {
      setIsShowConfirmation(false);
      const errMessage = error.response.data.error;
      setIsError({
        error: true,
        message: errMessage,
      });
      console.log("error tite", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseButton = () => {
    setRating(0);
    setStudentComments(null);
    setIsError({
      error: false,
      message: "",
    });
  };

  return (
    <div className="h-screen w-screen background flex flex-col">
      <Toaster />
      {isError.error && (
        <ErrorModal
          message={isError.message}
          handleCloseButton={handleCloseButton}
        />
      )}

      {isSuccess && (
        <SuccessModal
          message="Rate Successfully!"
          handleCloseButton={() => navigate(-1)}
        />
      )}
      <PageTitle title="RATE & REVIEW " />

      <div className="flex-1 p-3 pt-12">
        <div className="p-5 py-12 space-y-5 bg-white rounded-lg  shadow-md">
          <div className="w-full space-y-2">
            <p className="font-semibold text-lg">Facility quality</p>

            <div className="flex items-center space-x-3">
              <Rating
                style={{ maxWidth: 230 }}
                value={rating}
                onChange={setRating}
                className="h-10 "
              />

              <p className="text-yellow-400 font-bold text-lg">
                {ratingLabels[rating]}
              </p>
            </div>
          </div>

          <div className="">
            <label for="comments" className="font-semibold text-lg">
              Add comments:
            </label>

            <textarea
              id="comments"
              name="comments"
              value={studentComments === null ? "" : studentComments}
              onChange={(e) => setStudentComments(e.target.value)}
              placeholder="Share more thoughts on the facility to help facility improvements"
              rows="8"
              cols="33"
              className="w-full rounded-md p-3"
            ></textarea>
          </div>

          <div className="w-full flex justify-end">
            <button
              className="bg-mainColor text-white rounded-md font-bold px-4 py-2"
              onClick={() => setIsShowConfirmation(true)} // Add the click handler here
            >
              SUBMIT
            </button>

            {isShowConfirmation && (
              <ConfirmationModal
                content="Are your sure you want to submit?"
                onCloseModal={() => setIsShowConfirmation(false)}
                handleConfirmButton={handleConfirmButton}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateFacilityPage;
