"use client";

import ActivityForm from "@/features/activity-form/components/ActivityForm";
import { useCreateActivityMutation } from "@/features/activity-form/hooks/useActivityMutation";
import {
  ActivityFormValues,
  CreateActivityRequest,
} from "@/features/activity-form/types";
import { uploadActivityImage } from "@/features/activity-form/api";

const CreateActivityForm = () => {
  const createMutation = useCreateActivityMutation();

  const handleCreateActivity = async (data: ActivityFormValues) => {
    if (!data.bannerImageUrl) return;

    const bannerImageResponse =
      typeof data.bannerImageUrl === "string"
        ? { activityImageUrl: data.bannerImageUrl }
        : await uploadActivityImage(data.bannerImageUrl);
    console.log("배너 이미지 응답:", bannerImageResponse);

    const subImageUrls = await Promise.all(
      data.subImageUrls.map(async (image) => {
        if (typeof image === "string") return image;

        const response = await uploadActivityImage(image);
        console.log("소개 이미지 응답:", response);

        return response.activityImageUrl;
      }),
    );

    const request: CreateActivityRequest = {
      title: data.title,
      category: data.category,
      description: data.description,
      address: data.address,
      price: Number(data.price),
      schedules: data.schedules,
      bannerImageUrl: bannerImageResponse.activityImageUrl,
      subImageUrls,
    };

    console.log("최종 등록 요청 body:", request);

    await createMutation.mutateAsync(request);
  };

  return <ActivityForm mode="create" onSubmit={handleCreateActivity} />;
};

export default CreateActivityForm;
