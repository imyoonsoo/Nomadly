"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "@/constants/icons";
import type { BannerImageGridProps, BannerImageItemProps } from "./type";

const BannerImageItem = ({
  src,
  alt,
  className = "",
}: BannerImageItemProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="50vw" />
    </div>
  );
};

const SCROLL_EDGE_OFFSET = 1;

const BannerImageFiveGallery = ({ images }: { images: string[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setCanScrollPrev(container.scrollLeft > SCROLL_EDGE_OFFSET);
    setCanScrollNext(container.scrollLeft < maxScrollLeft - SCROLL_EDGE_OFFSET);
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, images]);

  const handlePrevClick = () => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const handleNextClick = () => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      left: container.scrollWidth - container.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-81.75 w-full md:h-100">
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="scrollbar-hide h-full snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-3xl"
      >
        <div className="flex h-full w-[150%] min-w-full gap-3">
          <BannerImageItem
            src={images[0]}
            alt="체험 이미지 1"
            className="h-full w-1/3 shrink-0 snap-start"
          />
          <div className="grid h-full w-2/3 shrink-0 snap-end grid-cols-2 grid-rows-2 gap-3">
            {images.slice(1).map((src, index) => (
              <BannerImageItem
                key={src}
                src={src}
                alt={`체험 이미지 ${index + 2}`}
                className="h-full w-full"
              />
            ))}
          </div>
        </div>
      </div>

      {canScrollPrev && (
        <button
          type="button"
          aria-label="이전 이미지"
          className="absolute -left-5 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-primary-500 [&_svg]:size-5 [&_svg]:text-gray-900 hover:[&_svg]:text-white"
          onClick={handlePrevClick}
        >
          <ArrowRight className="rotate-180" />
        </button>
      )}

      {canScrollNext && (
        <button
          type="button"
          aria-label="다음 이미지"
          className="absolute -right-5 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-primary-500 [&_svg]:size-5 [&_svg]:text-gray-900 hover:[&_svg]:text-white"
          onClick={handleNextClick}
        >
          <ArrowRight />
        </button>
      )}
    </div>
  );
};

const BannerImageSection = ({ images }: BannerImageGridProps) => {
  const displayImages = images.slice(0, 5);
  const imageCount = displayImages.length;

  if (imageCount === 0) {
    return null;
  }

  if (imageCount === 1) {
    return (
      <div className="relative h-81.75 w-full overflow-hidden rounded-3xl md:h-100">
        <BannerImageItem
          src={displayImages[0]}
          alt="체험 대표 이미지"
          className="h-full w-full"
        />
      </div>
    );
  }

  if (imageCount === 2) {
    return (
      <div className="grid h-81.75 w-full grid-cols-2 gap-3 overflow-hidden rounded-3xl md:h-100">
        {displayImages.map((src, index) => (
          <BannerImageItem
            key={src}
            src={src}
            alt={`체험 이미지 ${index + 1}`}
            className="h-full w-full"
          />
        ))}
      </div>
    );
  }

  if (imageCount === 3) {
    return (
      <div className="grid h-81.75 w-full grid-cols-2 grid-rows-2 gap-3 overflow-hidden rounded-3xl md:h-100">
        <BannerImageItem
          src={displayImages[0]}
          alt="체험 이미지 1"
          className="row-span-2 h-full w-full"
        />
        <BannerImageItem
          src={displayImages[1]}
          alt="체험 이미지 2"
          className="h-full w-full"
        />
        <BannerImageItem
          src={displayImages[2]}
          alt="체험 이미지 3"
          className="h-full w-full"
        />
      </div>
    );
  }

  if (imageCount === 4) {
    return (
      <div className="grid h-81.75 w-full grid-cols-2 grid-rows-2 gap-3 overflow-hidden rounded-3xl md:h-100">
        {displayImages.map((src, index) => (
          <BannerImageItem
            key={src}
            src={src}
            alt={`체험 이미지 ${index + 1}`}
            className="h-full w-full"
          />
        ))}
      </div>
    );
  }

  return <BannerImageFiveGallery images={displayImages} />;
};

export default BannerImageSection;
