import { HTMLAttributes, useState } from "react";

import { cn } from "~/utils/utils";

interface IStarRatingProperties extends HTMLAttributes<HTMLDivElement> {
  rating?: number;
  size?: string;
  onRatingChange?: (rating: number) => void;
}

interface IStarProperties {
  filled?: boolean;
  size?: string;
  onClick?: () => void;
}

export const Star = ({ filled, size, onClick }: IStarProperties) => {
  return filled ? (
    <span className={`h-fit px-0.5 text-mid-warning ${size}`} onClick={onClick}>
      ★
    </span>
  ) : (
    <span className={`h-fit px-0.5 text-gray-400 ${size}`} onClick={onClick}>
      ☆
    </span>
  );
};

export const StarRating = ({ rating = 0, className, size = "xl:text-2xl", onRatingChange }: IStarRatingProperties) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const totalStars = 5;
  const stars = [];

  const handleClick = (index: number) => {
    // If clicking the same star that's currently selected, clear the rating
    const newRating = currentRating === index ? 0 : index;
    setCurrentRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  for (let index = 1; index <= totalStars; index++) {
    stars.push(
      <Star
        key={index}
        filled={currentRating !== 0 && index <= currentRating}
        size={size}
        onClick={() => handleClick(index)}
      />,
    );
  }

  return <div className={cn("flex", className)}>{stars}</div>;
};
