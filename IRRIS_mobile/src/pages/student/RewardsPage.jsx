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
    <div className="background h-screen w-screen flex flex-col">
      <PageTitle title="REWARDS" />

      <div className="flex-1  p-5 pt-10 space-y-9">
        <div className="flex justify-end">
          {" "}
          {/* <div className="rounded-full bg-white px-3 py-2 flex flex-col items-center justify-center font-semibold  border-2">
            <Coins size={32} color="#FFB800" />
            <p>24 points</p>
          </div> */}
          <div className="bg-[#987700] mt-2 text-white p-2 w-[8.5rem] justify-center rounded-full font-semibold flex space-x-2 items-center">
            <Coins size={25} />
            <p className=" ">
              <CountUp end={points} start={0} />{" "}
              <span className="text-sm">points </span>
            </p>
          </div>
          {/* <p className="ml-8 font-semibold text-sm">AVAILABLE POINTS</p> */}
        </div>

        <div className="relative bg-white shadow-md rounded-xl p-5 py-12 ">
          <span className="bg-mainColor z-30 text-white shadow-md rounded-full  font-bold py-3 px-4  text-lg absolute top-[-1.5rem] text-center  left-1/2  transform -translate-x-1/2">
            Available Rewards
          </span>

          {isLoading ? (
            <div className=" h-[30rem]  w-full grid grid-cols-2 grid-rows-2 justify-center gap-8 py-10">
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
            <div className="h-[30rem] overflow-y-auto w-full grid grid-cols-2 grid-rows-2 justify-center gap-8 py-10">
              {rewards &&
                rewards.map((item) => (
                  <Rewards
                    rewardTitle={item.reward_name}
                    points={item.points}
                    rewardImg={getImageUrl(item.reward_image)}
                    key={item.id}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
