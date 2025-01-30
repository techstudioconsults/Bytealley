"use client";

import Image from "next/image";

import CustomButton from "~/components/common/common-button/common-button";
import { cn } from "~/utils/utils";

interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface EmptyStateProperties {
  images: ImageConfig[];
  title?: string;
  description: string;
  button?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const EmptyState = ({ images, title, description, button, className = "" }: EmptyStateProperties) => {
  return (
    <div
      className={cn(
        "flex min-h-[400px] w-full flex-col items-center justify-center space-y-8 px-4 text-center",
        className,
      )}
    >
      {/* Images container */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 240}
              height={image.height || 160}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Content container */}
      <div className="flex flex-col items-center space-y-4">
        {title && <h3 className="text-2xl font-semibold text-primary">{title}</h3>}

        <p className="max-w-[500px] text-base text-muted-foreground">{description}</p>

        {button && (
          <CustomButton onClick={button.onClick} variant="primary" size="xl" className="mt-6">
            {button.icon && <span className="mr-2">{button.icon}</span>}
            {button.text}
          </CustomButton>
        )}
      </div>
    </div>
  );
};
