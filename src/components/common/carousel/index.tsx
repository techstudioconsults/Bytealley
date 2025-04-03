"use client";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const ProductImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <div className="relative z-0 mb-4 h-48 w-full rounded-md border bg-gray-100 md:h-[263px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-48 w-full rounded-md md:h-[263px]">
              <Image
                src={image || "/placeholder-image.jpg"}
                alt={`Product Image ${index + 1}`}
                fill
                className="rounded-md object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Add custom navigation */}
        <CustomNavigation />
      </Swiper>
    </div>
  );
};

const CustomNavigation = () => {
  return (
    <>
      <button className="swiper-button-prev absolute left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-gray-800"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button className="swiper-button-next absolute right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-gray-800"
        >
          <path
            fillRule="evenodd"
            d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
};
