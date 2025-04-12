"use client";

import Image from "next/image";
import { ButtonHTMLAttributes, useTransition } from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/utils/utils";

interface ActionBannerProperties {
  title: string;
  description: string;
  button: {
    label: string;
    onClick?: () => Promise<void> | void;
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
  const [isPending, startTransition] = useTransition();
  const { label, className: buttonClassName, onClick, ...buttonProperties } = button;

  const handleClick = () => {
    startTransition(async () => {
      if (!onClick) return;
      await onClick();
    });
  };

  return (
    <div className={cn("flex items-center rounded-[9px] p-6", "border border-low-grey-III", className)}>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isCompleted}
            className={cn("h-6 w-6 rounded-full border-2", isCompleted ? "border-black bg-primary" : "border-primary")}
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="font-bold text-mid-grey-III">{title}</p>
              {!isCompleted && <p className="text-sm text-mid-grey-III">{description}</p>}
            </div>

            {!isCompleted && (
              <CustomButton
                isLoading={isPending}
                size="lg"
                variant="primary"
                className={cn("w-fit", buttonClassName)}
                onClick={handleClick}
                {...buttonProperties}
              >
                {label}
              </CustomButton>
            )}
          </div>
        </div>

        {icon && !isCompleted && (
          <Image src={icon} alt="" width={178} height={82} className="hidden object-contain sm:block" />
        )}
      </div>
    </div>
  );
};
