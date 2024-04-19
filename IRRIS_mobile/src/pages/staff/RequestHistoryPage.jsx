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
import StatusBadgRequest from "@/src/components/StatusBadgRequest";

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
      const { request } = await getStaffRequest(user.id, currentFilter);
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
  }, [currentFilter]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <PageTitle
        title="REQUEST HISTORY"
        closeFunction={() => navigate(`/${user?.user_role}/home`)}
      />

      <div className=" p-5 flex-1  space-y-3 ">
        <div className="flex justify-end">
          <select
            name="pets"
            id="pet-select"
            className="rounded-md text-sm"
            onChange={(e) => setCurrentFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="maintenance">Maintenance</option>
            <option value="manpower">Service Provider Assistance</option>
            <option value="logistics">Logistics</option>
          </select>
        </div>

        <div className="h-[43rem] overflow-y-auto space-y-7 flex flex-col items-center">
          {isLoading ? (
            <Spinner
              aria-label="Extra large spinner example"
              size="xl"
              className="mt-20"
            />
          ) : request && request.length > 0 ? (
            // If jobOrders is not empty, map through the array
            request?.map((item, index) =>
              item.request_type ? (
                <Link
                  key={item.id}
                  to={`/staff/request-details/${item.id}/${item.request_type}`}
                  className="w-full"
                >
                  {" "}
                  <div className="w-full space-y-1">
                    <p className="text-right w-full text-xs text-gray-600">
                      {formatDateTime(item.updated_at)}
                    </p>
                    <div
                      key={item.id}
                      className={`bg-white shadow-md w-full rounded-xl p-3 relative border-[0.5px] border-${getStatusColor(
                        item.status
                      )}-500 space-y-3`}
                    >
                      <div className="flex justify-between ">
                        <span className="text-xs capitalize bg-mainColor2 text-white p-1.5 rounded-md tracking-wide	w-24 text-center">
                          {item.request_type}
                        </span>
                        <span>
                          {" "}
                          <StatusBadgRequest status={item.status} />
                        </span>
                      </div>

                      <div className="flex space-x-8">
                        <div>
                          <p className="capitalize space-x-1">
                            {" "}
                            <span className="text-sm text-gray-500">
                              Request ID:{" "}
                            </span>
                            <span className="">{item.id}</span>
                          </p>
                          <p className="space-x-1">
                            {" "}
                            <span className="text-sm text-gray-500">
                              {" "}
                              Description:
                            </span>{" "}
                            <span className=""> {item.description}</span>
                          </p>
                          <p className="space-x-1">
                            <span className="text-sm text-gray-500">
                              {" "}
                              Date and Time:{" "}
                            </span>{" "}
                            <span> {formatDateTime(item.date_due)}</span>
                          </p>
                        </div>
                      </div>
                    </div>{" "}
                  </div>{" "}
                </Link>
              ) : (
                <Link
                  key={item.id}
                  to={`/staff/request-details/${item.id}/logistics`}
                  className="w-full"
                >
                  <div className="w-full space-y-1" key={item.id}>
                    <p className="text-right w-full text-xs text-gray-600">
                      {formatDateTime(item.updated_at)}
                    </p>
                    <div
                      key={item.id}
                      className={`bg-white shadow-md w-full rounded-xl p-3 relative border-[0.5px] border-${getStatusColor(
                        item.status
                      )}-500 space-y-3`}
                    >
                      <div className="flex justify-between ">
                        <span className="text-xs capitalize bg-mainColor2 text-white p-1.5 rounded-md tracking-wide	w-24 text-center">
                          Logistics
                        </span>
                        <span>
                          {" "}
                          <StatusBadgRequest status={item.status} />
                        </span>
                      </div>

                      <div className="flex space-x-8">
                        <div>
                          <p className="space-x-1">
                            <span className="text-sm text-gray-500">
                              Logistic ID:{" "}
                            </span>

                            <span> {item.id} </span>
                          </p>
                          <p className="space-x-1">
                            {" "}
                            <span className="text-sm text-gray-500">
                              Requested:{" "}
                            </span>
                            <span> {item.logistic?.type} </span>
                          </p>

                          <p className="space-x-1">
                            {" "}
                            <span className="text-sm text-gray-500">
                              Quantity:
                            </span>{" "}
                            <span> {item.quantity}</span>
                          </p>
                          <p className="space-x-1">
                            <span className="text-sm text-gray-500">
                              {" "}
                              Description:{" "}
                            </span>

                            <span> {item.description} </span>
                          </p>
                          <p className="space-x-1">
                            <span className="text-sm text-gray-500">
                              {" "}
                              When needed:
                            </span>
                            <span> {formatDateTime(item.date_assigned)}</span>
                          </p>

                          <p className="space-x-1">
                            <span className="text-sm text-gray-500">
                              {" "}
                              Expected Completion Date:
                            </span>
                            <span> {formatDateTime(item.expected_date)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )
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
