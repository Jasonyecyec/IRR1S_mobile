import React from "react";
import { formatDate, getImageUrl } from "@/src/utils/utils";
import {
  Clock,
  Hash,
  MapPin,
  WarningCircle,
  Camera,
  X,
} from "@phosphor-icons/react";
import ImageModal from "../ImageModal";

const ReportJobOrderPage = ({
  taskInProgress,
  setOpenImageReport,
  onCloseImageModal,
  openImageReport,
  task,
  initializeCamera,
  reportStatus,
  imageSrcBefore,
  handleReportStatus,
  handleEstimatedDuration,
  handleRemoveImage,
  handleButton,
  imageSrcAfter,
  finishFormData,
  handleFinishFormChange,
  handlePendingReason,
  pendingReason,
}) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-md">
      <p className="font-bold pb-2">Job Order : REPORT </p>

      <div className="border-y-2  flex pb-5 text-sm space-y-1">
        <div className="flex-1 ">
          <p className="flex items-center space-x-1 pt-2">
            <Clock size={20} color="#121212" />
            <span>Date Assigned: {formatDate(taskInProgress?.created_at)}</span>
          </p>

          {taskInProgress?.due_date && (
            <p className="flex items-center space-x-1">
              <CalendarBlank size={20} color="#121212" />
              <span>Due date: {formatDate(taskInProgress?.due_date)}</span>
            </p>
          )}

          <p className="flex items-center space-x-1">
            <Hash size={20} color="#121212" />
            <span>Task No. {taskInProgress?.id}</span>
          </p>
          <p className="flex items-center space-x-1">
            <MapPin size={20} color="#121212" />
            <span>
              Location: {taskInProgress?.report?.facility?.facilities_name}
            </span>
          </p>
          <p className="flex items-center space-x-1">
            <WarningCircle size={20} color="#121212" />
            <span>Issue: {taskInProgress?.report?.description}</span>
          </p>
        </div>

        {taskInProgress.status === "assigned" &&
          taskInProgress?.image_before && (
            <div className="flex flex-1 justify-center mt-2">
              <img
                src={getImageUrl(taskInProgress?.report?.image_before)}
                alt="report-image"
                className="w-20 h-20 rounded-lg"
                onClick={() => setOpenImageReport(true)}
              />

              {openImageReport && (
                <ImageModal
                  onCloseModal={onCloseImageModal}
                  imgSrc={taskInProgress?.report?.image_before}
                />
              )}
            </div>
          )}
      </div>

      {taskInProgress.status === "assigned" && (
        <div className="space-y-5">
          <p className=" font-semibold text-base flex flex-col">
            {/* Task{" "}
            {task === "report"
              ? "Report"
              : task === "request"
              ? "Request"
              : "Daily"} */}

            <span> Upload image</span>
            <span className="text-sm font-normal text-gray-500">
              {" "}
              Upload image first before starting the task.
            </span>
          </p>
          <div className="flex justify-center space-x-5 ">
            <button
              className="shadow-md rounded-md flex flex-col items-center justify-center p-2"
              onClick={initializeCamera}
            >
              <Camera size={30} color="#2e39ac" weight="fill" />
              <p> Take Picture</p>
            </button>

            {imageSrcBefore && (
              <div className="relative shadow-md">
                <img
                  src={imageSrcBefore}
                  alt="Captured"
                  className="w-24 h-20  rounded-md" // Set your desired width and height
                />

                <button
                  onClick={handleRemoveImage}
                  className="bg-white absolute top-[-0.5rem] right-[-0.5rem]  rounded-full shadow-lg p-1 border border-mainColor"
                >
                  <X size={15} color="#2e39ac" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1 items-center text-sm">
            <label for="validity">Status of report:</label>

            <select
              name="validity"
              id="validity"
              className="w-full rounded-md "
              value={reportStatus}
              onChange={handleReportStatus}
            >
              <option value="">Select status</option>
              <option value="valid">Validated</option>
              <option value="not-valid">No Fault Found</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {reportStatus === "pending" && (
            <div>
              <textarea
                id="comments"
                name="comments"
                rows="4"
                cols="33"
                value={pendingReason}
                onChange={handlePendingReason}
                placeholder={"Input pending reason"}
                className="border-gray-300 border-[1.8px] rounded-md py-2 px-3 drop-shadow-sm focus:outline-none
                focus:border-primary focus:ring-1 w-full focus:ring-primary hover:border-primary text-sm"
              ></textarea>
            </div>
          )}

          <button
            className="bg-mainColor2 text-white rounded-md w-full p-3 font-bold text-base"
            onClick={handleButton}
          >
            {reportStatus === "not-valid" || reportStatus === "pending"
              ? "Submit"
              : "Start Task"}
            {/* Start Task */}
          </button>
        </div>
      )}

      {taskInProgress.status === "ongoing" && (
        <div className="space-y-5">
          <p className="text-center font-bold text-2xl">
            Accomplished{" "}
            {task === "report"
              ? "Report"
              : task === "request"
              ? "Request"
              : "Daily"}
          </p>
          <div className="flex justify-center space-x-5">
            <button
              className="shadow-md rounded-md flex flex-col items-center justify-center p-2"
              onClick={initializeCamera}
            >
              <Camera size={30} color="#2e39ac" weight="fill" />
              <p> Take Picture</p>
            </button>

            {imageSrcAfter && (
              <div className="relative shadow-md">
                <img
                  src={imageSrcAfter}
                  alt="Captured"
                  className="w-24 h-20  rounded-md" // Set your desired width and height
                />

                <button
                  onClick={handleRemoveImage}
                  className="bg-white absolute top-[-0.5rem] right-[-0.5rem]  rounded-full shadow-lg p-1 border border-mainColor"
                >
                  <X size={15} color="#2e39ac" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-5">
            <label>Select:</label>
            <select
              name="status"
              className="block appearance-none w-[50%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={finishFormData?.status || ""}
              onChange={handleFinishFormChange}
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            {" "}
            <textarea
              name="comments"
              className="form-textarea mt-1 text-sm block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="4"
              placeholder={
                finishFormData.status === "pending"
                  ? "Input pending reason"
                  : "Write comment for your tasks"
              }
              value={finishFormData.comments || ""}
              onChange={handleFinishFormChange}
            ></textarea>
          </div>

          <button
            className="bg-mainColor text-white rounded-md w-full p-3 font-bold text-base"
            onClick={handleButton}
          >
            {finishFormData.status === "pending"
              ? "Submit Reason"
              : " Finish Task"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportJobOrderPage;
