"use client";

import React, { ReactNode } from "react";

import { cn } from "~/utils/utils";

interface AnalyticsCardProperties {
  title: string;
  value: string | number | ReactNode | undefined;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  onClick?: () => void;
  backgroundImage?: string;
  action?: React.ReactNode;
}

export const AnalyticsCard: React.FC<AnalyticsCardProperties> = ({
  title,
  value,
  icon,
  trend,
  className,
  valuePrefix = "",
  valueSuffix = "",
  onClick,
  backgroundImage,
  action,
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border p-4 text-black transition-shadow duration-200",
        !backgroundImage && "bg-white dark:bg-high-grey-II",
        "w-full min-w-[200px]",
        onClick && "cursor-pointer",
        className,
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
      onClick={onClick}
    >
      {icon && (
        <div className="relative mb-4 flex items-start justify-between">
          {icon && <div className="flex h-10 w-10 items-center justify-center">{icon}</div>}
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium",
                trend.isPositive ? "bg-low-success text-mid-success" : "bg-low-danger text-mid-danger",
              )}
            >
              <span>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
      )}
      <div className="relative">
        <p className="font-medium">{title}</p>
        <div className={`flex items-end justify-between`}>
          <p className="mt-2 text-2xl font-semibold">
            {valuePrefix}
            {value}
            {valueSuffix}
          </p>
          {action}
        </div>
      </div>
    </div>
  );
};
