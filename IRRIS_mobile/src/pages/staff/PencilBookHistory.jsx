import React, { useEffect, useState } from "react";
import PageTitle from "@/src/components/PageTitle";
import { getPencilBookHistory } from "@/src/services/api/StaffService";
import useUserStore from "@/src/services/state/userStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDateTime, getImageUrl } from "@/src/utils/utils";
import StatusBadge from "@/src/components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PencilBookHistory = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [pencilBookHistory, setPencilBookHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPencilBookHistory = async () => {
    setIsLoading(true);
    try {
      const { facilities } = await getPencilBookHistory(
        user?.id,
        currentFilter
      );
      console.log("response", facilities);
      setPencilBookHistory(facilities);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPencilBookHistory();
  }, [currentFilter]);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setCurrentFilter(selectedFilter);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "yellow";
      case "accepted":
        return "green";
      case "reserved":
        return "blue";
      case "rejected":
        return "red";
      default:
        return "gray"; // Default color if status is not recognized
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <PageTitle
        title="Pencil Book History"
        closeFunction={() => navigate(`/${user?.user_role}/home`)}
      />

      <div className=" flex-1 p-2 space-y-5 mt-3">
        <div className="flex justify-end">
          <select
            name="pets"
            id="pet-select"
            className="p-1 rounded-md"
            value={currentFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Pencil Booked</option>
            <option value="rejected">Rejected</option>
            <option value="reserved">Reserved</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>

        <div className=" h-[45rem] overflow-y-auto space-y-3 p-2">
          {isLoading ? (
            <div className="space-y-2">
              <div>
                <Skeleton height={"5rem"} width={"100%"} />
              </div>
              <div>
                <Skeleton height={"5rem"} width={"100%"} />
              </div>
              <div>
                <Skeleton height={"5rem"} width={"100%"} />
              </div>
            </div>
          ) : pencilBookHistory && pencilBookHistory.length > 0 ? (
            pencilBookHistory.map((item) => (
              <div
                key={item.id}
                className="shadow p-2 flex space-x-3 rounded-md"
              >
                <div className="flex items-center">
                  <img
                    src={getImageUrl(item.facility?.facilities_image)}
                    className="w-24 h-20 rounded-md"
                  />{" "}
                </div>
                <div className="w-full">
                  <p className="flex justify-between">
                    <span className="font-semibold capitalize">
                      {item.event_name}
                    </span>{" "}
                    {/* <button className="text-red-500 rounded-md bg-red-100 p-1 px-2">
                        Cancel
                      </button> */}
                    <StatusBadge status={item.status} />
                  </p>

                  <p className="text-gray-500 text-sm">
                    Location:{" "}
                    {item.facility?.building !== null &&
                      item.facility.building.building_name + " / "}
                    {item.facility?.facilities_name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Date start: {formatDateTime(item.start_date)}
                  </p>
                  <p className="text-gray-500 text-sm flex justify-between">
                    <span> Date end: {formatDateTime(item.end_date)}</span>

                    <button className="text-sm text-mainColor2 font-semibold">
                      <Link to={`/staff/pencil-book-details/${item.id}`}>
                        View
                      </Link>
                    </button>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="font-semibold text-center text-gray-500 text-lg">
              No data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PencilBookHistory;
