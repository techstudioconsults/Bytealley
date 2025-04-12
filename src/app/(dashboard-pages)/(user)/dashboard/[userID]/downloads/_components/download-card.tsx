// components/DownloadCard.tsx

import React from "react";

import { BlurImage } from "~/components/miscellaneous/blur-image";
import { cn } from "~/utils/utils";

interface DownloadCardProperties extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  author: string;
  image: string;
  price: number;
}

export const DownloadCard: React.FC<DownloadCardProperties> = ({
  title,
  image,
  author,
  price,
  className,
  ...properties
}) => {
  return (
    <section
      {...properties}
      className={cn(`mx-auto max-w-[265px] cursor-pointer overflow-hidden rounded-lg border`, className)}
    >
      <div className={`bg-low-grey-II`}>
        <BlurImage width={265} height={225} src={image} alt={title} className={`h-[225px] object-cover`} />
      </div>
      <div className={`space-y-1 p-4`}>
        <p className={`text-sm font-bold`}>{title}</p>
        <p className={`text-xs`}>By {author}</p>
        <p className={`text-sm font-semibold text-mid-purple`}>&#8358;{price.toLocaleString()}</p>
      </div>
    </section>
  );
};
