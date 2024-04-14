import React from "react";
import { X } from "@phosphor-icons/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDate, getImageUrl, isNotPastDueDate } from "@/src/utils/utils";
import { Spinner } from "flowbite-react";

const CouponDetailsModal = ({
  onCloseModal,
  couponDetailsLoading,
  couponDetails,
  claimCoupon,
  claimingLoading,
}) => {
  const isDueDate =
    couponDetails && isNotPastDueDate(couponDetails.date_expiration);

  console.log("isDueDate", isDueDate);
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-start pt-[15rem]"
      id="my-modal"
    >
      <div className="p-5 pt-5 border w-full shadow-lg rounded-md bg-white relative space-y-8 ">
        <button
          onClick={onCloseModal}
          className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
        >
          <X size={18} color="#828282" weight="bold" />
        </button>

        <div className="flex space-x-3">
          <div className="w-[7rem] h-[7rem]">
            {couponDetailsLoading ? (
              <Skeleton width={"100%"} height={"100%"} />
            ) : (
              couponDetails && (
                <img
                  src={getImageUrl(couponDetails.coupon_image)}
                  className="w-full h-full border rounded-md"
                />
              )
            )}
          </div>

          <div>
            {couponDetailsLoading ? (
              <>
                <p>
                  {" "}
                  <Skeleton width={"12rem"} />
                </p>

                <p>
                  {" "}
                  <Skeleton width={"12rem"} />
                </p>

                <p>
                  {" "}
                  <Skeleton width={"12rem"} />
                </p>

                <p>
                  {" "}
                  <Skeleton width={"12rem"} />
                </p>

                <p>
                  {" "}
                  <Skeleton width={"12rem"} />
                </p>
              </>
            ) : (
              couponDetails && (
                <>
                  {" "}
                  <p className="font-semibold ">{couponDetails.coupon_name}</p>
                  <p className="text-sm">
                    <span className="text-gray-500">Description: </span>
                    <span>{couponDetails.description}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Minimum points: </span>
                    <span>{couponDetails.coupon_points}</span>
                  </p>{" "}
                  <p className="text-sm">
                    <span className="text-gray-500">Voucher item: </span>
                    <span>{couponDetails.item}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Quantity: </span>
                    <span>{couponDetails.coupon_quantity}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Valid until: </span>
                    <span>{formatDate(couponDetails.date_expiration)}</span>
                  </p>
                </>
              )
            )}
          </div>
        </div>
        {couponDetailsLoading ? (
          <button className="w-full ">
            <Skeleton width={"100%"} height={"2.5rem"} />
          </button>
        ) : (
          <button
            className={`w-full rounded-md p-3 ${
              isDueDate ? "bg-gray-500 text-white" : "bg-mainColor2 text-white"
            }  font-semibold  `}
            onClick={() => claimCoupon(couponDetails.id)}
            disabled={isDueDate || claimingLoading}
          >
            {claimingLoading ? (
              <Spinner aria-label="Small spinner example" size="sm" />
            ) : (
              "Claim Voucher"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CouponDetailsModal;
