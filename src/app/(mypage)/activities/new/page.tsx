"use client";

import ActivityForm from "@/features/activity-form/components/ActivityForm";
import { useCreateActivityMutation } from "@/features/activity-form/hooks/useActivityMutation";
import { ActivityFormValues } from "@/features/activity-form/types";
import { uploadActivityImage } from "@/features/activity-form/api";
import { getImageUrl } from "@/features/activity-form/utils";

const CreateActivityForm = () => {
  const createActivityMutation = useCreateActivityMutation();

  const handleCreateActivity = async (data: ActivityFormValues) => {
    if (!data.bannerImageUrl) {
      return;
    }

    const bannerImageResponse = await getImageUrl(data.bannerImageUrl);

    const subImageUrls = await Promise.all(data.subImageUrls.map(getImageUrl));

    const request: ActivityFormValues = {
      title: data.title,
      category: data.category,
      description: data.description,
      address: data.address,
      price: Number(data.price),
      schedules: data.schedules,
      bannerImageUrl: bannerImageResponse,
      subImageUrls,
    };

    await createActivityMutation.mutateAsync(request);
  };

  return <ActivityForm mode="create" onSubmit={handleCreateActivity} />;
};

export default CreateActivityForm;
