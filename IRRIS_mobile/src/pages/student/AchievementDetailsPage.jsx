import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import {
  getRewardDetails,
  getDownloadCertificate,
} from "@/src/services/api/StudentService";
import useUserStore from "@/src/services/state/userStore";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getImageUrl } from "@/src/utils/utils";
import { DownloadSimple } from "@phosphor-icons/react";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import SuccessModal from "@/src/components/SuccessModal";
import Loading from "@/src/components/Loading";

const AchievementDetailsPage = () => {
  const { achievementId } = useParams();
  const [achievement, setAchievementDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [successOpenModal, setSuccessOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const fetchRewardDetails = async () => {
    setIsLoading(true);
    try {
      const { reward } = await getRewardDetails(achievementId);
      setAchievementDetails(reward);
      console.log("reward", reward);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardDetails();
  }, []);

  const handleConfirmButton = async () => {
    setIsDownloading(true);
    setOpenConfirmationModal(false);
    try {
      await getDownloadCertificate(achievement?.id, user?.id);
      setSuccessOpenModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-screen">
      <PageTitle title={"Achievement Details"} />
      {openConfirmationModal && (
        <ConfirmationModal
          content={"Are you sure you want to download certificate?"}
          onCloseModal={() => setOpenConfirmationModal(false)}
          handleConfirmButton={handleConfirmButton}
        />
      )}

      {successOpenModal && (
        <SuccessModal
          message={"Achievement successfully downloaded!."}
          handleCloseButton={() => setSuccessOpenModal(false)}
        />
      )}

      {isDownloading && <Loading />}
      <div className="p-2 m-2">
        {isLoading ? (
          <div>
            {" "}
            <Skeleton width={"100%"} height={"5rem"} />{" "}
          </div>
        ) : (
          achievement && (
            <div className=" p-3 rounded-md space-y-2">
              <div className="flex justify-center mb-10">
                <img
                  src={getImageUrl(achievement.reward_image)}
                  className="w-20 h-20 "
                />
              </div>
              <p className="font-semibold capitalize text-lg">
                {achievement.reward_name}
              </p>
              <p className="text-gray-500">{achievement.description}</p>

              {achievement.criteria === "points" && (
                <p className="text-gray-500">
                  Points to achieve <span>{achievement.total_points}</span>{" "}
                  points
                </p>
              )}

              {achievement.criteria === "best" && (
                <p className="text-gray-500">
                  Top student{" "}
                  <span>
                    {achievement.reward_frequency} will recieve this reward.
                  </span>
                </p>
              )}

              {achievement.valid_period && (
                <p className="text-gray-500">
                  Valid Until: {formatDateTime(achievement.valid_period)}
                </p>
              )}
            </div>
          )
        )}
      </div>

      <div className="flex justify-center mt-14">
        {isLoading ? (
          <Skeleton width={"90%"} height={"1rem"} />
        ) : (
          <button
            onClick={() => setOpenConfirmationModal(true)}
            className="bg-mainColor flex justify-center items-center space-x-3 text-white font-semibold text-lg rounded-full w-[90%] p-2 "
          >
            <span>Download Certificate</span>
            <span>
              <DownloadSimple size={25} />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AchievementDetailsPage;
