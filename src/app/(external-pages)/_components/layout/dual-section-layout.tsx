import React from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { cn } from "~/utils/utils";

interface DualSectionLayoutProperties {
  children: React.ReactNode;
  img: string;
  height?: string;
  className?: string;
  imgClassName?: string;
  leftSectionClassName?: string;
  rightSectionClassName?: string;
}

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
      <div className={cn("flex flex-1", leftSectionClassName)}>{children}</div>
      <div className={cn("hidden flex-1 lg:flex", "overflow-hidden", rightSectionClassName)}>
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
}) => {
  return (
    <section className={cn(className)}>
      <div className={`space-y-4`}>
        <h1 className={cn(headerClassName)}>{title}</h1>
        <p className={cn(subHeaderClassName)}>{subTitle}</p>
      </div>
      {listItems && (
        <ul className="space-y-3">
          {listItems.map((list, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={iconColor}>★</span>
              <p>{list}</p>
            </li>
          ))}
        </ul>
      )}
      {shouldShowButton && (
        <div className="mt-10">
          <CustomButton variant="primary" onClick={onButtonClick}>
            {buttonText}
          </CustomButton>
        </div>
      )}
    </section>
  );
};
