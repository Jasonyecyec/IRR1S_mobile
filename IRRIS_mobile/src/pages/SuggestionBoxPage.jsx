import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { SkipBack, Camera } from "@phosphor-icons/react";

function SuggestionBoxPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };

  return (
    <div className="">
      <header className="fixed z-[-1] top-0 left-0 right-0 bg-blue-900 rounded-b-[2.5rem] h-20 flex items-center justify-between px-5">
        <div className="backbutton  w-[2rem] ml-2 mt-1">
          <Link to="/" className="text-white  ">
            <SkipBack size={32} />
          </Link>
        </div>
      </header>

      <div className="flex justify-center mt-[5rem] z-1">
        <div className="banner w-[17rem] h-[4rem] rounded-full bg-blue-100 flex justify-center align-items-center pt-2 pb-2 mt-[-2rem]">
          {" "}
          <p class="text-3xl font-medium text-gray-900 dark:text-white">
            Suggestion Box
          </p>
        </div>
      </div>

      {/* SUGGESTION BOX FORM */}

      <div className="form-container max-w-sm mx-auto h-[85vh]  overflow-y-auto">
        <form class="max-w-sm mx-auto mt-2 ">
          <div class="mb-5">
            <label
              htmlFor="text"
              class="block text-sm font-medium text-gray-900 dark:text-white"
            >
              <span class="flex items-center justify-between">Facility ID</span>
            </label>
            <span className="text-[0.6rem] font-small">
              N/A, if not applicable
            </span>
            <input
              type="text"
              id="FacilityID"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ex. 123456"
              required
            />
          </div>
          <div class="mb-5">
            <label
              htmlFor="text"
              class="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Room
            </label>
            <span className="text-[0.6rem] font-small">
              N/A, if not applicable
            </span>
            <input
              type="text"
              id="Room"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="ex. IL503"
            />
          </div>
          <div class="mb-5">
            <label
              htmlFor="text"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <input
              type="text"
              id="Location"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="ex. Open Ground"
            />
          </div>

          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>

          {/* ----------------------------------------------------------------------------------------------------------------- */}
          <div className="relative">
            <button
              ref={buttonRef}
              id="dropdownDividerButton"
              onClick={toggleDropdown}
              className="text-white w-full flex justify-between bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {selectedItem || "Issue Type"}
              <svg
                className={`w-2.5 h-2.5 ms-3 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isOpen && (
              <div
                id="dropdownDivider"
                className="z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute"
                style={{
                  top: buttonRef.current.offsetHeight,
                  left: buttonRef.current.offsetLeft,
                }}
              >
                <div className="max-h-60  overflow-y-auto">
                  <ul>
                    <li className="flex justify-center">
                      <a
                        href="#"
                        onClick={() => handleItemClick("Issue Type")}
                        className="block px-4 py-2 text-gray-500 dark:text-gray-400 font-medium"
                      >
                        Not the following
                      </a>
                    </li>
                  </ul>
                  <ul
                    className="py-2 text-sm w-full text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li className="flex justify-center">
                      <span className="block px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">
                        Maintenance and Repairs
                      </span>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick("Roof Leaks : Carpentry")
                        }
                      >
                        Roof Leaks : Carpentry
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick("Window Breaks : Carpentry")
                        }
                      >
                        Window Breaks : Carpentry
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick("Electrical Issues : Electrical")
                        }
                      >
                        Electrical Issues : Electrical
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick("Plumbing Problems : Plumbing")
                        }
                      >
                        Plumbing Problems : Plumbing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick("Broken Chairs/Tables : Carpentry")
                        }
                      >
                        Broken Chairs/Tables : Carpentry
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick(" Elevator Malfunction : Electrical")
                        }
                      >
                        Elevator Malfunction : Electrical
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick("Pathway Repairs : Carpentry")
                        }
                      >
                        Pathway Repairs : Carpentry
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() =>
                          handleItemClick("Outdoor Lighting : Electrical")
                        }
                      >
                        Outdoor Lighting : Electrical
                      </a>
                    </li>
                  </ul>

                  <div className="py-2">
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                      <li className="flex justify-center">
                        <span className="block px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">
                          Cleanliness and Sanitation
                        </span>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick(
                              "Restroom Cleanliness : Maintenance"
                            )
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Restroom Cleanliness : Maintenance
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick("Garbage Disposal : Maintenance")
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Garbage Disposal : Maintenance
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick("Pest Control : Maintenance")
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Pest Control : Maintenance
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick("Area Cleaning : Maintenance")
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Area Cleaning : Maintenance
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick(" Garden Maintenance : Maintenance")
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Garden Maintenance : Maintenance
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="py-2">
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                      <li className="flex justify-center">
                        <span className="block px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">
                          Temperature and Ventilation
                        </span>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick("HVAC Problems : Electrical")
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          HVAC Problems : Electrical
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick("Heating/Cooling : Electrical")
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Heating/Cooling : Electrical
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            handleItemClick("Ventilation Issues : Electrical")
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Ventilation Issues : Electrical
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* ------------------------------------------------------------------------------- */}

          <label
            class="block mb-1 mt-3 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>

          <div className="flex ">
            <div class="flex items-center justify-center w-full sm:w-[10rem] mt-1">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-2 pb-3 sm:pt-5 sm:pb-6">
                  <svg
                    class="w-6 h-6 mb-2 sm:w-8 sm:h-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-1 text-[0.7rem] sm:mb-2 sm:text-xs text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-[0.7rem] text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>

            <div className="mt-1 bg-gray-200 w-full rounded-[0.5rem] ml-1">
              <Link
                to="#"
                className="w-full h-full flex justify-center items-center"
              >
                <Camera size={100} weight="thin" />{" "}
              </Link>
            </div>
          </div>

          <input
            class="block w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />

          <br />
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Report Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuggestionBoxPage;
