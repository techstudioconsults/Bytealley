import lines from "@/images/external/lines.svg";
import Image from "next/image";
import React from "react";

import { Wrapper } from "~/components/layout/wrapper";
import { Card } from "~/components/ui/card"; // Assuming you're using shadcn/ui Card component

export const ExploreBanner: React.FC = () => {
  return (
    <Wrapper className={`my-14`}>
      <Card
        className="flex h-[164px] items-center justify-between overflow-hidden rounded-lg bg-low-warning p-4 shadow-neob lg:p-8"
        style={{
          backgroundImage: `url(${lines.src})`,
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Text Section */}
        <div className="max-w-[35rem] text-left">
          <h3 className="font-bold text-high-grey-III lg:leading-10">
            Unlock your potential with creator’s curated course.
          </h3>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block">
          <Image
            src="https://res.cloudinary.com/kingsleysolomon/image/upload/v1706092414/productize/Frame_40353_wiryex.png"
            alt="Explore Banner Illustration"
            width={200}
            height={150}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </Card>
    </Wrapper>
  );
};
