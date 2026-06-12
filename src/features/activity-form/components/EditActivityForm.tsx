"use client";

import { useUpdateActivityMutation } from "../hooks/useActivityMutation";
import { ActivityFormValues, Schedule, UpdateActivityRequest } from "../types";
import { ActivityImage, ActivitySchedule } from "@/app/(main)/activities/type";
import ActivityForm from "./ActivityForm";
import { uploadActivityImage } from "../api";

interface OriginalActivity {
  subImages: ActivityImage[];
  schedules: ActivitySchedule[];
}

interface EditActivityFormProps {
  activityId: number;
  defaultValues: ActivityFormValues;
  originalActivity: OriginalActivity;
}

const EditActivityForm = ({
  activityId,
  defaultValues,
  originalActivity,
}: EditActivityFormProps) => {
  const updateActivityMutation = useUpdateActivityMutation(activityId);

  const changeToImageUrl = async (image: string | File) => {
    if (typeof image === "string") {
      return image;
    } else {
      const response = await uploadActivityImage(image);
      return response.activityImageUrl;
    }
  };

  const getScheduleKey = ({ date, startTime, endTime }: Schedule) => {
    return `${date}-${startTime}-${endTime}`;
  };

  const handleUpdateActivity = async (data: ActivityFormValues) => {
    if (!data.bannerImageUrl) {
      return;
    }

    const bannerImageUrl = await changeToImageUrl(data.bannerImageUrl);

    const uploadSubImageUrls = await Promise.all(
      data.subImageUrls.map(changeToImageUrl),
    );

    const currentSubImageUrls = new Set(uploadSubImageUrls);

    const subImagesIdsToRemove = originalActivity.subImages
      .filter((image) => !currentSubImageUrls.has(image.imageUrl))
      .map((image) => image.id);

    const originalSubImageUrl = new Set(
      originalActivity.subImages.map((image) => image.imageUrl),
    );

    const subImagesUrlsToAdd = uploadSubImageUrls.filter(
      (imageUrl) => !originalSubImageUrl.has(imageUrl),
    );

    const currentScheduleKey = new Set(data.schedules.map(getScheduleKey));

    const scheduleIdsToRemove = originalActivity.schedules
      .filter((schedule) => !currentScheduleKey.has(getScheduleKey(schedule)))
      .map((schedule) => schedule.id);

    const originalScheduleKey = new Set(
      originalActivity.schedules.map(getScheduleKey),
    );

    const schedulesToAdd = data.schedules.filter(
      (schedule) => !originalScheduleKey.has(getScheduleKey(schedule)),
    );

    const request: UpdateActivityRequest = {
      title: data.title,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      bannerImageUrl,
      subImagesIdsToRemove,
      subImagesUrlsToAdd,
      scheduleIdsToRemove,
      schedulesToAdd,
    };

    console.log("수정:", request);

    await updateActivityMutation.mutateAsync(request);
  };

  return (
    <ActivityForm
      mode="edit"
      defaultValues={defaultValues}
      onSubmit={handleUpdateActivity}
    />
  );
};

export default EditActivityForm;
