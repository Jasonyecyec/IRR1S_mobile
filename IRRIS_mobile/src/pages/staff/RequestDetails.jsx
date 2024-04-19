import PageTitle from "@/src/components/PageTitle";
import { getRequestDetails } from "@/src/services/api/StaffService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatusBadgRequest from "@/src/components/StatusBadgRequest";
import { formatDate } from "@/src/utils/utils";

const RequestDetails = () => {
  const { id, type } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);

  const fetchRequestDetails = async () => {
    setIsLoading(true);
    try {
      const { request_details } = await getRequestDetails(id, type);
      console.log("request_details", request_details);

      setRequestDetails(request_details);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, []);

  console.log("request id", id);
  console.log("request type", type);

  return (
    <div className="w-screen h-screen relative">
      <PageTitle title={"Request Details"} />

      <div className="p-5">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <p key={item}>
                <Skeleton width={"100%"} height={"2rem"} />
              </p>
            ))}
          </div>
        ) : (
          <div>
            {requestDetails && type === "logistics" ? (
              <div className="space-y-2">
                <div className="w-full flex justify-end">
                  <StatusBadgRequest status={requestDetails.status} />
                </div>

                <p className="w-full space-x-2">
                  <span className="text-gray-500">Logistic ID:</span>{" "}
                  <span className="font-semibold"> {requestDetails.id}</span>{" "}
                </p>

                <p className="w-full space-x-2">
                  <span className="text-gray-500">Request type:</span>{" "}
                  <span className="font-semibold bg-blue-100 text-mainColor2 rounded-md p-1.5 ">
                    {" "}
                    Logistics
                  </span>{" "}
                </p>

                <p className="w-full space-x-2">
                  <span className="text-gray-500">Requested:</span>{" "}
                  <span className="font-semibold">
                    {" "}
                    {requestDetails.logistic?.type}
                  </span>{" "}
                </p>

                <p className="w-full space-x-2">
                  <span className="text-gray-500">Quantity:</span>{" "}
                  <span className="font-semibold">
                    {" "}
                    {requestDetails?.quantity}
                  </span>{" "}
                </p>

                <p className="w-full space-x-2">
                  <span className="text-gray-500">Quantity:</span>{" "}
                  <span className="font-semibold">
                    {" "}
                    {requestDetails?.description}
                  </span>{" "}
                </p>

                <p className="w-full space-x-2">
                  <span className="text-gray-500">When needed:</span>{" "}
                  <span className="font-semibold">
                    {" "}
                    {formatDate(requestDetails?.date_assigned)}
                  </span>{" "}
                </p>

                <p className="w-full space-x-2">
                  <span className="text-gray-500">
                    {" "}
                    Expected Completion Date:
                  </span>{" "}
                  <span className="font-semibold">
                    {" "}
                    {formatDate(requestDetails?.expected_date)}
                  </span>{" "}
                </p>
              </div>
            ) : (
              requestDetails &&
              type !== "logistics" && (
                <div className="space-y-2">
                  <div className="w-full flex justify-end">
                    {requestDetails && (
                      <StatusBadgRequest status={requestDetails?.status} />
                    )}
                  </div>

                  <p className="w-full space-x-2">
                    <span className="text-gray-500">Request ID:</span>{" "}
                    <span className="font-semibold"> {requestDetails?.id}</span>{" "}
                  </p>

                  <p className="w-full space-x-2">
                    <span className="text-gray-500">Request type:</span>{" "}
                    <span className="font-semibold bg-blue-100 text-mainColor2 rounded-md p-1.5 capitalize">
                      {" "}
                      {requestDetails?.request_type}
                    </span>{" "}
                  </p>

                  <p className="w-full space-x-2">
                    <span className="text-gray-500">Description:</span>{" "}
                    <span className="font-semibold ">
                      {" "}
                      {requestDetails?.description}
                    </span>{" "}
                  </p>

                  <p className="w-full space-x-2">
                    <span className="text-gray-500">Date and Time:</span>{" "}
                    <span className="font-semibold ">
                      {" "}
                      {requestDetails?.due_date}
                    </span>{" "}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {requestDetails && requestDetails.status === "pending" && (
        <button className="absolute bottom-16 left-1/2 transform -translate-x-1/2 rounded-full w-[80%] p-2 text-white bg-mainColor2 text-lg font-semibold">
          Cancel Request
        </button>
      )}
    </div>
  );
};

export default RequestDetails;
