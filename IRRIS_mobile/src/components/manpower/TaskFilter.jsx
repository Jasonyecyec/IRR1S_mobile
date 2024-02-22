import React, { useRef, useEffect } from "react";
import { getJobOrder } from "@/src/services/api/manpowerService";

const filterItem = [
  { label: "All", value: null },
  { label: "Completed", value: "completed" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Pending", value: "assigned" },
  { label: "Not Valid", value: "not-valid" },
];

const TaskFilter = ({
  isFilterOpen,
  setIsFilterOpen,
  currentFilter,
  setCurrentFilter,
  setIsLoading,
  setJobOrders,
  user,
}) => {
  const filterRef = useRef(null);

  // Handle clicks outside the filter to close it
  const handleClickOutside = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setIsFilterOpen(false);
    }
  };

  // Add a click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = async (item) => {
    setCurrentFilter(item.label.toLowerCase());

    try {
      setIsLoading(true);
      const { job_order } = await getJobOrder(user.id, item.value);
      setJobOrders(job_order);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFilterOpen(false);
    }
    console.log(item);
  };

  return (
    <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 p-5 overflow-y-auto h-full w-full flex justify-center items-center">
      <div
        ref={filterRef}
        className="bg-white w-[80%]  p-10 rounded-md font-bold flex flex-col justify-center space-y-10 "
      >
        {filterItem.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item)}
            className={`bg-gray-200 py-2 rounded-md ${
              currentFilter === item.label.toLowerCase() &&
              "bg-mainColor text-white"
            }  `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
