import { forwardRef } from "react";

import { BlurImage } from "~/components/miscellaneous/blur-image";

export const IntegrationCard = forwardRef<HTMLDivElement, { image: string; text: string }>(({ image, text }, ref) => {
  return (
    <div ref={ref} className={`flex max-w-[190px] flex-col items-center justify-between gap-4 rounded-lg border p-3`}>
      <BlurImage src={image} alt={text} />
      <p className={`text-mid-grey-II`}>{text}</p>
    </div>
  );
});

// IntegrationCard.displayName = "IntegrationCard";
