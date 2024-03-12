import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import {
  getQualifiedStudents,
  getRewardDetails,
  generateCertificate,
} from "@/src/services/api/StudentService";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTime, getImageUrl } from "@/src/utils/utils";
import useUserStore from "@/src/services/state/userStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Top1Badge from "../../assets/images/top1_badge.png";
import Top2Badge from "../../assets/images/top2_badge.png";
import Top3Badge from "../../assets/images/top3_badge.png";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import Loading from "@/src/components/Loading";
import SuccessModal from "@/src/components/SuccessModal";
import ErrorModal from "@/src/components/ErrorModal";

const RewardsQualifiedPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useNavigate();
  const { rewardsId } = useParams();
  const [reward, setReward] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [qualifiedLeaders, seQualifiedLeaders] = useState(null);
  const [validPeriodMessage, setValidPeriodMessage] = useState(null);
  const [claimAvailable, setClaimAvailable] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const fetchQualifiedStudents = async () => {
    setIsLoading(true);
    try {
      const { qualifiedLeaders, message } = await getQualifiedStudents(
        rewardsId
      );
      if (message) {
        setValidPeriodMessage(message);
      }

      const isClaimAvailable = qualifiedLeaders.some((leader) => {
        return leader.student_id == user.id;
      });

      setClaimAvailable(isClaimAvailable);
      seQualifiedLeaders(qualifiedLeaders);
      console.log("qualifiedLeaders", qualifiedLeaders);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchRewardDetails = async () => {
    setIsLoading(true);
    try {
      const { reward } = await getRewardDetails(rewardsId);
      setReward(reward);
      console.log("reward", reward);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmButton = async () => {
    setIsGenerating(true);
    setOpenConfirmationModal(false);
    try {
      const response = await generateCertificate(reward?.id, user?.id);
      console.log("generate certificate", response);
      setOpenSuccessModal(true);
    } catch (error) {
      console.log("Rewards already claimed");
      setOpenErrorModal(true);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (claimAvailable === true) {
      console.log("Claim available, rendering button");
    } else if (claimAvailable === null) {
      console.log("Claim availability is still being determined");
    } else {
      console.log("Claim not available, not rendering button");
    }
  }, [claimAvailable]);

  useEffect(() => {
    fetchRewardDetails();
    fetchQualifiedStudents();
  }, [rewardsId]);
  return (
    <div className="bg-white h-screen w-screen flex flex-col relative">
      {openConfirmationModal && (
        <ConfirmationModal
          onCloseModal={() => setOpenConfirmationModal(false)}
          content="Are you sure you want to claim now?"
          isLoading={isLoading}
          handleConfirmButton={handleConfirmButton}
        />
      )}

      {isGenerating && <Loading />}
      <PageTitle title="Qualified Students" />

      {openSuccessModal && (
        <SuccessModal
          message={
            "Reward successfully claimed and downloaded, You can now view it in your achievements page"
          }
          handleCloseButton={() => navigate("/student/more")}
        />
      )}

      {openErrorModal && (
        <ErrorModal
          message={"Rewards already claimed."}
          handleCloseButton={() => setOpenErrorModal(false)}
        />
      )}

      <div className="p-2 m-2">
        {isLoading ? (
          <div>
            {" "}
            <Skeleton width={"100%"} height={"5rem"} />{" "}
          </div>
        ) : (
          reward && (
            <div className="bg-secondaryColor p-3 rounded-md space-y-1.5">
              <p className="font-semibold">{reward.reward_name}</p>
              <p className="text-sm">{reward.description}</p>

              {reward.criteria === "points" && (
                <p>
                  Minimun points to achieve <span>{reward.total_points}</span>{" "}
                  points
                </p>
              )}

              {reward.criteria === "best" && (
                <p className="text-sm">
                  Top student{" "}
                  <span>
                    {reward.reward_frequency} will recieve this reward.
                  </span>
                </p>
              )}

              {reward.valid_period && (
                <p>Valid Until: {formatDateTime(reward.valid_period)}</p>
              )}
            </div>
          )
        )}
      </div>

      <div className=" p-2 text-center space-y-3">
        {isLoading ? (
          <div>
            {" "}
            <Skeleton width={"80%"} />
          </div>
        ) : (
          <p className="font-semibold">Qualified Students</p>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {" "}
            <div>
              {" "}
              <Skeleton width={"100%"} height={"3rem"} />
            </div>
            <div>
              {" "}
              <Skeleton width={"100%"} height={"3rem"} />
            </div>
            <div>
              {" "}
              <Skeleton width={"100%"} height={"3rem"} />
            </div>
          </div>
        ) : qualifiedLeaders && qualifiedLeaders.length > 0 ? (
          qualifiedLeaders.map((student, index) => (
            <div
              key={student.id}
              className="flex rounded-md justify-between shadow  p-3"
            >
              <div className="flex space-x-3 items-center">
                {/* Student information */}
                <span className="font-semibold text-gray-600">
                  {index + 1}.
                </span>{" "}
                <span>
                  {" "}
                  <img
                    src={getImageUrl(student.student?.profile_image)}
                    className="w-12 h-12 rounded-full"
                    alt={`${student.student?.first_name} ${student.student?.last_name}`}
                  />
                </span>{" "}
                <p className="flex flex-col">
                  <span>
                    {" "}
                    {student.student?.first_name} {student.student?.last_name}
                  </span>
                  <span className="text-sm text-iconGrayColor">
                    {student.student?.student_number}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {/* Badge and points */}
                {index + 1 === 1 && (
                  <span>
                    {" "}
                    <img
                      src={Top1Badge}
                      className="w-8 h-8"
                      alt="Top 1 Badge"
                    />
                  </span>
                )}
                {index + 1 === 2 && (
                  <span>
                    <img
                      src={Top2Badge}
                      className="w-8 h-8"
                      alt="Top 1 Badge"
                    />
                  </span>
                )}
                {index + 1 === 3 && (
                  <span>
                    <img
                      src={Top3Badge}
                      className="w-12 h-12"
                      alt="Top 1 Badge"
                    />
                  </span>
                )}

                <p className="text-iconGrayColor">
                  <span className="font-semibold text-lg text-gray-600">
                    {" "}
                    {student.total_points}
                  </span>{" "}
                  Points
                </p>
              </div>
            </div>
          ))
        ) : validPeriodMessage ? (
          <p className="text-gray-500">{validPeriodMessage}</p>
        ) : (
          <p className="text-gray-500">No qualified students found.</p>
        )}
      </div>

      {claimAvailable && (
        <button
          onClick={() => setOpenConfirmationModal(true)}
          className="bg-mainColor text-lg text-white absolute left-1/2 transform -translate-x-1/2 bottom-20 w-[80%] rounded-full p-2 font-semibold mx-auto"
        >
          Claim Reward
        </button>
      )}
    </div>
  );
};

export default RewardsQualifiedPage;
