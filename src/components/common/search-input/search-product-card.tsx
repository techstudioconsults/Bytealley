import Link from "next/link";
import React from "react";

import { BlurImage } from "~/components/miscellaneous/blur-image";

interface SearchProductCardProperties {
  imageUrl: string;
  imageAlt: string;
  productName: string;
  author: string;
  productLink: string;
  onProductClick?: () => void;
}

export const SearchProductCard: React.FC<SearchProductCardProperties> = ({
  imageUrl,
  imageAlt,
  productName,
  author,
  productLink,
  onProductClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-end gap-2">
        <div className="relative h-6 w-6 overflow-hidden rounded-[4px] sm:h-12 sm:w-12">
          <BlurImage
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 1.5rem, 3rem"
          />
        </div>
        <div>
          <p className="text-xs font-semibold sm:text-base">{productName}</p>
          <p className="text-[10px] sm:text-xs">{author}</p>
        </div>
      </div>
      <Link
        onClick={onProductClick}
        href={`/explore/product/${productLink}`}
        className="text-sm font-semibold text-mid-purple hover:underline"
      >
        view product
      </Link>
    </div>
  );
};
