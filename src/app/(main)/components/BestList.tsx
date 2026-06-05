"use client";
import ActivitiesCard from "./ActivitiesCard";
import { CardItem, CardListProps } from "./type";
import { useRef } from "react";
import { ArrowRight } from "@/constants/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const BestList = ({ items }: CardListProps) => {
  const bestItems = [...items]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="relative w-full pb-2">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        slidesPerView={4}
        spaceBetween={24}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
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
        className="w-full !py-2"
      >
        {bestItems.map((item) => (
          <SwiperSlide key={item.id}>
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
