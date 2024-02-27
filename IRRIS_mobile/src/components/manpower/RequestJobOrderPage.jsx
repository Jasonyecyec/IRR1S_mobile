import React from "react";
import { formatDate, getImageUrl } from "@/src/utils/utils";
import {
  Clock,
  Hash,
  MapPin,
  WarningCircle,
  Camera,
} from "@phosphor-icons/react";

const RequestJobOrderPage = ({
  taskInProgress,
  task,
  initializeCamera,
  reportStatus,
  handleButton,
  finishFormData,
  handleFinishFormChange,
}) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-md">
      <p className="font-bold pb-2">Job Order : REQUEST </p>

      <div className="border-y-2  flex pb-5  space-y-1">
        <div className="flex-1 space-y-2">
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
            <span className="capitalize">
              Request by: {taskInProgress?.request?.user?.first_name}{" "}
              {taskInProgress?.request?.user?.last_name}
            </span>
          </p>
          <p className="flex items-center space-x-1">
            <WarningCircle size={20} color="#121212" />
            <span className="capitalize">
              Type of request: {taskInProgress?.request_type}
            </span>
          </p>

          <p className="flex items-center space-x-1">
            <WarningCircle size={20} color="#121212" />
            <span className="capitalize">
              Description: {taskInProgress?.description}
            </span>
          </p>
        </div>
      </div>

      {taskInProgress.status === "assigned" && (
        <div className="space-y-5">
          <button
            className="bg-mainColor text-white rounded-md w-full p-3 font-bold text-xl"
            onClick={handleButton}
          >
            {reportStatus === "not-valid" || reportStatus === "delay"
              ? "Submit"
              : "Start Task"}
            {/* Start Task */}
          </button>
        </div>
      )}

      {taskInProgress.status === "ongoing" && (
        <div className="space-y-5">
          <div className="flex justify-center space-x-5"></div>

          {/* <div className="flex items-center justify-center space-x-5">
            <label>Select:</label>
            <select
              name="status"
              className="block appearance-none w-[50%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={finishFormData.status || ""}
              onChange={handleFinishFormChange}
            >
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div> */}

          <button
            className="bg-mainColor text-white rounded-md w-full p-3 font-bold text-xl"
            onClick={handleButton}
          >
            Finish Task
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestJobOrderPage;
