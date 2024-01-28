import React from "react";
import { Rating } from "flowbite-react";

const StarRating = ({ rating }) => {
  const starCount = 5; // Total number of stars
  const filledStars = rating;
  const emptyStars = starCount - filledStars;

  return (
    <Rating>
      {[...Array(filledStars)].map((_, index) => (
        <Rating.Star key={index} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Rating.Star key={index} filled={false} />
      ))}
    </Rating>
  );
};

export default StarRating;
