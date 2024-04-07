import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ImageModal from "@/src/components/ImageModal";
import "../../index.css";
import { useNavigate, useParams } from "react-router-dom";
import { getReportById } from "@/src/services/api/sharedService";
import { getImageUrl } from "@/src/utils/utils";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import ErrorModal from "@/src/components/ErrorModal";
import SuccessModal from "@/src/components/SuccessModal";
import { rateReport } from "@/src/services/api/StudentService";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "@/src/services/state/userStore";

const RatingInput = ({ value, onChange }) => {
  return (
    <Rating
      value={value}
      onChange={(value) => onChange(value)}
      style={{ maxWidth: 180 }}
      className="h-7"
    />
  );
};

const RateReportPage = () => {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [reportData, setReportData] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [comments, setComments] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [isShowConfirmation, setIsShowConfirmation] = useState(false);
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState({
    issue_fixed_rating: 0,
    fixed_in_time_rating: 0,
    response_time_rating: 0,
    work_quality_rating: 0,
    overall_quality_rating: 0,
  });

  const fetchReport = async () => {
    try {
      const { report } = await getReportById(reportId);
      console.log("response", report);
      setReportData(report);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleConfirmButton = async () => {
    const {
      issue_fixed_rating,
      fixed_in_time_rating,
      response_time_rating,
      work_quality_rating,
      overall_quality_rating,
    } = rating;

    // Check if any rating is 0
    if (
      issue_fixed_rating === 0 ||
      fixed_in_time_rating === 0 ||
      response_time_rating === 0 ||
      work_quality_rating === 0 ||
      overall_quality_rating === 0
    ) {
      toast.error("Please provide ratings for all categories");
      return; // Don't proceed with submission
    }

    const form = {
      issue_fixed_rating,
      fixed_in_time_rating,
      response_time_rating,
      work_quality_rating,
      overall_quality_rating,
      student_id: reportData.user_id,
      job_order_id: reportData.job_orders[0].id,
      manpower_id: reportData.job_orders[0].assigned_manpower,
      comments: comments,
    };

    console.log("form", form);

    setIsLoading(true);
    try {
      const response = await rateReport(reportId, form);
      console.log("response", response);
      setIsSuccess(true);
    } catch (error) {
      setIsShowConfirmation(false);
      setIsError({ error: true, message: error.response.data.message });
      console.log("errorrrr", error);
    } finally {
      setIsLoading(false);
      setIsShowConfirmation(false);
    }
  };

  const handleRatingChange = (category, value) => {
    setRating((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const ratingLabels = {
    0: "Not rated",
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Amazing",
  };

  const ratingSections = [
    { label: "Issue fixed", category: "issue_fixed_rating" },
    { label: "Fixed in time", category: "fixed_in_time_rating" },
    { label: "Response time", category: "response_time_rating" },
    { label: "Work quality", category: "work_quality_rating" },
    { label: "Overall quality", category: "overall_quality_rating" },
  ];

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="h-screen w-screen bg-secondaryColor">
      <Toaster />
      {isError.error && (
        <ErrorModal
          message={isError.message}
          handleCloseButton={() => setIsError({ error: false, message: "" })}
        />
      )}

      {isSuccess && (
        <SuccessModal
          message={user?.user_role === 'student' ? "Rate Succesfully! +10 points" : "Rate Succesfully!"}
          handleCloseButton={() => navigate("/report-history")}
        />
      )}
      <PageTitle title="RATE & REVIEW" />

      <div className=" p-3 pt-5">
        <div className=" rounded-md p-3 space-y-5 ">
          <div>
            {/* <p>asdasdsad</p>
            <p>asdasdsad</p>
            <p>asdasdsad</p> */}

            <div className="flex justify-center space-x-10 font-semibold">
              {openImageModal && (
                <ImageModal
                  imgSrc={currentImage}
                  onCloseModal={() => setOpenImageModal(false)}
                />
              )}
              <div className="text-center">
                <p>Before</p>
                <img
                  alt="img-before"
                  src={getImageUrl(reportData?.image_before)}
                  className="w-20 h-20 bg-gray-200 rounded-md"
                  onClick={() => {
                    setOpenImageModal(true);
                    setCurrentImage(reportData?.image_before);
                  }}
                />
              </div>

              <div className="text-center">
                <p>After</p>
                <img
                  alt="img-after"
                  src={getImageUrl(reportData?.image_after)}
                  onClick={() => {
                    setOpenImageModal(true);
                    setCurrentImage(reportData?.image_after);
                  }}
                  className="w-20 h-20 bg-gray-200 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {ratingSections.map(({ label, category }) => (
              <div
                className="bg-gray-50 p-2 flex space-x-2 items-center font-semibold text-sm border rounded-lg"
                key={category}
              >
                <p className="text-sm">{label}</p>
                <RatingInput
                  value={rating[category]}
                  onChange={(value) => handleRatingChange(category, value)}
                />
                <p className="">{ratingLabels[rating[category]]}</p>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label for="comments ">Additional comments:</label>

            <textarea
              id="comment"
              name="comments"
              value={comments}
              onChange={handleCommentsChange}
              placeholder="Provide additional feedback on the report for better insights"
              rows="5"
              cols="33"
              className="w-full rounded-md bg-gray-50"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              className="bg-mainColor2 text-white font-bold text-xl px-10 py-2 rounded-md "
              onClick={() => setIsShowConfirmation(true)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {isShowConfirmation && (
        <ConfirmationModal
          content="Are you sure you want to submit?"
          onCloseModal={() => setIsShowConfirmation(false)}
          handleConfirmButton={handleConfirmButton}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default RateReportPage;
