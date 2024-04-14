import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { Coins } from "@phosphor-icons/react";
import Rewards from "@/src/components/student/Rewards";
import {
  getRewards,
  getRewardsCertificateStudent,
  getRewardsCouponStudent,
} from "@/src/services/api/sharedService";
import { getStudentPoints } from "@/src/services/api/StudentService";
import { getImageUrl } from "@/src/utils/utils";
import { Spinner } from "flowbite-react";
import useUserStore from "@/src/services/state/userStore";
import CountUp from "react-countup";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CaretLeft } from "@phosphor-icons/react";
import "../../index.css";
import { Link } from "react-router-dom";
import CouponDetailsModal from "@/src/components/student/CouponDetailsModal";
import {
  getCouponDetails,
  getClaimCoupon,
} from "@/src/services/api/StudentService";
import { Toaster, toast } from "sonner";

const RewardsPage = () => {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [couponDetailsLoading, setCouponDetailsLoading] = useState(false);
  const [claimingLoading, setClaimingLoading] = useState(false);
  const [rewards, setRewards] = useState(null);
  const [points, setPoints] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
  const [openCouponDetailsModal, setOpenCouponDetailsModal] = useState(false);
  const [currentReward, setCurrentReward] = useState("certificates");

  const fetchRewards = async () => {
    try {
      setIsLoading(true);
      const { rewards } = await getRewardsCertificateStudent();
      console.log("rewards", rewards);
      setRewards(rewards);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const { coupon_reward } = await getRewardsCouponStudent();
      console.log("coupon_reward", coupon_reward);
      setRewards(coupon_reward);
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

  const fetchCouponDetails = async (id) => {
    setCouponDetailsLoading(true);
    try {
      const { coupon_details } = await getCouponDetails(id);
      setCouponDetails(coupon_details);
    } catch (error) {
      console.log(error);
    } finally {
      setCouponDetailsLoading(false);
    }
  };

  const fetchClaimCoupon = async (id) => {
    console.log("claim id", id);
    setClaimingLoading(true);
    try {
      const response = await getClaimCoupon(id);
      console.log("response claim", response);
      toast.success("Successfully claimed voucher.");
    } catch (error) {
      console.log("error", error.response.data.error);
      toast.error("Voucher already claimed.");
    } finally {
      setClaimingLoading(false);
      setCouponDetails(null);
      setOpenCouponDetailsModal(false);
    }
  };

  const handleCouponDetailsModal = (couponId) => {
    fetchCouponDetails(couponId);
    setOpenCouponDetailsModal(true);
  };

  useEffect(() => {
    if (currentReward === "certificates") {
      fetchRewards();
    }

    if (currentReward === "coupon") {
      fetchCoupons();
    }

    fetchStudentPoints();
  }, [currentReward]);

  return (
    <div className="bg-white h-screen w-screen flex flex-col ">
      <Toaster richColors position="top-center" />

      <PageTitle title="Rewards" />
      {openCouponDetailsModal && (
        <CouponDetailsModal
          couponDetailsLoading={couponDetailsLoading}
          claimingLoading={claimingLoading}
          claimCoupon={fetchClaimCoupon}
          couponDetails={couponDetails}
          onCloseModal={() => {
            setCouponDetails(null);
            setOpenCouponDetailsModal(false);
          }}
        />
      )}

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

      <div className="flex justify-center space-x-3 my-1 font-semibold text-sm">
        <button
          className={`${
            currentReward === "certificates"
              ? "bg-blue-100 text-mainColor2"
              : " "
          } p-2 rounded-md ease-in-out duration-150 w-28`}
          onClick={() => setCurrentReward("certificates")}
        >
          Certificates
        </button>
        <button
          className={`${
            currentReward === "coupon" ? "bg-blue-100 text-mainColor2" : " "
          } p-2 rounded-md ease-in-out duration-150 w-28`}
          onClick={() => setCurrentReward("coupon")}
        >
          Vouchers
        </button>
      </div>

      <div className="flex-1 p-5 space-y-10  w-full ">
        <div className=" h-[38rem] overflow-y-auto w-full flex flex-wrap gap-5 justify-center rounded-md pb-12 ">
          {isLoading ? (
            <>
              {/* <Spinner aria-label="Loading spinner" size="lg" /> */}
              <Skeleton width={"11rem"} height={"13rem"} />
              <Skeleton width={"11rem"} height={"13rem"} />
              <Skeleton width={"11rem"} height={"13rem"} />
              <Skeleton width={"11rem"} height={"13rem"} />
              <Skeleton width={"11rem"} height={"13rem"} />
              <Skeleton width={"11rem"} height={"13rem"} />
            </>
          ) : currentReward === "certificates" ? (
            rewards && rewards.length > 0 ? (
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
            ) : (
              <p className="text-center font-semibold text-gray-500 w-full">
                No rewards available
              </p>
            )
          ) : rewards && rewards.length > 0 ? (
            rewards.map((item) => (
              <div className="border shadow w-[11rem] h-[12rem] text-sm  p-2.5  rounded-xl relative flex flex-col items-center justify-center font-semibold space-y-2">
                <p className="w-full text-center text-sm trunc ">
                  {item.coupon_name}{" "}
                </p>

                <div className="h-16 w-20 ">
                  <img
                    src={getImageUrl(item.coupon_image)}
                    className="w-full h-full"
                  />
                </div>

                <p className="  text-black  space-x-2 font-semibold  w-full flex items-center justify-center text-sm">
                  <span>
                    {" "}
                    <Coins size={24} color="#FFB800" />
                  </span>
                  <span className="">{item.coupon_points} pts </span>{" "}
                </p>

                <button
                  onClick={() => handleCouponDetailsModal(item.id)}
                  className="bg-secondaryColor w-full text-mainColor p-2 rounded-md text-sm"
                >
                  View voucher
                </button>
              </div>
            ))
          ) : (
            <p className="text-center font-semibold text-gray-500 w-full">
              No rewards available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
