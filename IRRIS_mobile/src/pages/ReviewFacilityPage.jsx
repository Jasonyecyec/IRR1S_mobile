import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import PageTitle from "../components/PageTitle";
import { viewFacilityAndRatings } from "../services/api/sharedService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { getImageUrl } from "../utils/utils";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { getAllUsersFacilityReview } from "../services/api/sharedService";
import { Rating } from "flowbite-react";
import { formatDate } from "../utils/utils";
import StarRating from "../components/StarRating";

const ReviewFacilityPage = () => {
  const { facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [ratingsSummary, setRatingsSummary] = useState([]);
  const [usersReview, setUsersReview] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchFacility = async () => {
    setIsLoading(true);
    try {
      const { facility, ratings } = await viewFacilityAndRatings(facilityId);
      const { user_ratings } = await getAllUsersFacilityReview(facilityId);

      //convert object into array
      const ratingsArray = Object.entries(ratings)
        .reverse() // Reverse the order
        .map(([ratingKey, ratingValue]) => ({
          key: ratingKey,
          value: ratingValue,
        }));
      setFacility(facility);
      setRatingsSummary(ratingsArray); // Set ratings_summary from the API response
      console.log("user_rating", user_ratings);
      setUsersReview(user_ratings);
    } catch (error) {
      console.error("Error fetching facility:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacility();
  }, []);

  const data = [
    { name: "5 Star", count: 64 },
    { name: "4 Star", count: 31 },
    { name: "3 Star", count: 14 },
    // ... you can add more data points here
  ];

  const data2 = [
    {
      label: "5 Star",
      name: "Page A",
      count: ratingsSummary[5] || 0, // Use ratings_summary values
      countLabel: "100",
    },
    {
      label: "4 Star",
      name: "Page B",
      count: 21,
      countLabel: "100",
    },
    {
      label: "3 Star",
      name: "Page C",
      count: 8,
      countLabel: "100",
    },
    {
      label: "2 Star",
      name: "Page D",
      count: 23,
      countLabel: "100",
    },
    {
      label: "1 Star",
      name: "Page D",
      count: 45,
      countLabel: "100",
    },
  ];

  // Create data2 using map and ratings_summary
  // const data3 = [5, 4, 3, 2, 1].map((rating) => ({
  //   label: `${rating} Star`,
  //   name: `Page ${rating}`,
  //   count: ratingsSummary[rating] || 0,
  //   countLabel: "100",
  // }));

  return (
    <div className="h-screen w-screen background flex flex-col">
      <PageTitle title="RATE & REVIEW" />

      <div className="flex-1 p-5 pt-14">
        <div className="bg-white rounded-md ">
          <div className="font-bold flex   items-center">
            <p className="w-24  text-center border-2 p-2 ">Facility</p>
            <p className="px-5 border-2 p-2 flex-1">Description</p>
          </div>

          <div className="bg-white space-y-3 flex flex-col items-center shadow-md rounded-md p-2">
            {isLoading ? (
              <Spinner aria-label="Large spinner example" size="lg" />
            ) : (
              facility && (
                <div className=" -2 p-3 flex w-full" key={facility.id}>
                  <div>
                    <img
                      src={getImageUrl(facility.facilities_image)}
                      alt="facility-img"
                      className="w-24 h-20 bg-red-200 rounded-md"
                    />
                  </div>
                  <div className="pl-5">
                    <p className="font-bold">Building: {facility.location}</p>
                    <p>{facility.facilities_name}</p>
                    <p>{facility.description}</p>
                  </div>
                </div>
              )
            )}

            <div className="w-full flex flex-col justify-center text-center overflow-hidden">
              {/* <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  // width={500}
                  // height={200}
                  data={data3}
                  // barCategoryGap="35%"
                  layout="vertical"
                  // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" hide /> // Hide XAxis
                  <YAxis
                    dataKey="label"
                    type="category"
                    style={{ fontWeight: "bold" }}
                  />
                  
                  <Bar dataKey="count" fill="#2563eb" barSize={20}>
                    <LabelList
                      dataKey="count"
                      position="insideRight"
                      style={{ fill: "white" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer> */}
              {ratingsSummary.map((rating) => (
                <Rating.Advanced
                  percentFilled={rating.value}
                  className="mb-2 w-[30rem]"
                  // style={{ width: "100%" }}
                >
                  {rating.key} star
                </Rating.Advanced>
              ))}
            </div>

            <p className="w-full text-start font-semibold">User's review</p>
            <div className="bg-white w-full h-[13rem] flex flex-col items-center overflow-y-scroll space-y-3">
              {isLoading ? (
                <Spinner aria-label="Large spinner example" size="lg" />
              ) : (
                usersReview &&
                usersReview.map((item) => (
                  <div className="flex p-3 border-2 space-x-5 items-center rounded-lg w-full">
                    <div>
                      <img
                        alt="user-img"
                        className="w-12 h-12 rounded-full bg-red-300"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between w-full font-semibold">
                        <p>
                          {item.user?.first_name}{" "}
                          {item.user?.last_name.slice(0, 1)}.
                        </p>
                        <p>
                          <StarRating rating={item.rating} />
                        </p>
                        <p>{formatDate(item.created_at)}</p>
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                ))
              )}

              {usersReview && usersReview.length === 0 && (
                <p className="font-semibold text-lg">No User's Review </p>
              )}
            </div>

            <div className="flex justify-end w-full mt-20">
              <Link to={`/rate-facility/${facilityId}`}>
                {" "}
                <button className="bg-mainColor text-white px-5 py-2 rounded-md font-bold">
                  RATE FACILITY
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFacilityPage;
