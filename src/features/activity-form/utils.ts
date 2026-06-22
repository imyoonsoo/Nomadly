import { ActivityDetailResponse } from "@/features/activities/type";
import { ActivityFormValues } from "./types";
import { uploadActivityImage } from "./api";
import { showToast } from "@/lib/utils/toast";

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

// 이미지 url string 타입으로 변경
export const getImageUrl = async (image: string | File) => {
  if (typeof image === "string") {
    return image;
  }

  try {
    const response = await uploadActivityImage(image);
    return response.activityImageUrl;
  } catch {
    showToast.error("이미지 업로드에 실패했습니다.");
    throw new Error("IMAGE_UPLOAD_ERROR");
  }
};
