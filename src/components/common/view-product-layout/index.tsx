"use client";

import Image from "next/image";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/utils/utils";
import { StarRating } from "../rating/star";

export function ViewProductLayout() {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = `Lorem ipsum eurolip: viva nyvir terast, beligi. Tinyng dena pros tetragisala, dar ultraska astrodadis. Ninca
    bizonnat sydovie och disejortad, reel och nektigt epogisk fagsik endotet ifall trernfaktisk dobektig.
    Jumbeat digital villing variet. Intravasse autongen nagon, nöselingbar egorad, innan vytöra datas som
    tiverar, tar. Koktiga ortoktig om spogi phippo padio gon eper. Sed konsejo gol och olisi plåtiga att fara,
    sedat i ren i takvisnins. Juje sasseligi en att tiivis utom trefaleries beprecis i homoliga i onale, den
    nesade radiocepiton. Synt mis ansam lelingar i kroheten att sotögen att egojusonde i rom respektive kontrad
    mikrossa mitfoligt. Miv dinur och blikad, seda om än kvasiit öna. Al etnovalens resultat problem aktivitet
    med. Ete: normen avsed i homet på kunst presenter. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore hic voluptate tempora laudantium
	aperiam sunt sint accusantium doloremque, itaque asperiores ab excepturi blanditiis veniam, minima debitis impedit, reiciendis eligendi id. Lorem ipsum`;

  const isLongDescription = description.trim().split(" ").length > 10;

  return (
    <section className="mx-auto grid max-w-[990px] grid-cols-1 gap-6 rounded-lg md:grid-cols-12">
      {/* Main Content Section */}
      <main className="md:col-span-8">
        {/* Product Image and Header */}
        <header className="mb-4">
          <div className="relative mb-4 h-48 w-full rounded-md bg-gray-100 md:h-[263px]">
            <Image src="/images/logo.svg" alt="Product Image" fill className="rounded-md object-cover" priority />
          </div>
          <div className={`rounded-md border p-4`}>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              CREATIVE & PROFESSIONAL RESPONSIVE WORDPRESS WEBSITES
            </h1>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className={`font-bold`}> Author Name</span>
              </p>
              <div className="flex items-center gap-2">
                <StarRating rating={4} />
                <span className="font-bold">24 ratings</span>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className={`mb-4 rounded-md border p-4`}>
          <h2 className="mb-4 border-b py-4 text-xl font-bold text-gray-900">Features</h2>
          <ul className="list-inside list-disc space-y-4 text-gray-700">
            <p>✔️ 24 x 24px Pixel grid</p>
            <p>✔️ Very organized library</p>
            <p>✔️ Clean & smooth icons</p>
            <p>✔️ Lifetime free updates</p>
          </ul>
        </section>

        {/* Description Section */}
        <section className="mb-4 rounded-md border p-4">
          <h2 className="mb-4 border-b py-4 text-xl font-bold text-gray-900">Description</h2>
          <div>
            <p
              className={cn("text-gray-700 transition-all duration-300", {
                "line-clamp-3": !isExpanded,
              })}
            >
              {description}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-blue-500 hover:underline focus:outline-none"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Sidebar Section */}
      <aside className="md:col-span-4">
        {/* Price and Action Buttons */}
        <section className="rounded-md border p-4">
          <div className="mb-8">
            <div className={`flex items-center justify-between rounded-md bg-low-purple p-2`}>
              <p className="font-semibold">Sold</p>
              <p className="text-sm font-semibold">20</p>
            </div>
            <p className="mb-7 mt-4 text-2xl font-bold">N200,000 - N500,000</p>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <button className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 md:w-auto">
                Add to Car
              </button>
              <button className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 md:w-auto">
                Buy Now
              </button>
            </div>
          </div>

          {/* Product Includes Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">The Product Includes</h2>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Responsive design</li>
              <li>8 plugins</li>
              <li>Hosting Setup</li>
              <li>Functional website</li>
            </ul>
          </div>
        </section>

        {/* Product Reviews Section */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Product Reviews</h2>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-lg border p-4">
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur. Telius anest nulla nam elit vivem.
                </p>
                <p className="mt-2 text-sm text-gray-500">Tomlade Openly ★★★★ 2 nostrin 500</p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </section>
  );
}
