"use client";

import { ActivitiesCard } from "./ActivitiesCard";
import { ActivitiesCardSkeleton } from "./ActivitiesCardSkeleton";
import { CardListProps } from "./type";
import { useRef } from "react";
import { ArrowRight } from "@/constants/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export const BestList = ({ items, isLoading }: CardListProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const bestItems = [...items]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  // 로딩 중엔 실제 카드와 같은 크기의 스켈레톤으로 자리를 잡아 레이아웃 밀림(CLS) 방지
  if (isLoading) {
    return (
      <div className="w-full overflow-hidden pb-2">
        <div role="status" aria-live="polite" className="flex gap-4 md:gap-6">
          <span className="sr-only">인기 체험을 불러오는 중입니다</span>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="w-[calc((100%-16px)/2)] shrink-0 md:w-[calc((100%-72px)/4)]"
            >
              <ActivitiesCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (bestItems.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full pb-2">
      <Swiper
        modules={[Autoplay]}
        loop
        slidesPerView={4}
        spaceBetween={24}
        observer
        observeParents
        resizeObserver
        updateOnWindowResize
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
        className="w-full p-2!"
      >
        {bestItems.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <ActivitiesCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="hover:bg-primary-500 absolute top-1/2 -left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] [&_svg]:size-5 [&_svg]:text-gray-900 hover:[&_svg]:text-white"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="이전 인기체험"
      >
        <ArrowRight className="rotate-180" />
      </button>

      <button
        type="button"
        className="hover:bg-primary-500 absolute top-1/2 -right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] [&_svg]:size-5 [&_svg]:text-gray-900 hover:[&_svg]:text-white"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="다음 인기체험"
      >
        <ArrowRight />
      </button>
    </div>
  );
};
