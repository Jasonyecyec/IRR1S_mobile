import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SkipBack,
  SmileyAngry,
  SmileySad,
  SmileyMeh,
  Smiley,
  ArrowLeft,
} from "@phosphor-icons/react";

function StudentAboutUs() {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div>
      <header className="  bg-mainColor2 rounded-b-[2.5rem] h-20 flex items-center justify-between px-5">
        <div className="backbutton  w-[2rem] ml-2 mt-1">
          <Link to="/student/profile" className="text-white  ">
            <ArrowLeft size={32} />
          </Link>
        </div>
      </header>

      <div className="h-[90vh]  overflow-y-auto pt-5 pb-5">
        <div>
          <div className="flex justify-center items-center mt-5 pt-5">
            <div class="w-[95%] max-w-sm bg-white border border-gray-200 r shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="satisfactory-container  h-[20rem]">
                <div className="flex justify-center items-center">
                  <span className="text-2xl text-white rounded-[2.5rem] bg-blue-700 w-[15rem] h-[3.5rem] mt-[-1rem] flex justify-center items-center">
                    System Evaluation
                  </span>
                </div>
                <div className=" pb-4">
                  <div className="emoji flex justify-between items-center p-4 pb-1 ">
                    <a>
                      <SmileyAngry size={60} />
                      Frustrated
                    </a>
                    <a>
                      <SmileySad size={60} />
                      Unhappy
                    </a>
                    <a>
                      <SmileyMeh size={60} />
                      Neutral
                    </a>
                    <a>
                      <Smiley size={60} />
                      Satisfied
                    </a>
                  </div>
                  <div className=" flex flex-col items-center mt-6 justify-center h-full">
                    <p class="text-4xl text-gray-900 dark:text-white">
                      Rate Us
                    </p>
                    <p class="text-sm text-gray-900 dark:text-white">
                      Unhappy - Happy
                    </p>
                    <br />
                    <div>
                      <form>
                        <label for="chat" class="sr-only">
                          Your message
                        </label>
                        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <button
                            type="button"
                            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              class="w-5 h-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 18"
                            >
                              <path
                                fill="currentColor"
                                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                              />
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                              />
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                              />
                            </svg>
                            <span class="sr-only">Upload image</span>
                          </button>
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              class="w-5 h-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                              />
                            </svg>
                            <span class="sr-only">Add emoji</span>
                          </button>
                          <textarea
                            id="chat"
                            rows="1"
                            class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                          ></textarea>
                          <button
                            type="submit"
                            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                          >
                            <svg
                              class="w-5 h-5 rotate-90 rtl:-rotate-90"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span class="sr-only">Send message</span>
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* ______________________________________________________________________________________________________________________________ */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="flex flex-col items-center justify-center">
          <div className="w-[95%] h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <ul
              className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
              id="defaultTab"
              role="tablist"
            >
              <li className="me-2">
                <button
                  onClick={() => handleTabClick("about")}
                  type="button"
                  role="tab"
                  aria-controls="about"
                  aria-selected={activeTab === "about"}
                  className={`inline-block p-4 ${
                    activeTab === "about"
                      ? "text-blue-600"
                      : "hover:text-gray-600"
                  } rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500 dark:hover:text-gray-300`}
                >
                  About
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick("services")}
                  type="button"
                  role="tab"
                  aria-controls="services"
                  aria-selected={activeTab === "services"}
                  className={`inline-block p-4 ${
                    activeTab === "services"
                      ? "text-blue-600"
                      : "hover:text-gray-600"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
                >
                  Services
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick("statistics")}
                  type="button"
                  role="tab"
                  aria-controls="statistics"
                  aria-selected={activeTab === "statistics"}
                  className={`inline-block p-4 ${
                    activeTab === "statistics"
                      ? "text-blue-600"
                      : "hover:text-gray-600"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
                >
                  Facility
                </button>
              </li>
            </ul>
            <div id="defaultTabContent">
              <div
                className={`p-4 bg-white rounded-lg md:p-8 ${
                  activeTab === "about" ? "" : "hidden"
                } dark:bg-gray-800`}
                id="about"
                role="tabpanel"
                aria-labelledby="about-tab"
              >
                {/* Content for About tab */}
                <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Quezon City University
                </h2>
                <p class="mb-3 text-gray-500 dark:text-gray-400">
                  Empower Developers, IT Ops, and business teams to collaborate
                  at high velocity. Respond to changes and deliver great
                  customer and employee service experiences fast.
                </p>
                <a
                  href="#"
                  class="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
                >
                  Learn more
                  <svg
                    class=" w-2.5 h-2.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
              <div
                className={`p-4 bg-white rounded-lg md:p-8 ${
                  activeTab === "services" ? "" : "hidden"
                } dark:bg-gray-800`}
                id="services"
                role="tabpanel"
                aria-labelledby="services-tab"
              >
                {/* Content for Services tab */}
                <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  QCU Services
                </h2>

                {/* <!-- List --> */}

                <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                      Admins and Staffs
                    </h5>
                    <a
                      href="#"
                      class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      View all
                    </a>
                  </div>
                  <div class="flow-root">
                    <ul
                      role="list"
                      class="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center">
                          <div class="flex-shrink-0">
                            <img
                              class="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-1.jpg"
                              alt="Neil image"
                            />
                          </div>
                          <div class="flex-1 min-w-0 ms-4">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Neil Sims
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                        </div>
                      </li>
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center ">
                          <div class="flex-shrink-0">
                            <img
                              class="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-3.jpg"
                              alt="Bonnie image"
                            />
                          </div>
                          <div class="flex-1 min-w-0 ms-4">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Bonnie Green
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                        </div>
                      </li>
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center">
                          <div class="flex-shrink-0">
                            <img
                              class="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-2.jpg"
                              alt="Michael image"
                            />
                          </div>
                          <div class="flex-1 min-w-0 ms-4">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Michael Gough
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                        </div>
                      </li>
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center ">
                          <div class="flex-shrink-0">
                            <img
                              class="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-4.jpg"
                              alt="Lana image"
                            />
                          </div>
                          <div class="flex-1 min-w-0 ms-4">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Lana Byrd
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                        </div>
                      </li>
                      <li class="pt-3 pb-0 sm:pt-4">
                        <div class="flex items-center ">
                          <div class="flex-shrink-0">
                            <img
                              class="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-5.jpg"
                              alt="Thomas image"
                            />
                          </div>
                          <div class="flex-1 min-w-0 ms-4">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Thomes Lean
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 bg-white rounded-lg md:p-8 ${
                  activeTab === "statistics" ? "" : "hidden"
                } dark:bg-gray-800`}
                id="statistics"
                role="tabpanel"
                aria-labelledby="statistics-tab"
              >
                {/* Content for Statistics tab */}

                <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                  <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">6</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Developers</dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">1</dt>
                    <dd class="text-gray-500 dark:text-gray-400">
                      Project Manager
                    </dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">6</dt>
                    <dd class="text-gray-500 dark:text-gray-400">
                      System Analysts
                    </dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">9</dt>
                    <dd class="text-gray-500 dark:text-gray-400">
                      Technical Writer
                    </dd>
                  </div>
                  <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">7</dt>
                    <dd class="text-gray-500 dark:text-gray-400">
                      UI Designer
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAboutUs;
