import React, { useEffect, useState } from "react";
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

const TasksPage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [jobOrders, setJobOrders] = useState(null);

  const fetchJobOrder = async () => {
    try {
      const response = await getJobOrder(user.id);

      console.log("job order response", response);

      if (response) {
        // Check if there's an existing job order in localStorage
        const storedJobOrders = localStorage.getItem("jobOrders");

        if (storedJobOrders) {
          // Compare with the new job order
          const isNewData =
            JSON.stringify(response.job_order) !== storedJobOrders;

          if (isNewData) {
            // Update localStorage with the new job order
            localStorage.setItem(
              "jobOrders",
              JSON.stringify(response.job_order)
            );
          } else {
            // Use the value from localStorage
            setJobOrders(JSON.parse(storedJobOrders));
          }
        } else {
          // No existing data, store the new job order in localStorage
          localStorage.setItem("jobOrders", JSON.stringify(response.job_order));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchJobOrder();
  }, []);

  const fullname = user?.first_name + " " + user?.last_name;
  return (
    <div className="h-full flex flex-col">
      <ManpowerHeaderNavigation navigateTo={"home"} />

      <div className="p-5 space-y-3  flex flex-col flex-1">
        <h1 className="text-xl  ">
          Hello, <span className="capitalize">{fullname} </span>
        </h1>

        <p className="font-bold text-3xl">Job Orders</p>

        <div className="bg-white rounded-lg p-5 flex-1 shadow-lg">
          <div className="w-full h-[35rem] overflow-y-scroll">
            {jobOrders?.map((job) => (
              <div key={job.id} className="border-b-2 pb-2.5 ">
                <div className="flex justify-between ">
                  {" "}
                  <p className="font-bold text-lg">
                    Job Order: {job.issue_type ? "Report" : "Request"}
                  </p>
                  <Link className="text-mainColor font-bold"> View</Link>
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
                  <span>Location: {job.report?.facility?.facilities_name}</span>
                </p>

                <p className="flex items-center space-x-1">
                  <WarningCircle size={20} color="#121212" />

                  <span>Issue: {job.report?.description}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
