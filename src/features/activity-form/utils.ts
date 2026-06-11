import { ActivityDetailResponse } from "@/app/(main)/activities/type";
import { ActivityFormValues } from "./types";

// 받아온 데이터 타입에 맞게 변경
export const defaultActivityFormValues = (
  activity: ActivityDetailResponse,
): ActivityFormValues => {
  return {
    title: activity.title,
    category: activity.category,
    description: activity.description,
    address: activity.address,
    price: activity.price,
    schedules: activity.schedules.map((schedule) => ({
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    })),
    bannerImageUrl: activity.bannerImageUrl,
    subImageUrls: activity.subImages.map((subImage) => subImage.imageUrl),
  };
};
