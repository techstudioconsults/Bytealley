import { HTMLAttributes, useState } from "react";

import { cn } from "~/utils/utils";

interface IStarRatingProperties extends HTMLAttributes<HTMLDivElement> {
  rating?: number;
  size?: string;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean; // Add a disabled prop
}

interface IStarProperties {
  filled?: boolean;
  size?: string;
  onClick?: () => void;
  disabled?: boolean; // Add a disabled prop to Star
}

export const Star = ({ filled, size, onClick, disabled }: IStarProperties) => {
  return filled ? (
    <span
      className={`h-fit px-0.5 text-mid-warning ${size}`}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      ★
    </span>
  ) : (
    <span
      className={`h-fit px-0.5 text-gray-400 ${size}`}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      ☆
    </span>
  );
};

export const StarRating = ({
  rating = 0,
  className,
  size = "xl:text-2xl",
  onRatingChange,
  disabled = true,
}: IStarRatingProperties) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const totalStars = 5;
  const stars = [];

  const handleClick = (index: number) => {
    if (disabled) return; // Do nothing if disabled
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
        disabled={disabled} // Pass disabled prop to Star
      />,
    );
  }

  return <div className={cn("flex", className)}>{stars}</div>;
};
