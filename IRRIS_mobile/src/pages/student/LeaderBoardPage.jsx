import React, { useEffect, useState } from "react";
import { getTopLeaders } from "@/src/services/api/sharedService";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LeaderBoardTrophy from "../../assets/images/leaderboard_trophy.png";
import Top1Badge from "../../assets/images/top1_badge.png";
import Top2Badge from "../../assets/images/top2_badge.png";
import Top3Badge from "../../assets/images/top3_badge.png";

import { getImageUrl } from "@/src/utils/utils";

const LeaderBoardPage = () => {
  const [topLeaders, setTopLeaders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [currentFilter, setCurrentFilter] = useState("monthly");

  const fetchTopLeaders = async () => {
    setIsLoading(true);
    try {
      const { top_leaders } = await getTopLeaders(currentFilter);
      setTopLeaders(top_leaders);
      console.log("top response", top_leaders);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value);
  };

  useEffect(() => {
    fetchTopLeaders();
  }, [currentFilter]);

  return (
    <div className=" h-full ">
      <div className="bg-[#017afe] text-white flex justify-center px-2 py-3 items-center relative">
        <button onClick={() => navigate(-1)} className="absolute top-3 left-3 ">
          <CaretLeft size={28} />{" "}
        </button>

        <p className="font-semibold text-lg">Student Leaderboards</p>
      </div>

      <div className="p-3  space-y-5">
        <div className="flex justify-center p-2">
          <img src={LeaderBoardTrophy} className="w-[12rem]" />
        </div>
        <div className="flex justify-end">
          {" "}
          <select
            name="pets"
            id="pet-select"
            className="p-2 rounded-md "
            onChange={handleFilterChange}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className=" h-[20rem] overflow-y-auto space-y-3 ">
          {isLoading ? (
            // Loading state
            <div className="space-y-3">
              <div>
                <Skeleton height={"2rem"} />
              </div>
              <div>
                <Skeleton height={"2rem"} />
              </div>{" "}
              <div>
                <Skeleton height={"2rem"} />
              </div>{" "}
            </div>
          ) : // Loaded state
          topLeaders && topLeaders.length > 0 ? (
            // Mapping through topLeaders
            topLeaders.map(
              (student, index) =>
                student.points !== 0 && (
                  <div
                    key={student.id}
                    className="flex rounded-md justify-between shadow  p-3"
                  >
                    <div className="flex space-x-3 items-center">
                      {/* Student information */}
                      <span>{index + 1}</span>{" "}
                      <span>
                        {" "}
                        <img
                          src={getImageUrl(student.profile_image)}
                          className="w-12 h-12 rounded-full"
                          alt={`${student.first_name} ${student.last_name}`}
                        />
                      </span>{" "}
                      <p className="flex flex-col">
                        <span>
                          {" "}
                          {student.first_name} {student.last_name}
                        </span>
                        <span className="text-sm text-iconGrayColor">
                          {student.student_number}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {/* Badge and points */}
                      {index + 1 === 1 && (
                        <span>
                          {" "}
                          <img
                            src={Top1Badge}
                            className="w-8 h-8"
                            alt="Top 1 Badge"
                          />
                        </span>
                      )}
                      {index + 1 === 2 && (
                        <span>
                          <img
                            src={Top2Badge}
                            className="w-8 h-8"
                            alt="Top 1 Badge"
                          />
                        </span>
                      )}
                      {index + 1 === 3 && (
                        <span>
                          <img
                            src={Top3Badge}
                            className="w-12 h-12"
                            alt="Top 1 Badge"
                          />
                        </span>
                      )}

                      <p className="text-iconGrayColor">
                        <span className="font-semibold text-lg text-gray-600">
                          {" "}
                          {student.points}
                        </span>{" "}
                        Points
                      </p>
                    </div>
                  </div>
                )
            )
          ) : (
            // Empty state when topLeaders is empty
            <p>No data available</p>
          )}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default LeaderBoardPage;
