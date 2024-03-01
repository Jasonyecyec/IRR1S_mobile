import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import useUserStore from "@/src/services/state/userStore";
import { useNavigate } from "react-router-dom";
import { getStaffRequest } from "@/src/services/api/StaffService";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  getStatusColor,
  getStatusText,
  formatDateTime,
} from "@/src/utils/utils";

const RequestHistoryPage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState("all");
  const [request, setRequest] = useState(null);

  const fetchStaffRequest = async () => {
    setIsLoading(true);
    try {
      const params = {
        status: null,
      };
      const { request } = await getStaffRequest(user.id, null);
      setRequest(request);
      console.log("request", request);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffRequest();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
      <PageTitle
        title="REQUEST HISTORY"
        closeFunction={() => navigate(`/${user?.user_role}/home`)}
      />

      <div className=" p-5 flex-1 pt-10 space-y-3 ">
        filter
        <div className="h-[43rem] overflow-y-auto space-y-10 flex flex-col items-center">
          {isLoading ? (
            <Spinner
              aria-label="Extra large spinner example"
              size="xl"
              className="mt-20"
            />
          ) : request && request.length > 0 ? (
            // If jobOrders is not empty, map through the array
            request?.map((item, index) => (
              <div
                key={index}
                className={`bg-white shadow-md w-full rounded-2xl px-5 py-2 relative border-[0.5px] border-${getStatusColor(
                  item.status
                )}-500 space-y-3`}
              >
                <span
                  className={`bg-${getStatusColor(
                    item.status
                  )}-500 w-16 h-2 absolute top-0 left-5`}
                ></span>

                <div className="flex justify-between ">
                  <p
                    className={`font-bold  text-${getStatusColor(
                      item.status
                    )}-500 capitalize`}
                  >
                    {getStatusText(item.status)}
                  </p>
                  <p>{formatDateTime(item.created_at)}</p>
                </div>

                <div className="flex space-x-8">
                  <div>
                    <p className="capitalize">Request ID: {item.id}</p>
                    <p className="">
                      Due date: {formatDateTime(item.date_due)}
                    </p>

                    <p className="capitalize">
                      Request Type: {item.request_type}
                    </p>
                    <p>Description: {item.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // If request is empty, display a message
            <p className="text-center text-gray-500 text-lg mt-10">
              No data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestHistoryPage;
