"use client";

import { useEffect, useState } from "react";
import { A11y, Autoplay, FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

import { cn } from "~/utils/utils";
import CustomButton from "../common-button/common-button";

export const UniversalSwiper = ({
  items,
  renderItem,
  swiperOptions = {},
  showNavigation = false,
  showPagination = false,
  showScrollbar = false,
  navigationSize = 24,
  navigationOffset = 0,
  className,
  swiperClassName,
  slideClassName,
  thumbsSwiper,
  breakpoints,
  freeMode = false,
  onSwiperInit,
}: UniversalSwiperProperties) => {
  const [isMounted, setIsMounted] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !items?.length) return null;

  const modules = [
    ...(showNavigation ? [Navigation] : []),
    ...(showPagination ? [Pagination] : []),
    ...(showScrollbar ? [Scrollbar] : []),
    ...(freeMode ? [FreeMode] : []),
    ...(thumbsSwiper ? [Thumbs] : []),
    Autoplay,
    A11y,
  ];

  return (
    <div className={cn(className)}>
      <Swiper
        {...swiperOptions}
        modules={modules}
        thumbs={{ swiper: thumbsSwiper }}
        breakpoints={breakpoints}
        freeMode={freeMode}
        className={cn(swiperClassName)}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          onSwiperInit?.(swiper);
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={cn(slideClassName)}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
        {/* <div className={`py-5`}></div> */}
        {showNavigation && swiperInstance && <CustomNavigation iconSize={navigationSize} offset={navigationOffset} />}
      </Swiper>
    </div>
  );
};

type CustomNavigationProperties = {
  variant?: "default" | "minimal";
  iconSize?: number;
  offset?: number;
  className?: string;
};

const CustomNavigation = ({ iconSize = 24, className }: CustomNavigationProperties) => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const handleSlideChange = (swiper: SwiperType) => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    swiper.on("slideChange", handleSlideChange);

    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper]);

  return (
    <div className={cn("absolute inset-0 flex items-center justify-between p-2", className)}>
      <CustomButton
        onClick={(event) => {
          event.stopPropagation();
          swiper.slidePrev();
        }}
        isDisabled={isBeginning}
        isIconOnly
        icon={<ChevronLeftCircle size={iconSize} />}
        variant="ghost"
        size="circle"
        aria-label="Previous slide"
        className={cn(
          "z-10 bg-black/50 text-white hover:bg-primary hover:text-white",
          isBeginning ? "hidden" : "block",
        )}
      />
      <CustomButton
        onClick={(event) => {
          event.stopPropagation();
          swiper.slideNext();
        }}
        isDisabled={isEnd}
        isIconOnly
        icon={<ChevronRightCircle size={iconSize} />}
        variant="ghost"
        size="circle"
        aria-label="Next slide"
        className={cn("z-10 bg-black/50 text-white hover:bg-primary hover:text-white", isEnd ? "hidden" : "block")}
      />
    </div>
  );
};
