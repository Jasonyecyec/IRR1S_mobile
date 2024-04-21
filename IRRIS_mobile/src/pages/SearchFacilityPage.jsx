import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import useDebouncedSearch from "../hooks/useDebouncedSearch ";
import { searchFacility, fetchFacility } from "../services/api/sharedService";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";
import { getImageUrl } from "../utils/utils";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import "../index.css";

const SearchFacilityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] = useState([]); // State to store facilities
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useDebouncedSearch(async (query) => {
    if (query) {
      setIsLoading(true);
      try {
        const { facilities } = await searchFacility(query);
        console.log("facilites", facilities);
        setFacilities(facilities);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchFacilities();
    }
    console.log("query", query);
  }, 300);

  // Function to fetch facilities from the backend
  const fetchFacilities = async () => {
    setIsLoading(true); // Start fetching
    try {
      const response = await fetchFacility();
      console.log("response", response);
      setFacilities(response.facilities);
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
    fetchFacilities();
  }, []);

  return (
    <div className="h-screen w-screen bg-secondaryColor ">
      {" "}
      <PageTitle title="SEARCH FACILITY" />
      <div className=" p-5 pt-14">
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
              <button className="bg-mainColor px-3 py-2 rounded-md">
                <MagnifyingGlass size={24} color="#ffffff" />
              </button>
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
              ) : facilities.length === 0 ? (
                <p className="font-bold mt-10 text-xl">No Facility found</p>
              ) : (
                facilities.map((facility) => (
                  <Link
                    key={facility.id}
                    to={`/review-facility/${facility.qr_code}`}
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
                        <p>Building: {facility.location}</p>
                        <p>{facility.facilities_name}</p>
                        <p className="flex space-x-2">
                          <StarRating
                            rating={Math.floor(facility.averageRating)}
                            // rating={facility.averageRating}
                          />
                          <span className="font-semibold">
                            {" "}
                            {facility.averageRating}/5
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

export default SearchFacilityPage;
