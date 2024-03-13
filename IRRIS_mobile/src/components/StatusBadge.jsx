import React from "react";

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

const StatusBadge = ({ status }) => {
  const color = getStatusColor(status);
  return (
    <span
      className={`uppercase text-sm font-semibold text-${color}-500 bg-${color}-100 rounded-md p-1 px-3 border-${color}-300 border`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
