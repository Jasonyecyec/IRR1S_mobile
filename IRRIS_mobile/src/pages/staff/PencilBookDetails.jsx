import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageTitle from "@/src/components/PageTitle";
import {
  getPencilBookDetails,
  cancelPencilBook,
} from "@/src/services/api/StaffService";
import { formatDateTime, formatDate, getImageUrl } from "@/src/utils/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatusBadge from "@/src/components/StatusBadge";
import {
  Circle,
  FileText,
  SpeakerHifi,
  Chair,
  Table,
  Info,
} from "@phosphor-icons/react";
import ConfirmationModal from "@/src/components/ConfirmationModal";
import SuccessModal from "@/src/components/SuccessModal";
import Loading from "@/src/components/Loading";
import { useNavigate } from "react-router-dom";
import ChangeScheduleModal from "@/src/components/ChangeScheduleModal";
import { Toaster, toast } from "sonner";

const PencilBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const [pencilBook, setPencilBook] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [openChangeScheduleModal, setOpenChangeScheduleModal] = useState(false);

  const fetchPencilBookDetails = async () => {
    setIsLoading(true);
    try {
      const { pencil_book } = await getPencilBookDetails(id);
      console.log("response", pencil_book);
      setPencilBook(pencil_book);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmButton = async () => {
    setIsCancelling(true);
    setOpenModal(false);
    try {
      await cancelPencilBook(id);

      setSuccessModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    fetchPencilBookDetails();
  }, [id]);
  return (
    <div className="w-screen h-screen flex flex-col ">
      <PageTitle title="Pencil Book Details" />
      <Toaster richColors position="top-center" />
      <div className=" p-5 relative flex-1">
        <div className="flex justify-end mb-5">
          {isLoading ? (
            <Skeleton width={"5.5rem"} height={"1.8rem"} />
          ) : (
            pencilBook && <StatusBadge status={pencilBook.status} />
          )}
        </div>
        <div className="flex space-x-3">
          {isLoading ? (
            <>
              {" "}
              <div className="flex items-center justify-center">
                <Skeleton
                  width={"7rem"}
                  height={"7rem"}
                  className="rounded-md"
                />
              </div>
              <div className="w-full space-y-1.5">
                <p>
                  {" "}
                  <Skeleton width={"100%"} />
                </p>
                <p>
                  {" "}
                  <Skeleton width={"100%"} />
                </p>
                <p>
                  {" "}
                  <Skeleton width={"100%"} />
                </p>
                <p>
                  {" "}
                  <Skeleton width={"100%"} />
                </p>
              </div>
            </>
          ) : (
            pencilBook && (
              <>
                {" "}
                <div className="flex items-center justify-center">
                  <img
                    src={getImageUrl(pencilBook.facility?.facilities_image)}
                    alt="facilities-img"
                    className="w-32 h-32 rounded-md"
                  />
                </div>
                <div className="space-y-1.5">
                  <p>
                    <span className=" text-gray-500">Event name: </span>
                    <span className="font-semibold">
                      {pencilBook.event_name}
                    </span>
                  </p>
                  <p>
                    <span className=" text-gray-500">Event type: </span>
                    <span className=" capitalize">
                      {pencilBook.event_type} Event
                    </span>
                  </p>
                  <p>
                    <span className=" text-gray-500">Location: </span>
                    <span className="">
                      {pencilBook.facility?.facilities_name}
                    </span>
                  </p>

                  <p>
                    <span className=" text-gray-500">Attendees: </span>
                    <span className="">{pencilBook.attendees}</span>
                  </p>
                </div>
              </>
            )
          )}
        </div>

        {/* Logistic Requirement */}
        <div className="mt-10 space-y-3 ">
          {isLoading ? (
            <>
              <p>
                {" "}
                <Skeleton width={"40%"} height={"1.3rem"} />{" "}
              </p>
              <p>
                {" "}
                <Skeleton width={"70%"} height={"1.3rem"} />{" "}
              </p>
              <p>
                {" "}
                <Skeleton width={"70%"} height={"1.3rem"} />{" "}
              </p>
              <p>
                {" "}
                <Skeleton width={"70%"} height={"1.3rem"} />{" "}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold">Logistic requirements</p>
              {pencilBook && pencilBook.sound_setup && (
                <p className=" flex space-x-2 items-center">
                  {" "}
                  <span>
                    <SpeakerHifi size={24} className="text-gray-500" />
                  </span>
                  <span className="text-base italic capitalize ">
                    {pencilBook.sound_setup === "basic"
                      ? "basic sound system"
                      : "Full set-up sound system with lights"}
                  </span>
                </p>
              )}

              {pencilBook && pencilBook.tables && (
                <p className=" flex space-x-2 items-center italic">
                  {" "}
                  <span>
                    <Table size={24} className="text-gray-500" />
                  </span>
                  <span className=" capitalize">
                    {pencilBook.tables} Tables
                  </span>
                </p>
              )}
              {pencilBook && pencilBook.chairs && (
                <p className=" flex space-x-2 items-center italic">
                  {" "}
                  <span>
                    <Chair size={24} className="text-gray-500" />
                  </span>
                  <span className=" capitalize">
                    {pencilBook.chairs} Chairs
                  </span>
                </p>
              )}
            </>
          )}

          {pencilBook &&
            pencilBook.sound_setup === null &&
            pencilBook.chairs === null &&
            pencilBook.tables === null && (
              <p className="text-center text-gray-500  ">
                No logistics requirements
              </p>
            )}
        </div>

        {pencilBook && pencilBook.request_file_name && (
          <div className="mt-10 space-y-3">
            <p className="font-semibold">Reservation request letter</p>
            <p className=" flex space-x-2 items-center italic">
              {" "}
              <span>
                <FileText size={24} className="text-gray-500" />
              </span>
              <span className=" capitalize">
                {pencilBook.request_file_name}
              </span>
            </p>
          </div>
        )}

        {pencilBook && pencilBook.status === "rejected" && (
          <div className="mt-10 space-y-3">
            <p className="font-semibold">Reason for rejection:</p>
            <p className=" flex space-x-2 items-center italic">
              {" "}
              <span>
                <Info size={24} className="text-red-500" />
              </span>
              <span className=" capitalize">{pencilBook.reject_reason}</span>
            </p>
          </div>
        )}

        {pencilBook && pencilBook.status === "rescheduled" && (
          <div className="mt-10 space-y-5  w-full ">
            <div>
              <p className="text-sm font-semibold text-red-500">
                Conflict schedule
              </p>
              <p className="">
                Your scheduled event conflicts with another event set by the
                admin. Please choose a different date or time.
              </p>
            </div>

            {pencilBook.user_resched == 1 && (
              <div>
                <p className="text-mainColor2 font-semibold">
                  Requested reschedule
                </p>

                <p>
                  <span className="text-gray-500">Start Date: </span>
                  <span>{formatDateTime(pencilBook.resched_start_date)}</span>
                </p>

                <p>
                  <span className="text-gray-500">End Date: </span>
                  <span>{formatDateTime(pencilBook.resched_end_date)}</span>
                </p>
              </div>
            )}

            <button
              onClick={() => setOpenChangeScheduleModal(true)}
              className="w-full bg-mainColor2 text-white rounded-lg p-2 font-semibold"
            >
              Change Schedule
            </button>
          </div>
        )}

        {pencilBook && pencilBook.status === "pending" ? (
          // Render if pencilBook exists and its status is "pending"
          <button
            onClick={() => setOpenModal(true)}
            className="text-lg absolute bottom-12 font-semibold left-1/2 transform -translate-x-1/2 w-[90%] bg-red-100 text-red-500 p-3 rounded-full"
          >
            Cancel Reservation
          </button>
        ) : (
          // Render if pencilBook's status is "accepted"
          pencilBook &&
          pencilBook.status === "accepted" && (
            <button
              onClick={() => setOpenModal(true)}
              className="text-lg absolute bottom-12 font-semibold left-1/2 transform -translate-x-1/2 w-[90%] bg-red-100 text-red-500 p-3 rounded-full"
            >
              Cancel Reservation
            </button>
          )
        )}
      </div>

      {openChangeScheduleModal && (
        <ChangeScheduleModal
          onCloseModal={setOpenChangeScheduleModal}
          pencilBookId={pencilBook.id}
          fetchPencilBookDetails={fetchPencilBookDetails}
        />
      )}

      {openModal && (
        <ConfirmationModal
          content={"Are you sure you want to cancel this reservation?"}
          isLoading={isLoading}
          handleConfirmButton={handleConfirmButton}
          onCloseModal={() => setOpenModal(false)}
        />
      )}

      {successModal && (
        <SuccessModal
          title={"Cancellation Successful"}
          message={"The reservation has been successfully cancelled."}
          handleCloseButton={() => navigate("/staff/pencil-book-history")}
        />
      )}

      {isCancelling && <Loading />}
    </div>
  );
};

export default PencilBookDetails;
