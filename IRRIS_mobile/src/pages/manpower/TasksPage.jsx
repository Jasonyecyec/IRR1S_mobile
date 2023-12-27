import React, { useEffect, useState } from "react";
import ManpowerHeaderNavigation from "@/src/components/ManpowerHeaderNavigation";
import { getJobOrder } from "@/src/services/api/manpowerService";
import { formatDate, addDays } from "@/src/utils/utils";
import { Link } from "react-router-dom";
import useUserStore from "@/src/services/state/userStore";

const TasksPage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [jobOrders, setJobOrders] = useState(null);

  const fetchJobOrder = async () => {
    try {
      const response = await getJobOrder(6);
      if (response) setJobOrders(response.job_order);
      console.log("job order", response.job_order);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchJobOrder();
  }, []);

  const fullname = user?.first_name + user?.last_name;
  return (
    <div className="h-full">
      <ManpowerHeaderNavigation navigateTo={"home"} />
      <h1>Hello,{fullname} </h1>
      <div>
        {jobOrders?.map((job) => (
          <div key={job.id}>
            <div className="flex justify-between">
              {" "}
              <p>Job Order</p>
              <Link className="text-mainColor font-bold"> View</Link>
            </div>

            <p>Date Assigned: {formatDate(job.created_at)}</p>
            <p>Due date: {formatDate(addDays(job.created_at, 1))}</p>
            <p>Task No. {job.id}</p>
            <p>Location: {job.report?.facility?.facilities_name}</p>
            <p>Issue: {job.report?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
