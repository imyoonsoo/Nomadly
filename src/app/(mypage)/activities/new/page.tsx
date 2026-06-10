"use client";

import ActivityForm from "@/features/activity-form/components/ActivityForm";
import { useCreateActivityMutation } from "@/features/activity-form/hooks/useActivityMutation";
import {
  ActivityFormValues,
  CreateActivityRequest,
} from "@/features/activity-form/types";
import { uploadActivityImage } from "@/features/activity-form/api";

const CreateActivityForm = () => {
  const createActivityMutation = useCreateActivityMutation();

  const handleCreateActivity = async (data: ActivityFormValues) => {
    if (!data.bannerImageUrl) {
      return;
    }

    const bannerImageResponse =
      typeof data.bannerImageUrl === "string"
        ? { activityImageUrl: data.bannerImageUrl }
        : await uploadActivityImage(data.bannerImageUrl);

    const subImageUrls = await Promise.all(
      data.subImageUrls.map(async (imageUrl) => {
        if (typeof imageUrl === "string") return imageUrl;
        const response = await uploadActivityImage(imageUrl);

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

    await createActivityMutation.mutateAsync(request);
  };

  return <ActivityForm mode="create" onSubmit={handleCreateActivity} />;
};

export default CreateActivityForm;
