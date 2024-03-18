import React, { useEffect, useState, useRef } from "react";
import ManpowerHeaderNavigation from "@/src/components/ManpowerHeaderNavigation";
import { getJobOrder } from "@/src/services/api/manpowerService";
import { formatDate, addDays } from "@/src/utils/utils";
import { Link } from "react-router-dom";
import useUserStore from "@/src/services/state/userStore";
import {
  Clock,
  CalendarBlank,
  Hash,
  MapPin,
  WarningCircle,
} from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";
import TaskFilter from "@/src/components/manpower/TaskFilter";
import StatusBadgeReport from "@/src/components/StatusBadgeReport";

const TasksPage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [jobOrders, setJobOrders] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");

  const fetchJobOrder = async () => {
    setIsLoading(true);
    try {
      const params = {
        status: null,
      };
      const { job_order } = await getJobOrder(user.id);

      console.log("job order response", job_order);
      setJobOrders(job_order);
      // if (response) {
      // Check if there's an existing job order in localStorage
      // const storedJobOrders = localStorage.getItem("jobOrders");
      // if (storedJobOrders) {
      //   // Compare with the new job order
      //   const isNewData =
      //     JSON.stringify(response.job_order) !== storedJobOrders;
      //   if (isNewData) {
      //     // Update localStorage with the new job order
      //     localStorage.setItem(
      //       "jobOrders",
      //       JSON.stringify(response.job_order)
      //     );
      //   } else {
      //     // Use the value from localStorage
      //     setJobOrders(JSON.parse(storedJobOrders));
      //   }
      // } else {
      //   // No existing data, store the new job order in localStorage
      //   localStorage.setItem("jobOrders", JSON.stringify(response.job_order));
      // }
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobOrder();
  }, []);

  const fullname = user?.first_name + " " + user?.last_name;
  return (
    <div className="h-full flex flex-col">
      <ManpowerHeaderNavigation navigateTo={"home"} title={"Job Orders"} />
      <div className="p-5 space-y-3  flex flex-col flex-1">
        <div className="flex justify-end">
          <div className=" relative">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="border-2 px-2 py-1 rounded-md  bg-gray-100 font-semibold capitalize"
            >
              {currentFilter === "all" ? "Select filter" : currentFilter}
            </button>
            {isFilterOpen && (
              <TaskFilter
                user={user}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                setCurrentFilter={setCurrentFilter}
                currentFilter={currentFilter}
                setIsLoading={setIsLoading}
                setJobOrders={setJobOrders}
              />
            )}
          </div>
        </div>

        <div className="  flex-1 flex justify-center">
          {isLoading ? (
            <Spinner aria-label="Extra large spinner example" size="xl" />
          ) : (
            <div className=" flex flex-col space-y-7 w-full h-[35rem] overflow-y-scroll">
              {jobOrders && jobOrders.length > 0 ? (
                jobOrders?.map((job) => (
                  <div
                    key={job.id}
                    className="border-b-2 pb-2.5 shadow-md rounded-lg bg-white p-5"
                  >
                    <div className="flex justify-between border-b-2 pb-3">
                      {" "}
                      <p className="font-bold text-lg ">
                        Job Order:{" "}
                        <span className="bg-yellow-300 py-1 px-2 rounded-md mr-2 capitalize">
                          {job.process_type}
                        </span>
                        <StatusBadgeReport status={job.status} />
                      </p>
                      {job.status !== "completed" && (
                        <Link
                          className="text-mainColor font-bold"
                          to={`/manpower/progress/${job.process_type}/${job?.id}`}
                        >
                          {" "}
                          View
                        </Link>
                      )}
                    </div>

                    <p className="flex items-center space-x-1 pt-2">
                      <Clock size={20} color="#121212" />
                      <span> Date Assigned: {formatDate(job.created_at)}</span>
                    </p>

                    <p className="flex items-center space-x-1">
                      <CalendarBlank size={20} color="#121212" />
                      <span>
                        Due date: {formatDate(addDays(job.created_at, 1))}
                      </span>
                    </p>

                    <p className="flex items-center space-x-1">
                      <Hash size={20} color="#121212" />
                      <span>Task No. {job.id}</span>
                    </p>

                    <p className="flex items-center space-x-1">
                      <MapPin size={20} color="#121212" />
                      <span>
                        Location: {job.report?.facility?.facilities_name}
                      </span>
                    </p>

                    <p className="flex items-center space-x-1">
                      <WarningCircle size={20} color="#121212" />

                      <span>Issue: {job.report?.description}</span>
                    </p>
                  </div>
                ))
              ) : (
                // If jobOrders is empty, display a message
                <p className="text-center text-gray-500 text-lg mt-10">
                  No {currentFilter} job orders available.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
