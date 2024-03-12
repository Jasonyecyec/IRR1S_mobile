import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import {
  getStudentAchievements,
  getStudentCertificate,
} from "@/src/services/api/StudentService";
import useUserStore from "@/src/services/state/userStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getImageUrl, getPdfUrl } from "@/src/utils/utils";
import { Link } from "react-router-dom";

const AchievementPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [achievements, setAchievements] = useState(null);
  const [issOpenPdfViewer, setIsOpenPdfViewer] = useState(false);
  const [currentCertificateId, setCurrentCertificateId] = useState(null);
  const [currentCertificate, setCurrentCertificate] = useState(null);

  const fetchStudentAchievements = async () => {
    setIsLoading(true);
    try {
      const { achievements } = await getStudentAchievements(user?.id);
      setAchievements(achievements);
      console.log("response achievements", achievements);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCertificate = async () => {
    setIsLoading(true);
    try {
      const { certificate_url } = await getStudentCertificate(
        currentCertificateId
      );
      setCurrentCertificate(certificate_url);
      console.log("response achievements", achievements);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentAchievements();
  }, []);

  useEffect(() => {
    fetchCertificate();
  }, [currentCertificateId]);

  return (
    <div className="h-screen w-screen flex  flex-col">
      <div className="text-center p-3 bg-mainColor2 text-white font-semibold text-lg relative">
        <button onClick={() => navigate(-1)} className="absolute top-3 left-3 ">
          <CaretLeft size={28} />{" "}
        </button>

        <p>Achievements</p>
      </div>

      <div className=" flex-1 flex p-3">
        <div className="h-[50rem]  w-full overflow-y-auto">
          {isLoading ? (
            <div className="p-2 space-y-2">
              <div>
                <Skeleton height={"3rem"} />
              </div>
              <div>
                <Skeleton height={"3rem"} />
              </div>
              <div>
                <Skeleton height={"3rem"} />
              </div>
              <div>
                <Skeleton height={"3rem"} />
              </div>
            </div>
          ) : achievements && achievements.length > 0 ? (
            achievements.map((item) => (
              <Link to={`/achievements-details/${item.reward_id}`}>
                {" "}
                <div
                  className="flex shadow p-2 rounded-md"
                  onClick={() => {
                    setCurrentCertificateId(item.id);
                    setIsOpenPdfViewer(true);
                  }}
                >
                  <div>
                    <img
                      src={getImageUrl(item.reward?.reward_image)}
                      className="w-20 h-20 rounded-full"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-lg">
                      {item.reward?.reward_name}
                    </p>
                    <p className="text-gray-500">{item.reward?.description}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="font-semibold text-iconGrayColor text-center mt-10 text-lg">
              No data available{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementPage;
