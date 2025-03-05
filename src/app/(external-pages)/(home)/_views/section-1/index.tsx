"use client";

import Link from "next/link";
import React from "react";

import { SectionLayout } from "~/app/(external-pages)/_components/section-layout";
import CustomButton from "~/components/common/common-button/common-button";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { Card, CardContent } from "~/components/ui/card";
import { cards } from "~/utils/constants";

export const SectionOne = () => {
  const isAuth = false; // Replace with your auth logic

  return (
    <SectionLayout bgColor="bg-low-warning">
      <div className="pb-48 pt-72">
        <div className="flex flex-col gap-10 sm:gap-20 lg:flex-row">
          {/* Left Section */}
          <div className="flex flex-col justify-between text-center lg:w-[40%] lg:text-left">
            <h1 className="nr-font text-4xl font-bold leading-tight text-high-warning lg:text-7xl">
              You can monetize everything
            </h1>
            <p className="mb-8 mt-8 text-lg font-light lg:text-2xl">
              Are you a digital artist, designer, writer, or developer looking to share your creations with the world
              and earn from your passion? Look no further! ByteAlley is the ultimate platform for creators like you.
            </p>
            {!isAuth && (
              <div className="hidden lg:block">
                <Link href="/auth">
                  <CustomButton className={`w-full`} size={`xl`} variant={`primary`}>
                    Get Started
                  </CustomButton>
                </Link>
              </div>
            )}
          </div>

          {/* Right Section - Cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:w-[60%]">
            {cards.map((card, index) => (
              <Card key={index} className="shadow-neoB h-full rounded-xl border-0 bg-white shadow">
                <CardContent className="p-6">
                  <BlurImage
                    src={card.image}
                    alt={card.title}
                    width={100}
                    height={100}
                    className="h-auto w-auto rounded-lg"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{card.title}</h2>
                  <p className="mt-2 text-gray-500">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
