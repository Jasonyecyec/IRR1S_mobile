import React, { useEffect, useState } from "react";
import { getStudentPointsReceived } from "@/src/services/api/StudentService";
import useUserStore from "@/src/services/state/userStore";
import Skeleton from "react-loading-skeleton";
import { formatDateTime } from "@/src/utils/utils";
import "react-loading-skeleton/dist/skeleton.css";

const PointsHistoryPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const [pointsHistory, setPointsHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudentPointsReceived = async () => {
    setIsLoading(true);

    try {
      const { student } = await getStudentPointsReceived(user?.id);
      setPointsHistory(student);
      console.log("response", student);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentPointsReceived();
  }, []);

  return (
    <div className=" h-full bg-secondaryColor">
      <div className="bg-mainColor2 text-white text-center p-3">
        <p className="font-semibold text-lg">Points Earned History</p>
      </div>

      <div className=" h-full overflow-y-auto   pb-20 ">
        {isLoading ? (
          <>
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
          </>
        ) : pointsHistory && pointsHistory.length > 0 ? (
          pointsHistory.map((item) => (
            <div
              className="flex border-y justify-between py-3 px-5"
              key={item.id}
            >
              <div>
                <p className="capitalize font-semibold text-lg space-y-1 text-[#13354e]">
                  {item.earned_through}
                </p>
                <p className="flex-1 text-[#7e8694] text-sm font-semibold">
                  {formatDateTime(item.created_at)}
                </p>
              </div>

              <div className="flex items-center">
                <p className="flex-1 text-center space-x-1">
                  <span className="font-semibold text-lg text-[#13354e]">
                    +{item.points_earned}
                  </span>
                  <span className="text-sm text-[#7e8694]">points </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#13354e] text-lg mt-12 font-semibold">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default PointsHistoryPage;
