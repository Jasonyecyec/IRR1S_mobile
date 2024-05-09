import React, { useState } from "react";

const IssueCheckboxes = ({ issueType, handleIssueCheckboxChange }) => {
  const [showMore, setShowMore] = useState(false);

  // Define the facilities based on the issue type
  const facilitiesByType = {
    "Electrical Issue": [
      "Power outlets",
      "Light bulb",
      "Wiring",
      "Light switches",
      "Fuse",
      "Electric fan",
    ],
    "Restroom Cleanliness": [
      "Odor Control",
      "Surface Cleaning",
      "Supply Restocking",
      "Trash Removal",
      "Floor Maintenance",
    ],
    "Garbage Disposal": [
      "Bin Overflow",
      "Compactor Functionality",
      "Recycling Management",
    ],
    "Pest Control": [
      "Rodent Infestation",
      "Insect Infestation",
      "Nest Removal",
      "Droppings Cleanup",
    ],
    "Area Cleaning": [
      "Classroom Cleaning",
      "Hallway Maintenance",
      "Cafeteria Cleanup",
      "Gymnasium Sanitation",
    ],
    "Outdoor Lighting": [
      "Bulb Replacement",
      "Fixture Repair",
      "Security Lighting",
    ],
    "HVAC Problems": [
      "Heating Issues",
      "Cooling Malfunctions",
      "Air Quality Concerns",
    ],
    "Roof Leaks": [
      "Stain Identification",
      "Drip Investigation",
      "Mold Remediation",
    ],
    "Window Breaks": ["Cracked Glass", "Frame Damage", "Lock Repairs"],
    "Broken Furniture": ["Chair", "Desk ", "Table ", "Door"],
    "Plumbing Problems": [
      "Leak Detection",
      "Drain Cleaning",
      "Pressure Adjustment",
    ],

    // plumbing: [
    //   "Sinks",
    //   "Faucets",
    //   "Toilets",
    //   "Urinals",
    //   "Showers",
    //   "Pipes",
    //   "Bidet",
    // ],
    // carpentry: [
    //   "Doors",
    //   "Door frames",
    //   "Windows",
    //   "Window frames",
    //   "Tables",
    //   "Chairs",
    //   "Benches",
    //   "Ceiling",
    //   "Flooring",
    // ],
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

  const renderShowMoreCheckboxes = () => {
    const filtered = Object.entries(facilitiesByType).filter(
      ([key, value]) => key !== issueType
    );

    console.log("filterd ", filtered);
    return filtered.map(([key, facilities], index) =>
      // Iterate over facilities array
      facilities.map((facility, idx) => (
        <div key={index * 100 + idx} className="space-x-2 flex items-center">
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
      ))
    );
  };

  return (
    <div className="w-full h-[7rem] overflow-y-auto border">
      <div className="grid w-full  rounded-md grid-cols-2 gap-3  p-2 py-3 ">
        {" "}
        {renderCheckboxes()}
      </div>

      <div className="p-2">
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            onChange={(e) => {
              setShowMore(!showMore);
            }}
          />
          <label>Show more </label>
        </div>
      </div>

      {showMore && (
        <div className="grid w-full  rounded-md grid-cols-2 gap-3  p-2 py-3 ">
          {" "}
          {renderShowMoreCheckboxes()}
        </div>
      )}
    </div>
  );
};

export default IssueCheckboxes;
