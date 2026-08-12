"use client";
import Image from "next/image";
import Link from "next/link";
import { ActivitiesCardProps } from "./type";
import { Heart, HeartOn, StarOn } from "@/constants/icons";
import { NoImg } from "@/constants/images";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/utils/toast";

const ActivitiesCard = ({
  title,
  bannerImageUrl,
  id,
  price,
  rating,
  reviewCount,
  isBookmarked,
}: ActivitiesCardProps) => {
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked || false);

  const [imgSrc, setImgSrc] = useState(bannerImageUrl || NoImg);

  const handleToggleBookmark = (id: number) => {
    const value = localStorage.getItem("bookmarkedActivities");
    const saved: number[] = value ? JSON.parse(value) : [];

    if (saved.includes(id)) {
      const newSaved = saved.filter((item) => item != id);
      localStorage.setItem("bookmarkedActivities", JSON.stringify(newSaved));
    } else {
      saved.push(id);
      localStorage.setItem("bookmarkedActivities", JSON.stringify(saved));
    }
    setBookmarked((prev) => !prev);
  };

  useEffect(() => {}, [bookmarked]);

  return (
    <div className="relative w-full rounded-[18px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] transition ease-in hover:transform-[translateY(-5px)] md:rounded-4xl">
      <button
        type="button"
        aria-label={bookmarked ? "관심 체험 취소" : "관심 체험 등록"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          handleToggleBookmark(id);

          if (!bookmarked) {
            showToast.success(`"관심 체험으로 등록했습니다."`);
          } else {
            showToast("관심 체험을 취소했습니다.");
          }
        }}
        className={`absolute top-4 right-4 z-1 flex items-center justify-center text-white transition ease-in hover:transform-[scale(120%)]`}
      >
        <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          {bookmarked ? (
            <HeartOn width={24} height={24} />
          ) : (
            <Heart width={24} height={24} />
          )}
        </span>
      </button>
      <Link href={`/activities/${id}`}>
        <div className="relative aspect-[1/1.1] overflow-hidden rounded-[18px] bg-gray-200 md:rounded-4xl">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover"
            onError={() => {
              setImgSrc(NoImg);
            }}
          />
        </div>

        <div className="relative z-auto -mt-12.5 rounded-[18px] bg-white px-4.25 py-4 md:rounded-4xl md:px-7.5 md:py-5">
          <p className="text-14-medium md:text-18-medium truncate">{title}</p>
          <div className="mt-0.5 flex items-center gap-1">
            <StarOn />
            <div>
              <span className="text-12-medium md:text-14-medium">{rating}</span>
              <span className="text-12-medium md:text-14-medium text-gray-400">
                ({reviewCount})
              </span>
            </div>
          </div>
          <div className="mt-2.5 whitespace-nowrap md:mt-4.5">
            <span className="text-16-bold md:text-18-bold">
              ₩ {(price ?? 0).toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ActivitiesCard;
