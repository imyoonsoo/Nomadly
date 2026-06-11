import { getActivityDetail } from "@/features/activities/api/api";
import ActivityForm from "@/features/activity-form/components/ActivityForm";
import { defaultActivityFormValues } from "@/features/activity-form/utils";

interface EditActivityFormProps {
  params: Promise<{
    id: string;
  }>;
}

const EditActivityForm = async ({ params }: EditActivityFormProps) => {
  const { id } = await params;
  const activityId = Number(id);

  const activityDetailData = await getActivityDetail({
    activityId,
  });

  return (
    <ActivityForm
      mode="edit"
      defaultValues={defaultActivityFormValues(activityDetailData)}
    />
  );
};

export default EditActivityForm;
