import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { Coins } from "@phosphor-icons/react";
import Rewards from "@/src/components/student/Rewards";
import { getRewards } from "@/src/services/api/sharedService";
import { getStudentPoints } from "@/src/services/api/StudentService";
import { getImageUrl } from "@/src/utils/utils";
import { Spinner } from "flowbite-react";
import useUserStore from "@/src/services/state/userStore";
import CountUp from "react-countup";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CaretLeft } from "@phosphor-icons/react";
import "../../index.css";

const RewardsPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [rewards, setRewards] = useState(null);
  const [points, setPoints] = useState(null);

  const fetchRewards = async () => {
    try {
      setIsLoading(true);
      const { rewards } = await getRewards();
      console.log("rewards", rewards);
      setRewards(rewards);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentPoints = async () => {
    setIsLoading(true);
    try {
      const { points } = await getStudentPoints(user?.id);
      setPoints(points);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
    fetchStudentPoints();
  }, []);

  return (
    <div className="bg-white h-screen w-screen flex flex-col">
      <PageTitle title="Rewards" />

      <div className="flex justify-end  p-2">
        <div className="flex space-x-3 bg-[#017afe] p-2 rounded-md w-[9rem] justify-center">
          <div className=" font-bold space-y-1.5">
            <p className="text-xs text-[#6fbeff] uppercase">Total Points</p>
            <p className="text-white text-sm capitalize flex items-center space-x-2">
              <Coins size={24} />
              <div>
                <CountUp end={points} start={0} />{" "}
                <span className=" text-sm font-semibold">points </span>
              </div>
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-2 space-y-10 ">
        <div className=" h-[38rem]  flex-wrap justify-center overflow-y-scroll w-full grid grid-cols-2 gap-5">
          {isLoading ? (
            <div className=" flex-wrap justify-center overflow-y-scroll w-full grid grid-cols-2 gap-5">
              {/* <Spinner aria-label="Loading spinner" size="lg" /> */}
              <Skeleton
                width={"100%"}
                height={"11rem"}
                className="rounded-3xl"
              />
              <Skeleton
                width={"100%"}
                height={"11rem"}
                className="rounded-3xl"
              />
              <Skeleton
                width={"100%"}
                height={"11rem"}
                className="rounded-3xl"
              />
              <Skeleton
                width={"100%"}
                height={"11rem"}
                className="rounded-3xl"
              />
            </div>
          ) : (
            rewards &&
            rewards.map((item) => (
              <Rewards
                id={item.id}
                rewardTitle={item.reward_name}
                points={item.total_points}
                criteria={item.criteria}
                frequency={item.reward_frequency}
                rewardImg={getImageUrl(item.reward_image)}
                key={item.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
