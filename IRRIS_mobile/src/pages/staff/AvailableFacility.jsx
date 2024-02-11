import React, { useState, useEffect } from "react";
import "../../index.css";
import PageTitle from "@/src/components/PageTitle";
import useDebouncedSearch from "@/src/hooks/useDebouncedSearch ";
import {
  fetchFacilityToReserve,
  searchFacilityToReserve,
} from "@/src/services/api/StaffService";
import { Spinner } from "flowbite-react";
import { getImageUrl } from "@/src/utils/utils";
import { Link } from "react-router-dom";

const AvailableFacility = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] = useState([]); // State to store facilities
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useDebouncedSearch(async (query) => {
    if (query) {
      setIsLoading(true);
      try {
        const { facilities } = await searchFacilityToReserve(query);
        console.log("facilites", facilities);
        setFacilities(facilities);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchAvailableFacilityToReserve();
    }
    // console.log("query", query);
  }, 300);

  const fetchAvailableFacilityToReserve = async () => {
    setIsLoading(true); // Start fetching
    try {
      const { facilities } = await fetchFacilityToReserve();
      console.log("response", facilities);
      setFacilities(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setIsLoading(false); // End fetching
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;

    setSearchQuery(query);
    handleSearch(query);
  };

  useEffect(() => {
    fetchAvailableFacilityToReserve();
  }, []);
  return (
    <div className="w-screen h-screen background flex flex-col">
      <PageTitle title="AVAILABLE FACILITY" />

      <div className="p-5 pt-14">
        <div className="space-y-10">
          <div className="space-y-2">
            <label>Enter facility name:</label>
            <div className="flex space-x-5">
              {" "}
              <input
                type="text"
                placeholder="Search facility"
                className="w-full rounded-md"
                onChange={handleInputChange}
              />
              {/* <button className="bg-mainColor px-3 py-2 rounded-md">
                <MagnifyingGlass size={24} color="#ffffff" />
              </button> */}
            </div>
          </div>

          <div className="rounded-md">
            <div className="font-bold flex bg-gray-200 p-2 items-center">
              <p className="w-24 border-2 text-center ">Facility</p>
              <p className="px-5">Description</p>
            </div>

            <div className="bg-white h-[33rem] overflow-y-auto space-y-8 flex flex-col items-center shadow-md rounded-lg">
              {isLoading ? (
                <Spinner
                  aria-label="Large spinner example"
                  size="lg"
                  className="mt-10"
                />
              ) : facilities && facilities.length === 0 ? (
                <p className="font-bold mt-10 text-xl">No Facility found</p>
              ) : (
                facilities &&
                facilities.map((facility) => (
                  <Link
                    key={facility.id}
                    to={`/staff/pencil-book/${facility.qr_code}`}
                    className="w-full"
                  >
                    <div className="shadow-md bg-white border-2 p-3 flex w-full">
                      <div>
                        <img
                          src={getImageUrl(facility.facilities_image)}
                          alt="facility-img"
                          className="w-24 h-20 bg-red-200 rounded-md"
                        />
                      </div>
                      <div className="pl-5">
                        <p>{facility.facilities_name}</p>
                        <p>Building: {facility.location}</p>

                        <p>
                          <span className="capitalize font-semibold text-green-500">
                            {facility.status}{" "}
                          </span>
                        </p>
                        <p className="flex space-x-2">
                          {/* <StarRating
                            rating={Math.floor(facility.averageRating)}
                            // rating={facility.averageRating}
                          /> */}
                          <span className="font-semibold">
                            {" "}
                            {/* {facility.averageRating}/5 */}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableFacility;
