import React from "react";

const IssueCheckboxes = ({ issueType, handleIssueCheckboxChange }) => {
  // Define the facilities based on the issue type
  const facilitiesByType = {
    electrical: [
      "Lights",
      "Electric fan",
      "Air conditioner",
      "Outlets",
      "Light switches",
    ],
    plumbing: [
      "Sinks",
      "Faucets",
      "Toilets",
      "Urinals",
      "Showers",
      "Pipes",
      "Bidet",
    ],
    carpentry: [
      "Doors",
      "Door frames",
      "Windows",
      "Window frames",
      "Tables",
      "Chairs",
      "Benches",
      "Ceiling",
      "Flooring",
    ],
  };

  // Render checkboxes based on the issue type
  const renderCheckboxes = () => {
    if (facilitiesByType.hasOwnProperty(issueType)) {
      return facilitiesByType[issueType].map((facility, index) => (
        <div key={index} className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id={facility.toLowerCase()}
            name={facility.toLowerCase()}
            value={facility.toLowerCase()}
            onChange={(e) => {
              handleIssueCheckboxChange(e);
            }}
          />
          <label htmlFor={facility.toLowerCase()}>{facility}</label>
        </div>
      ));
    } else {
      // If it's not one of the predefined types, render all facilities
      const allFacilities = Object.values(facilitiesByType).flat();
      return allFacilities.map((facility, index) => (
        <div key={index} className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id={facility.toLowerCase()}
            name={facility.toLowerCase()}
            value={facility.toLowerCase()}
            onChange={(e) => {
              handleIssueCheckboxChange(e);
            }}
          />
          <label htmlFor={facility.toLowerCase()}>{facility}</label>
        </div>
      ));
    }
  };

  return <>{renderCheckboxes()}</>;
};

export default IssueCheckboxes;
