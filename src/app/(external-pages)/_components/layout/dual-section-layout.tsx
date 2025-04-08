"use client";

import React from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { useSession } from "~/hooks/use-session";
import { cn } from "~/utils/utils";

export const DualSectionLayout: React.FC<DualSectionLayoutProperties> = ({
  children,
  img,
  height = "",
  className = "",
  imgClassName = "",
  leftSectionClassName = "",
  rightSectionClassName = "",
}) => {
  return (
    <div className={cn("flex", height, className)}>
      <div className={cn("flex lg:w-[50%]", leftSectionClassName)}>{children}</div>
      <div className={cn("hidden lg:flex lg:w-[50%]", "overflow-hidden", rightSectionClassName)}>
        <BlurImage width={1000} height={1000} src={img} alt="img" className={cn(`h-auto w-auto`, imgClassName)} />
      </div>
    </div>
  );
};

export const DualSectionLayoutList: React.FC<DualSectionLayoutListProperties> = ({
  title,
  subTitle,
  listItems,
  iconColor = "text-yellow-400",
  shouldShowButton = false,
  buttonText = "Get Started",
  onButtonClick,
  className = "",
  headerClassName = "",
  subHeaderClassName = "",
  buttonClassName = "",
}) => {
  const { user } = useSession();
  return (
    <section className={cn(className)}>
      <div className={`space-y-4`}>
        <h1 className={cn(`text-center lg:text-left`, headerClassName)}>{title}</h1>
        <p className={cn(`text-center lg:text-left`, subHeaderClassName)}>{subTitle}</p>
      </div>
      {listItems && (
        <ul className="mt-8 space-y-3">
          {listItems.map((list, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={iconColor}>★</span>
              <p>{list}</p>
            </li>
          ))}
        </ul>
      )}
      {!user && shouldShowButton && (
        <div className="mt-10">
          <CustomButton
            href={`/auth/login`}
            size={`xl`}
            className={cn(buttonClassName)}
            variant="primary"
            onClick={onButtonClick}
          >
            {buttonText}
          </CustomButton>
        </div>
      )}
    </section>
  );
};
