/* eslint-disable prettier/prettier */
import lines from "@/images/external/lines.svg";
import Image from "next/image";
import React from "react";

import { Wrapper } from "~/components/layout/wrapper";
import { Card } from "~/components/ui/card"; // Assuming you're using shadcn/ui Card component

export const ExploreBanner: React.FC = () => {
  return (
    <Wrapper className={`my-14`}>
      <Card
        className="shadow-neob flex h-[164px] items-center justify-between overflow-hidden rounded-lg bg-low-warning p-4 lg:p-8"
        style={{
          backgroundImage: `url(${lines.src})`,
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Text Section */}
        <div className="max-w-[35rem] text-left">
          <h3 className="text-h3 sm:text-h3-sm md:text-h3-md leading-normal text-high-grey-III">
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
