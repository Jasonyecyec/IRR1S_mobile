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
    <div className="w-screen h-screen   flex flex-col">
      <PageTitle title="AVAILABLE FACILITY" />

      <div className="p-5 pt-10">
        <div className="space-y-8">
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
            <div className="font-semibold flex p-2 items-center bg-mainColor2 text-white rounded-t-md text-sm">
              <p className="w-24  text-center ">Image</p>
              <p className="px-5">Description</p>
            </div>

            <div className=" h-[33rem] overflow-y-auto space-y-5 flex flex-col items-center  rounded-lg py-2">
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
                    <div className=" rounded-md border  p-2 flex w-full">
                      <div>
                        <img
                          src={getImageUrl(facility.facilities_image)}
                          alt="facility-img"
                          className="w-24 h-24 bg-red-200 rounded-md"
                        />
                      </div>
                      <div className="pl-5 space-y-1">
                        <p className="font-semibold capitalize">
                          {facility.facilities_name}
                        </p>
                        <p className="text-sm">
                          Description: {facility.description}
                        </p>

                        {facility.building_id !== null && (
                          <>
                            <p className="text-sm">
                              <span>Building: </span>{" "}
                              <span>{facility.building?.building_name}</span>
                            </p>
                            <p className="text-sm">
                              <span>Floor: </span> <span>{facility.floor}</span>
                            </p>
                          </>
                        )}
                        <p className="text-sm">
                          <span>Capacity:</span>{" "}
                          <span>{facility.capacity}</span>
                        </p>
                        <p>
                          <span className="capitalize text-sm font-semibold bg-green-100 p-1 rounded-md px-2 text-green-500">
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
