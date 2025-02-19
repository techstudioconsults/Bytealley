"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const ProductImageCarousel = ({ images }: { images: string[] }) => {
  const swiperReference = useRef<any>(null);

  useEffect(() => {
    if (swiperReference.current) {
      //   console.log("Swiper instance:", swiperReference.current);
    }
  }, []);

  return (
    <div className="relative mb-4 h-48 w-full rounded-md bg-gray-100 md:h-[263px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperReference.current = swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-48 w-full rounded-md md:h-[263px]">
              <Image
                src={image || "/placeholder-image.jpg"} // Fallback for empty images
                alt={`Product Image ${index + 1}`}
                fill
                className="rounded-md object-cover"
                priority={index === 0} // Only prioritize the first image for faster load
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
