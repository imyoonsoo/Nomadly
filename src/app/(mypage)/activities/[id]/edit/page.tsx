import { getActivityDetail } from "@/features/activities/api/api";
import EditActivityForm from "@/features/activity-form/components/EditActivityForm";
import { defaultActivityFormValues } from "@/features/activity-form/utils";

interface EditActivityPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditActivityPage = async ({ params }: EditActivityPageProps) => {
  const { id } = await params;
  const activityId = Number(id);

  const activityDetailData = await getActivityDetail({
    activityId,
  });

  return (
    <EditActivityForm
      activityId={activityId}
      defaultValues={defaultActivityFormValues(activityDetailData)}
      originalActivity={{
        subImages: activityDetailData.subImages,
        schedules: activityDetailData.schedules,
      }}
    />
  );
};

export default EditActivityPage;
