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
    <div className="relative w-full hover:transform-[translateY(-5px)] transition ease-in shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] rounded-[18px] md:rounded-4xl">
      <button
        type="button"
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
        className={`absolute right-4 top-4 z-1 flex items-center justify-center text-white hover:transform-[scale(120%)] transition ease-in`}
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
        <div className="relative aspect-[1/1.1] md:rounded-4xl rounded-[18px] overflow-hidden bg-gray-200">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover"
            onError={() => {
              setImgSrc(NoImg);
            }}
          />
        </div>

        <div className="relative bg-white px-4.25 md:px-7.5 py-4 md:py-5 -mt-12.5 z-auto rounded-[18px] md:rounded-4xl ">
          <p className="text-14-medium md:text-18-medium truncate">{title}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <StarOn />
            <div>
              <span className="text-12-medium md:text-14-medium">{rating}</span>
              <span className="text-12-medium md:text-14-medium text-gray-400">
                ({reviewCount})
              </span>
            </div>
          </div>
          <div className="mt-2.5 md:mt-4.5 whitespace-nowrap">
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
