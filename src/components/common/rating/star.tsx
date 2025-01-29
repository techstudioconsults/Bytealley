import { HTMLAttributes } from "react";

import { cn } from "~/utils/utils";

interface IStarRatingProperties extends HTMLAttributes<HTMLDivElement> {
  rating: number | undefined;
  size?: string; // Added size prop for star size customization
}

interface IStarProperties {
  filled: boolean;
  size: string; // Added size prop for star size customization
}

const Star = ({ filled, size }: IStarProperties) => {
  return filled ? (
    <span className={`px-0.5 text-mid-warning ${size}`}>★</span>
  ) : (
    <span className={`px-0.5 text-gray-400 ${size}`}>☆</span>
  );
};

export const StarRating = ({ rating = 0, className, size = "xl:text-2xl" }: IStarRatingProperties) => {
  const totalStars = 5;
  const stars = [];

  for (let index = 1; index <= totalStars; index++) {
    stars.push(<Star key={index} filled={index <= rating} size={size} />);
  }

  return <div className={cn("flex", className)}>{stars}</div>; // Added className for additional styling
};
