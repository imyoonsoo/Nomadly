"use client";

import ActivitiesCard from "./ActivitiesCard";
import { CardListProps } from "./type";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/constants/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const BestList = ({ items }: CardListProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const bestItems = [...items]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full pb-2">
      <Swiper
        modules={[Autoplay]}
        loop={bestItems.length > 4}
        slidesPerView={4}
        spaceBetween={24}
        observer={true}
        observeParents={true}
        resizeObserver={true}
        updateOnWindowResize={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          setTimeout(() => {
            swiper.update();
          }, 0);
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          780: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1080: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="w-full p-2!"
      >
        {bestItems.map((item, ranking) => (
          <SwiperSlide key={item.id} className="relative">
            <ActivitiesCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="absolute -right-5 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-primary-500 [&_svg]:size-5 [&_svg]:text-gray-900 hover:[&_svg]:text-white"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default BestList;
