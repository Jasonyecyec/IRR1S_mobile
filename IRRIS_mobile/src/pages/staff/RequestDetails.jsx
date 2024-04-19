import PageTitle from "@/src/components/PageTitle";
import {
  cancelRequest,
  getRequestDetails,
} from "@/src/services/api/StaffService";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatusBadgRequest from "@/src/components/StatusBadgRequest";
import { formatDate } from "@/src/utils/utils";
import { X, WarningCircle } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";
import { handler } from "flowbite/plugin";
import { Toaster, toast } from "sonner";

const RequestDetails = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

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

  const handleSubmitCancellation = async (e) => {
    e.preventDefault();
    if (cancelReason === "") {
      toast.warning("Please input reason before submitting.", {
        duration: 2000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const form = {
        request_type: type,
        reason: cancelReason,
      };
      const response = await cancelRequest(id, form);
      console.log("cancel rquest response", response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
      toast.success("Successfully cancelled request!");
      navigate(-1);
    }
  };

  const handleChangeCancelReason = useCallback((e) => {
    setCancelReason(e.target.value);
  }, []);

  const ConfirmCancelRequest = () => {
    return (
      <div
        className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-start pt-[20rem]"
        id="my-modal"
      >
        <div className="p-5 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
          <button
            onClick={() => setOpenModalCancel(false)}
            className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
          >
            <X size={18} color="#828282" weight="bold" />
          </button>

          <div className="">
            <p className="text-center text-xl font-semibold">
              Please input reason for cancelling request.
            </p>
          </div>
          <form onSubmit={handleSubmitCancellation}>
            {" "}
            <div className="flex flex-col w-full  justify-center space-y-3">
              <div>
                <textarea
                  id="cancel_reason"
                  name="cancel_reason"
                  rows="4"
                  cols="33"
                  value={cancelReason}
                  className="rounded-md w-full text-sm"
                  placeholder="Enter reason for cancellation."
                  onChange={handleChangeCancelReason}
                ></textarea>
              </div>

              {isLoading ? (
                <Spinner aria-label="Large spinner example" size="lg" />
              ) : (
                <div className="flex text-smfont-semibold space-x-5 w-full">
                  <button
                    onClick={() => setOpenModalCancel(false)}
                    className="px-4 bg-gray-50 border text-black  border shadow w-full rounded-md text-lg py-3 mr-2"
                  >
                    Cancel
                  </button>{" "}
                  <button
                    type="submit"
                    className="px-4 bg-mainColor text-white w-full rounded-md text-lg py-3 mr-2"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>{" "}
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen relative">
      <Toaster richColors position="top-center" />
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

                {requestDetails.status === "declined" && (
                  <p className="w-full space-x-2">
                    <span className="text-gray-500">Cancellation reason :</span>{" "}
                    <span className="font-semibold ">
                      {" "}
                      {requestDetails?.remarks}
                    </span>{" "}
                  </p>
                )}
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

                  {requestDetails.status === "cancelled" && (
                    <p className="w-full space-x-2">
                      <span className="text-gray-500">
                        Cancellation reason :
                      </span>{" "}
                      <span className="font-semibold ">
                        {" "}
                        {requestDetails?.reject_reason}
                      </span>{" "}
                    </p>
                  )}

                  {requestDetails.status === "not-valid" && (
                    <p className="w-full space-x-2">
                      <span className="text-gray-500">
                        Reason for rejection :
                      </span>{" "}
                      <span className="font-semibold ">
                        {" "}
                        {requestDetails?.reject_reason}
                      </span>{" "}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {openModalCancel && (
        <div
          className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-start pt-[20rem]"
          id="my-modal"
        >
          <div className="p-5 border w-full space-y-5 shadow-lg rounded-md bg-white relative">
            <button
              onClick={() => {
                setCancelReason("");
                setOpenModalCancel(false);
              }}
              className="z-50 cursor-pointer flex items-center justify-center absolute top-2 right-2 bg-gray-100 rounded-full p-1 shadow"
            >
              <X size={18} color="#828282" weight="bold" />
            </button>

            <div className="">
              <p className="text-center text-xl font-semibold">
                Please input reason for cancelling request.
              </p>
            </div>
            <form onSubmit={handleSubmitCancellation}>
              {" "}
              <div className="flex flex-col w-full  justify-center space-y-3">
                <div>
                  <textarea
                    id="cancel_reason"
                    name="cancel_reason"
                    rows="4"
                    cols="33"
                    value={cancelReason}
                    className="rounded-md w-full text-sm"
                    placeholder="Enter reason for cancellation."
                    onChange={handleChangeCancelReason}
                  ></textarea>
                </div>

                {isLoading ? (
                  <Spinner aria-label="Large spinner example" size="lg" />
                ) : (
                  <div className="flex text-smfont-semibold space-x-5 w-full">
                    <button
                      onClick={() => {
                        setCancelReason("");
                        setOpenModalCancel(false);
                      }}
                      className="px-4 bg-gray-50 border text-black  border shadow w-full rounded-md text-lg py-3 mr-2"
                    >
                      Cancel
                    </button>{" "}
                    <button
                      type="submit"
                      className="px-4 bg-mainColor text-white w-full rounded-md text-lg py-3 mr-2"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>{" "}
            </form>
          </div>
        </div>
      )}

      {requestDetails && requestDetails.status === "pending" && (
        <button
          onClick={() => setOpenModalCancel(true)}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 rounded-full w-[80%] p-2 text-white bg-mainColor2 text-lg font-semibold"
        >
          Cancel Request
        </button>
      )}
    </div>
  );
};

export default RequestDetails;
