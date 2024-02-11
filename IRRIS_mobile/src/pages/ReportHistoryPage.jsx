import React, { useEffect, useState } from "react";
import "../index.css";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import { getReportStudent } from "../services/api/StudentService";
import useUserStore from "@/src/services/state/userStore";
import { Spinner } from "flowbite-react";
import ReportFilter from "../components/student/ReportFilter";
import {
  getStatusText,
  getStatusColor,
  formatDateTime,
  getImageUrl,
} from "../utils/utils";

const ReportHistoryPage = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [report, setReport] = useState(null);

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const params = {
        status: null,
      };
      const { report } = await getReportStudent(user.id, null);
      setReport(report);
      console.log("report response", report);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="h-screen w-screen background flex flex-col ">
      <PageTitle title="REPORT HISTORY" />

      <div className=" p-5 flex-1 pt-10 space-y-3">
        <div className=" text-right">
          <button
            className="border-2 px-2 py-1 rounded-md  bg-gray-100 font-semibold capitalize"
            onClick={() => setIsFilterOpen(true)}
          >
            {currentFilter === "all" ? "Select filter" : currentFilter}
          </button>

          {isFilterOpen && (
            <ReportFilter
              user={user}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              setCurrentFilter={setCurrentFilter}
              currentFilter={currentFilter}
              setIsLoading={setIsLoading}
              setReport={setReport}
            />
          )}
        </div>

        <div className="h-[43rem] overflow-y-auto space-y-10 flex flex-col items-center">
          {isLoading ? (
            <Spinner
              aria-label="Extra large spinner example"
              size="xl"
              className="mt-20"
            />
          ) : report && report.length > 0 ? (
            // If jobOrders is not empty, map through the array
            report?.map((item, index) => (
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
                    <img
                      className="w-20 h-20 rounded-full bg-gray-200"
                      src={getImageUrl(item.image_before)}
                    />
                  </div>

                  <div>
                    <p>Issue: {item.issues}</p>
                    <p>Description: {item.description}</p>
                    <p>
                      Location: {item.facility?.facilities_name} /{" "}
                      {item.facility?.description}
                    </p>
                  </div>
                </div>
                {item.status === "completed" && !item.isRated && (
                  <p className="text-center w-full font-bold text-gray-500 underline">
                    <Link to={`/student/rate-report/${item.id}`}>
                      Review to claim rewards
                    </Link>
                  </p>
                )}

                {item.status === "completed" && item.isRated && (
                  <p className="text-center w-full font-bold text-gray-500">
                    Already claimed!
                  </p>
                )}
              </div>
            ))
          ) : (
            // If jobOrders is empty, display a message
            <p className="text-center text-gray-500 text-lg mt-10">
              No {currentFilter} report available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportHistoryPage;
