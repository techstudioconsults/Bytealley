"use client";

import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/utils/utils";

interface ActionBannerProperties {
  title: string;
  description: string;
  button: {
    label: string;
    onClick?: () => void;
    className?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: string;
  className?: string;
  isCompleted?: boolean;
}

export const ActionBanner = ({
  title,
  description,
  button,
  icon,
  className,
  isCompleted = false,
}: ActionBannerProperties) => {
  const { label, className: buttonClassName, ...buttonProperties } = button;

  return (
    <div
      className={cn(
        "flex min-h-[140px] items-center rounded-[9px] bg-white p-6",
        "border border-low-grey-III",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isCompleted}
            className={cn(
              "mt-1 h-6 w-6 rounded-full border-2",
              isCompleted ? "border-black bg-primary" : "border-primary",
            )}
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-mid-grey-III">{title}</p>
              <p className="text-sm text-mid-grey-III">{description}</p>
            </div>

            <CustomButton size="lg" variant="primary" className={cn("w-fit", buttonClassName)} {...buttonProperties}>
              {label}
            </CustomButton>
          </div>
        </div>

        {icon && <Image src={icon} alt="" width={178} height={82} className="hidden object-contain sm:block" />}
      </div>
    </div>
  );
};
