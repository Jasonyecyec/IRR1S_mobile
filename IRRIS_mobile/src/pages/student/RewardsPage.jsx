import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { Coins } from "@phosphor-icons/react";
import Rewards from "@/src/components/student/Rewards";
import { getRewards } from "@/src/services/api/sharedService";
import { getImageUrl } from "@/src/utils/utils";
import { Spinner } from "flowbite-react";
import "../../index.css";

const RewardsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rewards, setRewards] = useState(null);

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
  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <div className="background h-screen w-screen flex flex-col">
      <PageTitle title="REWARDS" />

      <div className="flex-1  p-5 pt-10 space-y-9">
        <div className="flex justify-end">
          {" "}
          <div className="rounded-full bg-white px-3 py-2 flex flex-col items-center justify-center font-semibold  border-2">
            <Coins size={32} color="#FFB800" />
            <p>24 points</p>
          </div>
          {/* <p className="ml-8 font-semibold text-sm">AVAILABLE POINTS</p> */}
        </div>

        <div className="relative bg-white shadow-md rounded-xl p-5 py-14 ">
          <span className="bg-mainColor z-30 text-white shadow-md rounded-full  font-bold py-3 px-4  text-lg absolute top-[-1.5rem] text-center  left-1/2  transform -translate-x-1/2">
            Available Rewards
          </span>

          {isLoading ? (
            <div className="flex justify-center h-[30rem]  w-full">
              <Spinner aria-label="Loading spinner" size="lg" />
            </div>
          ) : (
            <div className="h-[30rem] overflow-y-auto w-full grid grid-cols-2 justify-center gap-10 py-10">
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
