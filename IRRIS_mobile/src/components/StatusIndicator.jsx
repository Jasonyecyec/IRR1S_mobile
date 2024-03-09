import React from "react";

const StatusIndicator = ({ status }) => {
  const getStatusColorClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500"; // Green for completed
      case "pending":
        return "bg-red-500";
      case "reported":
        return "bg-red-500"; // Red for pending
      case "ongoing":
        return "bg-blue-500"; // Orange for ongoing
      default:
        return "bg-gray-500"; // Default to gray if status is not recognized
    }
  };

  const colorClass = getStatusColorClass(status);

  return (
    <span className="relative flex h-3 w-3 items-center justify-center">
      <span
        className={`absolute inline-flex h-5 w-5 rounded-full ${colorClass} opacity-30`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${colorClass}`}
      ></span>
    </span>
  );
};

export default StatusIndicator;
